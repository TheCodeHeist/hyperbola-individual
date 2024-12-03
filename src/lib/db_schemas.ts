import type { IStudentDetailsFieldProperties } from "./generic_schemas";

export interface UserDoc {
  _id: string;
}

export interface SessionDoc {
  _id: string;
  expires_at: Date;
  user_id: string;
}

interface StudentsBaseDoc {
  _id: string;
}

interface StudentsDetailsDoc extends StudentsBaseDoc {
  details: Object;
  class_id: string;
  batch_id: string;
}

interface StudentsFieldsDetailsDoc extends StudentsBaseDoc {
  fields: IStudentDetailsFieldProperties[];
}

export type StudentsDoc = StudentsDetailsDoc | StudentsFieldsDetailsDoc;

export interface ClassesDoc {
  _id: string;
  name: string;
  batches: string[];
  students: string[];
}

export interface BatchesDoc {
  _id: string;
  name: string;
  students: string[];
  class_id: string;
}

export const DB_NAME = "hyperbola_individual_db";
export const DB_STUDENT_COLLECTION_SCHEMA_HOLDER_ID = "__schema__";
