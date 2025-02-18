<script lang="ts">
  import state from '/src/routes/FRESHuniversalState.json';
  import { T } from '@threlte/core';
  import type * as THREE from 'three';
  import { type Props, type Events, type Slots, forwardEventHandlers } from '@threlte/core';
  import { Group, Mesh, MeshBasicMaterial, RingGeometry } from 'three';
  import { onMount } from 'svelte';
  import { Theatre, SheetObject, Sequence } from '@threlte/theatre';

  const ringCount = 22;
  let ringParticles: Array<{ position: [number, number, number]; scale: number }> = [];

  type $$Props = Props<THREE.Group>;
  type $$Events = Events<THREE.Group>;
  type $$Slots = Slots<THREE.Group> & { fallback: {}; error: { error: any } };

  export const ref = new Group();

  const component = forwardEventHandlers();

  /* Create ring particles */
  const createRingParticles = () => {
    return Array.from({ length: ringCount }, () => ({
      position: [
        Math.random() * 1 - 0.3, // X: random between -4 and 8
        Math.random() * - 0.08 , // Y: random between -1 and 0
        - 1, // Z: random between -15 and -5
      ],
      scale: Math.random() * 0.7 + 0.1, // Random scale between 0.5 and 1.5
    }));
  };

  onMount(() => {
    ringParticles = createRingParticles();
  });
</script>

<Theatre config={{ state: state }} studio={{ hide: true }}>
  <Sequence autoplay>
    <SheetObject
      key="DLB"
      props={{
        scale: 0,
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
        bind:this={$component}
      >
        {#each ringParticles as particle (particle.position, particle.scale)}
          <T.Group>
            <T.Mesh position={[particle.position[0], particle.position[1] + 0.02, particle.position[2] - 0.01]} scale={particle.scale}> <!-- "SHADOW" -->
              <T.RingGeometry args={[0, 0.2, 44]} /> <!-- Inner radius 0.1, outer radius 0.2, 32 segments -->
                <T.MeshBasicMaterial 
                  color={0x2a3272} 
                  side={T.DoubleSide}  
                  opacity={values.opacity}
                  transparent
                  />
            </T.Mesh>
            <T.Mesh position={particle.position} scale={particle.scale}> <!-- LIGHT-BLUE -->
              <T.RingGeometry args={[0, 0.2, 44]} /> <!-- Inner radius 0.1, outer radius 0.2, 32 segments -->
                <T.MeshBasicMaterial 
                  color={0x8296ff} 
                  side={T.DoubleSide} 
                  opacity={values.opacity}
                  transparent
                  />
            </T.Mesh>
          </T.Group>
          
        {/each}

        <slot {ref} />
      </T>
    </SheetObject>
  </Sequence>
</Theatre>
