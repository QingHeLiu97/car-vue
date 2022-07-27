<template>
    <div>
        <table-form ref="tableForm" @onSubmit="getData" @onReset="getData"></table-form>
        <div style="height:20px"></div>
        <table-list ref="tableList"></table-list>
    </div>
</template>
<script>
import tableList from "./table-list.vue"
import tableForm from "./table-form.vue"
export default {
    components:{tableList,tableForm},
    mounted(){
        this.getData()
    },
    methods:{
        getData(){
            this.$refs.tableList.getData()
        }
    }
}
</script>
