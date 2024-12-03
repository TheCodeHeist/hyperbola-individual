<script lang="ts">
  import { goto } from "$app/navigation";
  import FieldSelector from "$lib/components/FieldSelector.svelte";
  import {
    EStudentDetailsFieldPropertiesType,
    type IStudentDetailsFieldProperties,
  } from "$lib/generic_schemas.js";
  import {
    faArrowLeft,
    faArrowRight,
    faChevronLeft,
    faPlus,
  } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
  import { dndzone } from "svelte-dnd-action";
  import { flip } from "svelte/animate";
  import { fly } from "svelte/transition";

  let { data } = $props();

  let previousFields: IStudentDetailsFieldProperties[] = data.data_fields
    ? data.data_fields.fields.map((item: any) => ({
        ...item,
        id: item._id.toString(),
      }))
    : [];

  let fields: IStudentDetailsFieldProperties[] = $state(previousFields);

  let isChanged = $derived(
    JSON.stringify(fields) !== JSON.stringify(previousFields)
  );

  const flipDurationMs = 300;

  const handleDndConsider = (e: any) => {
    fields = e.detail.items;
  };

  const handleDndFinalize = (e: any) => {
    fields = e.detail.items;
  };

  let savingForm: HTMLFormElement = $state(undefined as any);
</script>

<div class="w-full h-full px-12 py-10 flex flex-col gap-4">
  <div class="w-full flex items-center gap-8 mb-4">
    <button
      type="button"
      class="text-2xl rounded-md transition-all hover:text-teal-600 cursor-pointer"
      onclick={() => goto("/dashboard/students")}
    >
      <FontAwesomeIcon icon={faChevronLeft} />
    </button>

    <p class="font-bold text-4xl">Edit Students Fields</p>
  </div>

  <div
    class="flex justify-between items-center w-full min-h-10 px-4 font-semibold rounded-md bg-teal-700 gap-8"
  >
    <p class="w-1/4">Name</p>
    <p class="w-1/4">Field Type</p>
    <p class="w-1/4 flex justify-center items-center">Required</p>
    <p class="w-1/4 flex justify-center items-center">Actions</p>
    <p class="w-8"></p>
  </div>

  <section
    class="w-full flex flex-col gap-2 overflow-y-auto overflow-x-hidden flex-1"
    use:dndzone={{ items: fields, flipDurationMs, dropTargetStyle: {} }}
    onconsider={handleDndConsider}
    onfinalize={handleDndFinalize}
  >
    {#if fields.length === 0}
      <p class="text-center text-lg font-semibold text-neutral-500">
        No fields added yet
      </p>
    {:else}
      {#each fields as field, i (field.id)}
        <div animate:flip={{ duration: flipDurationMs }}>
          <FieldSelector
            bind:field={fields[i]}
            ondelete={(id: string) => {
              fields = fields.filter((field) => field.id !== id);
            }}
          />
        </div>
      {/each}
    {/if}
  </section>

  {#if isChanged}
    <div
      class="w-full flex items-center justify-between px-4 py-2 bg-neutral-800 rounded-md"
      transition:fly={{ y: 100 }}
    >
      <p class="text-red-500 font-semibold">You have unsaved changes</p>

      <div class="flex gap-4 items-center justify-center">
        <form bind:this={savingForm} hidden action="?/saveSchema" method="POST">
          <input
            type="hidden"
            name="data_fields"
            value={JSON.stringify(
              fields.map((field: any) => ({
                ...field,
                _id: field.id,
              }))
            )}
          />
        </form>

        <button
          type="button"
          class="px-4 py-2 bg-teal-600 rounded-md transition-all hover:bg-teal-500 cursor-pointer"
          onclick={() => savingForm.requestSubmit()}
        >
          Save
        </button>

        <button
          type="button"
          class="px-4 py-2 border border-red-500 text-red-500 bg-transparent rounded-md transition-all hover:bg-red-500 hover:text-white cursor-pointer"
          onclick={() => (fields = previousFields)}
        >
          Discard
        </button>
      </div>
    </div>
  {/if}

  <button
    type="button"
    class="w-14 h-14 bg-teal-600 rounded-full shadow-md shadow-black absolute top-10 right-10 text-2xl flex justify-center items-center transition-all hover:bg-teal-500"
    onclick={() => {
      fields = [
        ...fields,
        {
          name: "New Field",
          id: crypto.randomUUID(),
          type: EStudentDetailsFieldPropertiesType.TEXT,
          required: false,
        },
      ];
    }}
  >
    <FontAwesomeIcon icon={faPlus} />
  </button>
</div>
