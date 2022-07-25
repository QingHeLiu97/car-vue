<template>
    <div class="a-aside-box">
        <Menu></Menu>
    </div>
</template>
<script>
    import Menu from './Menu'
    export default {
        components: {
            Menu
        }
    }
</script>
<style scoped>
    .a-aside-box{
        width: 100%;
        height: 100%;
        position: relative;
        background: #212121;
        overflow: auto;
        scrollbar-width: none;
        -ms-overflow-style: none;
    }
    .a-aside-box::-webkit-scrollbar{
        display: none;
    }
</style>
