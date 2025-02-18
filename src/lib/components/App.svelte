<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { onMount } from 'svelte'
  import { writable } from 'svelte/store';
  import { Checkbox, Pane, Slider, Textarea } from 'svelte-tweakpane-ui'
  import { DEG2RAD } from 'three/src/math/MathUtils.js'
  import Scene from '../../routes/Scene.svelte'
  
  // import Renderer  from './Renderer.svelte'

  // import { loading } from '/src/loadingStore.ts';
  let text = ''
  let bevelEnabled = true
  let bevelOffset = 0
  let bevelSegments = 1
  let bevelSize = 0
  let bevelThickness = 0.22
  let curveSegments = 12
  let depth = 0.65
  let size = 7.28
  let smooth = 1

  // Lysretning (Target-posisjon)
  let targetX = writable(0);
  let targetY = writable(0);
  let targetZ = writable(0);

</script>

<!-- <Pane
  title="Text3DGeometry"
  position="fixed"
>
  <Textarea
    bind:value={text}
    label="text"
  />
  <Checkbox
    label="bevelEnabled"
    bind:value={bevelEnabled}
  />
  <Slider
    label="bevelOffset"
    bind:value={bevelOffset}
    min={0}
    max={2}
  />
  <Slider
    label="bevelSegments"
    bind:value={bevelSegments}
    step={1}
    min={0}
    max={50}
  />
  <Slider
    label="bevelSize"
    bind:value={bevelSize}
    min={0}
    max={2}
  />
  <Slider
    label="bevelThickness"
    bind:value={bevelThickness}
    min={0}
    max={2}
  />
  <Slider
    label="curveSegments"
    bind:value={curveSegments}
    step={1}
    min={0}
    max={50}
  />
  <Slider
    label="depth"
    bind:value={depth}
    min={0}
    max={5}
  />
  <Slider
    label="size"
    bind:value={size}
    min={0}
    max={10}
  />
  <Slider
    label="smooth"
    bind:value={smooth}
    min={0}
    max={180 * DEG2RAD}
  />
</Pane> -->

<!-- <Pane title="Directional Light Target">
  <Slider bind:value={$targetX} label="Target X" min={-10} max={10} />
  <Slider bind:value={$targetY} label="Target Y" min={-10} max={10} />
  <Slider bind:value={$targetZ} label="Target Z" min={-10} max={10} />
</Pane> -->

<!-- {#if $loading == 1}
  <div class="loading-screen">Laster inn scenen...</div>
{/if} -->
<Canvas>
  <Scene
    {bevelEnabled}
    {bevelOffset}
    {bevelSegments}
    {bevelSize}
    {bevelThickness}
    {curveSegments}
    {depth}
    {size}
    {smooth}
  />
</Canvas>
