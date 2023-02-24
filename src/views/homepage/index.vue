<template>
    <div class="main">
        <div class="banner_box">
            <el-carousel :interval="4000" type="card" height="200px">
                <el-carousel-item v-for="item in banners" :key="item.bannerId">
                <img :src="item.pic">
                </el-carousel-item>
            </el-carousel>
        </div>

        <div class="ball_box">
            <div class="ball" v-for="(item,index) in balllist" :key="index">
                <div :class="['iconfont',iconClass[index]]"></div>
                <div class="ball_name">{{item.name}}</div>
            </div>
            <div class="clear"></div>
        </div>


        <section class="recommend_box">
            <div class="table-title">
                <h3>推荐歌单</h3>
            </div>
            <el-row>
                <el-col :span="4"  v-for="item in playlist" :key="item.index">
                    <div class="imgbox">
                        <el-image :src="item.picUrl" @click="toPlaylistDetail(item.id)" lazy></el-image>
                        <div class="listname">{{item.name}}</div>
                        <div class="playcount"><i class="el-icon-headset"></i> {{item.playCount}} <i class="el-icon-video-play right"></i></div>
                    </div>
                </el-col>
            </el-row>
        </section> 
    </div>
</template>

<script>

export default ({
    data(){
        return{  
            banners:[],
            balllist:[],
            playlist:[],
            iconClass:['icon-tuijian','icon-shouyinji','icon-gedan','icon-paihangbang','icon-book','icon-changpian','icon-zhibo','icon-yinle','icon-shoucang','icon-wangyou']
        }
    },
    created(){
        this.getHomepageball()
        this.getHomepageblock()
        this.getPlaylist()
        this.setActiveBoard()
    },
    methods:{

        // 设置activeBoard
        setActiveBoard(){
            this.$store.commit('setActiveBoardId','homepage')
        },
        // 这个是banner 上面左右滑动的东西
        async getHomepageblock(){
            const {data:res} = await this.$http.get('/homepage/block/page')
            this.banners = res.data.blocks[0].extInfo.banners
        },
        // 这个是中间那些图标 每日推荐等
        async getHomepageball(){
            const {data:res} = await this.$http.get('/homepage/dragon/ball')
            this.balllist = res.data
        },
        async getPlaylist(){
            const {data:res} = await this.$http.get('/personalized?limit=10');
            // console.log(res)
            // 注意！！！！ 这里是请求回来的是 playlists ，多一个s 复数
            this.playlist = res.result
        },

        // 跳转页面;这里的id是歌单的id，然后传过去
        toPlaylistDetail(id){
            this.$router.push({
                path:"/album",
                query: {   
                    id: id
                } 
            })
        }
    }
})
</script>

<style lang="less" scoped>
@import "../../assets/css/globalcolor.less";
.main{
    width: 1000px;
    margin: 0 auto;
  // carousel的偶数个
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
    border-radius:10px;
    border: 0;
  }
  // carousel的基数个 （基数/偶数背景默认背景设置为不一样的颜色）
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
    border-radius:10px;
    border: 0;
  }

  .banner_box{
    background-color: #f5f5f5;
    img{
        border-radius: 10px;
        height: 200px;
    }
  }
  .ball_box{
       padding: 30px;
       background-color:@black-color;
       text-align: center;
        .clear{
            clear: both;
        }
        .ball{
            text-align: center;
            display: inline-block;

            .iconfont{
                color: #fff;
                font-size: 2.5rem;
                width: 4rem;
                height: 3.5rem;
                margin: 0 5px;
            }
            .ball_name{
                color: #fff;
            }
        }
  }
  .recommend_box{
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
    background: #fff;
    .table-title{
        padding: 10px 0 0 0;
        margin: 20px 0 10px 10px;
    }
    .el-row{
        .el-col{
            width: 200px;
            height: 230px;
            .imgbox{
                // 因为父元素已知宽度，我们可以用这种方式将子元素水平居中
                margin: 0 auto;
                width: 180px;
                position: relative;
                .el-image{
                    height: 180px;
                    cursor:pointer;
                }
                .listname{
                    overflow:hidden;
                    text-overflow:ellipsis;  /* 溢出用省略号表示 */
                    white-space:nowrap;  /* 始终保持在一行显示 */
                }
                .playcount{
                    background-color: lightcyan;
                    opacity: 0.8;
                    padding: 0 5px;
                    line-height: 32px;
                    position:absolute;
                    width: 170px;   // 180px -5 -5 = 170px
                    top:148px;
                    
                    i:nth-child(2){
                        position: absolute;
                        top: 8px;       // 自身大小16px
                        right: 8px;
                    }
                }
            }         
        }    
    }
  }

}
</style>
