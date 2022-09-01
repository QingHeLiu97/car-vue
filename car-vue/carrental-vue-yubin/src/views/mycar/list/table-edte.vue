<template>
  <el-dialog v-dialogDrag :title="dialogTitle" :close-on-click-modal="false" width="30%" ref="dialogView" append-to-body :before-close="onBeforeClose" :visible.sync="visible">
        <el-form :model="formData" ref="formData" :rules="formRule" label-width="100px">
          <el-form-item prop="type" label="类型">
            <el-input v-model="formData.type" size="small" placeholder="请填写类型"></el-input>
          </el-form-item>
          <el-form-item prop="color" label="颜色">
            <el-input v-model="formData.color" size="small" placeholder="请填写颜色"></el-input>
          </el-form-item>
          <el-form-item prop="price" label="价格">
            <el-input v-model="formData.price" :maxlength="11" size="small" placeholder="请填写价格"></el-input>
          </el-form-item>
          <el-form-item prop="deposit" label="押金">
            <el-input v-model="formData.deposit" size="small" placeholder="请填写押金"></el-input>
          </el-form-item>
          <el-form-item prop="carname" label="车名">
            <el-input v-model="formData.carname" size="small" placeholder="请填写车名"></el-input>
          </el-form-item>
            <el-form-item prop="userPhone" label="车主联系方式">
                <el-input v-model="formData.userPhone" size="small" placeholder="请填写车名"></el-input>
            </el-form-item>
          <el-form-item prop="status" label="状态">
              <el-switch    v-model="formData.status"
                            class="switch"
                            active-value="1"
                            inactive-value="0"
                            active-text="已出租"
                            inactive-text="未出租"></el-switch>
          </el-form-item>
          <el-form-item>
                <el-button type="primary" size="small" :loading="loadingStatus" @click="onSubmit" >提交</el-button>
                <el-button type="default" size="small" :loading="loadingStatus" @click="$refs.dialogView.handleClose()">取消</el-button>
          </el-form-item>
        </el-form>
  </el-dialog>
</template>
<script>
import { insertCar, updateCar } from '@api/car.js'
import {getCarList} from "../../../api/car";
export default {
  data() {
    return {
      data: {},
      visible: false,
      loadingStatus: false,
      dialogTitle:"",
      username: "",
      formData:{
        carId:null,
        type:"",
        color:"",
        price:"",
        deposit:"",
        userPhone:"",
        carname:"",
        status: "",
      },
      formRule:{
        deposit:[{ required: true, message: '请填写押金', trigger: 'blur' }],
        price:[{ required: true, message: '请填写价格', trigger: 'blur' }],
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
          if(formData.carId){
            updateCar(formData).then(res => {
              this.loadingStatus = false;
              this.$message.success("修改成功")
              this.$refs.dialogView.handleClose()
              this.$emit("onSuccess")
                // getCarList({ formData }).then(res => {
                //     console.log("成功", res)
                //     this.tableData = res.result
                //     this.loadingStatus = false
                // }).catch(err => {
                //     console.log("失败", err)
                //     this.tableData = err
                //     this.loadingStatus = false
                // })
            }).catch(err => {
              this.loadingStatus = false;
            })
          }else{
            insertCar(formData).then(res => {
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
