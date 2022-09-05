<template>
    <el-card class="box-card" shadow="never" hidden>
        <el-form @submit.native.prevent :inline="false" :model="formData" ref="formData" label-width="100px">
          <el-row>
            <el-col :span="6">
              <el-form-item label="姓名" prop="username">
                  <el-input v-model="formData.username" size="small" clearable placeholder="请输入业主姓名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="手机号" prop="phone">
                  <el-input v-model="formData.phone" size="small" clearable placeholder="请输入手机号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="身份证号" prop="idCard">
                  <el-input v-model="formData.idCard" size="small" clearable placeholder="请输入身份证号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="状态" prop="status">
                  <el-select v-model="formData.status" size="small" clearable style="width:100%;" placeholder="请选择状态">
                    <el-option label="正常" :value="0"></el-option>
                    <el-option label="禁用" :value="1"></el-option>
                  </el-select>
              </el-form-item>
            </el-col>
              <el-col :span="24">
                <el-form-item style="margin: 0;">
                  <el-button type="primary" size="small" @click="onSubmit">查询</el-button>
                  <el-button type="default" size="small" @click="onReset">重置</el-button>
                </el-form-item>
            </el-col>
          </el-row>
        </el-form>
    </el-card>
</template>
<script>
    export default {
        data () {
            return {
                formData: {
                    name: '',
                    phone: '',
                    idCard: '',
                    status: '',
                }
            }
        },
        methods: {
            onSubmit () {
                this.$parent.$refs.tableList.currentPage = 1;
                this.$emit('onSubmit');
            },
            onReset () {
                this.$parent.$refs.tableList.currentPage = 1;
                this.$refs.formData.resetFields()
                this.$emit('onReset');
            }
        }
    }
</script>
