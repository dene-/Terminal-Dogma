<script>
    export let text, disabled, onclick;
</script>

<button class="mt10 mb10" on:click={onclick} {disabled}>
    <span>{text}</span>
</button>

<style>
    button {
        font-family: 'Acumin Pro', Helvetica, sans-serif !important;
        color: #f89504;
        height: 100px;
        background: transparent;
        text-align: center;
        outline: 0;
        font-size: 1.1rem;
        display: inline-block;
        border: 5px solid #f89504;
        border-radius: 15px;
        transition: 0.1s linear;
        filter: drop-shadow(0px 0px 10px rgba(248, 149, 4, 0.5));
    }

    button:hover {
        background: #f89504;
        color: rgb(27, 27, 27);
        cursor: pointer;
    }

    button > span {
        font-size: 30px;
        font-weight: bold;
        /*transform: scaleY(3.5);*/
        transform-origin: left;
        display: inline-block;
    }

    button:disabled {
        filter: none;
        border-color: rgb(77, 77, 77);
        background: transparent;
        color: rgb(77, 77, 77);
        cursor: not-allowed;
    }
</style>
