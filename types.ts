export interface NavItem {
  label: string;
  path: string;
}

export enum StudentType {
  UK = 'UK_EU',
  INTERNATIONAL = 'INTERNATIONAL'
}

export interface IntakeFormData {
  studentType: StudentType | null;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  currentEducation?: string;
  desiredCourse?: string;
  residencyStatus?: string; // UK specific
  countryOfOrigin?: string; // Intl specific
  englishTestStatus?: string; // Intl specific
  consent: boolean;
}
