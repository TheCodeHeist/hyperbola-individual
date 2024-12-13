<script lang="ts">
  import { goto } from "$app/navigation";
  import type { StudentsDoc } from "$lib/db_schemas";
  import type { IStudentDetailsFieldProperties } from "$lib/generic_schemas";
  import { faArrowRight, faPlus } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
  import type { WithId } from "mongodb";

  let {
    data,
  }: {
    data: {
      fields: IStudentDetailsFieldProperties[];
      students: WithId<StudentsDoc>[];
    };
  } = $props();
</script>

<div class="w-full h-full px-12 py-10 flex flex-col gap-8">
  <div class="w-full flex items-center justify-between">
    <p class="font-bold text-4xl">My Students</p>

    <button
      type="button"
      class="px-4 py-2 bg-teal-600 rounded-md transition-all hover:bg-teal-500"
      onclick={() => goto("/dashboard/students/schema")}
    >
      Edit fields &nbsp; <FontAwesomeIcon icon={faArrowRight} />
    </button>
  </div>

  <div class="w-full flex justify-end items-center">
    <button
      type="button"
      class="px-4 py-2 bg-teal-600 rounded-md transition-all hover:bg-teal-500"
      onclick={() => goto("/dashboard/students/admission")}
    >
      <FontAwesomeIcon icon={faPlus} /> &nbsp; Add Student
    </button>
  </div>

  <div class="w-full overflow-auto py-4">
    {#if data.fields}
      {#if data.fields.length === 0}
        <p class="text-center text-2xl">No fields have been set...</p>
      {:else if data.students.length === 0}
        <p class="text-center text-2xl">No students found</p>
      {:else}
        <table class="w-full">
          <thead>
            <tr class="bg-teal-600 overflow-hidden">
              {#each data.fields as field}
                <th class="p-2 min-w-10 border whitespace-nowrap"
                  >{field.name}</th
                >
              {/each}
            </tr>
          </thead>
          <tbody>
            {#each data.students as student, i}
              <tr
                class={"" + (i % 2 === 0 ? "bg-neutral-800" : "bg-neutral-700")}
              >
                {#each data.fields as field}
                  <td class="p-2 min-w-10 border whitespace-nowrap"
                    >{typeof student.details[field.id as keyof StudentsDoc] ===
                    "boolean"
                      ? student.details[field.id as keyof StudentsDoc]
                        ? "Yes"
                        : "No"
                      : student.details[field.id as keyof StudentsDoc]}</td
                  >
                {/each}
              </tr>
            {/each}
          </tbody>
        </table>
      {/if}
    {:else}
      <p class="text-center text-2xl">No fields have been set...</p>
    {/if}
  </div>
</div>
