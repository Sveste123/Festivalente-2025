<script lang="ts">
  import state from '/src/routes/FRESHuniversalState.json'
  import type * as THREE from 'three'
  import { Group } from 'three'
  import { T, type Props, type Events, type Slots, forwardEventHandlers } from '@threlte/core'
  import { useGltf } from '@threlte/extras'
  import { Theatre, SheetObject, Sequence } from '@threlte/theatre'
  import { onMount } from 'svelte';

  type $$Props = Props<THREE.Group>
  type $$Events = Events<THREE.Group>
  type $$Slots = Slots<THREE.Group> & { fallback: {}; error: { error: any } }

  export const ref = new Group()

  type GLTFResult = {
    nodes: {
      Spark_1: THREE.Mesh
      Spark_2: THREE.Mesh
    }
    materials: {
      ['Material.004']: THREE.MeshStandardMaterial
      ['Material.005']: THREE.MeshStandardMaterial
    }
  }

  const gltf = useGltf<GLTFResult>('/models/Spark.glb')

  const component = forwardEventHandlers()
</script>

<Theatre config={{ state: state }} studio={{ hide: false }}>
  <Sequence autoplay>
    <SheetObject key="Spark" props={{ scale: 0, opacity: 0, rotationx: 0, rotationy: 0, rotationz: 0, positionx: 0, positiony: 0, positionz: 0, }} let:values>
      <T is={ref} dispose={false} {...$$restProps}  
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
          <T.Group>
            <T.Mesh 
              geometry={gltf.nodes.Spark_1.geometry} 
              material={gltf.materials['Material.004']} 
              material.opacity={values.opacity}
              material.transparent
              material.side={0}
              castShadow
            />
            <T.Mesh 
              geometry={gltf.nodes.Spark_2.geometry} 
              material={gltf.materials['Material.005']} 
              material.opacity={values.opacity}
              material.transparent
              material.side={0}
              castShadow
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
