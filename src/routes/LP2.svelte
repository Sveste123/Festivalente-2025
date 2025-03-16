<script lang="ts">
  import state from '/src/routes/LP2universalState.json'
  import type * as THREE from 'three'
  import { Group } from 'three'
  import { T, type Props, type Events, type Slots, forwardEventHandlers } from '@threlte/core'
  import { useGltf } from '@threlte/extras'
  import { Theatre, SheetObject, Sequence } from '@threlte/theatre'
  import { onMount } from 'svelte'

  type $$Props = Props<THREE.Group>
  type $$Events = Events<THREE.Group>
  type $$Slots = Slots<THREE.Group> & {
    fallback: {};
    error: { error: Error };
  };

  const gltf = useGltf<GLTFResult>('/models/LP.glb')

  export const ref = new Group()

  type GLTFResult = {
    nodes: {
      Circle001: THREE.Mesh;
      Circle001_1: THREE.Mesh;
      Circle001_2: THREE.Mesh;
    };
    materials: {
      ['Material.001']: THREE.MeshStandardMaterial;
      ['Material.002']: THREE.MeshStandardMaterial;
      ['Material.003']: THREE.MeshStandardMaterial;
    };
  };

  const component = forwardEventHandlers()
</script>

 <Theatre  studio={{ hide: false, enabled: true }} config={{ state: state }}>
  <Sequence autoplay>
    <SheetObject key="LP2" props={{ scale: 0, opacity: 0, rotationx: 0, rotationy: 0, rotationz: 0, positionx: 0, positiony: 0, positionz: 0, }} let:values>
      <T 
        is={ref} 
        dispose={false} 
        {...$$restProps}  
        rotation.x={values.rotationx} 
        rotation.y={values.rotationy} 
        rotation.z={values.rotationz} 
        position.x={values.positionx} 
        position.y={values.positiony} 
        position.z={values.positionz} 
        scale={values.scale} 
        bind:this={$component}
      >
        {#await gltf}
          <slot name="fallback" />
        {:then gltf}
          <T.Group 
            position={[0, 0, 0]}
          >
            <T.Mesh 
              geometry={gltf.nodes.Circle001.geometry} 
              material={gltf.materials['Material.001']} 
            />
            <T.Mesh 
              geometry={gltf.nodes.Circle001_1.geometry} 
              material={gltf.materials['Material.002']} 
            />
            <T.Mesh 
              geometry={gltf.nodes.Circle001_2.geometry} 
              material={gltf.materials['Material.003']} 
            />
          </T.Group>
        {:catch error}
          <slot name="error" {error} />
        {/await}
        <slot {ref} />

      </T>
    </SheetObject>
  </Sequence>
</Theatre>

/*

<!-- <script lang="ts">
  import type * as THREE from 'three';
  import { Group } from 'three';
  import { T, type Props, type Events, type Slots } from '@threlte/core';
  import { useGltf } from '@threlte/extras';

  type $$Props = Props<THREE.Group>;
  type $$Events = Events<THREE.Group>;
  type $$Slots = Slots<THREE.Group> & {
    fallback: {};
    error: { error: Error };
  };

  export const ref = new Group();

  type GLTFResult = {
    nodes: {
      Circle001: THREE.Mesh;
      Circle001_1: THREE.Mesh;
      Circle001_2: THREE.Mesh;
    };
    materials: {
      ['Material.001']: THREE.MeshStandardMaterial;
      ['Material.002']: THREE.MeshStandardMaterial;
      ['Material.003']: THREE.MeshStandardMaterial;
    };
  };

  const gltf = useGltf<GLTFResult>('/LP.glb');
</script> -->

