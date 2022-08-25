<template>
  <el-card v-loading="loadingStatus" shadow="never">
    <div style="margin-bottom:20px">
      <el-button type="primary" size="small" @click="handleCreate">新增订单</el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%" >
      <el-table-column header-align-="center" align="center" min-width="200" prop="orderId" label="编号"></el-table-column>
      <el-table-column header-align-="center" align="center" min-width="200" prop="carId" label="汽车id"></el-table-column>
      <el-table-column header-align-="center" align="center" min-width="200" prop="carType" label="汽车类型"></el-table-column>
      <el-table-column header-align-="center" align="center" min-width="200" prop="carColor" label="汽车颜色"></el-table-column>
      <el-table-column header-align-="center" align="center" min-width="150" prop="carPrice" label="价格"></el-table-column>
      <el-table-column header-align-="center" align="center" min-width="200" prop="deposit" label="押金"></el-table-column>
      <el-table-column header-align-="center" align="center" min-width="200" prop="userId" label="租车人id"></el-table-column>
      <el-table-column header-align-="center" align="center" min-width="200" prop="username" label="租车人姓名"></el-table-column>
      <el-table-column header-align-="center" align="center" min-width="200" prop="userPhone" label="客户电话"></el-table-column>
      <el-table-column header-align-="center" align="center" min-width="200" prop="userAddress" label="客户地址"></el-table-column>
      <el-table-column header-align-="center" align="center" min-width="200" prop="handlersName" label="经办人"></el-table-column>
      <el-table-column header-align-="center" align="center" min-width="200" prop="createTime" label="创建时间"></el-table-column>
        <el-table-column header-align-="center" align="center" min-width="100" prop="status" label="状态">
        <template slot-scope="{row}">
          <el-tag type="success" size="small" v-if="row.status == 0">正常</el-tag>
          <el-tag type="info" size="small" v-else>已删除</el-tag>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" fixed="right"  width="250" label="操作">
        <template slot-scope="{row}">
             <el-button type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
             <el-popconfirm placement="top" title="确定要删除这条数据吗" @confirm="handleDele(row)">
              <el-button v-if="row.status == 0" slot="reference" type="danger" size="small" style="margin-left:10px">删除</el-button>
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
    import tableEdti from './table-edte.vue'
    import {deleteOrder, getOrderList} from "../../../api/order";
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
                getOrderList({ current, pageSize, role: 'custom', ...formData }).then(res => {
                    console.log(res)
                    this.tableData = res.result;
                    this.loadingStatus = false;
                }).catch(err => {
                    console.log(err)
                    this.tableData = err;
                    this.loadingStatus = false
                })
            },
            handleCreate () {
                this.$refs.tableEdti.open(null, '添加新订单')
            },
            handleEdit (row) {
                this.$refs.tableEdti.open(row, '修改订单信息')
            },
            handleDele (row) {
                deleteOrder({ orderId: row.orderId }).then(res => {
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
