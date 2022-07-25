<template>
  <el-container>
    <el-aside width="220px">
      <div class="a-aside-title">金象社区</div>
      <Aside></Aside>
    </el-aside>
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-main>
        <transition name="a-page" mode="out-in">
          <router-view></router-view>
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
    import Aside from './Aside';
    import Header from './Header'
    export default {
        components: {
            Aside,
            Header
        }
    };
</script>
<style scoped>
.el-container {
  height: 100vh;
}
.el-header {
  background:white;
}
.el-main{
  overflow-x: hidden;
}

.el-aside{
    position: relative;
    background: #212121;
}
.a-aside-title {
  width: 100%;
  height: 60px;
  font-size: 20px;
  /* #1c2233 */
  background: #212121;
  position: absolute;
  color: #E6CA9D;
  text-align: center;
  line-height: 60px;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
}

/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.a-page-enter-active {
  transition: all .3s ease;
}
.a-page-leave-active {
  transition: all .3s ease;
}
.a-page-enter{
  transform: translateX(-30px);
  opacity: 0;
}
.a-page-enter-to{
  transform: translateX(0);
  opacity: 1;
}
.a-page-leave
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(-30px);
  opacity: 1;
}
.a-page-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(30px);
  opacity: 0;
}
</style>
