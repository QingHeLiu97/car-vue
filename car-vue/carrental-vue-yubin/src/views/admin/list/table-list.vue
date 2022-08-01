<template>
  <el-card v-loading="loadingStatus" shadow="never">
    <div style="margin-bottom:20px">
      <el-button type="primary" size="small" @click="handleCreate">新增用户</el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%" >
      <el-table-column header-align-="center" align="center" min-width="100" prop="id" label="ID"></el-table-column>
      <el-table-column header-align-="center" align="center" min-width="200" prop="user_id" label="用户编号"></el-table-column>
      <el-table-column header-align-="center" align="center" min-width="100" prop="username" label="姓名"></el-table-column>
      <el-table-column header-align-="center" align="center" min-width="150" prop="sex" label="性别"></el-table-column>
      <el-table-column header-align-="center" align="center" min-width="150" prop="phone" label="手机号"></el-table-column>
      <el-table-column header-align-="center" align="center" min-width="150" prop="email" label="用户邮箱"></el-table-column>
      <el-table-column header-align-="center" align="center" min-width="200" prop="id_card" label="身份证号"></el-table-column>
      <el-table-column header-align-="center" align="center" min-width="200" prop="create_time" label="创建时间"></el-table-column>
      <el-table-column header-align-="center" align="center" min-width="200" prop="update_time" label="更新时间"></el-table-column>
      <el-table-column header-align-="center" align="center" min-width="100" prop="status" label="状态">
        <template slot-scope="{row}">
          <el-tag type="success" size="small" v-if="row.status == 1">正常</el-tag>
          <el-tag type="info" size="small" v-else>禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" fixed="right"  width="250" label="操作">
        <template slot-scope="{row}">
             <!-- <el-button type="default" size="small">查看</el-button> -->
			 <el-popconfirm placement="top" title="确定要重置密码吗？" @confirm="handleRestPassword(row)">
			  <el-button slot="reference" type="default" size="small" style="margin-right:10px">重置密码</el-button>
			 </el-popconfirm>
             <el-button type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
             <el-popconfirm placement="top" title="确定要删除这条数据吗" @confirm="handleDele(row)">
              <el-button slot="reference" type="danger" size="small" style="margin-left:10px">删除</el-button>
             </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align:right; margin-top:20px;">
        <el-pagination
        @current-change="handleChangeCurrent"
        @size-change="handleChangePageSizes"
        background
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <table-edti @onSuccess="getData" ref="tableEdti"></table-edti>
  </el-card>
</template>
<script>
    import { getUserList,deleteUser} from '@api/user.js'
    import tableEdti from './table-edte.vue'
    export default {
        components: { tableEdti },
        data () {
            return {
                loadingStatus: false, // 列表加载状态
                tableData: [], // 列表数据
                total: 0, // 总条数
                pageSize: 10, // 每条总数
                currentPage: 1, // 当前页
                pageSizes: [10, 20, 30, 40] // 每条总数配置
            }
        },
        methods: {
            getData () {
                this.loadingStatus = true
                var pageSize = this.pageSize
                var current = this.currentPage
                var formData = this.$parent.$refs.tableForm.formData;
                getUserList({ current, pageSize, role: 'user', ...formData }).then(res => {
                    this.total = res.result.total;
                    this.tableData = res.result.records;
                    this.loadingStatus = false;
                }).catch(err => {
                    this.loadingStatus = false
                })
            },
            handleCreate () {
                this.$refs.tableEdti.open(undefined, '新增用户')
            },
            handleEdit (row) {
                this.$refs.tableEdti.open(row, '修改用户')
            },
            handleDele (row) {
                deleteUser({ id: row.id }).then(res => {
                    this.getData();
                }).catch(err => {

                })
            },
            handleChangePageSizes (val) {
                this.pageSize = val
                this.getData()
            },
            handleChangeCurrent (val) {
                this.currentPage = val
                this.getData()
            }
        }
    }
</script>
<style scoped>

</style>
