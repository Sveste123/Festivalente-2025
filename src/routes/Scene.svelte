<script lang="ts">
  import { T, useTask } from '@threlte/core'
  import { Text3DGeometry, ContactShadows, Float, Grid, OrbitControls, Gizmo, TrackballControls, Mask, useMask, MeshLineGeometry, MeshLineMaterial } from '@threlte/extras'
  import * as Extra from '@threlte/extras'
	import { BoxGeometry, Group, MeshBasicMaterial } from 'three';
  import { writable } from 'svelte/store';
  // import * as Utils from 'three/src/math/MathUtils'
  import { Environment, interactivity, Text, useCursor } from '@threlte/extras'
	import Spark from './LP.svelte';

  interactivity();
  
  /* SNOW-SCRIPT START*/
  import Snosprut from './Snosprut.svelte';
  import Plakat from './Plakat.svelte';
	import Snohaug from './Snohaug.svelte';
	import Snohaug2 from './Snohaug2.svelte';
  import BackgroundCircles from './BackgroundCircles.svelte'
	import LP from './LP.svelte';
  // import Transform_LP from './--transform_LP.svelte';


  /* SNOW-SCRIPT END */

  // Reactive store for media query
  const isSmallScreen = writable(false);

  // Update store based on screen size
  const mediaQuery = window.matchMedia('(max-width: 768px)');
  const updateScreenSize = () => {
    isSmallScreen.set(mediaQuery.matches);
  };

  // Add listener
  mediaQuery.addEventListener('change', updateScreenSize);
  updateScreenSize(); // Initialize

  // Reactive camera properties
  $: cameraProps = $isSmallScreen
    ? { fov: 55, position: {x: 0, y: 0, z: 70} } // Small screen
    : { fov: 55, position: {x: 0, y: 0, z: 50} }; // Large screen
  
  // console.log(position);

</script>

  <T.PerspectiveCamera
  makeDefault
  fov={cameraProps.fov}
  position.x={cameraProps.position.x}
  position.y={cameraProps.position.y}
  position.z={cameraProps.position.z}

  >

  <!-- <TrackballControls
    enableZoom={false}
    enableDamping={true}
    enablePan={false}
    autoRotate={false}
    rotateSpeed={2}
    target={[0, 0, 0]}
    maxPolarAngle={2}
    minPolarAngle={-2}
  /> -->

  <!-- <BackgroundCircles
  /> -->
  
</T.PerspectiveCamera>


<!-- <Environment 
  files='/EnvironmentalLights.hdr'
/> -->

<T.DirectionalLight 
  intensity={0} 
  position={[15, 14, 15]}
  castShadow
/>

<T.AmbientLight 
  intensity={0} 
  position={[0.5, 0.5, 0.5]}
/>

<ContactShadows
  scale={0}
  blur={1}
  far={0.5}
  opacity={0.5}
/>

<!-- <Snohaug
  interactive
  recieveShadow
/>

<Snohaug2 
  interactive
  recieveShadow
/> -->

<LP 
  interactive
  castShadow
/>

<Plakat
interactive
castShadow
/>

<!-- <Transform_LP
  interactive
  castShadow
/> -->

<!-- <Snosprut/> -->

<!-- <Text
  text="1MKA"
  interactive
  fontSize={0.45}
  anchorY="100%"
  anchorX="50%"
  rotation.x={-1.57}
  position={[-3.5, -1.25, -3]}
  color=white
/> -->
