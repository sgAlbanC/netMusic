<template>
    <div class="main">
        <section>

        </section>
        <section>
            <audio :src="mp3Url" controls="controls"></audio>
        </section>
        <section>
            <p>{{lyrics}}</p>
        </section>

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
      currentLyric:''
    };
  },
  created() {
    this.playsong();
    this.getLyrics();
  },
  methods: {
    async playsong(){
        let id = this.$route.query.id;
        // console.log(id)
        const {data:res} = await this.$http.get("/song/url?id=" + id);
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
        
        // this.currentLyric = new Lyric(lyric, this.lyricHandle)
    }
  },    
};
</script> 

<style lang="less" scoped>
.main{
    padding: 20px;
}
</style>
