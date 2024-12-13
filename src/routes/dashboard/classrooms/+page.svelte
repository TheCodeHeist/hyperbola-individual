<script lang="ts">
  import { goto } from "$app/navigation";
  import {
    faArrowRight,
    faPlus,
    faTimes,
  } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
  import { fade, fly, slide } from "svelte/transition";

  let { data } = $props();

  let newClassroomDrawerOpen = $state(false);
</script>

<div class="w-full h-full px-12 py-10" transition:fade={{ duration: 200 }}>
  <p class="font-bold text-4xl mb-16">My Classrooms</p>

  <div class="grid grid-cols-3 gap-8">
    {#if data.classrooms.length === 0}
      <p class="text-lg text-neutral-500">No classrooms found</p>
    {:else}
      {#each data.classrooms as classroom}
        <button
          type="button"
          class="bg-neutral-900 py-8 px-4 flex flex-col items-center justify-center gap-4 rounded-lg transition-all hover:shadow-md hover:shadow-teal-300 border-2 border-teal-400 cursor-pointer relative"
          onclick={() => goto(`/dashboard/classrooms/${classroom._id}`)}
        >
          <p class="font-bold text-2xl text-teal-400">{classroom.name}</p>
          <p class="text-white">{classroom.description}</p>

          <div
            class="flex flex-col items-center justify-center text-center text-neutral-500"
          >
            <p>Number of Batches: {classroom.batches.length}</p>
          </div>

          <div class="absolute bottom-2 right-4">
            <FontAwesomeIcon icon={faArrowRight} />
          </div>
        </button>
      {/each}
    {/if}
  </div>

  <button
    type="button"
    class="w-14 h-14 bg-teal-600 rounded-full shadow-md shadow-black absolute top-10 right-10 text-2xl flex justify-center items-center transition-all hover:bg-teal-500"
    onclick={() => (newClassroomDrawerOpen = true)}
  >
    <FontAwesomeIcon icon={faPlus} />
  </button>
</div>

{#if newClassroomDrawerOpen}
  <div
    class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-end"
    transition:fade={{ duration: 100 }}
  >
    <div
      class="bg-neutral-900 bg-opacity-80 border border-neutral-950 backdrop-blur-sm w-1/4 h-full rounded-md p-8 flex flex-col gap-8"
      transition:fly={{ x: 100, duration: 100 }}
    >
      <div class="flex items-center justify-between">
        <p class="font-bold text-2xl">Create a new classroom</p>

        <button
          type="button"
          class="text-white transition-all text-2xl hover:text-teal-600 rounded-md"
          onclick={() => (newClassroomDrawerOpen = false)}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>

      <form
        class="flex flex-col gap-4"
        method="POST"
        action="?/createClassroom"
      >
        <input
          type="text"
          class="w-full border-2 border-teal-400 bg-transparent rounded-md p-2"
          name="classroomName"
          required
          placeholder="Classroom Name"
        />
        <textarea
          class="w-full border-2 border-teal-400 bg-transparent rounded-md p-2"
          name="classroomDescription"
          required
          placeholder="Classroom Description"
        ></textarea>

        <button
          type="submit"
          class="w-full bg-teal-600 text-white rounded-md p-2"
        >
          Create
        </button>
      </form>
    </div>
  </div>
{/if}
