<template>
  <el-dialog v-dialogDrag :title="dialogTitle" :close-on-click-modal="false" width="30%" ref="dialogView" append-to-body :before-close="onBeforeClose" :visible.sync="visible">
        <el-form :model="formData" ref="formData" :rules="formRule" label-width="100px">
          <el-form-item prop="userId" label="编号">
            <el-input v-model="formData.userId" size="small"  :disabled="true"></el-input>
          </el-form-item>
          <el-form-item prop="username" label="姓名">
            <el-input v-model="formData.username" size="small" placeholder="请填写姓名"></el-input>
          </el-form-item>
            <el-form-item prop="sex" label="性别">
                <el-input v-model="formData.sex" size="small" placeholder="请填写性别(1:男、2：女)"></el-input>
            </el-form-item>
          <el-form-item prop="phone" label="联系方式">
            <el-input v-model="formData.phone" size="small" placeholder="请填写手机号码"></el-input>
          </el-form-item>
            <el-form-item prop="email" label="邮箱">
                <el-input v-model="formData.email" size="small" placeholder="请填写邮箱"></el-input>
            </el-form-item>
            <el-form-item prop="idCard" label="身份证号">
                <el-input v-model="formData.idCard" size="small" placeholder="请填写身份证号"></el-input>
            </el-form-item>
          <el-form-item prop="address" label="地址">
            <el-input v-model="formData.address" size="small" placeholder="请填写地址"></el-input>
          </el-form-item>
          <el-form-item prop="status" label="状态">
            <el-switch    v-model="formData.status"
                 class="switch"
                 active-value="1"
                 inactive-value="0"
                 active-text="封禁"
             inactive-text="正常"></el-switch>
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
import {insertUser} from "../../../api/user";
export default {
  data() {
    return {
      data: {},
      visible: false,
      loadingStatus: false,
      dialogTitle:"",
      formData:{
        userId: null,
        username:"",
        sex:"",
        phone:"",
        email:"",
        idCard:"",
        address:"",
        createTime:"",
        updateTime:"",
        role:"user",
        status:"",
      },
      formRule:{
        name:[{ required: true, message: '请填写姓名', trigger: 'blur' }],
        phone:[{ required: true, message: '请填写联系方式', trigger: 'blur' }],
        idCard:[
            { required: true, message: '请填写身份证号', trigger: 'blur' },
            { min: 15, max: 18, message: '身份证号填写不正确', trigger: 'blur' }
        ],
          address:[{ required: true, message: '请填写地址', trigger: 'blur' }],
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
          if(formData.userId){
            updateUser(formData).then(res => {
              this.loadingStatus = false;
              console.log("执行成功",res)
              this.$message.success("修改成功")
              this.$refs.dialogView.handleClose()
              this.$emit("onSuccess")
            }).catch(err => {
                console.log("添加失败",err)
              this.loadingStatus = false;
            })
          }else{
            insertUser(formData).then(res => {
              this.loadingStatus = false;
                console.log("添加成功",res)
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
