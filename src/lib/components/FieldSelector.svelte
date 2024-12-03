<script lang="ts">
  import { EStudentDetailsFieldPropertiesType } from "$lib/generic_schemas";
  import {
    faAngleDown,
    faAngleUp,
    faArrowDown,
    faCaretDown,
    faCheck,
    faGrip,
    faGripLinesVertical,
    faGripVertical,
    faPlus,
    faTrash,
    faTrashAlt,
  } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
  import { fade, slide } from "svelte/transition";

  let { field = $bindable(), ondelete } = $props();

  let moreInfoDrawerOpen = $state(false);
  let newOption = $state("");
</script>

<div class="rounded-md overflow-hidden">
  <div
    class="w-full h-14 px-4 bg-neutral-900 flex items-center justify-between gap-8"
  >
    <div class="w-1/4 flex items-center">
      <input
        class="bg-transparent border-none text-white text-lg font-semibold"
        type="text"
        bind:value={field.name}
      />
    </div>

    <select
      class="py-2 px-4 bg-transparent border border-teal-500 rounded-md text-teal-500 w-1/4"
      name="field"
      id="field"
      bind:value={field.type}
    >
      <option value="text">Text</option>
      <option value="numeric">Numeric</option>
      <option value="yes_no">Yes/No</option>
      <option value="date">Date</option>
      <option value="email">Email</option>
      <option value="phone_number">Phone Number</option>
      <option value="url">URL</option>
      <option value="dropdown">Dropdown</option>
      <option value="multi_select">Multi-Select</option>
      <option value="checkbox">Checkbox</option>
      <option value="radio">Radio</option>
      <option value="file">File</option>
      <option value="image">Image</option>
    </select>

    <div class="w-1/4 flex justify-center items-center">
      <div>
        <button
          type="button"
          class={"w-5 h-5 rounded-md border-2 border-teal-400 transition-all flex justify-center items-center " +
            (field.required ? "bg-teal-400" : "bg-transparent")}
          onclick={() => (field.required = !field.required)}
        >
          {#if field.required}
            <FontAwesomeIcon icon={faCheck} />
          {/if}
        </button>
      </div>

      <input type="checkbox" bind:checked={field.required} hidden />
    </div>

    <div class="w-1/4 flex justify-center items-center gap-4">
      <button
        type="button"
        class="text-red-600 rounded-md transition-all hover:text-red-500"
        onclick={() => ondelete(field.id)}
      >
        <FontAwesomeIcon icon={faTrashAlt} />
      </button>

      {#if field.type === EStudentDetailsFieldPropertiesType.DROPDOWN}
        <button
          type="button"
          class="text-teal-600 rounded-md transition-all hover:text-teal-500"
          onclick={() => (moreInfoDrawerOpen = !moreInfoDrawerOpen)}
        >
          {#if moreInfoDrawerOpen}
            <FontAwesomeIcon icon={faAngleUp} />
          {:else}
            <FontAwesomeIcon icon={faAngleDown} />
          {/if}
        </button>
      {/if}
    </div>
    <FontAwesomeIcon class="text-neutral-700 w-8" icon={faGripLinesVertical} />
  </div>

  {#if moreInfoDrawerOpen && field.type === EStudentDetailsFieldPropertiesType.DROPDOWN}
    <div class="" transition:slide={{ duration: 300 }}>
      <div class="w-full px-4 py-2 bg-teal-900 flex flex-col gap-4">
        <p class="font-medium">Options</p>

        <div class="w-full flex flex-col">
          {#each field.options as option, i}
            <div
              class="w-full flex items-center justify-between bg-transparent transition-all px-4 py-2 hover:bg-teal-600"
            >
              <input
                class="w-1/2 bg-transparent border-none text-white"
                type="text"
                bind:value={field.options[i]}
              />

              <button
                type="button"
                class="text-red-600 rounded-md transition-all hover:text-red-500"
                onclick={() => field.options.splice(i, 1)}
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            </div>
          {/each}

          <div
            class="w-full flex items-center justify-between bg-transparent transition-all px-4 py-2"
          >
            <input
              class="w-1/2 bg-transparent border-none text-white"
              type="text"
              placeholder="New Option"
              bind:value={newOption}
            />

            <button
              type="button"
              class="text-teal-600 rounded-md transition-all hover:text-teal-300"
              onclick={() => {
                if (newOption === "") return;

                if (field.options) {
                  field.options.push(newOption);
                } else {
                  field.options = [newOption];
                }
                newOption = "";
              }}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>
