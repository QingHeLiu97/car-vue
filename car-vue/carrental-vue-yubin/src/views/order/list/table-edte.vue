<template>
  <el-dialog v-dialogDrag :title="dialogTitle" :close-on-click-modal="false" width="30%" ref="dialogView" append-to-body :before-close="onBeforeClose" :visible.sync="visible">
        <el-form :model="formData" ref="formData"  label-width="100px">
          <el-form-item prop="carId" label="汽车id">
            <el-input v-model="formData.carId" size="small" placeholder="请填写汽车id"></el-input>
          </el-form-item>
          <el-form-item prop="car_type" label="汽车类型">
            <el-input v-model="formData.carType" size="small" placeholder="请填写汽车类型"></el-input>
          </el-form-item>
            <el-form-item prop="carCircle" label="汽车图片">
               <img :src="formData.carCircle" size="small" class="el-avatarer">
            </el-form-item>
          <el-form-item prop="car_price" label="租车价格">
            <el-input v-model="formData.carPrice" :maxlength="11" size="small" placeholder="请填写租车价格"></el-input>
          </el-form-item>
          <el-form-item prop="deposit" label="租车押金">
            <el-input v-model="formData.deposit" size="small" placeholder="请填写租车押金"></el-input>
          </el-form-item>
          <el-form-item prop="user_id" label="租车人id">
            <el-input v-model="formData.userId" size="small" placeholder="请填写租车人id"></el-input>
          </el-form-item>
            <el-form-item prop="username" label="租车人姓名">
                <el-input v-model="formData.username" size="small" placeholder="请填写租车人姓名"></el-input>
            </el-form-item>
            <el-form-item prop="user_phone" label="租车人电话">
                <el-input v-model="formData.userPhone" size="small" placeholder="请填写租车人电话"></el-input>
            </el-form-item>
            <el-form-item prop="addressCard" label="租车人地址">
                <el-input v-model="formData.userAddress" size="small" placeholder="请填写租车人地址"></el-input>
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
import {insertCar, updateCar} from '@api/car.js'
import {insertOrder, updateOrder} from "../../../api/order";
import {mapState} from "vuex";
export default {
  data() {
    return {
      data: {},
      visible: false,
      loadingStatus: false,
      dialogTitle:"",
      formData:{
        orderId:null,
        carId:"",
        carPrice:"",
        carType:"",
        carColor:"",
        deposit:"",
        userId:"",
        username:"",
        userPhone:"",
        userAddress:"",
        handlresName:"",
        carCircle: "",
        createTime:"",
        status:"",
      }
    }
  },
  mounted () {

  },
    computed: {
        ...mapState('account', ['userInfo', 'role'])
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
          if(formData.orderId){
            updateOrder(formData).then(res => {
                console.log(res)
              this.loadingStatus = false;
              this.$message.success("修改成功")
              this.$refs.dialogView.handleClose()
              this.$emit("onSuccess")
            }).catch(err => {
              this.loadingStatus = false;
            })
          }else{
            insertOrder(formData).then(res => {
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
