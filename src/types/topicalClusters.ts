export interface ClusterCalculatorRef {
  slug: string;
  categorySlug: string;
  title: string;
  titleEn?: string;
  contextualAnchor: string;
  contextualAnchorEn?: string;
  description: string;
  descriptionEn?: string;
  isPrimary?: boolean;
}

export interface ClusterGuideRef {
  slug: string;
  title: string;
  titleEn?: string;
  contextualAnchor: string;
  contextualAnchorEn?: string;
  description: string;
  descriptionEn?: string;
  isPrimary?: boolean;
}

export interface ClusterMethodologyRef {
  anchor: string;
  stepNumber: number;
  label: string;
  labelEn: string;
}

export interface ClusterSourceRef {
  sourceId: string;
  institution: string;
  documentTitle: string;
  anchor: string;
}

export interface TopicalCluster {
  id: string; // e.g. 'isr', 'iva', 'resico', 'nomina', 'imss', 'lft', 'deducciones', 'finiquito-liquidacion', 'aguinaldo', 'sat-general'
  name: string;
  nameEn: string;
  shortDescription: string;
  shortDescriptionEn: string;
  calculators: ClusterCalculatorRef[];
  guides: ClusterGuideRef[];
  methodology: ClusterMethodologyRef;
  primarySources: ClusterSourceRef[];
}
