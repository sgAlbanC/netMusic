<template>
    <div>
        <div v-for="(item,index) in dataSource" :key="index" class="">
            <!-- <slot :data="item"></slot> -->
        </div>
        <div class="pagination">
        <el-pagination
          v-if="dataSource.pageTotal > 1"
          background
          :total="dataSource.totalCount"
          :current-page.sync="dataSource.pageNo"
          layout="prev, pager, next"
          @current-change="handlePageNoChange"
          style="text-align: right"
          :page-size="15"
        ></el-pagination>
      </div>
    </div>
    </template>
    
    <script>
    export default({
        data(){
            return{
                
            }
        },
        methods:{
            handlePageNoChange(pageNo){
                props.dataSource.pageNo = pageNo;
                this.$emit('loadData')
            }
        },
        props:{
            dataSource:{
                type:Array
            }
        }
    })
    
    </script>
    
    <style scoped lang="less">
    </style>