<template>
  <el-dialog v-dialogDrag :title="dialogTitle" :close-on-click-modal="false" width="30%" ref="dialogView" append-to-body :before-close="onBeforeClose" :visible.sync="visible">
        <el-form :model="formData" ref="formData" :rules="formRule" label-width="100px">
          <el-form-item prop="create_by" label="姓名">
            <el-input v-model="formData.username" size="small" placeholder="请填写姓名"></el-input>
          </el-form-item>
          <el-form-item>
                <el-button type="primary" size="small" :loading="loadingStatus" @click="onSubmit" >提交</el-button>
                <el-button type="default" size="small" :loading="loadingStatus" @click="$refs.dialogView.handleClose()">取消</el-button>
          </el-form-item>
        </el-form>
  </el-dialog>
</template>
<script>
import {getUserInfo, updateUser} from '@api/user.js'
import {insetAppraise} from "../../../api/appraise";
export default {
  data() {
    return {
      data: {},
      visible: false,
      loadingStatus: false,
      dialogTitle:"",
      formData:{
        appraise_id:null,
        content:"",
        create_by:"",
        create_time:"",
        uodate_time:"",
        role:"user",
        level:"user",
        status:true,
      },
    }
  },
  mounted () {

  },
  methods: {
    open(row,title) {
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
