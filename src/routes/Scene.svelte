<script lang="ts">
  import { T, useTask } from '@threlte/core'
  import { Align, ContactShadows, Float, Grid, OrbitControls, Gizmo, TrackballControls, Mask, useMask, MeshLineGeometry, MeshLineMaterial } from '@threlte/extras'
  import * as Extra from '@threlte/extras'
	import { BoxGeometry, Group, MeshBasicMaterial, DirectionalLight, Object3D, AmbientLight } from 'three';
  import { writable } from 'svelte/store';
  // import * as Utils from 'three/src/math/MathUtils'
  import { Environment, interactivity, Text, useCursor, Text3DGeometry } from '@threlte/extras'
	import Spark from './Spark.svelte';
  import { onDestroy, onMount } from 'svelte';
	import DirectionalLight1 from './DirectionalLight1.svelte';
	import Snow from './Snow.svelte';
	import DirectionalLight3 from './DirectionalLight3.svelte';
	import DirectionalLight2 from './DirectionalLight2.svelte';
	import DirectionalLight4 from './DirectionalLight4.svelte';

  // export let text: string
  export let bevelEnabled: boolean
  export let bevelOffset: number
  export let bevelSegments: number
  export let bevelSize: number
  export let bevelThickness: number
  export let curveSegments: number
  export let depth: number
  export let size: number
  export let smooth: number



  // // Lysets target-posisjon (default peker mot origo)
  // export let targetX = writable(0);
  // export let targetY = writable(0);
  // export let targetZ = writable(0);

  // let light;
  // let targetObject = new Object3D()

  // // Når komponenten er mountet, settes target på lyset
  // onMount(() => {
  //   light.target = targetObject
  // })

  // // Oppdater posisjonen til target dynamisk
  // $: targetObject.position.set($targetX, $targetY, $targetZ)


  
  // Reactive store for media query
  const isSmallScreen = writable(false)
  const mediaQuery = window.matchMedia('(max-width: 768px)')
  
  const updateScreenSize = () => {
    isSmallScreen.set(mediaQuery.matches)
  }
  
  mediaQuery.addEventListener('change', updateScreenSize)
  updateScreenSize() // Initialize

  $: cameraProps = $isSmallScreen
    ? { fov: 140, position: [0, 0, 20] } // Small screen
    : { fov: 90, position: [0, 0, 20] } // Large screen


  // Måldato: 7. april 2025 kl. 00:00:00
  const targetDate = new Date("2025-04-08T00:00:00").getTime();

  let countdown = getRemainingTime();

  function getRemainingTime() {
    const now = new Date().getTime();
    const timeLeft = targetDate - now;

    if (timeLeft <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(timeLeft / (1000 * 60 * 60 * 24)),
      hours: Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((timeLeft % (1000 * 60)) / 1000),
    };
  }

  const interval = setInterval(() => {
    countdown = getRemainingTime();
  }, 1000);

  onDestroy(() => clearInterval(interval));
</script>

<Float
  rotationIntensity={0.5}
  rotationSpeed={2}
>
  <T.PerspectiveCamera
    makeDefault
    fov={cameraProps.fov}
    position={cameraProps.position}
  >
    <!-- <OrbitControls
      enableZoom={false}
      enableDamping={true}
      enablePan={false}
      autoRotate={false}
      autoRotateSpeed={0.1}
      target={[0, 0, 0]}
      maxPolarAngle={2}
      minPolarAngle={1}
    /> -->
  </T.PerspectiveCamera>
</Float>


<!-- <T.DirectionalLight
  bind:light={light}
  intensity={1}
  position={[5, 5, 15]}
  castShadow
/> -->

<!-- Legg til targetObject i scenen slik at lyset peker mot det
<T.Object3D 
  bind:object3d={targetObject} 
  position={[$targetX, $targetY, $targetZ]}
/> -->



<!-- <T.AmbientLight
  intensity={100}
  position={[15, 15, 15]}
  castShadow
/> -->

<ContactShadows
  scale={10}
  blur={1}
  far={0.5}
  opacity={0.5}
/>

<T.Mesh scale.z={depth / 20} position={[-18.8, 5, 0]}>
  <Text3DGeometry
    text="{`${countdown.days}d ${countdown.hours}t`}"
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
  <T.MeshStandardMaterial
    color="#fff000"
    toneMapped={false}
    metalness={1.0}
    roughness={0.1}
  />
</T.Mesh>

<T.Mesh scale.z={depth / 20} position={[-18.8, -5, 0]}>
  <Text3DGeometry
    text="{`${countdown.minutes}m ${countdown.seconds}s`}"
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
  <T.MeshStandardMaterial
    color="#fff000"
    toneMapped={false}
    metalness={1.0}
    roughness={0.1}
  />
</T.Mesh>

<T.Mesh scale.z={depth / 20} position={[-18.8, 5, -0.01]}>
  <Text3DGeometry
    text="{`${countdown.days}d ${countdown.hours}t`}"
    {bevelEnabled}
    {bevelOffset}
    {bevelSegments}
    bevelSize={0.09}
    {bevelThickness}
    {curveSegments}
    {depth}
    {size}
    {smooth}
  />
  <T.MeshStandardMaterial
    color="#e02e00"
    toneMapped={false}
    metalness={1.0}
    roughness={0.1}
  />
</T.Mesh>

<T.Mesh scale.z={depth / 20} position={[-18.8, -5, -0.01]}>
  <Text3DGeometry
    text="{`${countdown.minutes}m ${countdown.seconds}s`}"
    {bevelEnabled}
    {bevelOffset}
    {bevelSegments}
    bevelSize={0.09}
    {bevelThickness}
    {curveSegments}
    {depth}
    {size}
    {smooth}
  />
  <T.MeshStandardMaterial
    color="#e02e00"
    toneMapped={false}
    metalness={1.0}
    roughness={0.1}
  />
</T.Mesh>

<!-- <Spark
  scale={0.01}
  position={[0, 0, 0]}
/> -->

<DirectionalLight1/>
<DirectionalLight2/>
<DirectionalLight3/>
<DirectionalLight4/>

<Snow/>