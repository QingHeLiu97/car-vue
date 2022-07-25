<template>
  <el-card v-loading="loadingStatus" shadow="never">
    <div style="margin-bottom:20px">
      <el-button type="primary" size="small" @click="handleCreate">新增管理员</el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%" >
      <el-table-column header-align-="center" align="center" min-width="100" prop="id" label="ID"></el-table-column>
      <!-- <el-table-column header-align-="center" align="center" min-width="100" prop="avatar" label="头像">
        <template slot-scope="{row}">
          <el-avatar shape="square" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
        </template>
      </el-table-column> -->
      <el-table-column header-align-="center" align="center" min-width="200" prop="residential" label="账号"></el-table-column>
      <el-table-column header-align-="center" align="center" min-width="100" prop="name" label="姓名"></el-table-column>
      <el-table-column header-align-="center" align="center" min-width="150" prop="phone" label="联系方式"></el-table-column>
      <el-table-column header-align-="center" align="center" min-width="200" prop="idCard" label="身份证号"></el-table-column>
      <el-table-column header-align-="center" align="center" min-width="200" prop="addressCard" label="身份证地址"></el-table-column>
      <el-table-column header-align-="center" align="center" min-width="100" prop="status" label="状态">
        <template slot-scope="{row}">
          <el-tag type="success" size="small" v-if="row.status == 1">正常</el-tag>
          <el-tag type="info" size="small" v-else>禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column header-align-="center" align="center" min-width="200" prop="createTime" label="创建时间"></el-table-column>
      <el-table-column header-align="center" align="center" fixed="right"  width="250" label="操作">
        <template slot-scope="{row}">
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
    import { getUserList, getUserDelete, getUserUpdate } from '@api/user.js'
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
            // 获取数据
            getData () {
                this.loadingStatus = true
                var pageSize = this.pageSize
                var current = this.currentPage
                var formData = this.$parent.$refs.tableForm.formData;
                getUserList({ current, pageSize, role: 'admin', ...formData }).then(res => {
                    this.total = res.result.total;
                    this.tableData = res.result.records;
                    this.loadingStatus = false;
                }).catch(err => {
                    this.loadingStatus = false
                })
            },
            // 新增用户
            handleCreate () {
                this.$refs.tableEdti.open(undefined, '新增管理员')
            },
            // 重置密码
            handleRestPassword (row) {
                getUserUpdate({ id: row.id, password: '123456' }).then(res => {
                    this.$message.success('密码重置成功')
                }).catch(err => {

                })
            },
            // 编辑
            handleEdit (row) {
                this.$refs.tableEdti.open(row, '编辑管理员')
            },
            // 删除
            handleDele (row) {
                getUserDelete({ id: row.id }).then(res => {
                    this.getData();
                }).catch(err => {

                })
            },
            // 切换每页行数
            handleChangePageSizes (val) {
                this.pageSize = val
                this.getData()
            },
            // 切换页面
            handleChangeCurrent (val) {
                this.currentPage = val
                this.getData()
            }
        }
    }
</script>
<style scoped>

</style>
