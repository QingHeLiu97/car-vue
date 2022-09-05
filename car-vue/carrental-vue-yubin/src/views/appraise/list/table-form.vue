<template>
    <el-card class="box-card" shadow="never" hidden>
        <el-form @submit.native.prevent :inline="false" :model="formData" ref="formData" label-width="100px">
          <el-row>
            <el-col :span="6">
              <el-form-item label="创建人" prop="create_by">
                  <el-input v-model="formData.create_by" size="small" clearable placeholder="请输入创建人"></el-input>
              </el-form-item>
            </el-col>
              <el-col :span="6">
                  <el-form-item label="评价等级" prop="level">
                      <el-input v-model="formData.level" size="small" clearable placeholder="请输入评价等级"></el-input>
                  </el-form-item>
              </el-col>
            <el-col :span="6">
              <el-form-item label="状态" prop="status">
                  <el-select v-model="formData.status" size="small" clearable style="width:100%;" placeholder="请选择状态">
                    <el-option label="正常" :value="1"></el-option>
                    <el-option label="禁用" :value="0"></el-option>
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
