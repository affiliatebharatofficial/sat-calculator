import { Post } from '@/types/blog';
import postsData from '@/data/posts.json';

/**
 * Returns all raw posts from posts.json.
 */
export function getAllPosts(): Post[] {
  return postsData as Post[];
}

/**
 * Returns published posts, optionally filtered by language.
 * Always sorted by date descending (newest first).
 */
export function getPublishedPosts(lang?: string): Post[] {
  const posts = getAllPosts();
  let published = posts.filter(p => p.status === 'published');
  
  if (lang) {
    published = published.filter(p => p.lang === lang || p.lang === 'all');
  }

  return published.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Returns a single published post matching the provided slug.
 */
export function getPostBySlug(slug: string): Post | undefined {
  const posts = getAllPosts();
  return posts.find(p => p.slug === slug && p.status === 'published');
}

/**
 * Returns slugs of all published posts for static generation.
 */
export function getAllPublishedSlugs(): string[] {
  return getPublishedPosts().map(p => p.slug);
}
