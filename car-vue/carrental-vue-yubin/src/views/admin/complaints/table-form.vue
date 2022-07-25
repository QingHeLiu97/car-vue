<template>
    <el-card class="box-card" shadow="never">
        <el-form @submit.native.prevent :inline="false" :model="formData" ref="formData" label-width="100px">
          <el-row>
            <el-col :span="6">
              <el-form-item label="社区环境" prop="assessA">
                <el-select v-model="formData.assessA" size="small" clearable style="width:100%;" placeholder="请选择评分等级">
                    <el-option label="一星" :value="1"></el-option>
                    <el-option label="二星" :value="2"></el-option>
                    <el-option label="三星" :value="3"></el-option>
                    <el-option label="四星" :value="4"></el-option>
                    <el-option label="五星" :value="5"></el-option>
                  </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="社区设备" prop="assessB">
                <el-select v-model="formData.assessB" size="small" clearable style="width:100%;" placeholder="请选择评分等级">
                    <el-option label="一星" :value="1"></el-option>
                    <el-option label="二星" :value="2"></el-option>
                    <el-option label="三星" :value="3"></el-option>
                    <el-option label="四星" :value="4"></el-option>
                    <el-option label="五星" :value="5"></el-option>
                  </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="社区服务" prop="assessC">
                <el-select v-model="formData.assessC" size="small" clearable style="width:100%;" placeholder="请选择评分等级">
                    <el-option label="一星" :value="1"></el-option>
                    <el-option label="二星" :value="2"></el-option>
                    <el-option label="三星" :value="3"></el-option>
                    <el-option label="四星" :value="4"></el-option>
                    <el-option label="五星" :value="5"></el-option>
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
                    assessA: '',
                    assessB: '',
                    assessC: '',
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
