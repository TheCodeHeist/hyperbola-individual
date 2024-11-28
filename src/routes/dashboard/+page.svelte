<script lang="ts">
  import { enhance } from "$app/forms";
</script>

<p>Dashboard</p>

<form method="post" use:enhance action="/logout">
  <button type="submit">Logout</button>
</form>
