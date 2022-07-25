<template>
  <el-dialog v-dialogDrag :title="dialogTitle" :close-on-click-modal="false" width="30%" ref="dialogView" append-to-body :before-close="onBeforeClose" :visible.sync="visible">
        <el-form :model="formData" ref="formData" :rules="formRule" label-width="100px">
          <el-form-item prop="id" label="id" style="display: none">
            <el-input v-model="formData.id" disabled  size="small" placeholder=""></el-input>
          </el-form-item>
          <el-form-item prop="userId" label="用户id">
            <el-input v-model="formData.userId" :disabled="formData.id != null" size="small" ></el-input>
          </el-form-item>
          <el-form-item prop="username" label="业主"  v-if="formData.id !=null">
            <el-input v-model="formData.username" :disabled="formData.id != null"  size="small" placeholder="请填业主名"></el-input>
          </el-form-item>
            <el-form-item prop="phone" label="联系方式" v-if="formData.id !=null">
                <el-input v-model="formData.phone" :disabled="formData.id != null"   size="small" placeholder="请填电话号码"></el-input>
            </el-form-item>
            <el-form-item prop="price" label="代缴费用">
                <el-input v-model="formData.price" :maxlength="11" size="small" placeholder="请填金额"></el-input>
            </el-form-item>
            <el-form-item prop="price" label="缴费明细">
                <el-input v-model="formData.note" :maxlength="50" size="small" placeholder="请填写备注"></el-input>
            </el-form-item>
          <el-form-item prop="status" label="缴费状态" v-if="formData.id!=null" >
            <el-switch v-model="formData.status"  :disabled="formData.status"  active-color="#13ce66"></el-switch>
          </el-form-item>
          <el-form-item>
                <el-button type="primary" size="small" :loading="loadingStatus" @click="onSubmit" >提交</el-button>
                <el-button type="default" size="small" :loading="loadingStatus" @click="$refs.dialogView.handleClose()">取消</el-button>
          </el-form-item>
        </el-form>
  </el-dialog>
</template>
<script>
    import { insertPayfree, updatePayFree } from '@api/payfree.js'
    export default {
        data () {
            return {
                data: {},
                visible: false,
                loadingStatus: false,
                dialogTitle: '',
                formData: {
                    id: null,
                    userId: '',
                    username: '',
                    phone: '',
                    price: '',
                    note: '',
                    creat_time: '',
                    status: ''
                },
                formRule: {
                    userId: [{ required: true, message: '请填写业主id', trigger: 'blur' }],
                    phone: [{ required: true, message: '请填写业主号码', trigger: 'blur' }],
                }
            }
        },
        mounted () {

        },
        methods: {
            open (row, title) {
                this.visible = true;
                this.dialogTitle = title;
                if (row.status == 1) {
                    row.status = true
                } else {
                    row.status = false
                }
                if (row) {
                    this.$nextTick(() => {
                        for (var key in this.formData) {
                            this.formData[key] = row[key]
                        }
                    })
                }
            },
            // 提交的回调
            onSubmit () {
                this.$refs.formData.validate((vali) => {
                    if (vali) {
                        var formData = this.formData;
                        this.loadingStatus = true;
                        if (formData.id) {
                            if (formData.status) {
                                formData.status = 1
                            } else {
                                formData.status = 0
                            }
                            updatePayFree(formData).then(res => {
                                this.loadingStatus = false;
                                this.$message.success('修改成功')
                                this.$refs.dialogView.handleClose()
                                this.$emit('onSuccess')
                            }).catch(err => {
                                this.loadingStatus = false;
                            })
                        } else {
                            insertPayfree(formData).then(res => {
                                this.loadingStatus = false;
                                this.$message.success('添加成功')
                                this.formData.note = ''
                                this.$refs.dialogView.handleClose()
                                this.$emit('onSuccess')
                            }).catch(err => {
                                this.loadingStatus = false;
                            })
                        }
                    }
                })
            },
            // 弹窗关闭之前的回调函数
            onBeforeClose (deno) {
                this.formData.id = null;
                this.formData.note = ''
                this.$refs.formData.resetFields();
                this.$nextTick(() => {
                    deno();
                })
            }
        }
    };
</script>
<style scoped></style>
