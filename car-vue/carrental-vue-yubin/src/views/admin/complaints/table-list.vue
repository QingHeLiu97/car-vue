<template>
  <el-card v-loading="loadingStatus" shadow="never">
    <el-table :data="tableData" border style="width: 100%" >
      <el-table-column header-align-="center" align="center" min-width="100" prop="id" label="ID"></el-table-column>
      <el-table-column header-align-="center" align="center" min-width="100" prop="userId" label="用户ID"></el-table-column>
      <el-table-column header-align-="center" align="center" min-width="100" prop="assessA" label="社区环境评价">
          <template slot-scope="{row}">
              {{row.assessA}}星
          </template>
      </el-table-column>
      <el-table-column header-align-="center" align="center" min-width="100" prop="assessB" label="社区设施评价">
            <template slot-scope="{row}">
              {{row.assessB}}星
          </template>
      </el-table-column>
      <el-table-column header-align-="center" align="center" min-width="100" prop="assessC" label="社区服务评价">
            <template slot-scope="{row}">
              {{row.assessC}}星
          </template>
      </el-table-column>
      <el-table-column header-align-="center" align="center" min-width="100" prop="content" label="意见和建议"></el-table-column>
      <el-table-column header-align-="center" align="center" width="200" prop="createTime" label="创建时间"></el-table-column>
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
  </el-card>
</template>
<script>
    import { getComplaintList } from "@api/complaint.js"
    export default {
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
                getComplaintList({ pageSize, current, ...formData }).then(res => {
                    this.total = res.result.total;
                    this.tableData = res.result.records;
                    this.loadingStatus = false;
                }).catch(err => {
                    this.loadingStatus = false
                })
            },
            // 查看明细
            handleView(row){
            },
            // 处理
            handleUpdate (row) {
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
