<template>
  <el-card v-loading="loadingStatus" shadow="never">
    <div style="margin-bottom:20px" v-if="userInfo.role =='user'">
      <el-button type="primary" size="small" @click="handleCreate">新增评价</el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%" >
      <el-table-column header-align-="center" align="center" min-width="100" prop="apprId" label="编号"></el-table-column>
      <el-table-column header-align-="center" align="center" min-width="200" prop="content" label="评价内容"></el-table-column>
      <el-table-column v-if="userInfo.role == 'admin'" header-align-="center" align="center" min-width="100" prop="createBy" label="评价人"></el-table-column>
      <el-table-column header-align-="center" align="center" min-width="200" prop="createTime" label="创建时间"></el-table-column>
      <el-table-column header-align-="center" align="center" min-width="200" prop="updateTime" label="更新时间"></el-table-column>
      <el-table-column header-align-="center" align="center" min-width="100" prop="status" label="状态">
        <template slot-scope="{row}">
          <el-tag type="success" size="small" v-if="row.status == 0">正常</el-tag>
          <el-tag type="info" size="small" v-else>禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" fixed="right"  width="250" label="操作">
        <template slot-scope="{row}">
             <el-button v-if="userInfo.role == 'user'" type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
             <el-popconfirm placement="top" title="确定要删除这条数据吗" @confirm="handleDele(row)">
              <el-button slot="reference" type="danger" :disabled="row.status==1" size="small" style="margin-left:10px">删除</el-button>
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
    import { getAppraiseList, deleteAppraise } from '@api/appraise.js'
    import {mapState , mapActions} from "vuex";
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
            // 获取数据
            getData () {
                this.loadingStatus = true
                var role = this.userInfo.role
                var phone = this.userInfo.phone
                var formData = this.$parent.$refs.tableForm.formData;
                getAppraiseList({ role: role,phone: phone , ...formData }).then(res => {
                    this.tableData = res.result
                    this.loadingStatus = false;
                }).catch(err => {
                    this.loadingStatus = false
                })
            },
            // 新增用户
            handleCreate () {
                this.$refs.tableEdti.open(undefined, '新增评价')
            },
            // 编辑
            handleEdit (row) {
                this.$refs.tableEdti.open(row, '编辑业主')
            },
            // 删除
            handleDele (row) {
                deleteAppraise({ apprId: row.apprId }).then(res => {
                    this.getData();
                }).catch(err => {
                    console.log("删除失败", err)
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
