<template>
    <el-card class="box-card" shadow="never">
        <el-form @submit.native.prevent :inline="false" :model="formData" ref="formData" label-width="100px">
          <el-row>
            <el-col :span="3">
              <el-form-item label="id" prop="id" style="margin: 0;">
                  <el-input v-model="formData.id" size="small"  placeholder="序号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label="userId" prop="userId" style="margin: 0;">
                  <el-input v-model="formData.userId" size="small" clearable placeholder="请输入业主id"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label="phone" prop="phone" style="margin: 0;">
                  <el-input v-model="formData.phone" size="small" clearable placeholder="请输入业主手机号"></el-input>
              </el-form-item>
            </el-col>
              <el-col :span="3">
                  <el-form-item label="phone" prop="phone" style="margin: 0;">
                      <el-input v-model="formData.note" size="small" clearable placeholder="备注"></el-input>
                  </el-form-item>
              </el-col>
              <el-col :span="3" >
              <el-form-item label="create_time" style="margin: 0;" prop="create_time">
                  <el-input v-model="formData.creat_time" size="small"  placeholder="请输入创建时间"></el-input>
              </el-form-item>
              </el-col>
            <el-col :span="6">
              <el-form-item label="状态" prop="status" style="margin: 0;">
                  <el-select v-model="formData.status" size="small"  style="width:100%;" placeholder="请选择状态">
                    <el-option label="已缴费" :value="1"></el-option>
                    <el-option label="未缴费" :value="0"></el-option>
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
                    id: '',
                    userId: '',
                    username: '',
                    phone: '',
                    price: '',
                    note: '',
                    creat_time: '',
                    status: true
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
