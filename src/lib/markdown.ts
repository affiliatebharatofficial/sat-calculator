/**
 * Server-safe lightweight Markdown to HTML parser for blog articles.
 * Runs during SSR/static rendering with zero client-side dependencies.
 */
export function renderMarkdown(markdown: string): string {
  if (!markdown) return '';

  const lines = markdown.split('\n');
  const htmlParts: string[] = [];

  let inList = false;
  let inTable = false;
  let tableHeaders: string[] = [];
  let tableRows: string[][] = [];

  const flushList = () => {
    if (inList) {
      htmlParts.push('</ul>');
      inList = false;
    }
  };

  const flushTable = () => {
    if (inTable) {
      let tableHtml = '<div class="overflow-x-auto my-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm"><table class="w-full text-left text-xs sm:text-sm border-collapse">';
      if (tableHeaders.length > 0) {
        tableHtml += '<thead class="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold"><tr>';
        tableHeaders.forEach(h => {
          tableHtml += `<th class="p-3 sm:p-4 border-b border-slate-200 dark:border-slate-700">${inlineFormat(h)}</th>`;
        });
        tableHtml += '</tr></thead>';
      }
      tableHtml += '<tbody class="divide-y divide-slate-100 dark:divide-slate-850 bg-white dark:bg-slate-900">';
      tableRows.forEach(row => {
        tableHtml += '<tr class="hover:bg-slate-50/50 dark:hover:bg-slate-850/50 transition">';
        row.forEach((cell, idx) => {
          const isFirst = idx === 0;
          tableHtml += `<td class="p-3 sm:p-4 text-slate-700 dark:text-slate-300 ${isFirst ? 'font-semibold text-slate-900 dark:text-white' : ''}">${inlineFormat(cell)}</td>`;
        });
        tableHtml += '</tr>';
      });
      tableHtml += '</tbody></table></div>';
      htmlParts.push(tableHtml);

      inTable = false;
      tableHeaders = [];
      tableRows = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    // Table row detection
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      flushList();
      const cells = trimmed.split('|').map(c => c.trim()).slice(1, -1);
      
      // Check if separator line
      if (cells.every(c => /^:?-+:?$/.test(c))) {
        continue;
      }

      if (!inTable) {
        inTable = true;
        tableHeaders = cells;
      } else {
        tableRows.push(cells);
      }
      continue;
    } else {
      flushTable();
    }

    if (!trimmed) {
      flushList();
      continue;
    }

    // Headings
    if (trimmed.startsWith('### ')) {
      flushList();
      htmlParts.push(`<h3 class="text-xl sm:text-2xl font-bold mt-8 mb-3 text-slate-950 dark:text-white tracking-tight">${inlineFormat(trimmed.substring(4))}</h3>`);
      continue;
    }
    if (trimmed.startsWith('## ')) {
      flushList();
      htmlParts.push(`<h2 class="text-2xl sm:text-3xl font-black mt-10 mb-4 text-slate-950 dark:text-white tracking-tight border-b border-slate-200 dark:border-slate-800 pb-2">${inlineFormat(trimmed.substring(3))}</h2>`);
      continue;
    }
    if (trimmed.startsWith('# ')) {
      flushList();
      htmlParts.push(`<h1 class="text-3xl sm:text-4xl font-black mt-10 mb-6 text-slate-950 dark:text-white tracking-tight">${inlineFormat(trimmed.substring(2))}</h1>`);
      continue;
    }

    // Blockquote
    if (trimmed.startsWith('> ')) {
      flushList();
      htmlParts.push(`<blockquote class="border-l-4 border-blue-600 dark:border-blue-400 bg-blue-50/50 dark:bg-blue-950/20 p-4 rounded-r-2xl my-4 text-sm text-slate-700 dark:text-slate-300 italic">${inlineFormat(trimmed.substring(2))}</blockquote>`);
      continue;
    }

    // Unordered List
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      if (!inList) {
        htmlParts.push('<ul class="my-4 space-y-2">');
        inList = true;
      }
      htmlParts.push(`<li class="flex items-start gap-2 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed"><span class="text-blue-600 dark:text-blue-400 font-bold mt-1">•</span><span>${inlineFormat(trimmed.substring(2))}</span></li>`);
      continue;
    } else {
      flushList();
    }

    // Ordered list (1. )
    const olMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
    if (olMatch) {
      htmlParts.push(`<div class="flex items-start gap-3 my-2 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed"><span class="shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold text-xs flex items-center justify-center">${olMatch[1]}</span><span>${inlineFormat(olMatch[2])}</span></div>`);
      continue;
    }

    // Pass-through divs
    if (trimmed.startsWith('<div') || trimmed.startsWith('</div')) {
      htmlParts.push(trimmed);
      continue;
    }

    // Paragraph
    htmlParts.push(`<p class="mb-4 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-normal">${inlineFormat(trimmed)}</p>`);
  }

  flushList();
  flushTable();

  return htmlParts.join('\n');
}

function inlineFormat(text: string): string {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/&amp;([a-zA-Z0-9#]+);/g, '&$1;')
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-extrabold text-slate-950 dark:text-white">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="italic text-slate-800 dark:text-slate-200">$1</em>')
    .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-mono text-xs">$1</code>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, linkText, url) => {
      const isInternal = url.startsWith('/') || url.startsWith('#') || !url.includes('://');
      const targetAttr = isInternal ? '' : ' target="_blank" rel="noopener noreferrer"';
      return `<a href="${url}" class="text-blue-600 dark:text-blue-400 font-bold hover:underline transition-colors duration-150"${targetAttr}>${linkText}</a>`;
    });
}
