<script lang="ts">
	import { controllerDataSchema, type ControllerData } from 'robot/src/controller';
	import Arbitrary from '$lib/controller/Arbitrary.svelte';
	import extract from 'object-property-extractor';
	import ZodObjectDisplay from './ZodObjectDisplay.svelte';
	import { zodToJsonSchema } from 'zod-to-json-schema';

	let propertyExtractor = '';
	let propertyError = '';

	let isDeadzoning = false;
	let deadzoneMin = 0;
	let deadzoneMax = 0;

	let output: ControllerData;

	let logitechControllerOutput: ControllerData | undefined;
	let logitechFlightOutput: ControllerData | undefined;
	let keyboardOutput: ControllerData | undefined;

	$: if (isDeadzoning) {
		const value = extract(output, propertyExtractor);

		deadzoneMin = Math.min(value, deadzoneMin);
		deadzoneMax = Math.max(value, deadzoneMax);
	}

	function beginDeadzone() {
		propertyError = '';

		if (!output) {
			propertyError = 'No output to scan';
			return;
		}

		const property = extract(output, propertyExtractor);

		if (typeof property !== 'number') {
			propertyError = 'Property is not a number';
			return;
		}

		isDeadzoning = true;
	}
</script>

<svelte:head>
	<title>ROV Controller Debugging</title>
</svelte:head>

<Arbitrary
	bind:logitechControllerOutput
	bind:logitechFlightOutput
	bind:keyboardOutput
	bind:output
/>

<h1>Controller Debugging</h1>

<p>
	For general Gamepad API debugging, see <a
		target="_blank"
		referrerpolicy="no-referrer"
		href="https://hardwaretester.com/gamepad">hardwaretester's gamepad tester</a
	>.
</p>

<main>
	<div class="output">
		<pre><ZodObjectDisplay jsonSchema={zodToJsonSchema(controllerDataSchema)} data={output} /></pre>
	</div>
	<div class="deadzone">
		<input type="text" placeholder="Enter property to extract" bind:value={propertyExtractor} />
		<button on:click={beginDeadzone}>Begin Deadzone</button>
		{#if propertyError}
			<p>{propertyError}</p>
		{/if}
		{#if isDeadzoning}
			<p>{deadzoneMin}</p>
			<p>{deadzoneMax}</p>
		{/if}
	</div>
</main>

<style>
	main {
		margin: 1rem;
		display: flex;
		justify-content: space-around;
		width: calc(100% - 2rem);
		height: calc(100% - 2rem);
	}

	h1 {
		text-align: center;
	}

	a {
		color: var(--accent);
	}

	p {
		text-align: center;
	}
</style>
