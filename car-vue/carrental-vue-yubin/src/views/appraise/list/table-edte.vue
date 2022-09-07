<template>
  <el-dialog v-dialogDrag :title="dialogTitle" :close-on-click-modal="false" width="30%" ref="dialogView" append-to-body :before-close="onBeforeClose" :visible.sync="visible">
        <el-form :model="formData" ref="formData" label-width="100px">
            <el-form-item prop="appraiseId" label="编号">
            <el-input v-model="formData.apprId" size="small" placeholder="请填写编号"></el-input>
            </el-form-item>
            <el-form-item prop="content" label="内容">
                <el-input type="textarea" size="small" placeholder="请填写内容" resize="none" :rows="6" v-model="formData.content"></el-input>
            </el-form-item>
            <el-form-item prop="orderList" label="订单ID">
                <el-select v-model="formData.orderList" placeholder="请选择待评价订单">
                    <el-option v-for="item in formData.orderList" :key="item.orderId"
                               :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="level" label="编号">
                <el-input v-model="formData.level" size="small" placeholder="请填写星级"></el-input>
            </el-form-item>
          <el-form-item>
                <el-button type="primary" size="small" :loading="loadingStatus" @click="onSubmit" >提交</el-button>
                <el-button type="default" size="small" :loading="loadingStatus" @click="$refs.dialogView.handleClose()">取消</el-button>
          </el-form-item>
        </el-form>
  </el-dialog>
</template>
<script>
    import {insetAppraise} from '@api/appraise.js';
    import {getOrderListByPhone} from '@api/order.js';
    import {mapState} from "vuex";

    export default {
  data() {
    return {
      data: {},
      visible: false,
      loadingStatus: false,
      dialogTitle: "",
      formData:{
        apprId: null,
        content: "",
        createBy: "",
        createTime: "",
        updateTime: "",
        level: "",
        status:"",
        orderList: []
      },
    }
  },
    computed: {
        ...mapState('account', ['userInfo', 'role'])
    },
  methods: {

    getData(){
        var phone = this.userInfo.phone
        getOrderListByPhone({phone: phone}).then(res => {
            console.log("chengong",res)
            this.formData.orderList = res.result
            this.loadingStatus = false;
        }).catch(err => {
            this.loadingStatus = false
        })
    },

    open(row,title) {
        this.getData()
        this.visible = true;
        this.dialogTitle = title;
        if(row){
            this.$nextTick(()=>{
                for(var key in this.formData){
                    this.formData[key] = row[key]
                }
            })
        }
    },
    // 提交的回调
    onSubmit() {
      this.$refs.formData.validate((vali) => {
        if (vali) {
          var formData = this.formData;
          this.loadingStatus = true;
          if(formData.id){
            updateAppraise(formData).then(res => {
              this.loadingStatus = false;
              this.$message.success("修改成功")
              this.$refs.dialogView.handleClose()
              this.$emit("onSuccess")
            }).catch(err => {
              this.loadingStatus = false;
            })
          }else{
            insetAppraise(formData).then(res => {
              this.loadingStatus = false;
              this.$message.success("添加成功")
              this.$refs.dialogView.handleClose()
              this.$emit("onSuccess")
            }).catch(err => {
              this.loadingStatus = false;
            })
          }
        }
      })
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
