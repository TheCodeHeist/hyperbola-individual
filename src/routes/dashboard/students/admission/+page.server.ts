import db from "$lib/server/db";
import type { Collection, ObjectId } from "mongodb";
import type { Actions, PageServerLoad } from "./$types";
import {
  DB_STUDENT_COLLECTION_SCHEMA_HOLDER_ID,
  type ClassesDoc,
  type StudentsDetailsDoc,
  type StudentsDoc,
} from "$lib/db_schemas";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async (event) => {
  const StudentsCollection = db.collection(
    "students"
  ) as Collection<StudentsDoc>;
  const ClassesCollection = db.collection("classes") as Collection<ClassesDoc>;

  try {
    let schema = await StudentsCollection.findOne({
      _id: DB_STUDENT_COLLECTION_SCHEMA_HOLDER_ID,
    });

    if (!schema) {
      return {
        status: 404,
        error: "Schema not found",
        schema: {
          fields: [],
        },
      };
    }

    const classrooms = await ClassesCollection.find({}).toArray();

    return {
      status: 200,
      schema,
      classrooms,
    };
  } catch (error) {
    return {
      status: 500,
      error: "Database error",
      schema: {
        fields: [],
      },
    };
  }
};

export const actions: Actions = {
  default: async (event) => {
    const formData = await event.request.formData();

    const data = {
      class_id: formData.get("class_id") as string,
      batch_id: formData.get("batch_id") as string,
      details: JSON.parse(formData.get("details") as string),
    } as StudentsDetailsDoc;

    const StudentsCollection = db.collection(
      "students"
    ) as Collection<StudentsDoc>;
    let schema = await StudentsCollection.findOne({
      _id: DB_STUDENT_COLLECTION_SCHEMA_HOLDER_ID,
    });

    for (const field of schema?.fields) {
      if (
        field.required &&
        data.details[field.id] === undefined
      ) {
        return {
          success: false,
          status: 400,
          error: `No required field must be kept empty: "${field.name}"`,
        };
      }

      if (
        field.type === "email" &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
          data.details[field.id]
        )
      ) {
        return {
          success: false,
          status: 400,
          error: `Field "${field.name}" must be a valid email address`,
        };
      }
    }

    if (data.class_id === "" || !data.class_id) {
      return {
        success: false,
        status: 400,
        error: `Field "Classroom name" is required`,
      };
    }

    if (data.batch_id === "" || !data.batch_id) {
      return {
        success: false,
        status: 400,
        error: `Field "Batch name" is required`,
      };
    }

    try {
      await StudentsCollection.insertOne({
        ...data,
        _id: crypto.randomUUID() as string,
      });
    } catch (error) {
      return {
        success: false,
        status: 500,
        error: "Database error",
      };
    }

    return redirect(303, "/dashboard/students");
  },
};
