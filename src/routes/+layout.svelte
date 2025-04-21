<script lang="ts">
  import { LightSwitch } from "@skeletonlabs/skeleton";

  import "../global.css";

  import { config } from "@fortawesome/fontawesome-svg-core";

  import "@fortawesome/fontawesome-svg-core/styles.css"; // Import the CSS
  config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

  let { children } = $props();
</script>

<div class="absolute top-20 right-20 z-50 bg-primary">
  <LightSwitch />
</div>

{@render children()}
