<template>
    <div class="main">
      <div class="player_box">
        <div class="normal-player">
          <div class="background">
            <img :src="al_picUrl">
          </div>
          <div class="top">
            <div class="back">
              <i class="icon-back"></i>
            </div>
            <h2 class="title">{{songName}}</h2>
            <!-- <h1 class="title">歌手：{{artistName}}</h1> -->
          </div>
        </div>
        <audio @pause="onPause" @play="onPlay" @ended="overAudio" @timeupdate="ontimeupdate" :src="mp3Url"  controls="controls"></audio>
        <div class="lyrics_box" v-if="(currentLyricnow!='')">
          <div>{{currentLyricbefore}}</div>
          <div class="current"><strong>{{currentLyricnow}}</strong></div>
          <div>{{currentLyricafter}}</div>
        </div>
        <div class="lyrics_box" v-else>
          <div>歌词显示处</div>
        </div>
      </div>
      <!-- 评论区 -->
      <div class="comment_box">

        <div class="title">
          <h2>评论区</h2> 
          <span>{{ comments_total }} 条评论</span>
        </div>
        <div class="tabs">
          <el-tabs v-model="tabactiveName" @tab-click="handleClick">
            <el-tab-pane label="最热" name="first">
                <div class="comment_item" v-for="(item,index) in hotComments[pageNo]" :key="index">
                  <div class="avatar">
                    <el-image :src="item.user.avatarUrl" style="width:50px;height:50px" fit="cover"></el-image>
                  </div>
                  <div class="content">
                    <div class="comment_name">{{ item.user.nickname }}</div>
                    <div>{{item.content}}</div>
                  </div>
                  <div class="action">
                      <div class="likedCount">
                        <div class="like">
                          <div v-if="item.liked==false">
                            <img @click="likecomment(item.commentId,1,index)" src="../../assets/like0.svg" />
                          </div>
                          <div v-else><img @click="likecomment(item.commentId,0,index)" src="../../assets/like1.svg" /></div>
                        </div>
                        <div>{{item.likedCount}}</div>
                      </div>
                      <div class="time">{{item.timeStr}}</div>
                  </div>
                </div>
                <div class="pagination" >
                <el-pagination v-if="hotComments.length>0"
                        background
                        :total="hotCommentsCount"
                        :current-page="pageNo+1"
                        layout="prev,pager,next"
                        @current-change="handlePageNoChange"
                        style="text-align:left"
                        :page-size="8"
                    >
                </el-pagination>
                <div class="" v-else>暂无最热评论</div>
            </div>
            </el-tab-pane>
            <el-tab-pane label="最新" name="second">
              <div class="comment_item" v-for="(item,index) in comments[pageNo]" :key="index">
                  <div class="avatar">
                    <el-image :src="item.user.avatarUrl" style="width:50px;height:50px" fit="cover"></el-image>
                  </div>
                  <div class="content">
                      <div class="comment_name">{{ item.user.nickname }}</div>
                      <div> {{item.content}}</div>
                  </div>
                  <div class="action">
                      <div class="likedCount">
                        <div class="like">
                          <div v-if="item.liked==false">
                            <img @click="likecomment(item.commentId,1,index)" src="../../assets/like0.svg" />
                          </div>
                          <div v-else><img @click="likecomment(item.commentId,0,index)" src="../../assets/like1.svg" /></div>
                        </div>
                        <div> {{item.likedCount}}</div>
                      </div>
                      <div class="time">{{item.timeStr}}</div>
                  </div>
                </div>
                <div class="pagination">
                <el-pagination v-if="comments.length>0"
                        background
                        :total="commentsCount"
                        :current-page="pageNo+1"
                        layout="prev,pager,next"
                        @current-change="handlePageNoChange"
                        style="text-align:left"
                        :page-size="8"
                    >
                </el-pagination>
                <div class="" v-else>暂无评论</div>
            </div>
            </el-tab-pane>
          </el-tabs>
        </div>
       
      </div>
      <!-- 歌手详情 -->

      <div class="" v-if="artistInfo.length!=0">
        <div class="artist_box" v-for="item in artistInfo" :key="item.index">
          <div class="artist_base_info">
            <div class="artist_avatar"><img :src="item.cover?item.cover:''" /></div>
            <div class="artist_base_info_text">
              <div class="artist_name">{{ item.name?item.name:null }}</div>
              <div class="chinese_name">{{ item.transNames[0]?item.transNames[0]:null }}</div>
              <div class="albumSize">专辑数：{{ item.albumSize?item.albumSize:'暂无'}}</div>
            </div>
          </div>
          
          <div class="briefDesc">{{ item.briefDesc }}</div>
        </div>
      </div>
      

    </div>
