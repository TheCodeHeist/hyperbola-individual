<script lang="ts">
  import { goto } from "$app/navigation";
  import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
  import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
</script>

<main
  class="w-full h-screen bg-slate-950 flex flex-col items-center justify-center gap-8"
>
  <img
    src="/logo.png"
    alt="logo"
    class="w-32 rounded-lg border-2 shadow-md shadow-emerald-300"
  />

  <p class="font-bold text-white text-5xl">
    Welcome to <span class="text-teal-500">Hyperbola</span>
  </p>

  <p class="font-semibold text-white text-xl text-center">
    Your ultimate free and open-source student management solution.
  </p>

  <button
    type="button"
    class="px-4 py-2 font-medium text-teal-400 rounded-lg hover:bg-teal-400 hover:text-slate-950 transition-colors duration-300 ease-in-out"
    onclick={() => goto("/get-started/register")}
  >
    Get Started

    <FontAwesomeIcon icon={faArrowRight} class="ml-2" />
  </button>
</main>
