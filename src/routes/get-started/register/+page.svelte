<script lang="ts">
  import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
  import { enhance } from "$app/forms";
  import type { ActionData } from "./$types";
  import { icon } from "@fortawesome/fontawesome-svg-core";
  import { redirect } from "@sveltejs/kit";

  let { form }: { form: ActionData } = $props();

  let showPasswords = $state(false);

  let password = $state("");
  let confirmPassword = $state("");

  let len_check = (value: string) => value.length >= 8;
  let lower_check = (value: string) => /[a-z]/.test(value);
  let upper_check = (value: string) => /[A-Z]/.test(value);
  let number_check = (value: string) => /\d/.test(value);
  let special_check = (value: string) =>
    /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value);
  let match_check = (value: string) => value === confirmPassword;

  let meets_requirements = (value: string) =>
    len_check(value) &&
    lower_check(value) &&
    upper_check(value) &&
    number_check(value) &&
    special_check(value) &&
    match_check(value);
</script>

<main
  class="w-full h-screen bg-slate-950 flex flex-col items-center justify-center"
>
  <div
    class="bg-black border-2 border-teal-300 rounded-lg shadow-lg shadow-emerald-300 flex flex-col items-center px-8 py-10 gap-10 w-3/12"
  >
    <p class="text-white font-semibold text-2xl text-center">
      Let&apos;s get started, shall we?
    </p>

    <form
      class="flex flex-col items-center justify-center gap-6"
      method="POST"
      use:enhance
    >
      <div class="w-full flex gap-4">
        <div class="flex flex-col items-start justify-center w-1/2">
          <label for="firstName" class="text-teal-400 font-medium">
            First Name
          </label>

          <input
            type="text"
            name="firstName"
            id="firstName"
            class="py-1 px-2 rounded-md border-2 border-teal-400 bg-transparent text-white w-full"
            required
          />
        </div>

        <div class="flex flex-col items-start justify-center w-1/2">
          <label for="lastName" class="text-teal-400 font-medium">
            Last Name
          </label>

          <input
            type="text"
            name="lastName"
            id="lastName"
            class="py-1 px-2 rounded-md border-2 border-teal-400 bg-transparent text-white w-full"
            required
          />
        </div>
      </div>

      <div class="w-full flex flex-col items-start justify-center">
        <label for="email" class="text-teal-400 font-medium"
          >Email Address</label
        >

        <input
          type="email"
          name="email"
          id="email"
          class="py-1 px-2 rounded-md border-2 border-teal-400 bg-transparent text-white w-full"
          required
        />
      </div>

      <div class="w-full flex flex-col items-start justify-center">
        <label for="password" class="text-teal-400 font-medium">Password</label>

        <input
          type={showPasswords ? "text" : "password"}
          name="password"
          id="password"
          class="py-1 px-2 rounded-md border-2 border-teal-400 bg-transparent text-white w-full"
          bind:value={password}
          required
        />
      </div>

      <div class="w-full flex flex-col items-start justify-center">
        <label for="confirmPassword" class="text-teal-400 font-medium">
          Confirm Password
        </label>

        <input
          type={showPasswords ? "text" : "password"}
          name="confirmPassword"
          id="confirmPassword"
          class="py-1 px-2 rounded-md border-2 border-teal-400 bg-transparent text-white w-full"
          bind:value={confirmPassword}
          required
        />
      </div>

      <div class="w-full flex items-center justify-start gap-2">
        <button
          type="button"
          class={"w-5 h-5 rounded-md border-2 border-teal-400 transition-all flex justify-center items-center " +
            (showPasswords ? "bg-teal-400" : "bg-transparent")}
          onclick={() => (showPasswords = !showPasswords)}
        >
          {#if showPasswords}
            <FontAwesomeIcon icon={faCheck} />
          {/if}
        </button>

        <input
          type="checkbox"
          id="showPasswords"
          bind:checked={showPasswords}
          class="hidden"
        />

        <label for="showPasswords" class="text-teal-400 font-medium">
          Show Passwords
        </label>
      </div>

      <div class="w-full bg-orange-200 py-2 px-4 rounded-md">
        <p class="font-medium">Password must:</p>
        <div class="flex items-center gap-2">
          <div class="w-4 h-full flex justify-center items-center">
            {#if len_check(password)}
              <FontAwesomeIcon icon={faCheck} class="text-green-500" />
            {:else}
              <FontAwesomeIcon icon={faTimes} class="text-red-500" />
            {/if}
          </div>

          <p>have at least 8 characters</p>
        </div>

        <div class="flex items-center gap-2">
          <div class="w-4 h-full flex justify-center items-center">
            {#if lower_check(password)}
              <FontAwesomeIcon icon={faCheck} class="text-green-500" />
            {:else}
              <FontAwesomeIcon icon={faTimes} class="text-red-500" />
            {/if}
          </div>

          <p>contain at least one small letter</p>
        </div>

        <div class="flex items-center gap-2">
          <div class="w-4 h-full flex justify-center items-center">
            {#if upper_check(password)}
              <FontAwesomeIcon icon={faCheck} class="text-green-500" />
            {:else}
              <FontAwesomeIcon icon={faTimes} class="text-red-500" />
            {/if}
          </div>

          <p>contain at least one capital letter</p>
        </div>

        <div class="flex items-center gap-2">
          <div class="w-4 h-full flex justify-center items-center">
            {#if number_check(password)}
              <FontAwesomeIcon icon={faCheck} class="text-green-500" />
            {:else}
              <FontAwesomeIcon icon={faTimes} class="text-red-500" />
            {/if}
          </div>

          <p>contain at least one number</p>
        </div>

        <div class="flex items-center gap-2">
          <div class="w-4 h-full flex justify-center items-center">
            {#if special_check(password)}
              <FontAwesomeIcon icon={faCheck} class="text-green-500" />
            {:else}
              <FontAwesomeIcon icon={faTimes} class="text-red-500" />
            {/if}
          </div>

          <p>contain at least one special character</p>
        </div>

        <div class="flex items-center gap-2">
          <div class="w-4 h-full flex justify-center items-center">
            {#if match_check(password)}
              <FontAwesomeIcon icon={faCheck} class="text-green-500" />
            {:else}
              <FontAwesomeIcon icon={faTimes} class="text-red-500" />
            {/if}
          </div>

          <p>match the confirmation password</p>
        </div>
      </div>

      <button
        type="submit"
        class={"w-full bg-teal-500 text-white font-medium rounded-md p-2 transition-all " +
          (meets_requirements(password)
            ? "cursor-pointer hover:bg-teal-400"
            : "grayscale cursor-not-allowed")}
        disabled={!meets_requirements(password)}
      >
        Register!
      </button>
    </form>
  </div>
</main>
