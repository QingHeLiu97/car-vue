<template>
  <div>
    <div class="a-menu-title" @click="handleClick">
        <div>
            <slot name="title"></slot>
        </div>
        <i class="el-icon-arrow-right a-icon-transition" :class="MenuOpen?'a-icon-rotate90':'a-icon-rotate0'" ></i>
    </div>
    <el-collapse-transition>
      <div v-show="MenuOpen" class="a-menu-item-ul">
        <slot></slot>
      </div>
    </el-collapse-transition>
  </div>
</template>
<script>
    import { mapState } from 'vuex';
    export default {
        props: {
            index: [Number, String]
        },
        mounted () {
            this.$store.commit('menu/setMenuSubOpen', this.index, { root: true })
        },
        computed: {
            ...mapState('menu', ['menuSubOpen']),
            MenuOpen () {
                if (this.menuSubOpen.indexOf(this.index) > -1) {
                    return true
                } else {
                    return false
                }
            }
        },
        methods: {
            handleClick () {
                if (this.MenuOpen) {
                    this.$store.commit('menu/setMenuSubClose', this.index, { root: true })
                } else {
                    this.$store.commit('menu/setMenuSubOpen', this.index, { root: true })
                }
            }
        }
    };
</script>
<style scoped>
.a-menu {
  padding-top: 60px;
}
.a-menu-title {
  padding: 10px 24px;
  font-size: 16px;
  color: #E6CA9D;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}
.a-menu-title:hover {
    background: #424242;
    color: white;
}
.a-menu-item-ul{
    color: #E6CA9D;
    list-style: none;
    background: #121212;
    box-sizing: border-box;
    font-size: 14px;
    padding: 12px 24px 0;
}
.a-icon-transition{
    transition: all ease .3s;
}
.a-icon-rotate90{
    transform: rotate(90deg);
}
.a-icon-rotate0{
    transform: rotate(0);
}

</style>
