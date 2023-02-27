<template>
    <div>
        <el-container class="homepage-container">
            <el-header>
                <el-menu
                    :default-active="activeIndex"
                    mode="horizontal"
                    active-text-color="#ffd04b"
                    background-color="#242424"
                    router>
                    <el-menu-item class="logo"><img src="../../assets/logo.png"></el-menu-item>
                    <el-menu-item index="homepage">首页</el-menu-item>
                    <el-menu-item index="findmusic">发现音乐</el-menu-item>
                    <el-menu-item index="artist">音乐人</el-menu-item>
                    <el-submenu class="avatar" index="3">
                        <template slot="title"><img :src="[avatarUrl?avatarUrl:require('../../assets/notlogin.png')]"></template>
                        <el-menu-item index="profile"><i class="el-icon-user"></i>我的主页</el-menu-item>
                        <el-menu-item index="3-2"><i class="el-icon-medal"></i>我的等级</el-menu-item>
                        <el-menu-item index="3-3"><i class="el-icon-setting"></i>个人设置</el-menu-item>
                    </el-submenu>
                    <el-menu-item>
                        <el-input type="text" placeholder="请输入内容" v-model="input">
                            <el-button slot="append" icon="el-icon-search"></el-button>
                        </el-input>
                    </el-menu-item>
                    <el-button type="info" plain @click="logout" class="right btn" icon="el-icon-switch-button" circle></el-button>
                </el-menu>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <Aside></Aside>
                </el-aside> 

                <!-- 主页内容  -->
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
            <div class="footer">
                我倾听大海深处，它在我耳边低声絮语，韵脚比永不停歇的水滴还要锋利<br>我触摸善良的冥界类浆，它们是融化在我血管里的地狱星辰<br>
                在故去的世界，茫茫人海中，我日日期待着，化身以太，永世长存 -- <span>朱莉王</span>
            </div>
        </el-container>        
    </div>
</template>

<script>
import Aside from '../../components/Aside.vue'
export default {
    components: { Aside },
    data() {
      return {
        activeIndex: 'hompage',
        input:'',
        avatarUrl:''
      }
    },
    created(){
        this.getavatar()
        this.getActiveIndex()
    },
    methods:{
        getavatar(){
            this.avatarUrl= window.sessionStorage.getItem('avatarUrl')
        },
        logout(){
            window.sessionStorage.clear()
            this.$router.push("/login")
        },
        getActiveIndex(){
            // 这里需要从store中拿到
            this.activeIndex = this.$store.getters.getActiveBoardId
        }
        
    },
    watch: {
        activeIndex(newVal,oldVal){
            this.getActiveIndex()
        }
    },
}
</script>

<style lang="less" scoped>
@import "../../assets/css/globalcolor.less";
.homepage-container{
    height: 100vh;
}
.el-header{
    background-color:@black-color;
    color: #ccc;
    text-align: center;
    align-items: center;
}


.footer{
    padding: 50px 0;
    line-height: 24px;
    color: #ccc;
    text-align: center;
    background-color:@black-color;
    span{
        font-weight: bold;
    }
}


.el-menu {
    margin-left: 11rem;
    min-width: 56rem;
    .el-menu-item{
        color: #ccc;
    }
}
  
.el-aside {
    background-color: #fff;
    color: @font-black-color;
}
  
.el-main {
    background-color: #f5f5f5;
    color: @font-black-color;
    min-width: 40rem;
}
.logo img{
    height: 2.5rem;
    color: #ccc;
}
.avatar img{
    height: 2.5rem;
    border-radius:100%;
}
.btn{
    margin-top: 0.625rem;
}
</style>