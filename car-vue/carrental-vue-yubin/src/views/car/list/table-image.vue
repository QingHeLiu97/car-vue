<template>
  <el-dialog v-dialogDrag :title="dialogTitle" :close-on-click-modal="false" width="30%" ref="dialogView" append-to-body :before-close="onBeforeClose" :visible.sync="visible">
        <template slot-scope="scope" v-if="scope.row.carCircle">
            <img  :src="swapImage(scope.row.carCircle)" alt="" style="width: 500px;height: 500px" >
        </template>
      <el-form-item >
          <el-button type="primary" size="small" :loading="loadingStatus" @click="$refs.dialogView.handleClose()" >确认</el-button>
<!--          <el-button type="default" size="small" :loading="loadingStatus" @click="$refs.dialogView.handleClose()">取消</el-button>-->
      </el-form-item>
  </el-dialog>
</template>
<script>

export default {
  data() {
    return {
        fileList:[],
        dialogVisible: false,
        data: {},
        circleUrl: "",
        visible: false,
        loadingStatus: false,
        dialogTitle:"",
        username: "",
      formData:{
        carId:null,
        type:"",
        color:"",
        price:"",
        carCircle:"",
        deposit:"",
        carname:"",
        status: "",
      },
    }
  },
  mounted () {

  },
  methods: {
    init(row,title) {
        this.visible = true;
        this.dialogTitle = title;
        if(row){
            this.$nextTick(()=>{
                for(var key in this.formData){
                    this.formData[key] = row[key]
                    console.log(this.formData[key])
                }
            })
        }
    },
      swapImage(imgUrl){
          return require('@/assets/' + imgUrl)
      },
    // 弹窗关闭之前的回调函数
    onBeforeClose(deno) {
      this.formData.id = null;
      this.$refs.formData.resetFields();
      this.$nextTick(()=>{
        deno();
      })
    },

  }
};
</script>
<style scoped></style>
