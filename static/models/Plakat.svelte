
    <!--
Auto-generated by: https://github.com/threlte/threlte/tree/main/packages/gltf
Command: npx @threlte/gltf@3.0.0 Plakat.glb --root /models/ --printwidth 120 --precision 2
-->




    <script>
				
	
	
  
        import { T } from '@threlte/core'
        import { useGltf } from '@threlte/extras'
	

        let {
					fallback,
          error,
          children,
          ref = $bindable(),
          ...props
        } = $props()

				

				

        

        const gltf = useGltf('/models/Plakat.glb')

    
    </script>

		<T.Group bind:ref dispose={false} {...props}>
			{#await gltf}
        {@render fallback?.()}
			{:then gltf}
				<T.Mesh geometry={gltf.nodes.Plane.geometry} material={gltf.materials.Material} scale={1.84} />

			{:catch err}
        {@render error?.({ error: err })}
			{/await}

      {@render children?.({ ref })}
		</T.Group>
	