<template>
    <div class="a-login-box">
        <div>
            <!-- <img style="width:200px;height:200px" src="@src/assets/logo.png" alt=""> -->
        </div>
        <div class="a-login-body">
            <h3 style="text-align:center;font-size:25px; font-weight: 500;">金象社区物业管理系统</h3>
            <el-form @keyup.enter.native="handleLogin('formData')" :model="formData" status-icon :rules="rules" label-width="70px" ref="formData">
                <el-form-item label="账号" prop="residential">
                    <el-input type="text" :maxlength="15" placeholder="请输入登录账号"  v-model="formData.residential"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input :maxlength="15" :show-password="true" placeholder="请输入登录密码" type="password" v-model="formData.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <div class="a-login-button">
                        <el-button type="primary" :loading="loadingStatus" @click="handleLogin('formData')" >登 录</el-button>
                        <el-button type="default" :disabled="loadingStatus" @click="handleReset('formData')">重 置</el-button>
                    </div>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
    import { accountAuthLoginPic } from '@src/api/account.js'
    import { getMenuItem } from '@src/libs/util.js'
    import { mapActions } from 'vuex'
    export default {
        data () {
            var validateName = function (rule, value, callback) {
                if (value.length >= 2 && value.length <= 15) {
                    callback();
                } else {
                    callback(new Error('用户名为2~15位'));
                }
            }
            var validatePass = function (rule, value, callback) {
                var reg = /\w{6,15}$/
                if (!reg.test(value)) {
                    callback(new Error('密码长度6~15,密码规则不正确'));
                } else {
                    callback();
                }
            }
            return {
                loadingStatus: false,
                loadingCode: false,
                codeImg: '',
                inputType: 'password',
                formData: {
                    residential: '',
                    password: ''
                },
                rules: {
                    residential: [{ required: true, message: '请输入账号', trigger: 'blur' }, { validator: validateName, trigger: 'blur' }],
                    password: [{ required: true, message: '请输入密码', trigger: 'blur' }, { validator: validatePass, trigger: 'blur' }]
                }
            }
        },
        methods: {
            ...mapActions('account', ['accountLogin']),
            // 查看密码
            handleViewPass () {
                if (this.inputType == 'password') {
                    this.inputType = 'text'
                } else {
                    this.inputType = 'password'
                }
            },
            // 登录
            handleLogin (name) {
                var that = this;
                that.loadingStatus = true;
                that.$refs[name].validate((vail) => {
                    if (vail) {
                        var { password, residential } = that.formData;
                        // pwd = that.$md5(pwd);
                        that.accountLogin({ password, residential }).then(res => {
                            if (that.$route.query.redirect) {
                                var menuList = that.$store.state.menu.menuList;
                                var toPage = getMenuItem(that.$route.query.redirect, menuList) ? that.$route.query.redirect : '/';
                                that.$router.replace(toPage);
                            } else {
                                that.$router.replace('/');
                            }
                            that.loadingStatus = false;
                        }).catch(err => {
                            that.loadingStatus = false;
                        })
                    } else {
                        that.loadingStatus = false;
                    }
                })
            },
            // 重置
            handleReset (name) {
                this.$refs[name].resetFields()
                this.codeImg = ''
            }
        }
    }
</script>

<style scoped>
.a-login-box{
    width: 100%;
    height: 100vh;
    background: #2d3a4b;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.a-login-body{
    width: 400px;
    padding: 10px 30px;
    background: white;
    border-radius: 20px;
}
.a-input-code{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
.a-input-code > .code-box{
    width: 45%;
    height: 40px;
    overflow: hidden;
    flex-shrink: 0;
    text-align: center;
    border: 1px solid #DCDFE6;
    border-radius: 4px;
    cursor: pointer;
}
.a-login-button{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
</style>
