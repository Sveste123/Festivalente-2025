<script lang="ts">
  import state from '/src/routes/FRESHuniversalState.json'
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

  const gltf = useGltf<GLTFResult>('/models/Plakat.glb')

  export const ref = new Group()

  type GLTFResult = {
    nodes: {
      Plane: THREE.Mesh;
    };
    materials: {
      ['Material']: THREE.MeshStandardMaterial;
    };
  };

  const component = forwardEventHandlers()
</script>

 <Theatre studio={{ hide: true, enabled: false }} config={{ state: state }}>
  <Sequence autoplay>
    <SheetObject key="Plakat" props={{ scale: 0, opacity: 0, rotationx: 0, rotationy: 0, rotationz: 0, positionx: 0, positiony: 0, positionz: 0, }} let:values>
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
            <T.Mesh geometry={gltf.nodes.Plane.geometry} material={gltf.materials.Material} scale={1.84} />
          </T.Group>
        {:catch error}
          <slot name="error" {error} />
        {/await}
        <slot {ref} />

      </T>
    </SheetObject>
  </Sequence>
</Theatre>