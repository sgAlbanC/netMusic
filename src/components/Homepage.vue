<template>
    <div class="main">
        <div class="banner_box">
            <el-carousel :interval="4000" type="card" height="200px">
                <el-carousel-item v-for="item in banners" :key="item.bannerId">
                <img :src="item.pic" height="200px">
                </el-carousel-item>
            </el-carousel>
        </div>

        <div class="ball_box">
            <div class="ball" v-for="item in balllist" :key="item.index">
                <img :src="item.iconUrl">
                <div>{{item.name}}</div>
            </div>
            <div class="clear"></div>
        </div>
    </div>
</template>

<script>

export default ({
    data(){
        return{
            balllist:[],
            banners:[]
        }
    },
    created(){
        // this.getHomepageball()
        this.getHomepageblock()
    },
    methods:{
        async getHomepageball(){
            const {data:res} = await this.$http.get('/homepage/dragon/ball')
            // console.log(res.data)
            this.balllist = res.data
        },
        async getHomepageblock(){
            const {data:res} = await this.$http.get('/homepage/block/page')
            console.log(res)
            console.log(res.data.blocks[3])
            this.banners = res.data.blocks[0].extInfo.banners
        }
        
    }
})
</script>

<style lang="less" scoped>
.main{
    width: 1000px;
    margin: 0 auto;
    background-color: rgb(231, 221, 178);
    padding: 20px;

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  .ball_box{
      padding-left:140px ;
        .clear{
            clear: both;
        }
    
        .ball{
            text-align: center;
            display: inline-block;
            // float: left;
            img{
                width: 5rem;
                height: 5rem;
            }
        }
    }
}
</style>
