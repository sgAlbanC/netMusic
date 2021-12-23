<template>
    <div>
        <div class="baseinfo_box">
            <div class="avatar">
                <el-image :src="avatarUrl">
                    <div slot="error" class="image-slot">
                        <i class="el-icon-picture-outline"></i>
                    </div>
                </el-image>
            </div>
            <div class="base_form">
                <el-form>
                    <el-form-item>{{nickname}}/LV{{level}}/{{gender}}</el-form-item>
                    <el-form-item>关注:{{follows}}|粉丝:{{followeds}}</el-form-item>
                    <el-form-item>个人介绍: {{signature}}</el-form-item>
                </el-form>
            </div>
            <div class="clear"></div>
        </div>
        <div class="container">
            <section>
                <div class="table-top">
                    <h3>听歌排行</h3> 累计听歌{{listenSongs}}首
                </div>
                
                <el-table :data="tableData" stripe style="width: 100%">
                    <el-table-column prop="date" label="歌曲标题" width="180"> </el-table-column>
                    <el-table-column prop="name" label="时长" width="180"> </el-table-column>
                    <el-table-column  prop="address" label="歌手"> </el-table-column>
                </el-table>
            </section>
            <section>
                <div class="table-top">
                    <h3>我的歌单</h3>（{{subPlaylistCount}}）
                </div>
                <el-row>
                    <el-col :span="4"  v-for="item in playlist" :key="item.index">
                        <div class="imgbox">
                            <el-image :src="item.coverImgUrl" @click="toPlaylistDetail(item.id)" lazy></el-image>
                            <div class="listname">{{item.name}}</div>
                            <div class="playcount"><i class="el-icon-headset"></i> {{item.playCount}} <i class="el-icon-video-play right"></i></div>
                        </div>
                    </el-col>
                </el-row>
                <!-- <el-pagination hide-on-single-page background layout="prev, pager, next" :total="1000">
                </el-pagination> -->
            </section>     
        </div>
    </div>
</template>

<script>

export default ({
    data(){
        return{

            nickname:'Det',
            level:0,
            listenSongs: 0,
            gender:0,
            avatarUrl:'',
            signature:'',
            followeds:0,
            follows:0,
            subPlaylistCount:0,
            tableData: [{
                date: 'clouds',
                name: '04:03',
                address: 'NF'
                }, {
                date: 'Hate Myself',
                name: '03:40',
                address: '04:12'
                }, {
                date: 'Change',
                name: '04:02',
                address: '03:46'
                }, {
                date: 'Lost',
                name: '03:56',
                address: 'NF'
            }],
            playlist:[],
            playlistid:[]
        }      
    },
    created(){
        this.getUserInfo()
        this.getSongMV()
        this.getPlaylist()
    },
    methods:{
        async getUserInfo(){
            const {data:res} = await this.$http.get('user/detail?uid='+window.sessionStorage.getItem('uid'));
            // console.log(res)

            if(res.code != 200){
                return this.$message.error('获取用户信息失败!')
            }

            this.nickname = res.profile.nickname
            this.gender = res.profile.gender
            this.signature = res.profile.signature
            this.avatarUrl = res.profile.avatarUrl
            this.follows = res.profile.follows 
            this.followeds = res.profile.followeds

            this.listenSongs = res.listenSongs
            this.level = res.level          
        },
        
        async getSongMV(){
            const {data:res} = await this.$http.get('/user/subcount?cookie='+window.sessionStorage.getItem('cookie'));
            // console.log(res)
            this.subPlaylistCount = res.subPlaylistCount + res.createdPlaylistCount
        },

        async getPlaylist(){
            const {data:res} = await this.$http.get('/user/playlist?limit=27&uid='+window.sessionStorage.getItem('uid'));
            // console.log(res)
            console.log(res.playlist)
            this.playlist = res.playlist
        },

        // 跳转页面;这里的id是歌单的id，然后传过去
        toPlaylistDetail(id){
            this.$router.push({
                path:"/playlistdetail",
                query: {   
                    id: id
                } 
            })
        }
    }
})
</script>

<style lang="less" scoped>
.baseinfo_box{
    .avatar{
        float: left;
        width: 10rem;
        margin-right: 1rem;
        background-color:#fff;
        .el-image{
            margin: 8px;
        }
    }
    .base_form{
        float:left;
        text-align: left;
        .el-form{
            padding:0 10px ;
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05)
        }
    }
    .clear{
        clear: both;
    }
}
.container{
    .table-top{
        margin:10px 0;
    }
    h3{
        display: inline;
    }
    .el-row{
        .el-col{
            width: 200px;
            height: 230px;
            .imgbox{
                width: 180px;
                position: absolute;
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
                    padding: 5px;
                    position:relative;
                    top: -3.7rem;
                }
            }         
        }    
    }
}
</style>
