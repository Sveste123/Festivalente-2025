<script lang="ts">
  import state from '/src/routes/FRESHuniversalState.json'
  import type * as THREE from 'three'
  import { Group } from 'three'
  import { T, type Props, type Events, type Slots, forwardEventHandlers } from '@threlte/core'
  import { useGltf } from '@threlte/extras'
  import { Theatre, SheetObject, Sequence } from '@threlte/theatre'

  import { loading } from '/src/loadingStore';

  type $$Props = Props<THREE.Group>
  type $$Events = Events<THREE.Group>
  type $$Slots = Slots<THREE.Group> & { fallback: {}; error: { error: any } }

  export const ref = new Group()

  type GLTFResult = {
    nodes: {
      Sphere001: THREE.Mesh
    };
    materials: {
      snow_02: THREE.MeshStandardMaterial
    };
  };

  const gltf = useGltf<GLTFResult>('/models/Snohaug2.glb')

  // var gltf = null;
  // async function loadScene(): Promise<GLTFResult> {
  //   console.log("Loading snøhaug");
  //   var gltf = await useGltf<GLTFResult>('/models/Snohaug2.glb');
  //   $loading = 0;
  //   console.log("Loaded snøhaug");
  //   return gltf;
  // }

  const component = forwardEventHandlers();

  $: {
    // Når `gltf` er ferdig lastet, sett `loading` til 0
    if (gltf) {
      $loading = 0 ;
      console.log("GLTF IS LOADED (Object)");
      console.log("loading:", loading);
    }
  }

  //svelte-store

</script>

<Theatre config={{ state: state }} studio={{ hide: true }}>
  <Sequence autoplay>
    <SheetObject
      key="Snohaug2"
      props={{
        scale: 1,
        opacity: 1,
        rotationx: 0,
        rotationy: 0,
        rotationz: 0,
        positionx: 0,
        positiony: 0,
        positionz: 0,
      }}
      let:values
    >
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
        scale={[values.scale, values.scale, values.scale]}
        bind:this={$component}
      >
        {#await gltf}
          <slot name="fallback" />
        {:then gltf}
          <T.Group>
            <T.Mesh
              geometry={gltf.nodes.Sphere001.geometry}
              material={gltf.materials.snow_02}
              material.opacity={values.opacity}
              material.transparent
              rotation={[Math.PI / 2, 0, 2]}
              scale={[0.27, 0.27, 0.1]}
              receiveShadow
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
