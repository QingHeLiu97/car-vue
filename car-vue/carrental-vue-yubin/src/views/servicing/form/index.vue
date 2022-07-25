<template>
    <div style="width: 60%;margin:0 auto;">
        <el-card shadow="never">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="联系人" prop="userName">
                <el-input v-model="ruleForm.userName" placeholder="请输入联系人姓名"></el-input>
            </el-form-item>
            <el-form-item label="联系号码" prop="userPhone">
                <el-input v-model="ruleForm.userPhone" placeholder="请输入联系电话"></el-input>
            </el-form-item>
            <el-form-item label="所在位置" prop="address">
                <el-input v-model="ruleForm.address" placeholder="请输入所在位置"></el-input>
            </el-form-item>
            <el-form-item label="设备名称" prop="equipmentName">
                <el-input v-model="ruleForm.equipmentName" placeholder="请输入设备名称"></el-input>
            </el-form-item>
            <el-form-item label="备注说明" prop="content">
                <el-input type="textarea" placeholder="请输入备注说明" resize="none" :rows="6" v-model="ruleForm.content"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" :loading="loadingStatus" @click="submitForm('ruleForm')">提交</el-button>
                <el-button type="default" :loading="loadingStatus" @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script>
  import {getServicingInsert} from "@api/servicing.js"
  import {mapState} from "vuex"
  export default {
    data() {
      return {
        ruleForm: {
          userName: '',
          userPhone: '',
          address: '',
          equipmentName: '',
          content: '',
        },
        rules: {
          userName: [{ required: true, message: '请输入联系人', trigger: 'blur' }],
          userPhone: [{ required: true, message: '请输入联系号码', trigger: 'blur' }],
          address: [{ required: true, message: '请输入所在位置', trigger: 'blur' }],
          equipmentName: [{ required: true, message: '请输入设备名称', trigger: 'blur' }],
          content: [{ required: true, message: '请输入备注说明', trigger: 'blur' }],
        },
        loadingStatus:false,
      };
    },
    computed:{
      ...mapState("account",["userInfo"]),
    },
    mounted(){
      this.ruleForm.userName = this.userInfo.name;
      this.ruleForm.userPhone = this.userInfo.phone;
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loadingStatus = true;
            var formData = this.ruleForm;
            getServicingInsert(formData).then(res=>{
              this.loadingStatus = false;
              this.$refs[formName].resetFields();
              this.$message.success("报修成功")
            }).catch(err=>{
              this.loadingStatus = false;
            })
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>