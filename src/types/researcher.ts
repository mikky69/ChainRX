export interface ResearcherFormData {
  fullName: string;
  email: string;
  phone?: string;
  institution: string;
  department?: string;
  researchFocus: string;
  yearsOfExperience?: string;
  orcidId?: string;
  areasOfInterest: string[];
  researchDescription?: string;
}

export interface Researcher extends Omit<ResearcherFormData, 'yearsOfExperience'> {
  id: string;
  yearsOfExperience: number | null;
  status: 'PENDING_APPROVAL' | 'APPROVED' | 'REJECTED' | 'SUSPENDED';
  createdAt: Date;
  updatedAt: Date;
}

export const researchInterests = [
  'Clinical Trials',
  'Drug Discovery',
  'Pharmacology',
  'Pharmaceutical Chemistry',
  'Pharmacovigilance',
  'Genomics',
  'Personalized Medicine',
  'Drug Delivery Systems',
  'Biotechnology',
  'Public Health',
  'Epidemiology',
  'Health Economics',
  'Regulatory Affairs',
  'Medical Devices',
  'Other',
] as const;

export type ResearchInterest = typeof researchInterests[number];
