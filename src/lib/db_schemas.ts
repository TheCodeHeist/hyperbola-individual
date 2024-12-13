import type {
  IBatchesDetails,
  IStudentDetailsFieldProperties,
} from "./generic_schemas";

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

export interface StudentsDetailsDoc extends StudentsBaseDoc {
  details: {
    [key: string]: any;
  };
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
  description: string;
  batches: IBatchesDetails[];
}

export const DB_NAME = "hyperbola_individual_db";
export const DB_STUDENT_COLLECTION_SCHEMA_HOLDER_ID = "__schema__";
