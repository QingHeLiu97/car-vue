<template>
  <el-dialog v-dialogDrag :title="dialogTitle" :close-on-click-modal="false" width="30%" ref="dialogView" append-to-body :before-close="onBeforeClose" :visible.sync="visible">
        <el-form :model="formData" ref="formData" :rules="formRule" label-width="100px">
          <el-form-item prop="type" label="类型">
            <el-input v-model="formData.type" size="small" placeholder="请填写类型"></el-input>
          </el-form-item>
          <el-form-item prop="carCircle" label="上传图片">
              <el-upload
                  v-model = "formData.carCircle"
                  ref="upload"
                  action=""
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove"
                  :on-change="UploadImage"
                  :limit="1"
                  :file-list="fileList"
                  :auto-upload="false"
              >
                  <i class="el-icon-plus"></i>
                  <template #tip>
                      <div style="font-size: 12px;color: #919191;">
                          单次限制上传一张图片
                      </div>
                  </template>
              </el-upload>

              <el-dialog v-model="dialogVisible" style="line-height: 0;">
                  <img style="width: 100%;height: 100%"  :src="formData.carCircle" alt="" />
              </el-dialog>
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
            <el-input v-model="formData.carname" size="small" placeholder="请给你爱车起个名字"></el-input>
          </el-form-item>
          <el-form-item prop="status" label="状态">
              <el-switch    v-model="formData.status"
                            action=""
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
import {mapState} from "vuex";
export default {
  data() {
    return {
      fileList:[],
      dialogVisible: false,
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
        status: ""
      },
      formRule:{
        deposit:[{ required: true, message: '请填写押金', trigger: 'blur' }],
        price:[{ required: true, message: '请填写价格', trigger: 'blur' }],
      },
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
          var role = this.userInfo.role
          var phone = this.userInfo.phoone
          this.loadingStatus = true;
          if(formData.carId){
            updateCar({  role:role,phone: phone, ...formData }).then(res => {
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
            insertCar({  role:role,phone: phone, ...formData }).then(res => {
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

      //上传图片的方法
      UploadImage(file,filelist) {
          console.log(file);
          let fd = new FormData()
          fd.append('file', file.raw) //传给后台接收的名字 file
          this.$axios.post('/localhost/upload/image', fd, {headers: {'Content-Type': 'multipart/form-data'}}).then(response => {
              //上传成功后返回的数据,
              console.log("上传图片到:"+response.data);
              // 将图片地址给到表单.
              this.formData.carCircle = response.data
          })

      },
      //移除图片功能
      handleRemove(file, fileList) {
          console.log(file, fileList)

      },
      //预览图片功能
      handlePictureCardPreview(file) {
          console.log(file.url);
          this.dialogVisible = true
          this.formData.carCircle = file.url
      }
  }
};
</script>
<style scoped></style>
