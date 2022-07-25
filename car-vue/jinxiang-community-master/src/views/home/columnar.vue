<template>
    <el-card >
        <div :id="id" style="height: 250px; width:100%;" ></div>
        <el-divider></el-divider>
        <div style="display:flex; align-items:center; height:30px">
           <span style="font-size: 20px"> 平均分：</span><el-rate v-model="average" score-template="{value}"  disabled show-score></el-rate>
        </div>
    </el-card>
</template>
<script>
    export default {
        props: {
            id: {
                type: String,
                default: ''
            },
            assess: {
                type: Array,
                default () {
                    return [0, 0, 0, 0, 0]
                }
            },
            title: {
                type: String,
                default: ''
            }
        },
        data () {
            return {
                echarts: null,
                average: 0

            }
        },
        mounted () {
        // this.init();
        },
        methods: {
            init () {
                var chartDom = document.getElementById(this.id);
                this.echarts = this.$echarts.init(chartDom);
                var option = {
                    title: {
                        text: this.title
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    grid: {
                        left: '0%',
                        right: '0%',
                        bottom: '0%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        data: ['一星', '二星', '三星', '四星', '五星'],
                        axisTick: {
                            alignWithLabel: true
                        }
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name: '人数',
                            data: this.assess,
                            type: 'bar'
                        }
                    ]
                };
                option && this.echarts.setOption(option);
                var allNumber = 0;
                var allPerson = 0;
                for (var key in this.assess) {
                    allNumber = allNumber + ((Number(key) + 1) * this.assess[key]);
                    allPerson = allPerson + this.assess[key];
                }
                this.average = Number((allNumber / allPerson).toFixed(1))
            }
        }
    }
</script>
<style>
.el-rate__icon{
  font-size: 30px;
}
.el-rate__text{
  font-size: 20px;
}
.el-rate{
    height:auto;
}
</style>
