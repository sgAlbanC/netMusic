<template>
    <div class="main">
      <div class="player">
        <div class="normal-player">
          <div class="background">
            <img :src="al_picUrl" width="400px">
          </div>
          <div class="top">
            <div class="back">
              <i class="icon-back"></i>
            </div>
            <h2 class="title">{{songName}}</h2>
            <h1 class="title">{{artistName}}</h1>
          </div>
        </div>
        <audio @pause="onPause" @play="onPlay" @ended="overAudio" @timeupdate="ontimeupdate" :src="mp3Url"  controls="controls"></audio>
        <p>{{currentLyricbefore}}</p>
        <p class="current"><strong>{{currentLyricnow}}</strong></p>
        <p>{{currentLyricafter}}</p>
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
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
      count:0
    };
  },
  created() {
    this.playsong();
    this.getLyrics();
  },
  methods: {
    async playsong(){
        let id = this.$route.query.id;
        const {data:res} = await this.$http.get("/song/url?id=" + id);
        // console.log(res)
        this.mp3Url = res.data[0].url;
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
        this.audioArr.forEach(item=>{
            item.isStart = true;
        })
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
    padding: 20px;
}
.current{
  font-size: 24px;
}
</style>
