<script>
	export let NL_OS = 'Unknown OS';
	export let NL_PORT = 'Unknown port';
	export let Neutralino;
	let settings = {};
	Neutralino.settings.getSettings(function (settingsData) {
			settings = settingsData;
	});
</script>

<style>
	:global(body) {
			background-color: black;
			color: yellowgreen;
	}
	h1 {
	color: yellowgreen;
}
</style> 
<img src="/assets/svelte-logo-horizontal.svg" alt="Svelte Logo">
<h1>Hi: {NL_OS} @ { NL_PORT } </h1>
<p> { JSON.stringify(settings) } </p>
