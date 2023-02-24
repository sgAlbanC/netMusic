<template>
  <div class="login_container">
    <div class="login_box">
        <div class="login_box_head"><span>登录</span></div>
        <!-- 登录表单 -->
        <el-form class="login_form" ref="loginFormRef" :model="loginForm" :rules="registerFormrules">
          <!-- 用户名 -->
          <el-form-item prop="phone"> 
            <el-input v-model="loginForm.phone" placeholder="请输入手机号" prefix-icon="el-icon-phone"></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" placeholder="请输入密码" prefix-icon="el-icon-lock" show-password></el-input>
          </el-form-item>
          <!-- 按钮 -->
          <el-form-item class="btns">
            <el-button class="btn_login" @click="login" @keyup.enter="login">登录</el-button>
            <el-button type="info">注册</el-button>
          </el-form-item>
        </el-form>
    </div>
  </div>
</template>

<script>
export default {
  
  data(){
    return {
      // 这是登录页面的绑定对象
      loginForm:{
        phone:'15320215923',
        password:'1234567'
      },
      registerFormrules:{
        phone:[
            { required:true, min: 11, max: 11, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        password:[
            { required:true, min: 6, max: 15, message: '请输入6~20位密码', trigger: 'blur' }
        ]
      }
    }
  },
  created(){
    let that = this;
    document.onkeydown = function(e){
        let key = window.event.keyCode;
        if(key == 13){
            that.login();
        }
    }
  },
  methods:{
    login(){
      this.$refs.loginFormRef.validate(async (valid) => {
        if(!valid) return;

        const {data:res} = await this.$http.get('/register/anonimous')
        this.$store.state.loginUserInfo = res

        if(res.code!==200){     
          this.$message({
            message: '登录失败',
            type: 'error'
          });
          return
        }
        
        window.sessionStorage.setItem("cookie",res.cookie)
        this.$router.push("/homepage")
      })
    }
  }
}
</script>

<style lang="less" scoped>
// 单文件组件；加上scoped，防止与其他组件样式冲突
.login_container{
  // #C20C0C
  background-color: #eeebdd;
  height: 100%;
}
.login_box{
  width: 450px;
  height: 300px;
  background-color:#fff;
  border-radius: 4px;
  position: absolute; // 就是绝对定位
  top:48%;
  left:50%;
  transform: translate(-50%,-50%);
  box-shadow: 0 5px 16px #ccc;
  
  .login_box_head{
    line-height: 38px;
    background-color: #2d2d2d;
    border-radius: 4px 4px 0 0;

    span{
      display: inline-block;
      padding-left: 18px;
      border-radius: 3px 3px 0 0;
      font-weight: bold;
      color: #fff;
    }
  }
  .login_form{
    position: absolute;
    bottom: 25px;
    width:100%;
    padding: 0 20px;
    box-sizing: border-box;
  }
  .btns{
    display: flex;
    justify-content: flex-end;
    .btn_login{
      background-color: #C20C0C;
      color:#fff;
      .btn_login:hover{
        background-color: #9B0909;
        color:#fff;
      }
    }
  }
}
  

</style>
