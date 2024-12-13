import db from "$lib/server/db";
import type { Collection, ObjectId } from "mongodb";
import type { Actions, PageServerLoad } from "./$types";
import type { ClassesDoc } from "$lib/db_schemas";

export const load: PageServerLoad = async (event) => {
  const ClassesCollection = db.collection("classes") as Collection<ClassesDoc>;
  const classrooms = await ClassesCollection.find().toArray();

  return {
    classrooms,
  };
};

export const actions: Actions = {
  createClassroom: async (event) => {
    const formData = await event.request.formData();
    const classroomName = formData.get("classroomName");
    const classroomDescription = formData.get("classroomDescription");

    // Null check
    if (!classroomName || !classroomDescription) {
      return { success: false, error: "Missing classroom name or description" };
    }

    // Type check
    if (
      typeof classroomName !== "string" ||
      typeof classroomDescription !== "string"
    ) {
      return { success: false, error: "Invalid classroom name or description" };
    }

    const ClassesCollection = db.collection(
      "classes"
    ) as Collection<ClassesDoc>;

    try {
      await ClassesCollection.insertOne({
        _id: crypto.randomUUID() as string,
        name: classroomName,
        description: classroomDescription,
        batches: [],
      });
    } catch (e) {
      return { success: false, error: e };
    }
  },
};
