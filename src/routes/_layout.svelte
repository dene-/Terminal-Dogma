<div class="bg" />

<main>
	<slot />
</main>

<style>
	main {
		position: relative;
		max-width: 56em;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
		overflow: hidden;
	}

	.bg {
		position: fixed;
		width: 100%;
		height: 100%;
		background-image: url("/nerv-bg.svg");
		background-position: bottom left;
		background-repeat: no-repeat;
		background-size: 25vh;
		top: 0;
		left: 0;
		opacity: .1;
		z-index: -1;
	}
</style>
