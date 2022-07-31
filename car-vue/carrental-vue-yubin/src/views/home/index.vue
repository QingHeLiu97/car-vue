<template>
    <div v-loading="loadingStatus">
        <el-row :gutter="20">
            <el-col :span="12" style="margin-bottom: 20px">
                <el-card style="height:400px">
                    <div style="display:flex; align-items:center;">
                        <el-avatar :size="100" :src="userInfo?userInfo.avatar:circleUrl"></el-avatar>
                        <div style="margin-left: 40px">
                            <h1 style="margin:0;font-size:30px; font-weight:400; color:#212121">{{userInfo?userInfo.name:''}}</h1>
                            <p style="margin:0; color:#999" v-if="role == 'admin'">管理员</p>
							<p style="margin:0; color:#999" v-if="role == 'custom'">用户</p>
							<p style="margin:0; color:#999" v-if="role == 'superAdmin'">超级管理员</p>
                        </div>
                    </div>
                     <el-divider></el-divider>
                     <el-descriptions :column="1">
                        <el-descriptions-item label="联系方式">{{userInfo?userInfo.phone:''}}</el-descriptions-item>
                        <el-descriptions-item label="身份证号">{{userInfo?userInfo.idCard:''}}</el-descriptions-item>
                        <el-descriptions-item label="身份证地址">{{userInfo?userInfo.addressCard:''}}</el-descriptions-item>
                     </el-descriptions>
                </el-card>
            </el-col>
            <el-col :span="12"  style="margin-bottom: 20px">
                <el-card style="height: 400px">
                    <div>租车公告<i class="el-icon-bell"></i></div>
                    <el-divider></el-divider>
                    <div style="height:215px; overflow:auto">
                        <h3 style="text-align:center; font-weight:normal; margin-top:0" v-if="noticeList.length>0&&noticeList[current-1]">{{noticeList[current-1].title}}</h3>
                        <p style="text-align:center;" v-if="noticeList.length>0&&noticeList[current-1]">{{noticeList[current-1].content}}</p>
                    </div>
                    <el-divider></el-divider>
                    <el-pagination background :small="true" @current-change="handleChangeCurrent"  :current-page="current" :page-size="1" layout="prev, pager, next" :total="noticeList.length"></el-pagination>
                </el-card>
            </el-col>
<!--            <el-col :span="8">-->
<!--                <columner title="本月社区环境评价" ref="columnerA" :assess="assessA" id="columner1"></columner>-->
<!--            </el-col>-->
<!--            <el-col :span="8">-->
<!--                <columner title="本月社区设施评价" ref="columnerB" :assess="assessB" id="columner2"></columner>-->
<!--            </el-col>-->
<!--            <el-col :span="8">-->
<!--                <columner title="本月社区服务评价" ref="columnerC" :assess="assessC" id="columner3"></columner>-->
<!--            </el-col>-->
        </el-row>
    </div>
</template>
<script>
    import columner from './columnar'
    import { mapState } from 'vuex'
    import { getNoticeList } from '@api/notice.js'

    export default {
        components: { columner },
        data () {
            return {
                loadingStatus: false,
                noticeList: [],
                current: 1,
                assessA: [0, 0, 0, 0, 0],
                assessB: [0, 0, 0, 0, 0],
                assessC: [0, 0, 0, 0, 0],
                circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
            }
        },
        computed: {
            ...mapState('account', ['userInfo', 'role'])
        },
        mounted () {
            this.getData()
        },
        methods: {
            getData () {
                getNoticeList().then(res => {
                    this.noticeList = res.result.records;
                }).catch(err => {})


            },
            handleChangeCurrent (current) {
                this.current = current;
            }
        }
    }
</script>
<style scoped>
.aa{
    font-weight: normal
}
</style>
