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
        <audio :src="mp3Url" controls="controls"></audio>
        <p>{{lyrics}}</p>
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
      currentLyric:'',
      songName:this.$route.query.name,
      artistName:this.$route.query.ar,
      al_picUrl:this.$route.query.al_picUrl
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

    }
  },    
};
</script> 

<style lang="less" scoped>
.main{
    padding: 20px;
}
</style>
