<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
body {
  padding: 0;
  margin: 0;
  background: #f5f5f5;
}
ul {
  margin: 0;
  padding: 0;
}
li {
  margin: 0;
  padding: 0;
}

.color-red{
      color:#F56C6C;
}

.el-avatar > img{
    width: 100%;
}

.image-error-slot{
  width: 100%;
  height: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #eee;
  color: white;
  font-size: 30px;
}
</style>
