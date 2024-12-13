<script lang="ts">
  import { EStudentDetailsFieldPropertiesType } from "$lib/generic_schemas";
  import { faCheck } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";

  let {
    type,
    value = $bindable(),
    required = false,
    options = [],
    placeholder = "",
  }: {
    type: EStudentDetailsFieldPropertiesType;
    value: any;
    required?: boolean;
    options?: string[];
    placeholder?: string;
  } = $props();
</script>

{#if type === "short_text"}
  <input
    type="text"
    class="px-4 py-2 bg-transparent border-2 border-teal-400 rounded-md text-teal-400 w-1/2"
    bind:value
    {placeholder}
    {required}
  />
{:else if type === "long_text"}
  <textarea
    class="px-4 py-2 bg-transparent border-2 border-teal-400 rounded-md text-teal-400 w-1/2"
    bind:value
    {placeholder}
    {required}
  ></textarea>
{:else if type === "numeric"}
  <input
    type="number"
    class="px-4 py-2 bg-transparent border-2 border-teal-400 rounded-md text-teal-400 w-1/2"
    bind:value
    {placeholder}
    {required}
  />
{:else if type === "boolean"}
  <input
    type="checkbox"
    hidden
    bind:checked={value}
    {required}
  />
  <button
    type="button"
    class={"w-5 h-5 rounded-md border-2 border-teal-400 transition-all flex justify-center items-center " +
      (value ? "bg-teal-400" : "bg-transparent")}
    onclick={() => (value = !value)}
  >
    {#if value}
      <FontAwesomeIcon icon={faCheck} />
    {/if}
  </button>
{:else if type === "date"}
  <input
    type="date"
    class="px-4 py-2 bg-transparent border-2 border-teal-400 rounded-md text-teal-400 w-1/2"
    bind:value
    {required}
  />
{:else if type === "email"}
  <input
    type="email"
    class="px-4 py-2 bg-transparent border-2 border-teal-400 rounded-md text-teal-400 w-1/2"
    bind:value
    {placeholder}
    {required}
  />
{:else if type === "phone_number"}
  <input
    type="tel"
    class="px-4 py-2 bg-transparent border-2 border-teal-400 rounded-md text-teal-400 w-1/2"
    bind:value
    {placeholder}
    {required}
  />
{:else if type === "dropdown"}
  <select
    class="px-4 py-2 bg-transparent border-2 border-teal-400 rounded-md text-teal-400 w-1/2"
    bind:value
    {required}
  >
    <option value="" disabled selected>Select an option</option>
    {#each options as option}
      <option value={option}>{option}</option>
    {/each}
  </select>
{/if}
