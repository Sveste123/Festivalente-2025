<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { onMount } from 'svelte';
  import Scene from '../../routes/Scene.svelte'
  // import Renderer  from './Renderer.svelte'

  import { loading } from '/src/loadingStore.ts';

</script>

{#if $loading == 1}
  <div class="loading-screen">Laster inn scenen...</div>
{/if}

<Canvas>
  <Scene/>
</Canvas>