<template>
    <el-card class="box-card" shadow="never">
        <el-form @submit.native.prevent :inline="false" :model="formData" ref="formData" label-width="100px">
          <el-row>
<!--            <el-col :span="6">-->
<!--              <el-form-item label="缴费项目" prop="project">-->
<!--                  <el-select v-model="formData.project" size="small" clearable style="width:100%" placeholder="请选择缴费项目">-->
<!--                    <el-option label="水电费" value="水电费"></el-option>-->
<!--                    <el-option label="物业费" value="物业费"></el-option>-->
<!--                    <el-option label="燃气费" value="燃气费"></el-option>-->
<!--                  </el-select>-->
<!--              </el-form-item>-->
<!--            </el-col>-->
            <el-col :span="6">
              <el-form-item label="缴费方式" prop="type">
                  <el-select v-model="formData.type" size="small" clearable style="width:100%" placeholder="请选择缴费方式">
                    <el-option label="支付宝" value="支付宝"></el-option>
                    <el-option label="微信" value="微信"></el-option>
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
                    project: '',
                    type: '',
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
