<script lang="ts">
  import {
    faAsterisk,
    faAt,
    faCheck,
    faTimes,
  } from "@fortawesome/free-solid-svg-icons";
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

<main class="w-full h-screen flex flex-col items-center justify-center">
  <div
    class="card variant-ringed-primary shadow-lg shadow-primary-500 flex flex-col px-8 py-10 gap-10 w-3/12"
  >
    <p class="text-white font-semibold text-2xl text-center w-full">
      Let&apos;s get started, shall we?
    </p>

    <form
      class="flex flex-col items-center justify-center gap-6"
      method="POST"
      use:enhance
    >
      <div class="w-full flex gap-4">
        <label class="text-primary-500 w-1/2">
          <span>First Name</span>

          <input
            type="text"
            name="firstName"
            class="input"
            placeholder="John"
            required
          />
        </label>

        <label class="text-primary-500 w-1/2">
          <span>Last Name</span>

          <input
            type="text"
            name="lastName"
            class="input"
            placeholder="Doe"
            required
          />
        </label>
      </div>

      <label class="text-primary-500 w-full">
        <span>Email Address</span>

        <div class="input-group input-group-divider grid-cols-[auto_1fr]">
          <div class="input-group-shim">
            <FontAwesomeIcon icon={faAt} />
          </div>

          <input
            type="email"
            name="email"
            placeholder="someone123@someplace.somedomain"
            required
          />
        </div>
      </label>

      <label class="text-primary-500 w-full">
        <span>Password</span>

        <div class="input-group input-group-divider grid-cols-[auto_1fr]">
          <div class="input-group-shim">
            <FontAwesomeIcon icon={faAsterisk} />
          </div>

          <input
            type={showPasswords ? "text" : "password"}
            name="password"
            placeholder="********"
            bind:value={password}
            required
          />
        </div>
      </label>

      <label class="text-primary-500 w-full">
        <span>Confirm Password</span>

        <div class="input-group input-group-divider grid-cols-[auto_1fr]">
          <div class="input-group-shim">
            <FontAwesomeIcon icon={faAsterisk} />
          </div>

          <input
            type={showPasswords ? "text" : "password"}
            name="confirmPassword"
            placeholder="********"
            bind:value={confirmPassword}
            required
          />
        </div>
      </label>

      <label class="w-full flex items-center space-x-2">
        <input class="checkbox" type="checkbox" bind:checked={showPasswords} />
        <p>Show Passwords</p>
      </label>

      <div class="card variant-soft-tertiary p-4 w-full">
        <p class="font-medium">Password must:</p>
        <div class="flex items-center gap-2">
          <div class="w-4 h-full flex justify-center items-center">
            {#if len_check(password)}
              <FontAwesomeIcon icon={faCheck} class="text-success-400" />
            {:else}
              <FontAwesomeIcon icon={faTimes} class="text-error-400" />
            {/if}
          </div>

          <p>have at least 8 characters</p>
        </div>

        <div class="flex items-center gap-2">
          <div class="w-4 h-full flex justify-center items-center">
            {#if lower_check(password)}
              <FontAwesomeIcon icon={faCheck} class="text-success-400" />
            {:else}
              <FontAwesomeIcon icon={faTimes} class="text-error-400" />
            {/if}
          </div>

          <p>contain at least one small letter</p>
        </div>

        <div class="flex items-center gap-2">
          <div class="w-4 h-full flex justify-center items-center">
            {#if upper_check(password)}
              <FontAwesomeIcon icon={faCheck} class="text-success-400" />
            {:else}
              <FontAwesomeIcon icon={faTimes} class="text-error-400" />
            {/if}
          </div>

          <p>contain at least one capital letter</p>
        </div>

        <div class="flex items-center gap-2">
          <div class="w-4 h-full flex justify-center items-center">
            {#if number_check(password)}
              <FontAwesomeIcon icon={faCheck} class="text-success-400" />
            {:else}
              <FontAwesomeIcon icon={faTimes} class="text-error-400" />
            {/if}
          </div>

          <p>contain at least one number</p>
        </div>

        <div class="flex items-center gap-2">
          <div class="w-4 h-full flex justify-center items-center">
            {#if special_check(password)}
              <FontAwesomeIcon icon={faCheck} class="text-success-400" />
            {:else}
              <FontAwesomeIcon icon={faTimes} class="text-error-400" />
            {/if}
          </div>

          <p>contain at least one special character</p>
        </div>

        <div class="flex items-center gap-2">
          <div class="w-4 h-full flex justify-center items-center">
            {#if match_check(password)}
              <FontAwesomeIcon icon={faCheck} class="text-success-400" />
            {:else}
              <FontAwesomeIcon icon={faTimes} class="text-error-400" />
            {/if}
          </div>

          <p>match the confirmation password</p>
        </div>
      </div>

      <button
        type="submit"
        class={"btn variant-filled-primary " +
          (meets_requirements(password)
            ? "cursor-pointer"
            : "grayscale cursor-not-allowed")}
        disabled={!meets_requirements(password)}
      >
        Register!
      </button>
    </form>
  </div>
</main>
