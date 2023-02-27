<template>
<div class="toplist-panel">
    <div class="title-panel"><h3>新歌速递</h3></div>
    <div class="list-panel">
        <div class="mainland">
            <div class="mainland-title">华语新歌</div>
            <div v-for="(item) in newSong[0]" :key="item.index" class="list-item">
                {{item.name}}
            </div>
        </div>
        <div class="nihong">
            <div class="nihong-title">霓虹新歌</div>
            <div v-for="(item) in newSong[0]" :key="item.index" class="list-item">
                {{item.name}}
            </div>
        </div>
        <div class="US">
            <div class="US">欧美新歌</div>
            <div v-for="(item) in newSong[0]" :key="item.index" class="list-item">
                {{item.name}}
            </div>
        </div>
    </div>

</div>
</template>

<script>
export default({
    data(){
        return{
            newSong:[]
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
    .title-panel{
        padding: 10px 0;
    }
    .list-panel{
        display: flex;
        .mainland, .nihong,.US{
            width: 300px;
            margin: 0 auto;
            .list-item{
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                padding: 5px 10px;
            }
            .list-item:nth-child(even){
                background:#ececec;
            }

        }
    }
}
</style>