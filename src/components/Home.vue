<template>
    <div>
        <el-container class="main">
            <el-header>
                <el-menu
                    :default-active="activeIndex"
                    mode="horizontal"
                    @select="handleSelect"
                    active-text-color="#ffd04b"
                    background-color="#242424"
                    router>
                    <el-menu-item class="logo"><img src="../assets/logo.png"></el-menu-item>
                    <el-menu-item index="findmusic">发现音乐</el-menu-item>
                    <el-menu-item index="2">我的音乐</el-menu-item>
                    <el-submenu class="avatar" index="3">
                        <template slot="title"><img v-bind:src="avatarUrl"></template>
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
            <el-container>
                <el-aside width="200px">
                    <Aside></Aside>    
                </el-aside>  
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
            <el-footer>Footer</el-footer>
            
            </el-container>
        </el-container>        
    </div>
</template>

<script>

export default {
    data() {
      return {
        activeIndex: '1',
        input:'',
        avatarUrl:'######'
      }
    },
    created(){
        this.getavatar()
    },
    methods:{
        getavatar(){
            this.avatarUrl= window.sessionStorage.getItem('avatarUrl')
        },
        logout(){
            window.sessionStorage.clear()
            this.$router.push("/login")
        },
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        }
        
    }
}
</script>

<style lang="less" scoped>
.main{
    min-height: 56rem;
}
.el-header, .el-footer {
    background-color: #242424;
    color: #ccc;
    text-align: center;
    line-height: 60px;
}
.el-menu {
    margin-left: 11rem;
    min-width: 56rem;
}
  
.el-aside {
    background-color: #fff;
    color: #333;
    text-align: center;
    // line-height: 160px;
}
  
.el-main {
    background-color: #f5f5f5;
    color: #333;
    min-width: 40rem;
    // text-align: center;
    // line-height: 160px;
}

.logo img{
    height: 2.5rem;
}
.avatar img{
    height: 2.5rem;
    border-radius:100%;
}
.btn{
    margin-top: 0.625rem;
}
</style>
