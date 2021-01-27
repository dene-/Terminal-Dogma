<script>
    export let text, disabled, onclick;
</script>

<button class="mt10 mb10" on:click={onclick} {disabled}>
    {text}
</button>

<style>
    button {
        display: inline-block;
        padding: 10px 5px 0 5px;
        
        font-size: 45px;
        font-weight: 800;
        font-family: 'Acumin Pro', Helvetica, sans-serif !important;
        text-align: center;

        background: transparent;
        color: #f89504;

        outline: 0;
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

    button:disabled {
        filter: none;
        border-color: rgb(77, 77, 77);
        background: transparent;
        color: rgb(77, 77, 77);
        cursor: not-allowed;
    }
</style>
