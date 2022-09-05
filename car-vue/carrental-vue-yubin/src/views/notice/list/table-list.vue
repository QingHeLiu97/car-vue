<template>
  <el-card v-loading="loadingStatus" shadow="never">
    <div style="margin-bottom:20px">
      <el-button type="primary" size="small" @click="handleCreate">新增公告</el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%" >
      <el-table-column header-align-="center" align="center" min-width="100" prop="noticeId" label="ID"></el-table-column>
      <el-table-column header-align-="center" align="center" min-width="200" prop="content" label="内容"></el-table-column>
      <el-table-column header-align-="center" align="center" min-width="100" prop="autor" label="作者"></el-table-column>
      <el-table-column header-align-="center" align="center" min-width="150" prop="createTime" label="创建时间"></el-table-column>
      <el-table-column header-align-="center" align="center" min-width="200" prop="updateTime" label="更新时间"></el-table-column>
      <el-table-column header-align="center" align="center" fixed="right"  width="250" label="操作" v-if="userInfo.role =='admin'">
        <template slot-scope="{row}" >
            <el-button type="primary" size="small" @click="handleEdit(row)">编辑</el-button><el-popconfirm placement="top" title="确定要删除这条数据吗" @confirm="handleDele(row)">
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
    import { deleteNotice, getNoticeList } from "../../../api/notice";
    import {mapState} from "vuex";
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
                var phone = this.userInfo.phone
                var role = this.userInfo.role
                var pageSize = this.pageSize
                var current = this.currentPage
                var formData = this.$parent.$refs.tableForm.formData;
                getNoticeList({ role: role , ...formData }).then(res => {
                    console.log(res.result)
                    this.tableData = res.result;
                    this.loadingStatus = false;
                }).catch(err => {
                    this.loadingStatus = false
                })
            },
            handleCreate () {
                this.$refs.tableEdti.open(null, '发布公告')
            },
            handleEdit (row) {
                this.$refs.tableEdti.open(row, '修改公告')
            },
            handleDele (row) {
                deleteNotice({ noticeId: row.noticeId }).then(res => {
                    this.getData();
                }).catch(err => {
                    console.log("删除错误", err);
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
