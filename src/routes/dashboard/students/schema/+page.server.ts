import db from "$lib/server/db";
import type { Collection } from "mongodb";
import type { Actions, PageServerLoad } from "./$types";
import {
  DB_STUDENT_COLLECTION_SCHEMA_HOLDER_ID,
  type StudentsDoc,
} from "$lib/db_schemas";

export const load: PageServerLoad = async (event) => {
  let Students = db.collection("students") as Collection<StudentsDoc>;
  let data_fields = await Students.findOne({
    _id: DB_STUDENT_COLLECTION_SCHEMA_HOLDER_ID,
  });

  return {
    data_fields,
  };
};

export const actions: Actions = {
  saveSchema: async (event) => {
    let formData = await event.request.formData();
    let data_fields = JSON.parse(
      (formData.get("data_fields") as string) ?? "[]"
    );

    let Students = db.collection("students") as Collection<StudentsDoc>;

    try {
      await Students.updateOne(
        { _id: DB_STUDENT_COLLECTION_SCHEMA_HOLDER_ID },
        { $set: { fields: data_fields } },
        { upsert: true }
      );

      return { success: true };
    } catch (e) {
      return { success: false, error: e };
    }
  },
};
