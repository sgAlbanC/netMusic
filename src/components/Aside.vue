<template>
    <div>
        <el-container class="main">
            <div class="searchhot_box">
                <div class="searchhot_logo">
                    <strong>热搜</strong>
                     <el-divider content-position="left">hots</el-divider>
                </div>
                
                <div class="searchhot_list" v-for="item in hots" :key="item.index">
                    <div>{{item.first}}</div>
                </div>
            </div>
        </el-container>        
    </div>
</template>

<script>
export default {
    data() {
      return {
          hots:[]
      }
    },
    created(){
        this.getSearchHot()
    },
    methods:{
        async getSearchHot(){
            const {data:res} = await this.$http.get('/search/hot')
            this.hots = res.result.hots
            // console.log(this.hots)
        }
        
    }
}
</script>

<style lang="less" scoped>
// .main{
//     // text-align: center;
// }
.searchhot_box{
    padding: 20px;
    .searchhot_logo{
        padding: 10px 0 0 0;
        font-size: 1.17rem;
    }
    .searchhot_list{
        padding-top: 10px;
        overflow:hidden;
        text-overflow:ellipsis;  /* 溢出用省略号表示 */
        white-space:nowrap;  /* 始终保持在一行显示 */
    }
}
</style>