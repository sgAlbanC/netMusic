<template>
<div>
    <div class="imgbox">
        <el-image :src="data.picUrl" @click="toPlaylistDetail(data.id)" lazy></el-image>
        <div class="listname">{{data.name}}</div>
        <div class="playcount"><i class="el-icon-headset"></i> {{data.playCount}} <i class="el-icon-video-play right"></i></div>
    </div>
</div>
</template>

<script>
export default({
    data(){
        return{
            
        }
    },
    methods:{

    },
    props:{
        data:{
            type:Object
        }
    }
})

</script>

<style scoped lang="less">
</style>