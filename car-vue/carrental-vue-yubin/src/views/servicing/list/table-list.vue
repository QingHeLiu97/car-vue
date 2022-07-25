<template>
  <el-card v-loading="loadingStatus" shadow="never">
    <el-table :data="tableData" border style="width: 100%" >
      <el-table-column header-align-="center" align="center" min-width="100" prop="id" label="ID"></el-table-column>
      <el-table-column header-align-="center" align="center" min-width="100" prop="userName" label="联系人"></el-table-column>
      <el-table-column header-align-="center" align="center" min-width="100" prop="userPhone" label="联系号码"></el-table-column>
      <el-table-column header-align-="center" align="center" min-width="100" prop="address" label="所在地址"></el-table-column>
      <el-table-column header-align-="center" align="center" min-width="100" prop="equipmentName" label="设备名称"></el-table-column>
      <el-table-column header-align-="center" align="center" min-width="100" prop="content" label="备注说明"></el-table-column>
      <el-table-column header-align-="center" align="center" min-width="100" prop="status" label="状态">
        <template slot-scope="{row}">
          <el-tag type="success" size="small" v-if="row.status == 1">已处理</el-tag>
          <el-tag type="warning" size="small" v-else-if="row.status == 0">待处理</el-tag>
        </template>
      </el-table-column>
      <el-table-column header-align-="center" align="center" width="200" prop="createTime" label="创建时间"></el-table-column>
      <el-table-column header-align="center" align="center" fixed="right"  width="250" label="操作">
        <template slot-scope="{row,$index}">
             <!-- <el-button type="default" size="small" @click="handleView(row)">查看</el-button> -->
             <el-button type="primary" size="small" :loading="row.loadingStatus" :disabled="row.status == 1" @click="handleUpdate(row,$index)">{{row.status == 1?'已处理':'处理'}}</el-button>
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
  </el-card>
</template>
<script>
    import {getServicingList,getServicingUpdate} from "@api/servicing.js"
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
                getServicingList({ current, pageSize, ...formData }).then(res => {
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
            handleUpdate (row,index) {
              if(row.loadingStatus){
                return
              }
              this.tableData[index].loadingStatus = true;
              getServicingUpdate({id:row.id,status:1}).then(res=>{
                this.tableData[index].loadingStatus = false;
                this.getData()
                this.$message.success("处理成功")
              }).catch(err=>{
                this.tableData[index].loadingStatus = false;
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
