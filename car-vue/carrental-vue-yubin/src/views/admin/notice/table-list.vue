<template>
  <el-card v-loading="loadingStatus" shadow="never">
    <div style="margin-bottom:20px">
      <el-button type="primary" @click="handleCreate"  size="small">发布公告</el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%" >
      <el-table-column header-align-="center" align="center" min-width="100" prop="id" label="ID"></el-table-column>
      <el-table-column header-align-="center" align="center" min-width="100" prop="title" label="标题"></el-table-column>
      <el-table-column header-align-="center" show-overflow-tooltip align="center" min-width="100" prop="content" label="内容"></el-table-column>
      <el-table-column header-align-="center" align="center" min-width="100" prop="status" label="状态">
        <template slot-scope="{row}">
          <el-tag type="success" size="small" v-if="row.status == 1">正常</el-tag>
          <el-tag type="info" size="small" v-else>禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column header-align-="center" align="center" width="200" prop="createTime" label="创建时间"></el-table-column>
      <el-table-column header-align="center" align="center" fixed="right"  width="250" label="操作">
        <template slot-scope="{row}">
             <!-- <el-button type="default" size="small">查看</el-button> -->
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
    <table-edit ref="tableEdit" @onSuccess="getData"></table-edit>
  </el-card>
</template>
<script>
    import { getNoticeList, getNoticeDelete } from '@api/notice.js'
    import tableEdit from './table-edte.vue'
    export default {
        components: { tableEdit },
        data () {
            return {
                loadingStatus: false, // 列表加载状态
                tableData: [{}], // 列表数据
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
                // var formData = this.$parent.$refs.tableForm.formData;
                getNoticeList({ current, pageSize }).then(res => {
                    this.total = res.result.total;
                    this.tableData = res.result.records;
                    this.loadingStatus = false;
                }).catch(err => {
                    this.loadingStatus = false
                })
            },
            // 查看明细
            handleViewFlow (row) {
                this.$refs.tableViewFlow.open(row)
            },
            // 新增用户
            handleCreate () {
                this.$refs.tableEdit.open(undefined, '新增公告')
            },
            // 编辑
            handleEdit (row) {
                this.$refs.tableEdit.open(row, '编辑公告')
            },
            // 删除
            handleDele (row) {
                getNoticeDelete({ id: row.id }).then(res => {
                    this.$message.success('删除成功')
                    this.getData()
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
