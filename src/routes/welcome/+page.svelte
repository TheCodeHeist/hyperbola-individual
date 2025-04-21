<script lang="ts">
  import { goto } from "$app/navigation";
  import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
  import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
</script>

<main class="w-full h-screen flex flex-col items-center justify-center gap-8">
  <img
    src="/logo.png"
    alt="logo"
    class="w-32 rounded-lg border-2 shadow-md shadow-emerald-300"
  />

  <h1 class="h1 font-bold">
    Welcome to <span class="text-primary-500">Hyperbola</span>
  </h1>

  <p class="font-semibold">
    Your ultimate free and open-source student management solution.
  </p>

  <button
    type="button"
    class="btn variant-filled-primary"
    onclick={() => goto("/get-started/register")}
  >
    Get Started

    <FontAwesomeIcon icon={faArrowRight} class="ml-2" />
  </button>
</main>
