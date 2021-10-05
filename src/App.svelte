<script>
	import { onMount } from 'svelte';
  import JSONTree from 'svelte-json-tree';
	export let NL_OS = 'Unknown OS';
	export let NL_PORT = 'Unknown port';
	export let Neutralino;

</script>

<img src="svelte-logo-horizontal.svg" alt="Svelte Logo">
<h1>Hi: {NL_OS} @ { NL_PORT } </h1>

{#await Neutralino.app.getConfig()}
	<p> Getting config... </p>
{:then settings}
<div style="--json-tree-string-color: yellowgreen; --json-tree-label-color: coral; --json-tree-number-color: cornflower; --json-tree-boolean-color: yellow">
	<JSONTree value={settings} />
</div>
{/await}

<style>
	:global(body) {
			background-color: black;
			color: yellowgreen;
			padding: 2em;
	}
	h1 {
		color: yellowgreen;
}
</style> 