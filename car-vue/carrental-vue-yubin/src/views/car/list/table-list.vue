<template>
  <el-card v-loading="loadingStatus" shadow="never">
    <div style="margin-bottom:20px" v-if="userInfo.role == 'admin'">
      <el-button type="primary" size="small" @click="handleCreate">发布车源</el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%" >
      <el-table-column header-align-="center" align="center" min-width="200" prop="carId" label="编号"></el-table-column>
      <el-table-column header-align-="center" align="center" min-width="200" prop="type" label="类型"></el-table-column>
      <el-table-column header-align-="center" align="center" min-width="300" prop="carCircle" label="汽车图片"></el-table-column>
      <el-table-column header-align-="center" align="center" min-width="100" prop="color" label="颜色"></el-table-column>
      <el-table-column header-align-="center" align="center" min-width="150" prop="price" label="价格"></el-table-column>
      <el-table-column header-align-="center" align="center" min-width="200" prop="deposit" label="押金"></el-table-column>
      <el-table-column header-align-="center" align="center" min-width="200" prop="carname" label="车名"></el-table-column>
      <el-table-column header-align-="center" align="center" min-width="200" prop="createTime" label="创建时间"></el-table-column>
      <el-table-column header-align-="center" align="center" min-width="200" prop="updateTime" label="更新时间"></el-table-column>
        <el-table-column header-align-="center" align="center" min-width="100" prop="status" label="状态">
        <template slot-scope="{row}">
          <el-tag type="success" size="small" v-if="row.status == 0">未出租</el-tag>
          <el-tag type="info" size="small" v-else>已出租</el-tag>
        </template>
      </el-table-column>
      <el-table-column  header-align="center" align="center" fixed="right"  width="200" label="操作">
        <template slot-scope="{row}"  >
            <el-button v-if="userInfo.role == 'admin'"  type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
            <el-popconfirm placement="top" title="确定要删除这条数据吗" @confirm="handleDele(row)">
                <el-button   v-if="row.status==0 && userInfo.role!='user'" slot="reference" type="danger" size="small" style="margin-left:10px">删除</el-button>
            </el-popconfirm>
             <el-button v-if="userInfo.role == 'user'"  type="primary" size="small" @click="yuding(row)">预定</el-button>
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
    import { deleteCar, getCarList } from "../../../api/car";
    import {mapState } from "vuex";
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
        computed: {
            ...mapState('account', ['userInfo', 'role'])
        },
        methods: {
            // 获取数据u
            getData () {
                var phone = this.userInfo.phone
                this.roles = this.userInfo.role
                console.log("phone",phone,this.roles)
                this.loadingStatus = true
                var pageSize = this.pageSize
                var current = this.currentPage
                var formData = this.$parent.$refs.tableForm.formData;
                getCarList({ formData }).then(res => {
                    console.log("成功", res)
                    this.tableData = res.result
                    this.loadingStatus = false
                }).catch(err => {
                    console.log("失败", err)
                    // this.tableData = err
                    this.loadingStatus = false
                })
            },
            handleCreate () {
                this.$refs.tableEdti.open(null, '发布车源')
            },
            handleEdit (row) {
                this.$refs.tableEdti.open(row, '修改车辆信息')
            },
            handleDele (row) {
                deleteCar({ carId: row.carId }).then(res => {
                    this.getData();
                }).catch(err => {
                    console.log("失败", err)
                })
            },
            handleChangePageSizes (val) {
                this.pageSize = val
                this.getData()
            },
            yuding (val) {

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
