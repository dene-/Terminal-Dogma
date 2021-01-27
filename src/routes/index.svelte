<script>
	import Slider from "../components/Slider.svelte";
	import Button from "../components/Button.svelte";
	import File from "../components/File.svelte";
	import HexLoader from "../components/HexLoader.svelte";

	let scale = 2;
	let noise = 2;
	let files;
	let preview;
	let error = "";
	let loading = false;

	// Remove preview and error message when a new image is loaded
	$: if (files) {
		preview = undefined;
		error = "";
	}

	/**
	 * Send the image to server
	 */
	let send = () => {
		let _formData = new FormData();
		_formData.append("scale", scale);
		_formData.append("noise", noise);
		_formData.append("file", files[0]);

		// Clean error and preview
		error = "";
		preview = undefined;

		// Activate loader
		loading = true;

		fetch("/api/enhance", {
			method: "POST",
			body: _formData,
		})
			.then((response) => response.blob())
			.then((images) => {
				// Then create a local URL for that image and print it
				preview = URL.createObjectURL(images);
				error = "";
				loading = false;
				files = undefined;
			})
			.catch((err) => {
				if (err) {
					error = err;
					loading = false;
				}
			});
	};
</script>

<svelte:head>
	<title>Terminal Dogma</title>
</svelte:head>

<HexLoader {loading} />

<div class="wrapper">
	<File bind:files />
	<Slider name="scale" bind:value={scale} min="1" max="2" />
	<Slider name="noise" bind:value={noise} min="0" max="3" />
	<Button onclick={send} disabled={!files} text="ENLARGE" />
	<span>{error}</span>
	{#if preview}
		<img src={preview} alt="" />
	{/if}
</div>

<style>
	@media (min-width: 480px) {
	}

	img {
		width: 100%;
	}

	.wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	@keyframes rotate {
		100% {
			transform: rotate(360deg);
		}
	}
</style>
