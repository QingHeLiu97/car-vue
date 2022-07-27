<template>
    <div class="a-header-box">
        <div class="a-header-title" style="font-weight: 600; font-size:16px">
            {{menuItemTitle || ''}}
        </div>
        <div class="a-header-extra" style="font-weight: 600;">
            <el-dropdown style="color: #212121; font-size:16px">
                <span class="a-dropdown-link">
                    <span style="margin-right:10px" v-if="role=='admin'">【管理员】{{userInfo ?  userInfo.name : "用户名"}}</span>
					<span style="margin-right:10px" v-if="role=='user'">【业主】{{userInfo ?  userInfo.name : "用户名"}}</span>
					<span style="margin-right:10px" v-if="role=='superAdmin'">【超级管理员】{{userInfo ?  userInfo.name : "用户名"}}</span>
                    <el-avatar size="medium" :src="userInfo ?  userInfo.avatar : circleUrl"></el-avatar>
                    <i class="el-icon-caret-bottom el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <router-link style="text-decoration: none;" to="/system/userInfo">
                        <el-dropdown-item icon="el-icon-user">个人中心</el-dropdown-item>
                    </router-link>
                    <el-dropdown-item icon="el-icon-edit" @click.native="handleUpDatePass">修改密码</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-switch-button" @click.native="handleLogout" divided>退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <el-dialog
            v-dialogDrag
            ref="formDialog"
            title="修改密码"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
            <el-form :model="formData" :rules="formRule" size="small" ref="formData" label-width="80px" >
                <el-form-item label="原密码" prop="oldPassword">
                    <el-input type="password" placeholder="请输入密码" v-model="formData.oldPassword"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" placeholder="请输入密码" v-model="formData.password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="passwordCheck">
                    <el-input type="password" placeholder="请再次输入密码" v-model="formData.passwordCheck"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" :loading="loadingStatus" @click="onSubmitForm('formData')">提交</el-button>
                    <el-button :disabled="loadingStatus" @click="onResetForm('formData')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
    import { mapState, mapActions } from 'vuex'
    export default {
        data () {
            var validateOldPass = (rule, value, callback) => {
                if (this.userInfo.password == value) {
                    callback();
                } else {
                    callback(new Error('原密码不正确'));
                }
            }
            var validatePass = (rule, value, callback) => {
                var reg = /\w{6,15}$/
                if (value === '') {
                    callback(new Error('请输入登录密码'));
                } else if (!reg.test(value)) {
                    callback(new Error('密码长度是6~15位，由数字、字母、下划线组成'));
                } else {
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.formData.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                dialogVisible: false,
                loadingStatus: false,
                formData: {
                    oldPassword: '',
                    password: '',
                    passwordCheck: ''
                },
                formRule: {
                    oldPassword: [{ required: true, validator: validateOldPass, trigger: 'blur' }],
                    password: [{ required: true, validator: validatePass, trigger: 'blur' }],
                    passwordCheck: [{ required: true, validator: validatePass2, trigger: 'blur' }]
                },
                circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
            }
        },
        computed: {
            ...mapState('menu', ['menuItemTitle']),
            ...mapState('account', ['userInfo', 'role'])
        },
        methods: {
            ...mapActions('account', ['accountLogout', 'accountAuthUpdate']),
            // 退出登录
            handleLogout () {
                var that = this;
                that.accountLogout().then(res => {
                    that.$router.push({
                        path: '/login'
                    })
                })
            },
            // 修改密码
            handleUpDatePass () {
                this.dialogVisible = true;
            },
            // 弹框关闭前的回调
            handleClose (deno) {
                this.$refs.formData.resetFields();
                this.$nextTick(() => {
                    deno()
                })
            },
            // 提交
            onSubmitForm (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        var { password } = this.formData;
                        var { id, phone, name } = this.userInfo;
                        this.loadingStatus = true;
                        this.accountAuthUpdate({ password, id }).then(res => {
                            this.loadingStatus = false;
                            this.$refs.formDialog.handleClose()
                            this.$message.success('密码修改成功,请重新登录')
                            this.$router.push({
                                path: '/login'
                            })
                        }).catch(err => {
                            this.loadingStatus = false;
                        })
                    }
                });
            },
            // 重置
            onResetForm (name) {
                this.$refs[name].resetFields();
            }
        }
    }
</script>
<style scoped>
.a-header-box{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    /* background: white; */
    /* font-weight: 600; */
    color: #212121;
}
.a-dropdown-link{
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
