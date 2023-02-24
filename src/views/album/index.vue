<template>
  <div>
    <div class="playlist_info">
      <div class="imgbox">
        <el-image :src="coverImgUrl">
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline"></i>
          </div>
        </el-image>
      </div>
      <div class="infobox">
        <div class="listname">{{ name }}</div>
        <div class="creator_info">
          <el-image :src="avatarUrl">
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
          <div class="creator_nickname">{{ creatorNickname }}</div>
        </div>
        <div class="tags_box">
          <strong>标签:</strong>
          <div class="tags" v-for="item in tags" :key="item.index"> {{ item }}
          </div>
          <div class="clear"></div>
        </div>
        <div class="description"><strong>描述:</strong> {{ description }}</div>
      </div>
      <div class="clear"></div>
    </div>
    <div class="container">
      <section>
        <div class="table-top">
          <h3>歌单</h3>
          共{{ trackCount }}首
        </div>

        <el-table
          :data="tracks"
          empty-text="暂无数据"
          stripe
          style="width: 100%"
        >
          <el-table-column prop="name" label="歌曲标题" width="220">
          </el-table-column>
          <el-table-column prop="ar[0].name" label="歌手" width="220">
          </el-table-column>
          <el-table-column prop="al.name" label="专辑" width="220">
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <img
                @click="getSongUrl(scope.$index, scope.row)"
                class="bofang-icon"
                src="../../assets/bofang.svg"
              />
            </template>
          </el-table-column>
        </el-table>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      creatorNickname: "",
      createTime: 0,
      coverImgUrl: "",
      avatarUrl: "",
      tags: [],
      description: "",
      trackCount: 0,
      tracks: [
        {
          name: "",
          ar: [],
          al: "",
          id: 0,
        },
      ]
    };
  },
  created() {
    this.getPlaylistDetail();
  },
  methods: {
    async getPlaylistDetail() {
      let id = this.$route.query.id;
      if(this.$route.query.index!=0){
        const { data: res } = await this.$http.get("/playlist/detail?id=" + id);
        console.log(res)
        this.name = res.playlist.name;
        this.creatorNickname = res.playlist.creator.nickname;
        this.createTime = res.playlist.createTime;
        this.coverImgUrl = res.playlist.coverImgUrl;
        this.avatarUrl = res.playlist.creator.avatarUrl;
        this.tags = res.playlist.tags;
        this.description = res.playlist.description;

        this.trackCount = res.playlist.trackCount;
        this.tracks = res.playlist.tracks;
      }else{
        // 这里api /likelist/detail?id= 和 /likelist?id= 是一样的
        const { data: res } = await this.$http.get("/likelist?id=" + id+'&cookie='+window.sessionStorage.getItem('cookie'));
        this.trackCount = res.ids.length
        // 暂时只显示20首歌
        this.getlikelistsongs(res.ids.splice(0,20))
      }
    },
    async getlikelistsongs(ids){
       const { data: res } = await this.$http.get("/song/detail?ids=" + ids+'&cookie='+window.sessionStorage.getItem('cookie'));
       this.coverImgUrl = window.sessionStorage.getItem('avatarUrl')
       this.avatarUrl = window.sessionStorage.getItem('avatarUrl')
       this.tracks = res.songs
    },

    async getSongUrl(index, row) {
      console.log(row)
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
  },
};
</script> 

<style lang="less" scoped>
@import url(./index.less);
</style>
