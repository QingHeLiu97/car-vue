<template>
    <div style="width: 60%;margin:0 auto;">
        <el-card shadow="never" >
            <el-form :model="formData" :rules="rules" ref="formData" label-width="100px"  v-if="!isAssess">
              <el-form-item label="社区环境:" prop="assessA" >
                <div style="display:flex; align-items:center; height:30px">
                  <el-rate v-model="formData.assessA"  :texts="texts" show-text></el-rate>
                </div>
              </el-form-item>
              <el-form-item label="社区设施:" prop="assessB" >
                <div style="display:flex; align-items:center; height:30px">
                  <el-rate v-model="formData.assessB"  :texts="texts" show-text></el-rate>
                </div>
              </el-form-item>
              <el-form-item label="社区服务:" prop="assessC" >
                <div style="display:flex; align-items:center; height:30px">
                  <el-rate v-model="formData.assessC"  :texts="texts" show-text></el-rate>
                </div>
              </el-form-item>
              <el-form-item label="建议或意见" >
                  <el-input type="textarea" size="small" placeholder="请填写您的建议或意见" resize="none" :rows="6" v-model="formData.content"></el-input>
              </el-form-item>
              <el-form-item>
                  <el-button type="primary" size="small" :loading="loadingStatus" @click="submitForm('formData')">立即提交</el-button>
                  <el-button type="default" size="small" :loading="loadingStatus" @click="resetForm('formData')">重置</el-button>
              </el-form-item>
            </el-form>
            <el-result icon="success" v-else title="今日已评价" subTitle="感谢您对我们的评价和宝贵的意见与建议"></el-result>
        </el-card>
    </div>
</template>
<script>
    import { getComplaintInsert } from '@api/complaint.js'
    import { mapState } from 'vuex'
    export default {
        data () {
            var checkAssess = function (rule, value, callback) {
                if (value > 0) {
                    callback()
                } else {
                    callback(new Error('请进行评级'))
                }
            }
            return {
                texts: ['一星', '二星', '三星', '四星', '五星'],
                loadingStatus: false,
                isAssess: false,
                formData: {
                    // id:null,
                    assessA: 5,
                    assessB: 5,
                    assessC: 5,
                    content: ''
                },
                rules: {
                    assessA: [{ required: true, validator: checkAssess, trigger: 'change' }],
                    assessB: [{ required: true, validator: checkAssess, trigger: 'change' }],
                    assessC: [{ required: true, validator: checkAssess, trigger: 'change' }],
                    content: [{ required: true, message: '请填写您对我们的建议或意见', trigger: 'blur' }]
                }
            };
        },
        computed: {
            ...mapState('account', ['userInfo'])
        },
        methods: {
            submitForm (formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.loadingStatus = true;
                        var formData = this.formData;
                        var userId = this.userInfo.id;
                        formData.userId = userId;
                        getComplaintInsert(formData).then(res => {
                            this.loadingStatus = false;
                            this.$refs[formName].resetFields();
                            this.$message.success(res.message);
                            this.isAssess = true;
                        }).catch(err => {
                            this.loadingStatus = false;
                        })
                    }
                });
            },
            resetForm (formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>
<style>
.el-rate__icon{
  font-size: 30px;
}
.el-rate__text{
  font-size: 20px;
}
</style>
