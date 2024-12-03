export enum EStudentDetailsFieldPropertiesType {
  TEXT = "text",
  NUMERIC = "numeric",
  YES_NO = "yes_no",
  DATE = "date",
  EMAIL = "email",
  PHONE_NUMBER = "phone_number",
  URL = "url",
  DROPDOWN = "dropdown",
  MULTI_SELECT = "multi_select",
  CHECKBOX = "checkbox",
  RADIO = "radio",
  FILE = "file",
  IMAGE = "image",
}

export interface IStudentDetailsFieldProperties {
  id: string;
  name: string;
  type: EStudentDetailsFieldPropertiesType;
  required: boolean;
  options?: string[];
}
