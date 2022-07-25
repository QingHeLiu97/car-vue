<template>
    <div class="a-menu">
        <template v-for="(item,index) in menuList" >
            <MenuSub :index="item.id" :key="'sub-' + index" v-if="item.children&&item.children.length > 0&&item.role == role">
                <template slot="title">
                   <i :class="item.icon" v-if="item.icon" class="el-icon--left"></i>
                   <span>{{item.name}}</span>
                </template>
                <template v-for="(option,code) in item.children" >
                    <MenuItem :index="option.id" :option="option" size="small" :key="code" @handleClick="handleMenuClick"  :title="option.name"></MenuItem>
                </template>
            </MenuSub>
            <MenuItem :index="item.id" size="large" :icon="item.icon" :option="item" :title="item.name" @handleClick="handleMenuClick" :key="'item-' + index" v-else-if="item.role == role" ></MenuItem>
        </template>
    </div>
</template>
<script>
    import MenuSub from './MenuSub'
    import MenuItem from './MenuItem'
    import { mapState } from 'vuex'
    export default {
        components: { MenuSub, MenuItem },
        computed: {
            ...mapState('menu', ['menuList']),
            ...mapState('account', ['role'])
        },
        methods: {
            handleMenuClick (option) {
                if (option.path && option.path.indexOf('/' == 0)) {
                    this.$router.push({ path: option.path })
                } else {
                    this.$router.push({ path: '/404' })
                }
            }
        }
    }
</script>

<style scoped>
    .a-menu{
        padding-top: 60px;
        padding-bottom: 30px;
    }

</style>
