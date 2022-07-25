<template>
  <el-dialog v-dialogDrag :title="dialogTitle" :close-on-click-modal="false" width="30%" ref="dialogView" append-to-body :before-close="onBeforeClose" :visible.sync="visible">
        <el-form :model="formData" ref="formData" :rules="formRule" label-width="100px">
          <el-form-item prop="title" label="标题">
            <el-input v-model="formData.title" size="small" placeholder="请填写标题"></el-input>
          </el-form-item>
          <el-form-item prop="content" label="内容">
                <el-input type="textarea" size="small" placeholder="请填写内容" resize="none" :rows="6" v-model="formData.content"></el-input>
          </el-form-item>
          <el-form-item prop="status" label="状态">
            <el-switch v-model="formData.status" :inactive-value="0" :active-value="1" active-color="#13ce66"></el-switch>
          </el-form-item>
          <el-form-item>
                <el-button type="primary" size="small" :loading="loadingStatus" @click="onSubmit" >提交</el-button>
                <el-button type="default" size="small" :loading="loadingStatus" @click="$refs.dialogView.handleClose()">取消</el-button>
          </el-form-item>
        </el-form>
  </el-dialog>
</template>
<script>
    import { getNoticeInsert, getNoticeUpdate } from '@api/notice.js'
    export default {
        data () {
            return {
                data: {},
                visible: false,
                loadingStatus: false,
                dialogTitle: '',
                formData: {
                    id: null,
                    title: '',
                    content: '',
                    status: 1
                },
                formRule: {
                    title: [{ required: true, message: '请填写标题', trigger: 'blur' }],
                    content: [{ required: true, message: '请填写内容', trigger: 'blur' }]
                }
            }
        },
        mounted () {

        },
        methods: {
            open (row, title) {
                this.visible = true;
                this.dialogTitle = title;
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
                            getNoticeUpdate(formData).then(res => {
                                this.loadingStatus = false;
                                this.$message.success('修改成功')
                                this.$refs.dialogView.handleClose()
                                this.$emit('onSuccess')
                            }).catch(err => {
                                this.loadingStatus = false;
                            })
                        } else {
                            getNoticeInsert(formData).then(res => {
                                this.loadingStatus = false;
                                this.$message.success('添加成功')
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
                this.$refs.formData.resetFields();
                this.$nextTick(() => {
                    deno();
                })
            }
        }
    };
</script>
<style scoped></style>
