<script lang="ts">
  import { fade, scale } from "svelte/transition";

  let {
    info,
    confirmText,
    infoType,
    form,
    className,
    children,
  }: {
    info: string;
    confirmText: string;
    infoType: "danger" | "info";
    form: HTMLFormElement;
    className: string;
    children: () => any;
  } = $props();

  let isDialogOpen = $state(false);
</script>

<button type="button" onclick={() => (isDialogOpen = true)} class={className}>
  {@render children()}
</button>

{#if isDialogOpen}
  <div
    class="absolute h-full w-full top-0 left-0 z-50 backdrop-blur-sm bg-black bg-opacity-70 flex items-center justify-center"
    transition:fade={{ duration: 200 }}
  >
    <div
      class={"max-w-xl bg-neutral-950 rounded-lg border-2 px-14 py-12 flex flex-col items-center justify-center gap-14 shadow-md " +
        (infoType === "danger"
          ? "border-red-500 shadow-red-300"
          : "border-teal-500 shadow-teal-300")}
      transition:scale={{ duration: 200 }}
    >
      <p
        class={"w-full text-center text-2xl font-semibold " +
          (infoType === "danger" ? "text-red-500" : "text-teal-500")}
      >
        {info}
      </p>

      <div class="w-full flex items-center justify-end gap-2">
        <button
          type="button"
          class={"px-4 py-2 bg-neutral-950 font-medium rounded-md transition-all border-2 " +
            (infoType === "danger"
              ? "border-red-500 text-red-500 hover:bg-red-500 hover:text-neutral-950"
              : "border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-neutral-950")}
          onclick={() => (isDialogOpen = false)}
        >
          Cancel
        </button>

        <button
          type="button"
          class={"px-4 py-2 font-medium rounded-md transition-all border-2 " +
            (infoType === "danger"
              ? "border-red-500 bg-red-500 text-neutral-950 hover:bg-red-400 hover:border-red-400"
              : "border-teal-500 bg-teal-500 text-neutral-950 hover:bg-teal-400 hover:border-teal-400")}
          onclick={() => form.requestSubmit()}
        >
          {confirmText}
        </button>
      </div>
    </div>
  </div>
{/if}
