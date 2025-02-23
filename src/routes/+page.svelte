<script lang="ts">
  import App from "../lib/components/App.svelte"
  import { List, type ListOptions } from 'svelte-tweakpane-ui';

  let showIndicator = false; // Bruker en tilstand for å styre synlighet

  function showIndicatorFalse(e: Event){
        showIndicator = false;
    }

</script>
<!-- 
<div class="app" on:pointerdown={showIndicatorFalse}>
  <App />
</div> -->

<div class="overlay">
  <img src="/festivalente_dritt_plakat.png" alt="Overlay"/>
</div>

{#if showIndicator}
  <img alt="finger" class="scrollhand" src="/scrollhand.png"/>
{/if}