<script lang="ts">
  import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
  import { enhance } from "$app/forms";
  import type { ActionData } from "./$types";
  import { icon } from "@fortawesome/fontawesome-svg-core";
  import { error, redirect } from "@sveltejs/kit";
  import SvelteOtp from "@k4ung/svelte-otp";

  let { form }: { form: ActionData } = $props();

  let showPassword = $state(false);

  let email = $state("");
  let password = $state("");

  let otp = $state("");

  let otpFormElement: HTMLFormElement = $state() as HTMLFormElement;
</script>

<main
  class="w-full h-screen flex flex-col items-center justify-center"
>
  {#if form?.success && form?.twoFactorRequired}
    <div
      class="absolute top-0 left-0 w-screen h-screen bg-[#000000A0] backdrop-blur-sm flex justify-center items-center z-50"
    >
      <div
        class="bg-black border-2 border-teal-300 rounded-lg shadow-lg shadow-emerald-300 flex flex-col items-center px-8 py-10 gap-10 w-3/12"
      >
        <p class="text-white font-semibold text-2xl text-center">
          Enter the 6-digit code from the Google Authenticator app
        </p>

        <SvelteOtp
          numOfInputs={6}
          bind:value={otp}
          separator=" "
          onlyShowMiddleSeparator
          numberOnly
          inputStyle="width: 2.5rem; height: 2.5rem; border: 2px solid #4FD1C5; border-radius: 0.5rem; text-align: center; font-size: 1.2rem; font-weight: 500; color: #4FD1C5; background-color: #000000;"
        />

        <button
          type="button"
          class="w-full bg-teal-500 text-white font-medium rounded-md p-2 transition-all cursor-pointer hover:bg-teal-400"
          onclick={() => otpFormElement.requestSubmit()}
        >
          Verify OTP
        </button>

        <form
          method="POST"
          action="?/verifyOtp"
          bind:this={otpFormElement}
          class="hidden"
        >
          <input type="text" name="otp" value={otp} />
          <input type="email" name="email" value={form?.email} />
        </form>
      </div>
    </div>
  {/if}

  <div
    class="bg-black border-2 border-teal-300 rounded-lg shadow-lg shadow-emerald-300 flex flex-col items-center px-8 py-10 gap-10 w-3/12"
  >
    <p class="text-white font-semibold text-2xl text-center">
      Welcome back! Let&apos;s log in...
    </p>

    {#if form?.success === false}
      <div
        class="w-full bg-red-500 text-white font-medium rounded-md py-2 px-4 text-center flex items-center justify-between gap-2"
      >
        {#if form?.error}
          {form.error}
        {/if}

        {#if form?.invalid}
          <p class="text-white font-medium">
            Invalid credentials. Please try again.
          </p>
        {/if}

        {#if form?.missing}
          <p class="text-white font-medium">
            Missing credentials. Please try again.
          </p>
        {/if}

        <button
          type="button"
          class="text-white font-medium rounded-md p-2 transition-all cursor-pointer hover:bg-red-400"
          onclick={() => redirect(302, "/login")}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
    {/if}

    <form
      class="flex flex-col items-center justify-center gap-6 w-full"
      method="POST"
      action="?/login"
      use:enhance
    >
      <div class="w-full flex flex-col items-start justify-center">
        <label for="email" class="text-teal-400 font-medium"
          >Email Address</label
        >

        <input
          type="email"
          name="email"
          id="email"
          class="py-1 px-2 rounded-md border-2 border-teal-400 bg-transparent text-white w-full"
          bind:value={email}
          required
        />
      </div>

      <div class="w-full flex flex-col items-start justify-center">
        <label for="password" class="text-teal-400 font-medium">Password</label>

        <input
          type={showPassword ? "text" : "password"}
          name="password"
          id="password"
          class="py-1 px-2 rounded-md border-2 border-teal-400 bg-transparent text-white w-full"
          bind:value={password}
          required
        />
      </div>

      <div class="w-full flex items-center justify-start gap-2">
        <button
          type="button"
          class={"w-5 h-5 rounded-md border-2 border-teal-400 transition-all flex justify-center items-center " +
            (showPassword ? "bg-teal-400" : "bg-transparent")}
          onclick={() => (showPassword = !showPassword)}
        >
          {#if showPassword}
            <FontAwesomeIcon icon={faCheck} />
          {/if}
        </button>

        <input
          type="checkbox"
          id="showPassword"
          bind:checked={showPassword}
          class="hidden"
        />

        <label for="showPassword" class="text-teal-400 font-medium">
          Show Password
        </label>
      </div>

      <button
        type="submit"
        class={"w-full bg-teal-500 text-white font-medium rounded-md p-2 transition-all " +
          (password.length > 0 && email.length > 0
            ? "cursor-pointer hover:bg-teal-400"
            : "grayscale cursor-not-allowed")}
        disabled={password.length === 0 || email.length === 0}
      >
        Login!
      </button>
    </form>
  </div>
</main>

<style>
  .remove-arrow::-webkit-inner-spin-button,
  .remove-arrow::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .remove-arrow {
    -moz-appearance: textfield;
  }
</style>
