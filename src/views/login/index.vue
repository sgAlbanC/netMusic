<template>
  <div class="login_container">
    <div class="tip"> 请扫码左上角登录 
    </div>
    
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
            <!-- @keyup.enter="login" -->
            <el-button class="btn_login" @click="login"  disabled>登录</el-button> 
            <el-button type="info" disabled>注册</el-button>
          </el-form-item>
        </el-form>
    </div>
    <!-- 创建DOM元素，二维码显示的位置 -->

    <div class="qrcode">
      <div id="qrcode" ref="qrcode" v-if="qrMessage.code!=800"></div>
      <h3>{{ qrMessage.message }}</h3>
    </div>
    <div v-if="avatarUrl!=''">
      <img  class="avatar" :src="avatarUrl"/>
    </div>    
    
  </div>
  
</template>

<script>
import QRCode from 'qrcodejs2'

export default {
  
  data(){
    return {
      // 这是登录页面的绑定对象
      loginForm:{
        phone:'',
        password:''
      },
      registerFormrules:{
        phone:[
            { required:true, min: 11, max: 11, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        password:[
            { required:true, min: 6, max: 15, message: '请输入6~20位密码', trigger: 'blur' }
        ]
      },
      qrMessage:{},
      avatarUrl:''

    }
  },
  created(){

    this.getQRCodeKey()
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
    },
    // 二维码登录
    async getQRCodeKey(){
      const {data:res} = await this.$http.get('login/qr/key')
      let unikey = res.data.unikey
      this.getQRCode(unikey)
      var startTime = new Date().getTime();
      this.qrCodeCheck(unikey) // 先立即执行一次
      let timer=setInterval(()=>{
        if(new Date().getTime() - startTime >= 30000){
          clearInterval(timer); // 这个代码是用来停止的
          this.qrMessage.message = '请刷新页面'
          return;
        }
        this.qrCodeCheck(unikey)
      },2000)

    },
    async getQRCode(unikey){
      const {data:res} = await this.$http.get('login/qr/create?key='+unikey)
      let url =  res.data.qrurl
      this.qrCode(url)
    },

    // 显示二维码
    qrCode(url){
      document.getElementById('qrcode').innerHTML = ''
      let qrcode = new QRCode('qrcode',{
        width:150,height:150
      })
      qrcode.clear()
      qrcode.makeCode(url) //生成另一个新的二维码
    },

    async qrCodeCheck(unikey){
      const {data:res} = await this.$http.get('login/qr/check?key='+unikey)
      this.qrMessage = res
    },
  },
  
  watch: {
      qrMessage(newVal,oldVal){
        console.log(newVal)
        if(newVal.code==800){
          this.avatarUrl = '' // 二维码失效，取消头像
        }
        if(newVal.code==802){
          this.avatarUrl = newVal.avatarUrl   // 授权时，添加头像在中间
          window.sessionStorage.setItem("avatarUrl",newVal.avatarUrl)
        }
        if(newVal.code == 803 ){
          window.sessionStorage.setItem("cookie",newVal.cookie)
          this.$router.push({
            path:'/homepage',
        }) 
        }
      }
  },
}
</script>

<style lang="less" scoped>
// 单文件组件；加上scoped，防止与其他组件样式冲突
.login_container{
  // #C20C0C
  width: 100vw;
  background-color: #eeebdd;
  height: 100vh;
  .tip{
    display: block;
    margin: 0 auto;
    width: 300px;
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    padding-top: 40px;
  }
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
.qrcode{
    position: absolute;
    top: 0;
  }
  
  .avatar{
    position: absolute;
    width: 50px;
    height: 50px;
    position: absolute;
    top: 50px;
    left: 50px;
    z-index: 1000;
  }

</style>
