<template>
  <el-dialog v-dialogDrag :title="dialogTitle" :close-on-click-modal="false" width="30%" ref="dialogView" append-to-body :before-close="onBeforeClose" :visible.sync="visible">
        <el-form :model="formData" ref="formData" :rules="formRule" label-width="100px">
          <el-form-item prop="residential" label="房号">
            <el-input v-model="formData.residential" size="small" placeholder="请填写房号"></el-input>
          </el-form-item>
          <el-form-item prop="name" label="姓名">
            <el-input v-model="formData.name" size="small" placeholder="请填写姓名"></el-input>
          </el-form-item>
          <el-form-item prop="phone" label="联系方式">
            <el-input v-model="formData.phone" :maxlength="11" size="small" placeholder="请填写联系方式"></el-input>
          </el-form-item>
          <el-form-item prop="idCard" label="身份证号">
            <el-input v-model="formData.idCard" size="small" placeholder="请填写身份证号"></el-input>
          </el-form-item>
          <el-form-item prop="addressCard" label="身份证地址">
            <el-input v-model="formData.addressCard" size="small" placeholder="请填写身份证地址"></el-input>
          </el-form-item>
          <el-form-item prop="status" label="状态">
            <el-switch v-model="formData.status"  active-color="#13ce66"></el-switch>
          </el-form-item>
          <el-form-item>
                <el-button type="primary" size="small" :loading="loadingStatus" @click="onSubmit" >提交</el-button>
                <el-button type="default" size="small" :loading="loadingStatus" @click="$refs.dialogView.handleClose()">取消</el-button>
          </el-form-item>
        </el-form>
  </el-dialog>
</template>
<script>
import {getUserInsert, getUserUpdate} from '@api/user.js'
export default {
  data() {
    return {
      data: {},
      visible: false,
      loadingStatus: false,
      dialogTitle:"",
      formData:{
        id:null,
        name:"",
        phone:"",
        idCard:"",
        addressCard:"",
        residential:"",
        role:"custom",
        status:true,
      },
      formRule:{
        name:[{ required: true, message: '请填写姓名', trigger: 'blur' }],
        phone:[{ required: true, message: '请填写联系方式', trigger: 'blur' }],
        idCard:[
            { required: true, message: '请填写身份证号', trigger: 'blur' },
            { min: 15, max: 18, message: '身份证号填写不正确', trigger: 'blur' }
        ],
        addressCard:[{ required: true, message: '请填写身份证地址', trigger: 'blur' }],
        residential:[{ required: true, message: '请填写房号', trigger: 'blur' }],
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
            getUserUpdate(formData).then(res => {
              this.loadingStatus = false;
              this.$message.success("修改成功")
              this.$refs.dialogView.handleClose()
              this.$emit("onSuccess")
            }).catch(err => {
              this.loadingStatus = false;
            })
          }else{
            getUserInsert(formData).then(res => {
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
