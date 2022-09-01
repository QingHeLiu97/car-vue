<template>
  <div style="width: 60%;margin:0 auto;">
    <el-card shadow="never">
      <el-form :model="formData" ref="formData" label-width="100px">
        <el-form-item prop="userId" label="用户编号">
          <el-input v-model="formData.userId" disabled size="small" placeholder="用户编号"></el-input>
        </el-form-item>
        <el-form-item prop="username" label="用户名">
          <el-input v-model="formData.username" size="small" placeholder="请填写用户名"></el-input>
        </el-form-item>
        <el-form-item prop="phone" label="用户密码">
          <el-input v-model="formData.password" :maxlength="11" size="small" placeholder="请填写密码 ()"></el-input>
        </el-form-item>
          <el-form-item prop="sex" label="性别">
              <el-input v-model="formData.sex" :maxlength="11" size="small" placeholder="请填写性别(0：女，1、男)"></el-input>
          </el-form-item>
          <el-form-item prop="phone" label="联系方式">
              <el-input v-model="formData.phone" :maxlength="11" size="small" placeholder="请填写手机号码"></el-input>
          </el-form-item>
          <el-form-item prop="phone" label="邮箱地址">
              <el-input v-model="formData.email" :maxlength="11" size="small" placeholder="请填写邮箱地址"></el-input>
          </el-form-item>
        <el-form-item prop="id_card" label="身份证号">
          <el-input v-model="formData.idCard"  size="small" placeholder="请填写身份证号"></el-input>
        </el-form-item>
        <el-form-item prop="address" label="身份证地址">
          <el-input v-model="formData.address"  size="small" placeholder="请填写身份证地址"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" size="small" :loading="loadingStatus" @click="onSubmit">保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
    import { mapState, mapActions } from 'vuex'
    import {getUserInfo, updateUser} from '@api/user.js'
    export default {
        data () {
            return {
                data: {},
                visible: false,
                loadingStatus: false,
                dialogTitle: '',
                formData: {
                    userId: null,
                    username: '',
                    password: '',
                    sex: '',
                    phone: '',
                    idCard: '',
                    address: '',
                    email: '',
                    role: '',
                    status: ""
                }
            }
        },
        computed: {
            ...mapState('account', ['userInfo'])
        },
        mounted () {
            for (var key in this.formData) {
                this.formData[key] = this.userInfo[key];
            }
            console.log("输出登录信息",this.formData);
            // this.getForm(this.formData)
        },
        methods: {
            ...mapActions('account', ['accountAuthUpdate']),
            // 提交的回调
            onSubmit () {
                this.$refs.formData.validate((vali) => {
                    if (vali) {
                        var formData = this.formData;
                        this.loadingStatus = true;
                        updateUser(formData).then(res => {
                            this.loadingStatus = false;
                            this.$message.success('保存成功')
                        }).catch(() => {
                            this.loadingStatus = false;
                        })
                    }
                })
            },
            // 弹窗关闭之前的回调函数
            onBeforeClose (deno) {
                this.formData.id = null;
                this.$refs.formData.resetFields();
                this.$nextTick(() => {
                    deno();
                })
            }
        }

    };
</script>
