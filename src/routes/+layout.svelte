<script lang="ts">
  import "../global.css";

  import { config } from "@fortawesome/fontawesome-svg-core";

  import "@fortawesome/fontawesome-svg-core/styles.css"; // Import the CSS
  config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

  let { children } = $props();
</script>

{@render children()}
