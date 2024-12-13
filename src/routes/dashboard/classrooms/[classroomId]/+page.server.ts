import type { Collection } from "mongodb";
import type { Actions, PageServerLoad } from "./$types";
import type { ClassesDoc } from "$lib/db_schemas";
import db from "$lib/server/db";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async (event) => {
  const ClassesCollection = db.collection("classes") as Collection<ClassesDoc>;

  try {
    return {
      classroomId: event.params.classroomId,
      classroomData: await ClassesCollection.findOne({
        _id: event.params.classroomId,
      }),
    };
  } catch (e) {
    return {
      classroomId: event.params.classroomId,
      classroomData: null,
    };
  }
};

export const actions: Actions = {
  editClassroomInfo: async (event) => {
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
      await ClassesCollection.updateOne(
        { _id: event.params.classroomId },
        {
          $set: {
            name: classroomName,
            description: classroomDescription,
          },
        }
      );
    } catch (e) {
      return { success: false, error: e };
    }
  },
  deleteClassroom: async (event) => {
    const ClassesCollection = db.collection(
      "classes"
    ) as Collection<ClassesDoc>;

    try {
      await ClassesCollection.deleteOne({ _id: event.params.classroomId });
    } catch (e) {
      return { success: false, error: e };
    }

    return redirect(302, "/dashboard/classrooms");
  },
  createBatch: async (event) => {
    const formData = await event.request.formData();
    const batchName = formData.get("batchName");
    const batchDescription = formData.get("batchDescription");

    // Null check
    if (!batchName || !batchDescription) {
      return { success: false, error: "Missing batch name or description" };
    }

    // Type check
    if (typeof batchName !== "string" || typeof batchDescription !== "string") {
      return { success: false, error: "Invalid batch name or description" };
    }

    const ClassesCollection = db.collection(
      "classes"
    ) as Collection<ClassesDoc>;

    try {
      await ClassesCollection.updateOne(
        { _id: event.params.classroomId },
        {
          $push: {
            batches: {
              id: crypto.randomUUID() as string,
              name: batchName,
              description: batchDescription,
              students: [],
            },
          },
        }
      );
    } catch (e) {
      return { success: false, error: e };
    }
  },
};
