<script>
  import { enhance } from "$app/forms";
  import { goto } from "$app/navigation";
  import {
    faAngleDown,
    faCog,
    faGraduationCap,
    faPowerOff,
    faSchool,
    faTachometerAlt,
    faUsers,
  } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";

  let { data, children } = $props();

  const menus = [
    {
      name: "Dashboard",
      icon: faTachometerAlt,
      href: "/dashboard/main",
    },
    {
      name: "Students",
      icon: faUsers,
      href: "/dashboard/students",
    },
    {
      name: "Classrooms",
      icon: faSchool,
      href: "/dashboard/classrooms",
    },
    {
      name: "Academics",
      icon: faGraduationCap,
      href: "/dashboard/academics",
    },
    {
      name: "Settings",
      icon: faCog,
      href: "/dashboard/settings",
    },
  ];
</script>

<main
  class="w-full h-screen bg-[url('/images/Background.png')] bg-cover bg-center bg-no-repeat bg-fixed flex justify-center items-center text-white"
>
  <div
    class="w-11/12 h-5/6 bg-[#0000005b] backdrop-blur-md rounded-lg border-2 border-neutral-900 flex overflow-hidden"
  >
    <div
      class="w-2/12 h-full border-r-2 border-neutral-900 flex flex-col justify-between"
    >
      <div
        class="w-full h-24 bg-[#00000038] flex justify-center items-center gap-4 border-b-2 border-neutral-900"
      >
        <img
          src="/logo.png"
          alt="Logo"
          class="w-14 h-14 rounded-md border-2 border-teal-300"
        />

        <p class="font-semibold text-3xl text-teal-300">Hyperbola</p>
      </div>

      <div class="w-full flex flex-col justify-center items-center">
        {#each menus as menu}
          <div class="w-full flex flex-col justify-center">
            <button
              type="button"
              onclick={() => goto(menu.href)}
              class={"w-full flex items-center gap-4 transition-colors ease-in-out hover:bg-[#00000038] px-6 py-4 " +
                (data.path.startsWith(menu.href) ? "bg-[#00000038]" : "")}
            >
              <FontAwesomeIcon icon={menu.icon} />

              <span>{menu.name}</span>
            </button>
          </div>
        {/each}
      </div>

      <div
        class="w-full h-24 bg-[#00000038] flex justify-center items-center border-t-2 border-neutral-900"
      >
        <form method="post" use:enhance action="/logout">
          <button
            type="submit"
            class="bg-red-600 text-xl flex justify-center items-center font-medium px-4 py-2 rounded-md gap-2 transition-colors ease-in-out hover:bg-red-700"
          >
            <FontAwesomeIcon icon={faPowerOff} />

            <span>Logout</span>
          </button>
        </form>
      </div>
    </div>

    <div class="w-10/12 h-full">
      {@render children()}
    </div>
  </div>
</main>
