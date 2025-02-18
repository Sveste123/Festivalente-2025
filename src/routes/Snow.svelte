<script lang="ts">
  import state from '/src/routes/FRESHuniversalState.json' 
  import { T } from '@threlte/core';
  import type * as THREE from 'three'
  import { useLoader } from '@threlte/core';
  import { type Props, type Events, type Slots, forwardEventHandlers } from '@threlte/core'
  import { Group, TextureLoader } from 'three';
  import { onMount } from 'svelte';
  import { Theatre, SheetObject, Sequence } from '@threlte/theatre'

  const { load } = useLoader(TextureLoader);
  let snowflakeTexture;

  const snowCount = 1;
  let snowParticles = [];

  type $$Props = Props<THREE.Group>
  type $$Events = Events<THREE.Group>
  type $$Slots = Slots<THREE.Group> & { fallback: {}; error: { error: any } }

  export const ref = new Group()

  const component = forwardEventHandlers()

  /* Snøfnugg */
  const createSnowParticles = () => {
    return Array.from({ length: snowCount }, () => ({
      position: [0, 0, 0],
      scale: 0.8 // Tilfeldig mellom 0.005 og 0.04
    }));
  };

  onMount(async () => {
    snowflakeTexture = await load('/festivalente_dritt_plakat.png');
    snowParticles = createSnowParticles();
  });
</script>

<Theatre config={{ state: state }} studio={{ hide: true, enabled: false }}>
  <Sequence autoplay>
    <SheetObject key="Logo" props={{ scale: 0, opacity: 0, positionx: 0, positiony: 0, positionz: 0, }} let:values>
      <T is={ref} dispose={false} {...$$restProps}  
        position.x={values.positionx} 
        position.y={values.positiony} 
        position.z={values.positionz} 
        scale={[values.scale, values.scale, values.scale]} 
        bind:this={$component}
      >

      {#if snowflakeTexture}
        {#each snowParticles as particle (particle.position, particle.scale)}
          <T.Sprite position={particle.position} scale={[particle.scale * values.scale, particle.scale * values.scale, particle.scale * values.scale]}>
            <T.SpriteMaterial map={snowflakeTexture} transparent={true} />
          </T.Sprite>
        {/each}
      {/if}

      <slot {ref} />
      </T>
    </SheetObject>
  </Sequence>
</Theatre>