<template>
    <div>
        <div class="artist-container">
            <section>
                <div class="table-top">
                    <h3>歌手</h3>
                </div>
                <el-row>
                    <el-col :span="4"  v-for="item in artists" :key="item.index">
                        <div class="imgbox">
                            <el-image :src="item.picUrl" lazy></el-image>
                            <div class="artistname">{{item.name}}</div>
                            <!-- <div class="playcount"><i class="el-icon-headset"></i> {{item.playCount}} <i class="el-icon-video-play right"></i></div> -->
                        </div>
                    </el-col>
                </el-row>
            </section>     
        </div>
    </div>
</template>

<script>

export default ({
    data(){
        return{
            artists:[{
                id:0,
                name:'',
                picUrl:''
            }
            ]
        }
    },
    created(){
        this.getArtistList()
        this.setActiveBoard()
    },
    methods:{
        setActiveBoard(){
            this.$store.commit('setActiveBoardId','artist')
        },
        async getArtistList(){
            const {data:res} = await this.$http.get('/artist/list')
            this.artists = res.artists
        }
    }
})
</script>

<style lang="less" scoped>

.artist-container{
    .table-top{
        padding:10px 0;
    }
    h3{
        display: inline;
    }
    .el-row{
        .el-col{
            width: 150px;
            height: 150px;
            .imgbox{
                position: absolute;
                .el-image{
                    width: 130px;
                    height: 106px;
                    cursor:pointer;
                    object-fit: cover;
                }
                .artistname{
                    overflow:hidden;
                    text-overflow:ellipsis;  /* 溢出用省略号表示 */
                    white-space:nowrap;  /* 始终保持在一行显示 */
                }
                // .playcount{
                //     background-color: lightcyan;
                //     opacity: 0.8;
                //     padding: 5px;
                //     position:relative;
                //     top: -3.7rem;
                // }
            }         
        }    
    }
}
</style>
