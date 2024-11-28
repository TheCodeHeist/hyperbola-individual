<script lang="ts">
  import { goto } from "$app/navigation";
  import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
  import type { ActionData } from "./$types";

  let { form }: { form: ActionData } = $props();
</script>

<main
  class="w-full h-screen bg-slate-950 flex flex-col items-center justify-center gap-8"
>
  {#if form?.success}
    <div
      class="absolute top-0 left-0 w-screen h-screen bg-[#000000A0] backdrop-blur-sm flex justify-center items-center z-50"
    >
      <div
        class="bg-black border-2 border-teal-300 rounded-lg shadow-lg shadow-emerald-300 flex flex-col items-center px-8 py-10 gap-10 w-3/12"
      >
        <img
          src={form?.qrcodeDataURI}
          alt="The QR Code for enrolling TOTP"
          class="w-full object-cover"
        />

        <p class="text-white text-xl text-center">
          Scan this above QR Code using the <span class="font-bold"
            >Google Authenticator</span
          >
          app, then click “<span class="font-bold">Proceed</span>”.
        </p>

        <button
          type="button"
          class="px-4 py-2 font-medium text-teal-400 rounded-lg hover:bg-teal-400 hover:text-slate-950 transition-colors duration-300 ease-in-out"
          onclick={() => goto("/dashboard")}
        >
          Proceed

          <FontAwesomeIcon icon={faArrowRight} class="ml-2" />
        </button>
      </div>
    </div>
  {/if}

  <p class="font-semibold text-teal-500 text-4xl">
    Don&apos;t let your guard down!
  </p>

  <p class="font-semibold text-white text-xl text-center">
    Let&apos;s setup 2-factor authentication!
  </p>

  <div class="w-full flex justify-center items-start gap-10">
    <div class="w-2/12 flex flex-col gap-2 justify-center items-center">
      <img
        src="/images/app_store.png"
        alt="App store screen, showing an install button to install Google authenticator."
        class="w-full"
      />

      <p class="text-white text-center w-full text-sm">
        Go to Google Play Store or App Store, and search “<span
          class="font-bold">Google Authenticator</span
        >”. Then, install the app.
      </p>
    </div>

    <div class="w-2/12 flex flex-col gap-2 justify-center items-center">
      <img
        src="/images/auth_app.png"
        alt="Google Authenticator App screen, showing an option to scan a QR Code."
        class="w-full"
      />

      <p class="text-white text-center w-full text-sm">
        Open <span class="font-bold">Google Authenticator</span>, then click on
        the <span class="font-bold">plus icon</span> to add a new TOTP
        generator, and then click on “<span class="font-bold"
          >Scan a QR Code</span
        >”.
      </p>
    </div>

    <div class="w-2/12 flex flex-col gap-2 justify-center items-center">
      <img
        src="/images/scanning.png"
        alt="Google Authenticator App screen on camera scanning page, scanning a QR Code."
        class="w-full"
      />

      <p class="text-white text-center w-full text-sm">
        Aim the camera over the generated QR Code to scan, and it should
        automatically add this app.<br /><br />Click the “<span
          class="font-bold">Proceed</span
        >” button below to <span class="font-bold">generate the QR Code</span>.
      </p>
    </div>
  </div>

  <form method="post">
    <button
      type="submit"
      class="px-4 py-2 font-medium text-teal-400 rounded-lg hover:bg-teal-400 hover:text-slate-950 transition-colors duration-300 ease-in-out"
    >
      Proceed

      <FontAwesomeIcon icon={faArrowRight} class="ml-2" />
    </button>
  </form>

  <button
    type="button"
    class="px-4 py-2 text-teal-500 hover:underline"
    onclick={() => goto("/dashboard")}
  >
    Skip for now
  </button>
</main>
