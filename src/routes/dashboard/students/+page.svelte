<script lang="ts">
  import { goto } from "$app/navigation";
  import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";

  let { data } = $props();
</script>

<div class="w-full h-full px-12 py-10">
  <p class="font-bold text-4xl">Students</p>

  <div class="w-full flex justify-end items-center mt-8">
    <button
      type="button"
      class="px-4 py-2 bg-teal-600 rounded-md transition-all hover:bg-teal-500"
      onclick={() => goto("/dashboard/students/schema")}
    >
      Edit fields &nbsp; <FontAwesomeIcon icon={faArrowRight} />
    </button>
  </div>
</div>
