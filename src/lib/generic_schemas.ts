export enum EStudentDetailsFieldPropertiesType {
  SHORT_TEXT = "short_text",
  LONG_TEXT = "long_text",
  NUMERIC = "numeric",
  BOOLEAN = "boolean",
  DATE = "date",
  EMAIL = "email",
  PHONE_NUMBER = "phone_number",
  DROPDOWN = "dropdown",
}

export interface IStudentDetailsFieldProperties {
  id: string;
  name: string;
  type: EStudentDetailsFieldPropertiesType;
  required: boolean;
  options?: string[];
}

export interface IBatchesDetails {
  id: string;
  name: string;
  description: string;
  students: string[];
}
