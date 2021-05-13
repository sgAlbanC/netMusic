<template>
    <div>
        <div class="playlist_info">
            <el-row>
                <el-col :span="4">
                    <div class="imgbox">
                        <el-image :src="coverImgUrl">
                            <div slot="error" class="image-slot">
                                <i class="el-icon-picture-outline"></i>
                            </div>
                        </el-image>
                    </div>
                </el-col>
                <el-col :span="20">
                    <div class="infobox">
                        <div class="listname">{{name}}</div>
                        <div class="creator_info">
                            <el-image :src="avatarUrl">
                                <div slot="error" class="image-slot">
                                    <i class="el-icon-picture-outline"></i>
                                </div>
                            </el-image>
                            <div class="creator_nickname">{{creatorNickname}}</div>
                            <div class="create_time">{{createTime}}</div>
                        </div>
                        <p>tags:</p>   
                        <div class="tags" v-for="item in tags" :key="item.index">_{{item}}</div>
                        <br>
                        <p>描述:</p> 
                        <div class="description">{{description}}</div>
                    </div>
                </el-col>
            </el-row>        
        </div>
        <div class="container">
            <section>
                <div class="table-top">
                    <h3>歌单</h3> 共{{trackCount}}首
                </div>
                
                <el-table :data="tracks" stripe style="width: 100%">
                    <el-table-column prop="name" label="歌曲标题" width="220"> </el-table-column>
                    <el-table-column prop="ar[0].name" label="歌手" width="220"> </el-table-column>
                    <el-table-column prop="al.name" label="专辑" width="220"> </el-table-column>
                    <el-table-column>
                        <template slot-scope="scope">
                            <i class="el-icon-video-play" @click="getSongUrl(scope.$index,scope.row)"></i>
                        </template>
                    </el-table-column>
                </el-table>
            </section>
            <section>
                <audio :src="mp3Url" controls="controls"></audio>
            </section>
        </div>
    </div>
</template>

<script>

export default ({
    data(){
        return{
            name:'',
            creatorNickname:'',
            createTime:0,
            coverImgUrl:'',
            avatarUrl:'',
            tags:[],
            description:'',
            trackCount:0,
            tracks:[{
                name:'',
                ar:[],
                al:'',
                id:0
            }],
            mp3Url:''
        }
    },
    created(){
       this.getPlaylistDetail()
    },
    methods:{
       async getPlaylistDetail(){
           let id =  this.$route.query.id
           const {data:res} = await this.$http.get('/playlist/detail?id='+id);
           console.log(res)
           this.name = res.playlist.name
           this.creatorNickname = res.playlist.creator.nickname
           this.createTime = res.playlist.createTime
           this.coverImgUrl = res.playlist.coverImgUrl
           this.avatarUrl = res.playlist.creator.avatarUrl
           this.tags = res.playlist.tags
           this.description = res.playlist.description


           this.trackCount = res.playlist.trackCount
           this.tracks = res.playlist.tracks
       },

       async getSongUrl(index,row){
            console.log(row.id)
            let id = row.id
        //  检查音乐是否可播放
            const {data:res} = await this.$http.get('/check/music?id='+id);
            if(!res.success){
                this.$message({message: '亲爱的，暂无版权!'});
                return
            }
            const {data:res2} = await this.$http.get('/song/url?id='+id);
            console.log(res2)
            this.mp3Url = res2.data[0].url
            console.log(this.mp3Url)
       }
    }
})
</script> 

<style lang="less" scoped>

.playlist_info{
    .imgbox{

        .el-image{
            padding-right:20px;
        }
    }

    .infobox{
        .listname{
            font-size: 1.5rem;
            overflow:hidden;
            text-overflow:ellipsis;  /* 溢出用省略号表示 */
            white-space:nowrap;  /* 始终保持在一行显示 */
        }
        .el-image{
            float: left;
            width: 35px;
            height: 35px;
        }
        .tags{
            float: left;
        } 
    }
}
.container{
    .table-top{
        margin:10px 0;
    }
    h3{
        display: inline;
    }

    .el-table{
        .el-table-column{
            overflow:hidden;
            text-overflow:ellipsis;  /* 溢出用省略号表示 */
            white-space:nowrap;  /* 始终保持在一行显示 */
        }
    }
}
</style>
