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
            <h1 class="title">歌手：{{artistName}}</h1>
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
      <div class="comment_box">

        <div class="title"><h2>评论区</h2></div>
        <div class="tabs">
          <el-tabs v-model="tabactiveName" @tab-click="handleClick">
            <el-tab-pane label="最热" name="first">
                <div class="comment_item" v-for="(item,index) in hotComments" :key="index">
                  <div class="avatar">
                    <el-image :src="item.user.avatarUrl" lazy style="width:50px;height:50px" fit="cover"></el-image>
                  </div>
                  <div class="content">
                      <div>{{item.content}}</div>
                  </div>
                  <div class="action">
                      <div class="likedCount">
                        <div class="like">
                          <div v-if="item.liked==false">
                            <img @click="likecomment(item.commentId,1,index)" src="../assets/like0.svg" />
                          </div>
                          <div v-else><img @click="likecomment(item.commentId,0,index)" src="../assets/like1.svg" /></div>
                        </div>
                        <div>({{item.likedCount}})</div>
                      </div>
                      <div class="time">{{item.timeStr}}</div>
                  </div>
                </div>
                
            </el-tab-pane>
            <el-tab-pane label="最新" name="second">
                <div v-for="(item,index) in comments" :key="index">
                  <div>{{item.content}}</div>
                </div>
            </el-tab-pane>
          </el-tabs>
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
      lyrics:'',
      lyricUser:'',
      transUser:'',
      currentLyric:[],  // 这个不是当前歌词，是所有歌词，lyrics[1]，命名没弄好
      // 显示三句歌词
      currentLyricbefore:'',
      currentLyricnow:'',   // 这个才是当前歌词
      currentLyricafter:'',
      currentTime : [],
      songName:this.$route.query.name,
      artistName:this.$route.query.ar,
      al_picUrl:this.$route.query.al_picUrl,
      count:0,


      // 评论部分
      comments:[],
      hotComments:[],
      comments_total:0,
      tabactiveName: 'first'
    };
  },
  created() {
    this.playsong();
    this.getLyrics();
    this.getComment()
  },
  methods: {
    handleClick(tab) {
        // console.log(tab.name);
    },
    async playsong(){
        this.id = this.$route.query.id;
        const {data:res} = await this.$http.get("/song/url?id=" + this.id);
        // console.log(res)
        this.mp3Url = res.data[0].url;
    },
    
    async getComment(){
        this.id = this.$route.query.id;
        const {data:res} = await this.$http.get("/comment/music?id=" + this.id);
        this.comments = res.comments
        this.hotComments = res.hotComments
        this.comments_total = res.total
        console.log(res)
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

        console.log(res)
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
    div{
      margin-bottom: 10px;
  }
  .current{
    font-size: 24px;
  }
 }
}
.comment_box{
  margin-left: 40px;
  padding: 0 20px 20px 20px;
  background-color: #fff;
  .tabs{
    opacity: 0.9;
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
      .avatar{
        .el-image{
          border-radius: 50%;
        }
      }
      .content{
        flex: 9;
        margin-left:10px ;
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


</style>
