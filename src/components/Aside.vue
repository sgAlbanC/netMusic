<template>
    <div>
        <div class="aside-container">
            <div class="searchhot_box">
                <div class="searchhot_logo">
                    <strong>热搜</strong>
                     <el-divider content-position="left">hots</el-divider>
                </div>
                
                <div class="searchhot_list" v-for="item in hots" :key="item.index">
                    <div>{{item.searchWord}}</div>
                </div>
            </div>
        </div>        
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
            const {data:res} = await this.$http.get('/search/hot/detail')
            this.hots = res.data.slice(0,10)
            console.log(this.hots)
        },

        toPlaylistDetail(id){
            this.$router.push({
                path:"/album",
                query: {   
                    id: id
                } 
            })
        }

        
    }
}
</script>

<style lang="less" scoped>
.searchhot_box{
    padding: 20px 20px;
    .searchhot_logo{
        padding: 10px 0 0 0;
        font-size: 1.17rem;
        color: #C2170C;
        .el-divider__text{
            color: #ffd04b;
        }
    }
    .searchhot_list{
        padding-top: 10px;
        width: 160px;   /* Aside的200px - 左右padding的20px = 160px */
        overflow:hidden;
        text-overflow:ellipsis;  /* 溢出用省略号表示 */
        white-space:nowrap;  /* 始终保持在一行显示 */
        cursor: pointer;
    }
    .searchhot_list:hover{
        color:rgb(255, 208, 75);
    }
}
</style>