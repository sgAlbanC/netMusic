<template>
    <div>
        <div class="container">
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
    },
    methods:{
        async getArtistList(){
            const {data:res} = await this.$http.get('/artist/list')
            this.artists = res.artists
            // console.log(this.artists)
        }
    }
})
</script>

<style lang="less" scoped>
@import url(./index.less);
</style>
