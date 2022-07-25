<template>
    <div style="width: 60%;margin:0 auto;">
        <el-card shadow="never">
            <el-form :model="formData" :rules="rules" ref="formData" label-width="100px">
            <el-form-item label="姓名" prop="userName" v-if="role == 'admin'">
                <el-input v-model="formData.userName" placeholder="请输入姓名" size="small"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="userPhone" v-if="role == 'admin'">
                <el-input v-model="formData.userPhone" placeholder="请输入手机号" size="small"></el-input>
            </el-form-item>
            <el-form-item label="缴费项目" prop="project">
                <el-input type="text" v-model="formData.project" disabled size="small" :placeholder="formData.project" />
            </el-form-item>
            <el-form-item label="缴费金额" prop="price">
                <el-input type="number" v-model="formData.price" disabled size="small" placeholder="缴费金额" />
            </el-form-item>
            <el-form-item label="支付方式" prop="type">
                <el-radio-group size="small"  v-model="formData.type">
                    <el-button  type="primary" size="small" :disabled="isPay" :loading="loadingStatus" @click="openPayDialog(formData.price)">{{formData.type}}</el-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="备注说明" prop="content">
                <el-input type="textarea"  size="small" :disabled="status" placeholder="请填写备注说明" resize="none" :rows="6" v-model="formData.content"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" :disabled="status" size="small" :loading="loadingStatus" @click="submitForm('formData')">确认缴纳</el-button>
                <el-button type="default" :disabled="status" size="small" :loading="loadingStatus" @click="resetForm('formData')">重置</el-button>
            </el-form-item>
            </el-form>
        </el-card>
        <!-- 支付弹窗 -->
        <el-dialog
            title="支付"
            :visible.sync="modal3"
            width="30%"
            :before-close="closePayDialog">
            <!-- 支付方式选择，按钮显示 -->
            <div class="pay-dialog-body" v-if="payBtn == true">
                <p>请选择支付方式：</p>
                <el-button type="primary"  size="small" @click="handlePayWxQRcode()">微信支付</el-button>
                <el-button type="primary" size="small" @click="handlePayAliQRcode()">支付宝支付</el-button>
            </div>
            <!-- 支付方式选择完成，按钮消失 -->
            <div v-if="payBtn == false">
                <div>
                    使用
                    <span v-if="payForWx == true" class="pay-for-method-1">微信</span>
                    <span v-if="payForAli == true" class="pay-for-method-2">支付宝</span>
                    扫一扫二维码进行支付
                </div>
                <div>注：若二维码过期失效，请刷新页面重新进入支付！</div>
                <!-- 微信支付二维码 -->
<!--                <div>-->
                <div id="qrcode" style="width: 100%;margin-left: 25%;margin-top: 10px;"></div>
<!--                    <el-radio-group size="small" >-->
<!--                        <el-button  id="qrcode" type="primary" size="small" :loading="loadingStatus" @click="getQRcode()">二维码</el-button>-->
<!--                    </el-radio-group>-->
<!--                </div>-->
            </div>
            <span slot="footer">
            <el-button @click="closePayDialog" size="small">返回</el-button>
        </span>
        </el-dialog>

    </div>
</template>
<script>
    import { getContributionInsert } from '@api/contribution.js'
    import { getPayFreeById } from '@api/payfree.js'
    import { mapState } from 'vuex'
    import Qrcode from 'qrcodejs2'
    export default {
        data () {
            return {
                loadingStatus: false,
                formData: {
                    userName: '',
                    userPhone: '',
                    project: '',
                    price: '',
                    type: '',
                    content: ''

                },
                rules: {
                    userPhone: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
                    userName: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
                    type: [{ required: true, message: '请选择缴费方式', trigger: 'blur' }]
                },
                modal3: false, // 是否打开支付弹窗
                payBtn: true, // 是否显示方式选择按钮
                payForWx: false, // 是否微信支付
                payForAli: false, // 是否支付宝支付
                getWxQrcode: false,
                isPay: false,
                status: false
            };
        },
        computed: {
            ...mapState('account', ['role', 'userInfo'])
        },
        mounted () {
            this.getData()
        },
        methods: {
            getData () {
                getPayFreeById(this.userInfo.id).then(res => {
                    console.log('res', res)
                    if (res.result == null) {
                        this.formData.price = 0
                        this.formData.type = '没有需要支付的账单'
                        this.isPay = true
                        this.status = true
                        this.formData.project = '你已全部缴清费用'
                    } else {
                        this.formData.price = res.result.price
                        this.formData.type = '点击支付'
                        this.formData.project = res.result.note
                        this.formData.userPhone = res.result.phone
                    }
                })
            },
            handlePayWxQRcode () {
                this.payBtn = false;
                this.payForWx = true;
                // this.$options.methods.getQRcode()
                this.$nextTick(() => {
                    this.getQRcode();
                });
            },
            handlePayAliQRcode () {
                this.payBtn = false;
                this.payForAli = true;
                // this.$options.methods.getQRcode()
                this.$nextTick(() => {
                    this.getQRcode();
                });
            },
            getQRcode () {
                var result = new Qrcode('qrcode', {
                    width: 200,
                    height: 200,
                    text: 'weixin://wxpay/bizpayur?pr=X8D912ad',
                    colorDark: 'black',
                    colorLight: 'white'
                })
            },
            submitForm (formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.loadingStatus = true;
                        var formData = this.formData;
                        var { phone, name, id } = this.userInfo;
                        if (this.role !== 'admin') {
                            formData.userName = name;
                            formData.phone = phone;
                        }
                        formData.userId = id;
                        getContributionInsert(formData).then(res => {
                            this.loadingStatus = false;
                            this.$refs[formName].resetFields();
                            this.$message.success('缴费成功')
                            window.location.reload()
                        }).catch(err => {
                            this.loadingStatus = false;
                        })
                    }
                });
            },
            resetForm (formName) {
                this.$refs[formName].resetFields();
            },
            openPayDialog () { // 打开支付窗口
                this.modal3 = true;
                this.payBtn = true; // 显示支付方式选择按钮
                this.payForWx = false;
                this.payForAli = false;
            },
            closePayDialog () { // 关闭支付窗口
                this.modal3 = false;
                this.payBtn = true;
                if (this.payForWx) {
                    this.formData.type = '微信'
                } else {
                    this.formData.type = '支付宝'
                }
                this.payForWx = false;
                this.payForAli = false;
                this.isPay = true;
            }
        }
    }
</script>
