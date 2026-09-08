export interface FAQ {
  question: string;
  answer: string;
}

export interface CalculatorInput {
  id: string;
  label: string;
  type: 'number' | 'select' | 'boolean';
  defaultValue: any;
  placeholder?: string;
  options?: { label: string; value: any }[];
  suffix?: string;
}

export interface CalculatorResultField {
  label: string;
  value: number;
  formatted: string;
  isMain?: boolean;
}

export interface CalculatorStep {
  description: string;
  mathFormula?: string;
}

export interface CalculatorSourceReference {
  name: string;
  url?: string;
  description?: string;
}

export interface CalculatorContent {
  whatItDoes?: string;
  whoShouldUse?: string[];
  howItWorks?: string;
  explanation: string;
  formula: string;
  example: string;
  legislation: string;
  faqs: FAQ[];
  tips?: string[];
  errors?: string[];
  assumptions?: string[];
  limitations?: string[];
  relatedCalculators?: string[];
  sources?: CalculatorSourceReference[];
  lastUpdated?: string;
  disclaimer?: string;
}

export interface CalculatorTranslation {
  title?: string;
  shortDescription?: string;
  category?: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
  inputs?: {
    id: string;
    label: string;
    placeholder?: string;
    options?: { label: string; value: any }[];
  }[];
  content?: Partial<CalculatorContent>;
}

export interface CalculatorConfig {
  id: string;
  title: string;
  shortDescription: string;
  category: string;
  categorySlug: string;
  slug: string;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    schemaType: 'Calculator' | 'HowTo' | 'FAQ';
  };
  inputs: CalculatorInput[];
  calculate: (inputs: Record<string, any>, lang?: string) => {
    results: CalculatorResultField[];
    steps: CalculatorStep[];
  };
  content: CalculatorContent;
  translations?: Record<string, CalculatorTranslation>;
}
