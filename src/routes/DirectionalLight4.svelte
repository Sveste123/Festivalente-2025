<script lang="ts">
  import state from '/src/routes/FRESHuniversalState.json'
  import type * as THREE from 'three'
  import { Group, DirectionalLight, Object3D } from 'three'
  import { T, type Props, type Events, type Slots, forwardEventHandlers } from '@threlte/core'
  import { useGltf } from '@threlte/extras'
  import { Theatre, SheetObject, Sequence } from '@threlte/theatre'
  import { onMount } from 'svelte';

  type $$Props = Props<THREE.Group>
  type $$Events = Events<THREE.Group>
  type $$Slots = Slots<THREE.Group> & { fallback: {}; error: { error: any } }

  export const ref = new Group()

  let targetObject = new Object3D() // Target for lyset
  let light;

  const component = forwardEventHandlers()
</script>

<Theatre config={{ state: state }} studio={{ hide: true, enabled: false }}>
  <Sequence autoplay>
    <!-- 💡 Directional Light -->
    <SheetObject key="DirectionalLight4" props={{ intensity: 0, posX: 0, posY: 0, posZ: 22 }} let:values>
      <T.DirectionalLight 
        bind:light={light}
        intensity={values.intensity} 
        position={[values.posX, values.posY, values.posZ]}
        color={0x00FF00}
        castShadow
      />
    </SheetObject>

    <!-- 🎯 Target Object for Light -->
    <!-- <SheetObject key="LightTarget" props={{ targetX: 0, targetY: 0, targetZ: 0 }} let:values>
      <T.Object3D 
        bind:object3d={targetObject}
        position={[values.targetX, values.targetY, values.targetZ]}
      />
    </SheetObject> -->
  </Sequence>
</Theatre>
