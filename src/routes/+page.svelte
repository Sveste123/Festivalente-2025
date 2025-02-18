<script lang="ts">
  import App from "../lib/components/App.svelte"
  import { List, type ListOptions } from 'svelte-tweakpane-ui';
  import { onDestroy, onMount } from 'svelte';

  onMount(() => {
    setTimeout(() => {
      window.location.href = "https://festivalente.no";
    }, 20000); // 15000ms = 15 sekunder
  });

  let showIndicator = true; // Bruker en tilstand for å styre synlighet

  function showIndicatorFalse(e: Event){
        showIndicator = false;
    }

</script>

<div class="app" on:pointerdown={showIndicatorFalse}>
  <App />
</div>

<!-- <div class="overlay">
  <img src="/SOOTSN.png" alt="Overlay" />
</div> -->

<!-- {#if showIndicator}
  <img alt="finger" class="scrollhand" src="/scrollhand.png"/>
{/if} -->