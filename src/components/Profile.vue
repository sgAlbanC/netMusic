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
                    <h3>最近听歌</h3> 共{{trackCount}}首
                </div>
                
                <el-table
                :data="tracks"
                empty-text="暂无数据"
                stripe
                style="width: 100%"
                >
                <el-table-column prop="data.name" label="歌曲标题" width="220">
                </el-table-column>
                <el-table-column prop="data.ar[0].name" label="歌手" width="220">
                </el-table-column>
                <el-table-column prop="playTime" label="播放时间" width="220">
                </el-table-column>
                <el-table-column prop="data.al.name" label="专辑" width="220">
                </el-table-column>
                <el-table-column>
                    <template slot-scope="scope">
                    <img
                        @click="getSongUrl(scope.$index, scope.row)"
                        class="bofang-icon"
                        src="../assets/bofang.svg"
                    />
                    </template>
                </el-table-column>
                </el-table>
            </section>
            <section>
                <div class="table-top">
                    <h3>我的歌单</h3>（{{subPlaylistCount}}）
                </div>
                <el-row>
                    <el-col :span="4"  v-for="(item,index) in playlist" :key="index">
                        <div class="imgbox">
                            <el-image :src="item.coverImgUrl" @click="toPlaylistDetail(item.id,index)" lazy></el-image>
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
            gender:'',
            avatarUrl:'',
            signature:'',
            followeds:0,
            follows:0,
            subPlaylistCount:0,
            trackCount:0,
            tracks: [],
            playlist:[],
            playlistid:[]
        }      
    },
    created(){
        this.getUserInfo()
        this.getSongMV()
        this.getRecommendSongs()
        this.getRecentSongs()
        this.getPlaylist()
    },
    methods:{
        // 获取用户基本信息
        async getUserInfo(){
            const {data:res} = await this.$http.get('user/detail?uid='+window.sessionStorage.getItem('uid'));
            // console.log(res)

            if(res.code != 200){
                return this.$message.error('获取用户信息失败!')
            }

            this.nickname = res.profile.nickname
            this.gender = res.profile.gender
            if(this.gender==1){
                this.gender='男'
            }else if(this.gender==0){
                this.gender='女'
            }else{
                this.gender='保密'
            }
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
        
        async getRecommendSongs(){
            const {data:res} = await this.$http.get('/recommend/songs?cookie='+window.sessionStorage.getItem('cookie'));
            // console.log(res)
        },

        async getRecentSongs(){
            const {data:res} = await this.$http.get('/record/recent/song?cookie='+window.sessionStorage.getItem('cookie'));
            this.trackCount = res.data.total
            console.log(res)
            for(let i=0;i<res.data.total;i++){
                res.data.list[i].playTime = new Date(res.data.list[i].playTime);
                res.data.list[i].playTime=(res.data.list[i].playTime.toString()).substring(16,24)
            }
            this.tracks = res.data.list.splice(0,5)
        },

        async getPlaylist(){
            const {data:res} = await this.$http.get('/user/playlist?limit=27&uid='+window.sessionStorage.getItem('uid'));
            // console.log(res)
            // console.log(res.playlist)
            this.playlist = res.playlist
        },

        // 跳转页面;这里的id是歌单的id，然后传过去
        toPlaylistDetail(id,index){
            this.$router.push({
                path:"/playlistdetail",
                query: {   
                    id: id,
                    index:index
                } 
            })
        },

        async getSongUrl(index, row) {
            row=row.data
            let id = row.id;
            let name = row.name;
            // 歌手名字 歌手id
            let ar = row.ar[0].name;
            let ar_id = row.ar[0].id

            let al_picUrl = row.al.picUrl
            //  检查音乐是否可播放  
            try {
                // 第一个请求只是看是否能请求成功，不会用到变量
                let check= await this.$http.get("/check/music?id=" + id);
                this.toLyrics(id,name,ar,al_picUrl)
            }catch (error) {
                console.log(error);
                this.$message({ message: "亲爱的，暂无版权!" });
                }
            },

        toLyrics(id,name,ar,al_picUrl){
            this.$router.push({
                path:"/lyrics",
                query: {   
                    id: id,
                    name:name,
                    ar:ar,
                    al_picUrl:al_picUrl
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
        width: 20rem;
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
        padding:10px 0;
    }
    h3{
        display: inline;
    }
    .el-table {
        .el-table-column {
        overflow: hidden;
        text-overflow: ellipsis; /* 溢出用省略号表示 */
        white-space: nowrap; /* 始终保持在一行显示 */
        }
    }
    .bofang-icon {
        width: 2rem;
        cursor: pointer;
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
