<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { onMount } from 'svelte';
  import Scene2 from '../../routes/Scene2.svelte'
  // import Renderer  from './Renderer.svelte'
  // import { loading } from '/src/loadingStore.ts';
</script>

<!-- {#if $loading == 1}
  <div class="loading-screen">Laster inn scenen...</div>
{/if} -->

<Canvas>
  <Scene2/>
</Canvas>
