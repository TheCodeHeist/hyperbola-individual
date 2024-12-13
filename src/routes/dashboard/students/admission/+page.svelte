<script lang="ts">
  import InputMorpher from "$lib/components/InputMorpher.svelte";
  import { goto } from "$app/navigation";
  import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
  import type { IBatchesDetails } from "$lib/generic_schemas";

  let { data, form } = $props();

  // console.log(data.schema.fields);

  let selectedClassroomId = $state("");
  let selectedBatchId = $state("");

  let availableBatches = $derived(
    data.classrooms
      ? data.classrooms.find(
          (classroom) => classroom._id === selectedClassroomId
        )?.batches
      : []
  );

  let newStudentDetails: any = $state({});

  let admissionForm: HTMLFormElement = $state("" as any as HTMLFormElement);

  function handleSubmit(e: Event) {
    e.preventDefault();

    console.log({
      details: $state.snapshot(newStudentDetails),
      class_id: $state.snapshot(selectedClassroomId),
      batch_id: $state.snapshot(selectedBatchId),
    });

    admissionForm.requestSubmit();
  }
</script>

<div class="w-full h-full px-12 py-10 flex flex-col gap-10">
  <div class="w-full flex items-center gap-8 mb-4">
    <button
      type="button"
      class="text-2xl rounded-md transition-all hover:text-teal-600 cursor-pointer"
      onclick={() => goto("/dashboard/students")}
    >
      <FontAwesomeIcon icon={faChevronLeft} />
    </button>

    <p class="font-bold text-4xl">New Admission</p>
  </div>

  <!-- Error message -->
  {#if form?.success !== undefined && form?.success !== true}
    <div class="w-full bg-red-500 text-white p-4 rounded-md">
      <p>{form?.error}</p>
    </div>
  {/if}

  <article
    class="w-full flex-1 overflow-y-auto flex flex-col items-center gap-12"
  >
    {#if data.schema.fields.length > 0}
      <section class="flex flex-col gap-6 w-full">
        <p class="text-2xl font-semibold">Student's Personal Details</p>
        <hr class="border" />

        <div class="flex flex-col gap-2 w-full">
          <table class="w-full">
            <tbody class="w-full">
              {#each data.schema.fields as field}
                <tr class="w-full">
                  <td class="w-1/4 text-xl py-2 px-4"
                    >{field.name}
                    {#if field.required}<sup class="text-red-500">*</sup
                      >{/if}</td
                  >

                  <td class="w-3/4 py-2 px-4">
                    <InputMorpher
                      type={field.type}
                      bind:value={newStudentDetails[field.id]}
                      required={field.required}
                      options={field.options}
                      placeholder={"Enter " + field.name}
                    />
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </section>

      <section class="flex flex-col gap-6 w-full">
        <p class="text-2xl font-semibold">Enrollment Details</p>
        <hr class="border" />

        <div class="flex flex-col gap-2 w-full">
          <table class="w-full">
            <tbody class="w-full">
              <tr class="w-full">
                <td class="w-1/4 text-xl py-2 px-4">Classroom name</td>

                <td class="w-3/4 py-2 px-4">
                  <select
                    class="px-4 py-2 bg-transparent border-2 border-teal-400 rounded-md text-teal-400 w-1/2"
                    bind:value={selectedClassroomId}
                  >
                    <option value="" disabled selected>Select Classroom</option>

                    {#if data.classrooms}
                      {#each data.classrooms as classroom}
                        <option value={classroom._id}>{classroom.name}</option>
                      {/each}
                    {:else}
                      <option value="" disabled selected>
                        No classrooms available
                      </option>
                    {/if}
                  </select>
                </td>
              </tr>

              <tr class="w-full">
                <td class="w-1/4 text-xl py-2 px-4">Batch name</td>

                <td class="w-3/4 py-2 px-4">
                  <select
                    class="px-4 py-2 bg-transparent border-2 border-teal-400 rounded-md text-teal-400 w-1/2"
                    bind:value={selectedBatchId}
                  >
                    <option value="" disabled selected>Select Batch</option>

                    {#if availableBatches}
                      {#each availableBatches as batch}
                        <option value={batch.id}>{batch.name}</option>
                      {/each}
                    {:else}
                      <option value="" disabled selected>
                        No batches available
                      </option>
                    {/if}
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <form hidden method="POST" bind:this={admissionForm}>
        <input
          type="hidden"
          name="details"
          value={JSON.stringify(newStudentDetails)}
        />
        <input type="hidden" name="class_id" value={selectedClassroomId} />
        <input type="hidden" name="batch_id" value={selectedBatchId} />
      </form>

      <button
        type="button"
        class="w-1/4 py-2 px-4 bg-teal-400 text-white rounded-md hover:bg-teal-500 transition-all"
        onclick={handleSubmit}
      >
        Submit
      </button>
    {:else}
      <p class="text-center text-xl text-neutral-600">No fields set up</p>
    {/if}
  </article>
</div>