</template>

<script>
export default {
  data() {
    return {
      id:0,
      mp3Url: "",
      songName:'',
      ar:[], // 歌手情况
      artistInfo:[],


      a:[],
      // 歌词部分
      lyrics:'',
      lyricUser:'',
      transUser:'',
      currentLyric:[],  // 这个不是当前歌词，是所有歌词，lyrics[1]，命名没弄好
      // 显示三句歌词
      currentLyricbefore:'',
      currentLyricnow:'',   // 这个才是当前歌词
      currentLyricafter:'',
      currentTime : [],
      count:0,// 歌词的秒数？

      // 歌曲封面
      al_picUrl:'',
      
      // 评论部分
      comments:[],
      hotComments:[],
      comments_total:0,
      tabactiveName: 'first',
      // 分页
      hotCommentsCount:0,
      commentsCount:0,
      pageNo:0
    };
  },
  created() {
    this.getSongDetail()
    this.playsong();
    this.getLyrics();
    this.getComment();
  },
  onMounted:{
  },
  methods: {
    handleClick(tab) {   
      this.tabactiveName= tab.name
    },
    
    handlePageNoChange(pageNo){
      this.pageNo = pageNo-1
    },



    // 获取歌曲详情，歌曲名字，歌曲图片，歌曲Id，歌手名字;这个接口可以传多个id，返回就是
    // 数组对象，我们点击一首歌的时候，只需要取第一首歌，就是res.songs[0]
    async getSongDetail(){
      this.id = this.$route.query.id;
      const {data:res} = await this.$http.get("/song/detail?ids=" + this.id);
      let result = res.songs[0]
      this.songName=result.name
      this.al_picUrl = result.al.picUrl
      this.ar =result.ar
      console.log(result)
      this.getArtistDetail();
    },

    // 获取歌手详情
    async getArtistDetail(){
      for(let i=0;i<this.ar.length;i++){
        const {data:res} = await this.$http.get("/artist/detail?id=" + this.ar[i].id);
        this.artistInfo.push(res.data.artist)
      }
      console.log(this.artistInfo)
      console.log(this.artistInfo[1].name)
    },


    // 播放歌曲 用歌曲id获得mp3Url
    async playsong(){
        this.id = this.$route.query.id;
        const {data:res} = await this.$http.get("/song/url?id=" + this.id);
        // console.log(res)
        this.mp3Url = res.data[0].url;
    },
    
    async getComment(){
        this.id = this.$route.query.id;
        const {data:res} = await this.$http.get("/comment/music?id=" + this.id);
        
        // 只能请求到15个热评，所以循环两次就行了
        // 有20个最新评论，循环三次
        for(let i=0;i<res.hotComments.length;i+=8){
          this.hotComments.push(res.hotComments.slice(i,i+8))
        }
        this.hotCommentsCount = res.hotComments.length
        this.commentsCount = res.comments.length
        
        for(let i=0;i<res.comments.length;i+=8){
          this.comments.push(res.comments.slice(i,i+8))
        }
        this.comments_total = res.total

        // 判断是否有热评，如果没有，就直接跳转到最新评论
        if(this.hotCommentsCount==0){
          this.tabactiveName = 'second'
        }
    },

    async likecomment(cid,t,index){
      const {data:res} = await this.$http.get("/comment/like?id=" + this.id+'&cid='+cid+'&t='+t+'&type=0'+'&cookie='+window.sessionStorage.getItem('cookie'));
      if(res.code==200){
        if(t == 1){
            this.$message({ message: "点赞成功!",type: 'success',offset:100 });
            this.hotComments[index].likedCount++
        }else{
            this.$message({ message: "取消成功!",type: 'success',offset:100 });
            this.hotComments[index].likedCount--
        }
      }else{
          this.$message({ message: "操作失败!",offset:100 });
      }
    },
    
    async getLyrics(){
        let id = this.$route.query.id;
        const {data:res} = await this.$http.get("/lyric?id=" + id);

        // console.log(res)
        // 歌词贡献和翻译贡献
        this.lyricUser = res.lyricUser
        this.transUser = res.transUser


        this.lyrics = res.lrc.lyric
        this.lyrics = this.lyrics.split('\n')
        this.lyrics = this.lyrics.map(item=>{
          return [item.split(']')[0].replace('[',''),item.split(']')[1]]
        })
        this.currentTime = this.lyrics.map(item=>{
          item[0]=item[0].slice(0,5)
          let mini = parseInt(item[0].slice(0,2))
          let sec = parseInt(item[0].slice(3,5))
          item[0] = (mini*60+sec)
          return item[0]
        })
        this.currentLyric = this.lyrics.map(item=>{
          return item[1]
        })
    },
    ontimeupdate(){ 
      
      let audio = document.querySelector("audio");
      // audio.duration;//获取总播放时间
      if(audio){
        this.count = parseInt(audio.currentTime);//获取播放进度
        this.compareTime()
      }
    },
    // 当音频播放
    onPlay () {
      console.log('开始播放声音');
    },
    // 当音频暂停
    onPause () {
      console.log('停止播放声音');
    },
    //播放完毕执行
    overAudio(){
        console.log('播放声音完毕');
        // this.audioArr.forEach(item=>{
        //     item.isStart = true;
        // })
    },
    compareTime(){
      this.currentTime.map((item,index)=>{
        if(item==this.count){
          if(index==0){
            this.currentLyricbefore = ''
          }else{
            this.currentLyricbefore = this.currentLyric[index-1]
          }
          this.currentLyricnow = this.currentLyric[index]
          this.currentLyricafter = this.currentLyric[index+1]
        }
      })
    }
  },    
};
</script> 

