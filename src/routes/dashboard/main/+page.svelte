<script lang="ts">
  let { data } = $props();
</script>

<div class="w-full h-full px-12 py-10">
  <p class="font-bold text-4xl text-center">Welcome, {data.user?.firstName}!</p>
</div>
