<!--
Auto-generated by: https://github.com/threlte/threlte/tree/main/packages/gltf
Command: npx @threlte/gltf@2.0.3 rov.glb --transform
-->

<script>
	import { Group } from 'three';
	import { T, forwardEventHandlers } from '@threlte/core';
	import { useGltf } from '@threlte/extras';
	import { base } from '$app/paths';

	export const ref = new Group();

	const gltf = useGltf(`${base}/rov.glb`, { useDraco: true });

	const component = forwardEventHandlers();
</script>

<T is={ref} dispose={false} {...$$restProps} bind:this={$component}>
	{#await gltf}
		<slot name="fallback" />
	{:then gltf}
		<T.Group scale={0.01} rotation={[Math.PI / 2, 0, 0]}>
			<T.Mesh
				geometry={gltf.nodes.TADD_IVb_Mounting_and_Assembly_v1.geometry}
				material={gltf.materials['Acrylic_(Clear)']}
			/>
			<T.Mesh
				geometry={gltf.nodes.TADD_IVb_Mounting_and_Assembly_v1_1.geometry}
				material={gltf.materials['Opaque(192,192,192)']}
			/>
			<T.Mesh
				geometry={gltf.nodes.TADD_IVb_Mounting_and_Assembly_v1_2.geometry}
				material={gltf.materials['Powder_Coat_(Black)']}
			/>
			<T.Mesh
				geometry={gltf.nodes.TADD_IVb_Mounting_and_Assembly_v1_3.geometry}
				material={gltf.materials['Opaque(64,64,64)']}
			/>
			<T.Mesh
				geometry={gltf.nodes.TADD_IVb_Mounting_and_Assembly_v1_4.geometry}
				material={gltf.materials['Opaque(64,64,64)']}
			/>
			<T.Mesh
				geometry={gltf.nodes.TADD_IVb_Mounting_and_Assembly_v1_5.geometry}
				material={gltf.materials['Acrylic_(Clear)']}
			/>
			<T.Mesh
				geometry={gltf.nodes.TADD_IVb_Mounting_and_Assembly_v1_6.geometry}
				material={gltf.materials['Powder_Coat_(Black)']}
			/>
			<T.Mesh
				geometry={gltf.nodes.TADD_IVb_Mounting_and_Assembly_v1_7.geometry}
				material={gltf.materials['Plastic_-_Matte_(Blue)']}
			/>
			<T.Mesh
				geometry={gltf.nodes.TADD_IVb_Mounting_and_Assembly_v1_8.geometry}
				material={gltf.materials['Stainless_Steel_-_Satin']}
			/>
			<T.Mesh
				geometry={gltf.nodes.TADD_IVb_Mounting_and_Assembly_v1_9.geometry}
				material={gltf.materials['Acrylic_(Clear)']}
			/>
			<T.Mesh
				geometry={gltf.nodes.TADD_IVb_Mounting_and_Assembly_v1_10.geometry}
				material={gltf.materials['Acrylic_(Clear)']}
			/>
			<T.Mesh
				geometry={gltf.nodes.TADD_IVb_Mounting_and_Assembly_v1_11.geometry}
				material={gltf.materials['Acrylic_(Clear)']}
			/>
			<T.Mesh
				geometry={gltf.nodes.TADD_IVb_Mounting_and_Assembly_v1_12.geometry}
				material={gltf.materials['Aluminum_-_Satin']}
			/>
			<T.Mesh
				geometry={gltf.nodes.TADD_IVb_Mounting_and_Assembly_v1_13.geometry}
				material={gltf.materials['Rubber_-_Soft']}
			/>
			<T.Mesh
				geometry={gltf.nodes.TADD_IVb_Mounting_and_Assembly_v1_14.geometry}
				material={gltf.materials['Brass_-_Matte']}
			/>
			<T.Mesh
				geometry={gltf.nodes.TADD_IVb_Mounting_and_Assembly_v1_15.geometry}
				material={gltf.materials['Steel_-_Satin']}
			/>
		</T.Group>
	{:catch error}
		<slot name="error" {error} />
	{/await}

	<slot {ref} />
</T>