<style lang="less" scoped>
.main{
  display: flex;
  padding: 20px;
  // justify-content: space-evenly;
}
.player_box{
  .normal-player{
    .background{
      img{
        width: 350px;
      }
    }
    .top{
      .title{
        width: 350px;
      }
    }
  }
  .lyrics_box{
    border: 10px solid #fff;
    padding: 20px;
    width: 290px;
    max-height: 330px;
    overflow: scroll;
    overflow-y: hidden;
    overflow-x: hidden;
    div{
      margin-bottom: 10px;
  }
  .current{
    font-size: 24px;
  }
 }
}
.comment_box{
  width: 800px;
  margin-left: 40px;
  padding: 0 20px 20px 20px;
  background-color: #fff;

  .title{
    margin-top: 10px;
    display: flex;
    align-items: center;
    span{
      margin-left: 10px;
      font-size: 14px;
    }
  }
  .tabs{
    width: 800px;
    opacity: 0.9;
    position: relative;
    /deep/ .el-tabs__item.is-active{
      color:#c2170c;
    }
    /deep/ .el-tabs__item:hover{
      color:#e59c97;
    }
    /deep/ .el-tabs__active-bar{
      background-color:#c72b20;
    }

    .comment_item{
      display: flex;
      font-size: 16px;
      margin-bottom: 10px;
      padding-bottom: 5px;
      // height: 70px;
      // overflow: hidden;
      border-bottom: 1px solid #e6e5e5;

      .avatar{
        .el-image{
          border-radius: 50%;
        }
      }
      .content{
        flex: 9;
        margin-left:10px ;
        .comment_name{
          color: #535353;
          margin-bottom: 5px;
        }
      }
      .action{
        flex: 1;
        opacity: 0.9;
        .likedCount{
          display: flex;
          // font-size: 14px;
          img{
            width: 20px;
            height: 20px;
          }
          .like{ 
          }
        }
        .time{
          font-size: 12px;
          
        }
      }
    }
  }

}

.artist_box{
  width: 400px;
  padding:20px;
  margin-left: 40px;
  background: #fff;
  .artist_base_info{
    display: flex;
    margin-bottom: 10px;
    .artist_avatar{
      width: 180px;
      height: 180px;
      margin-right: 20px;
      img{
        width: 180px;
        height: 180px;
        object-fit: cover;
      }
    }
    .artist_name{
      font-size: 18px;
      font-weight: bold;
    }
  }
  .briefDesc{
    height: 170px;
    overflow: auto;
    overflow-x: hidden;
  }
  .briefDesc::-webkit-scrollbar {
    width: 12px;
    background-color: #f5f5f5
  }
  .briefDesc::-webkit-scrollbar-thumb
  {
      // -webkit-box-shadow:inset 0 0 6px rgba(0,0,0,0.3);
      border-radius:10px;
      background-color:#e7e7e7;
  }

}


.pagination{
  // position: absolute;
}

</style>
