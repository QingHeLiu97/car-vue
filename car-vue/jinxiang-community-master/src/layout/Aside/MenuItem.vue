<template>
    <div :class="'a-menu-item-' + size">
        <template v-if="size == 'small'">
            <span class="a-menu-item-li"  :class="activeClass" @click="handleClick">{{title}}</span>
        </template>
        <template v-if="size == 'large'">
            <div class="a-menu-item-li" :class="activeClass" @click="handleClick">
                <i :class="icon" class="el-icon--left"  v-if="icon" ></i>
                <span>{{title}}</span>
            </div>
        </template>
    </div>
</template>
<script>
    import { mapState } from 'vuex'
    export default {
        props: {
            icon: String,
            title: String,
            option: Object,
            size: {
                validator: (value) => {
                    return ['small', 'large'].indexOf(value) != -1
                }
            },
            index: [Number, String]
        },
        computed: {
            ...mapState('menu', ['menuItemAction']),
            activeClass () {
                if (this.index === this.menuItemAction) {
                    return 'a-menu-item-activity'
                }
                return ''
            }
        },
        methods: {
            handleClick () {
                if (this.activeClass) return
                this.$store.commit('menu/setMenuItemAction', this.index, { root: true })
                this.$store.commit('menu/setMenuItemTitle', this.title, { root: true })
                this.$emit('handleClick', this.option)
            }
        }
    }
</script>

<style scoped>
.a-menu-item-small >  .a-menu-item-activity.a-menu-item-li{
     background: white;
     color: #212121;
}
.a-menu-item-small{
    width: 50%;
    display: inline-block;
    margin-bottom: 8px;
    /* margin-top: 8px; */
}
.a-menu-item-small > span:hover{
    background: #424242;
    color: white;
}
.a-menu-item-small > .a-menu-item-li{
    cursor: pointer;
    display: inline-block;
    padding: 2px 4px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    box-sizing: border-box;
    max-width: 100%;
    border-radius: 2px;
}
/* 单项 */
.a-menu-item-large{
    width: 100%;

}

.a-menu-item-large > .a-menu-item-li{
    width: 100%;
    box-sizing: border-box;
    padding: 10px 24px;
    /* background: #383838; */
    /* color: white; */
    font-size: 16px;
    color: #E6CA9D;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
}

.a-menu-item-large > .a-menu-item-li:hover{
    background: #424242;
    color: white;
}
.a-menu-item-large >  .a-menu-item-activity.a-menu-item-li{
     background: white;
     color: #212121;
}
</style>
