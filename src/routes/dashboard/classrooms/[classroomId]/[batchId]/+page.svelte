<script lang="ts">
  import { goto } from "$app/navigation";
  import ConfirmationBlockedSubmit from "$lib/components/ConfirmationBlockedSubmit.svelte";
  import {
    faArrowRight,
    faChevronLeft,
    faEdit,
    faPlus,
    faTimes,
    faTrashCan,
  } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
  import { fade, fly, slide } from "svelte/transition";

  let { data } = $props();

  let editBatchDrawerOpen = $state(false);

  let deleteForm: HTMLFormElement = $state("" as any);
</script>

<div
  class="w-full h-full px-12 py-10 flex flex-col gap-14"
  transition:fade={{ duration: 200 }}
>
  <div class="flex items-center justify-between">
    <div class="w-full flex items-center gap-8">
      <button
        type="button"
        class="text-2xl rounded-md transition-all hover:text-teal-600 cursor-pointer"
        onclick={() => goto("/dashboard/classrooms/" + data.classroomId)}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>

      <p class="font-bold text-4xl">{data.batchData?.name}</p>
    </div>

    <form
      method="POST"
      action="?/deleteBatch"
      class="hidden"
      bind:this={deleteForm}
    ></form>

    <ConfirmationBlockedSubmit
      info="Delete this batch? This action is irreversible."
      confirmText="Delete"
      infoType="danger"
      form={deleteForm}
      className="text-3xl text-red-500 rounded-md transition-all hover:text-red-400 cursor-pointer"
    >
      <FontAwesomeIcon icon={faTrashCan} />
    </ConfirmationBlockedSubmit>
  </div>

  <article class="flex flex-col gap-12">
    <section class="flex flex-col gap-6">
      <p class="font-semibold text-2xl">Batch Information</p>
      <hr class="border border-neutral-900" />

      <div
        class="relative flex flex-col gap-4 bg-zinc-900 border-2 border-teal-500 px-4 py-2 rounded-md"
      >
        <button
          type="button"
          class="absolute top-2 right-4 text-xl text-teal-500 transition-all hover:text-teal-300"
          onclick={() => (editBatchDrawerOpen = true)}
        >
          <FontAwesomeIcon icon={faEdit} />
        </button>

        <div>
          <p class="font-semibold text-lg text-teal-500">Batch Name</p>
          <p class="text-lg">{data.batchData?.name}</p>
        </div>

        <div>
          <p class="font-semibold text-lg text-teal-500">Batch Description</p>

          <p class="text-lg">{data.batchData?.description}</p>
        </div>
      </div>
    </section>

    <!-- <section class="flex flex-col gap-4">
      <div class="flex items-center justify-between">
        <p class="font-semibold text-2xl">
          Students ({data.batchData?.students.length})
        </p>

        <button
          type="button"
          class="text-2xl flex justify-center items-center transition-all hover:text-teal-400"
          onclick={() => (newBatchDrawerOpen = true)}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      <hr class="border border-neutral-900" />

      <div class="grid grid-cols-3 gap-8">
        {#if data.batchData?.students.length === 0 || !data.batchData?.students}
          <p class="text-lg text-neutral-500">No students found</p>
        {:else}
          {#each data.batchData?.students as student}
            <button
              type="button"
              class="bg-neutral-900 py-8 px-4 flex flex-col items-center justify-center gap-4 rounded-lg transition-all hover:shadow-md hover:shadow-teal-300 border-2 border-teal-400 cursor-pointer relative"
              onclick={() =>
                goto(`/dashboard/classrooms/${data.classroomId}/${batch.id}`)}
            >
              <p class="font-bold text-2xl text-teal-400">{batch.name}</p>
              <p class="text-white">{batch.description}</p>

              <div
                class="flex flex-col items-center justify-center text-center text-neutral-500"
              >
                <p>Number of Students: {batch.students.length}</p>
              </div>

              <div class="absolute bottom-2 right-4">
                <FontAwesomeIcon icon={faArrowRight} />
              </div>
            </button>
          {/each}
        {/if}
      </div>
    </section> -->
  </article>
</div>

{#if editBatchDrawerOpen}
  <div
    class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-end"
    transition:fade={{ duration: 100 }}
  >
    <div
      class="bg-neutral-900 bg-opacity-80 border border-neutral-950 backdrop-blur-sm w-1/4 h-full rounded-md p-8 flex flex-col gap-8"
      transition:fly={{ x: 100, duration: 100 }}
    >
      <div class="flex items-center justify-between">
        <p class="font-bold text-2xl">Edit batch information</p>

        <button
          type="button"
          class="text-white transition-all text-2xl hover:text-teal-600 rounded-md"
          onclick={() => (editBatchDrawerOpen = false)}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>

      <form class="flex flex-col gap-4" method="POST" action="?/editBatchInfo">
        <input
          type="text"
          class="w-full border-2 border-teal-400 bg-transparent rounded-md p-2"
          name="batchName"
          required
          placeholder="Batch Name"
          value={data.batchData?.name}
        />
        <textarea
          class="w-full border-2 border-teal-400 bg-transparent rounded-md p-2"
          name="batchDescription"
          required
          placeholder="Batch Description"
          >{data.batchData?.description}</textarea
        >

        <button
          type="submit"
          class="w-full bg-teal-600 text-white rounded-md p-2"
        >
          Update
        </button>
      </form>
    </div>
  </div>
{/if}
