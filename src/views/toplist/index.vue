<template>
<div class="toplist-panel">
    <div class="toplist_title"><h3>新歌速递</h3></div>
    <div class="list-panel">
        <div class="area-newsong">
            <div class="head">
                <div class="logo">
                    <img src="@/assets/mainland.jpg">
                </div>
                <div class="title">华语新歌</div>
            </div>
            <div v-for="(item,index) in newSong[0]" :key="index" class="list-item"
                @click="getSongUrl(item.id)">
               <span class="list-item-num">{{ parseInt(index)+1 }}</span> {{item.name}}
            </div>
        </div>
        <div class="area-newsong">
            <div class="head">
                <div class="logo">
                    <img src="@/assets/japan.jpg">
                </div>
                <div class="title">霓虹新歌</div>
            </div>
            <div v-for="(item,index) in newSong[0]" :key="index" class="list-item">
               <span class="list-item-num">{{ parseInt(index)+1 }}</span> {{item.name}}
            </div>
        </div>
        <div class="area-newsong">
            <div class="head">
                <div class="logo">
                    <img src="@/assets/us.jpg">
                </div>
                <div class="title">欧美新歌</div>
            </div>
            <div v-for="(item,index) in newSong[0]" :key="index" class="list-item">
               <span class="list-item-num">{{ parseInt(index)+1 }}</span> {{item.name}}
            </div>
        </div>
    </div>

</div>
</template>

<script>
export default({
    data(){
        return{
            newSong:[],
        }
    },

    created() {
        this.getNewSong()
    },

    methods:{
        async getNewSong(){
            const type=['96','8','7']
            for(let i=0;i<1;i++){
                const {data:res} = await this.$http.get('/top/song?type='+type[i]);
            this.newSong.push({...(res.data.slice(0,10))})
            console.log(this.newSong)
            } 
        },

        async getSongUrl(id) {
            //  检查音乐是否可播放  
            try {
                // 第一个请求只是看是否能请求成功
                let check= await this.$http.get("/check/music?id=" + id);
                this.toLyrics(id)
            }catch (error) {
                console.log(error);
                this.$message({ message: "亲爱的，暂无版权!" });
                }
            },

        toLyrics(id){
          this.$router.push({
              path:"/lyrics",
              query: {   
                  id: id,
              } 
          })
      }
    },
    props:{
        data:{
            type:Object
        }
    }
})

</script>

<style scoped lang="less">

.toplist-panel{
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
    margin: 20px 0;
    padding: 10px;
    background-color: #fff;
    .toplist_title{
        padding: 10px 0;
    }
    .list-panel{
        display: flex;
        .area-newsong{
            width: 300px;
            margin: 0 auto;
            .head{
                display: flex;
                padding: 10px;
                background-color: #f9f9f9;
                .logo{
                    // padding: 10px;
                    margin-right:10px;
                    
                    img{
                        height: 80px;
                        width: 80px;
                        object-fit: cover;
                    }
                }
                .title{
                    margin-top: 10px;
                    font-weight: bold;
                }
            }
            .list-item{
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                padding: 5px 10px;
                line-height: 24px;
                cursor: pointer;
                .list-item-num{
                    margin-right: 5px;
                }
            }
            .list-item:nth-child(even){
                background:#ececec;
            }
            .list-item:nth-child(-n+4){
                .list-item-num{
                    color: #C2170C;;
                }
            }
            .list-item:nth-child(2){
                font-size: 18px;
            }
            .list-item:hover{
                opacity: 0.8;
            }
 
        }
    }
}
</style>