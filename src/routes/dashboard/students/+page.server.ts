import {
  DB_STUDENT_COLLECTION_SCHEMA_HOLDER_ID,
  type StudentsDoc,
} from "$lib/db_schemas";
import db from "$lib/server/db";
import type { Collection } from "mongodb";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
  const page = parseInt(event.url.searchParams.get("page") ?? "1");
  const limit = 10;
  const offset = (page - 1) * limit;

  const StudentsCollection = db.collection(
    "students"
  ) as Collection<StudentsDoc>;

  const schema = await StudentsCollection.findOne({
    _id: DB_STUDENT_COLLECTION_SCHEMA_HOLDER_ID,
  });

  const students = await StudentsCollection.find()
    .filter({ _id: { $ne: DB_STUDENT_COLLECTION_SCHEMA_HOLDER_ID } })
    .skip(offset)
    .limit(limit)
    .toArray();

  console.debug("schema", schema);
  console.debug("students", students);

  return {
    page,
    fields: schema?.fields ?? [],
    students,
  };
};
