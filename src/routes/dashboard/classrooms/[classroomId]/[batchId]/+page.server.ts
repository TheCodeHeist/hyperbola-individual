import type { Collection } from "mongodb";
import type { Actions, PageServerLoad } from "./$types";
import type { ClassesDoc } from "$lib/db_schemas";
import db from "$lib/server/db";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async (event) => {
  const ClassesCollection = db.collection("classes") as Collection<ClassesDoc>;

  try {
    let classroomData = await ClassesCollection.findOne({
      _id: event.params.classroomId,
    });

    let batchData = classroomData?.batches.filter(
      (batch) => batch.id === event.params.batchId
    )[0];

    return {
      classroomId: event.params.classroomId,
      batchId: event.params.batchId,
      batchData,
    };
  } catch (e) {
    return {
      classroomId: event.params.classroomId,
      batchId: event.params.batchId,
      batchData: null,
    };
  }
};

export const actions: Actions = {
  editBatchInfo: async (event) => {
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
        { _id: event.params.classroomId, "batches.id": event.params.batchId },
        {
          $set: {
            "batches.$.name": batchName,
            "batches.$.description": batchDescription,
          },
        }
      );
    } catch (e) {
      return { success: false, error: e };
    }
  },
  deleteBatch: async (event) => {
    const ClassesCollection = db.collection(
      "classes"
    ) as Collection<ClassesDoc>;

    try {
      await ClassesCollection.updateOne(
        { _id: event.params.classroomId },
        {
          $pull: {
            batches: { id: event.params.batchId },
          },
        }
      );
    } catch (e) {
      return { success: false, error: e };
    }

    return redirect(302, `/dashboard/classrooms/${event.params.classroomId}`);
  },
};
