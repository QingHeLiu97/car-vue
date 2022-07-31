<template>
  <div style="width: 60%;margin:0 auto;">
    <el-card shadow="never">
      <el-form :model="formData" ref="formData" :rules="formRule" label-width="100px">
        <el-form-item prop="residential" label="username">
          <el-input v-model="formData.residential" disabled size="small" placeholder="请填写姓名"></el-input>
        </el-form-item>
        <el-form-item prop="username" label="姓名">
          <el-input v-model="formData.username" size="small" placeholder="请填写姓名"></el-input>
        </el-form-item>
        <el-form-item prop="phone" label="联系方式">
          <el-input v-model="formData.phone" :maxlength="11" size="small" placeholder="请填写联系方式"></el-input>
        </el-form-item>
        <el-form-item prop="id_card" label="身份证号">
          <el-input v-model="formData.id_card" disabled size="small" placeholder="请填写身份证号"></el-input>
        </el-form-item>
        <el-form-item prop="address" label="身份证地址">
          <el-input v-model="formData.address" disabled size="small" placeholder="请填写身份证地址"></el-input>
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

    export default {
        data () {
            return {
                data: {},
                visible: false,
                loadingStatus: false,
                dialogTitle: '',
                formData: {
                    id: null,
                    name: '',
                    phone: '',
                    idCard: '',
                    addressCard: '',
                    residential: '',
                    role: 'admin',
                    status: true
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
            this.getForm(this.formData)
        },
        methods: {
            ...mapActions('account', ['accountAuthUpdate']),
            // 提交的回调
            onSubmit () {
                this.$refs.formData.validate((vali) => {
                    if (vali) {
                        var formData = this.formData;
                        this.loadingStatus = true;
                        this.accountAuthUpdate(formData).then(res => {
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
