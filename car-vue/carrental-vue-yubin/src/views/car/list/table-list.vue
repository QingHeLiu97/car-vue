<template>
  <el-card v-loading="loadingStatus" shadow="never">
    <div style="margin-bottom:20px" v-if="userInfo.role == 'admin'">
      <el-button type="primary" size="small" @click="handleCreate">发布车源</el-button>
    </div>
      <el-dialog :visible.sync="detailVisible" width="30%" hight="30%">
<!--        <template slot-scope="scope">-->
          <el-image  :src="swapImage(carCircleUrl)" alt="" style="width: 100%;height: 100%" ></el-image>
<!--        </template>-->
      </el-dialog>
    <el-table :data="tableData" border style="width: 100%" >
      <el-table-column header-align-="center" align="center" min-width="200" prop="carId" label="编号"></el-table-column>
      <el-table-column header-align-="center" align="center" min-width="200" prop="type" label="类型"></el-table-column>
      <el-table-column header-align-="center" align="center" fixed="right"  width="200"  label="汽车图片">
          <template slot-scope="{row}"  >
              <el-button v-if="row.carCircle" type="primary" size="small" @click="handlechecke(row)">查看图片</el-button>
              <el-button v-else type="button" size="small" :display="true">暂无图片</el-button>
          </template>
      </el-table-column>
      <el-table-column header-align-="center" align="center" min-width="100" prop="color" label="颜色"></el-table-column>
      <el-table-column header-align-="center" align="center" min-width="150" prop="price" label="价格"></el-table-column>
      <el-table-column header-align-="center" align="center" min-width="200" prop="deposit" label="押金"></el-table-column>
      <el-table-column header-align-="center" align="center" min-width="200" prop="carname" label="车名"></el-table-column>
      <el-table-column header-align-="center" align="center" min-width="200" prop="createTime" label="创建时间"></el-table-column>
      <el-table-column header-align-="center" align="center" min-width="200" prop="updateTime" label="更新时间"></el-table-column>
        <el-table-column header-align-="center" align="center" min-width="100" prop="status" label="状态">
        <template slot-scope="{row}">
          <el-tag type="success" size="small" v-if="row.status == 0">未出租</el-tag>
          <el-tag type="success" size="small" v-if="row.status == 1">已删除</el-tag>
          <el-tag type="info" size="small" v-if="row.status == 2">出租中</el-tag>
        </template>
      </el-table-column>
      <el-table-column  header-align="center" align="center" fixed="right"  width="200" label="操作">
        <template slot-scope="{row}"  >
            <el-button v-if="userInfo.role == 'admin' && row.status !=2"  type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
            <el-popconfirm placement="top" title="确定要删除这条数据吗" @confirm="handleDele(row)">
                <el-button   v-if="row.status==0 && userInfo.role!='user'" slot="reference" type="danger" size="small" style="margin-left:10px">删除</el-button>
            </el-popconfirm>
             <el-button v-if="userInfo.role == 'user' && row.status ==0"  type="primary" size="small" @click="hadnleYuding(row)">预定</el-button>
             <el-button v-if="row.status == 2"  type="button" size="small" disable >暂不可操作</el-button>
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
    import tableImage from './table-image.vue'
    import { deleteCar, getCarList , yuding } from "../../../api/car";
    import {mapState } from "vuex";
    export default {
        components: { tableEdti ,tableImage },
        data () {
            return {
                carCircleUrl: "",
                detailVisible: false ,
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
                var role = this.userInfo.role
                console.log("phone",phone,this.role)
                this.loadingStatus = true
                var pageSize = this.pageSize
                var current = this.currentPage
                var formData = this.$parent.$refs.tableForm.formData;
                getCarList({  role:role, ...formData }).then(res => {
                    console.log("res",res.result)
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
            handlechecke (row) {
                // console.log("进入前",row)
                // this.$refs.tableImage.init(row, '查看汽车图片')
                this.detailVisible =true
                this.carCircleUrl = row.carCircle
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
            hadnleYuding (row) {
                var role = this.userInfo.role
                var userId = this.userInfo.userId
                yuding({ userId: userId , carId: row.carId }).then(res => {
                    console.log("成功", res)
                    this.loadingStatus = false
                    this.getData()
                }).catch(err => {
                    console.log("失败", err)
                    // this.tableData = err
                    this.loadingStatus = false
                })
            },
            swapImage(imgUrl){
                // return require('@/assets/' + imgUrl)
                return '../../' + imgUrl
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
