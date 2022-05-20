<template>
  <div class="login_container">
    <div class="login_box">
        <div class="login_box_head"><span>注册</span></div>
        <!-- 登录表单 -->
        <el-form class="login_form" ref="registerFormRef" :model="registerForm" :rules="registerFormrules">
          <!-- 用户名 -->
          <el-form-item prop="phone"> 
            <el-input v-model="registerForm.phone" placeholder="请输入手机号" prefix-icon="el-icon-phone"></el-input>
          </el-form-item>
          <!-- 昵称 -->
          <el-form-item prop="nickname"> 
            <el-input v-model="registerForm.nickname" placeholder="请输入昵称" prefix-icon="el-icon-user"></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item prop="password">
            <el-input v-model="registerForm.password" placeholder="请输入密码" prefix-icon="el-icon-lock" show-password></el-input>
          </el-form-item>
          <el-form-item prop="captcha">
            <el-input v-model="registerForm.captcha" placeholder="请输入验证码" prefix-icon="el-icon-message">
                <el-button slot="append" @click="sendCaptcha">发送验证码</el-button>
            </el-input>
          </el-form-item>
          <!-- 按钮 -->
          <el-form-item class="btns">
            <el-button class="btn_login" @click="register">注册</el-button>
            <el-button type="info">登录</el-button>
          </el-form-item>
        </el-form>
    </div>
  </div>
</template>

<script>

export default {
  data(){
    return {
      // 这是登录页面的绑定对象；v-model双向绑定
        registerForm:{
            phone:'',
            nickname:'',
            password:'',
            captcha:'',
        },
        // 表单验证规则对象；这里只能验证输入框，但是不能拦截点击注册按钮请求；下面的预验证可以
        registerFormrules:{
            phone:[
                { required:true, min: 11, max: 11, message: '长度只能为11位', trigger: 'blur' }
            ],
            nickname:[
                { required:true, min: 1, max: 10, message: '请输入1~10位昵称', trigger: 'blur' }
            ],
            password:[
                { required:true, min: 6, max: 15,  message: '请输入6~15位密码', trigger: 'blur' }
            ],
            captcha:[
                { required:true, min: 4, max: 4,  message: '请输入4位验证码', trigger: 'blur' }
            ]
        }
      }
  },
  methods:{
      // 表单预验证；registerFormRef这是引用对象，可以拿着这个对象操作表单的值
      // valid值为false 或者 true

      async sendCaptcha(){ 
          // 请求回来的是promise对象，用async await可以解析出来
          // 因为返回的被axios封装了，我们只需要data的值，即将data结构赋值。data:res 结构赋值
          const {data:res0} = await this.$http.get('/cellphone/existence/check?phone='+this.registerForm.phone)
          console.log(res0)
          if(res0.code !== 200){
               const {data:res} = await this.$http.get('/captcha/sent?phone='+this.registerForm.phone)
              //  console.log(res)
                if(res.code !== 200){
                  return console.log("发送失败！")
                }
                this.$message({
                message: '短信发送成功',
                type: 'success'
                });
          }
          else{
            this.$message({
              message: '该手机已注册',
              type: 'warning'
            });
            return
          }
      },
      register(){
          this.$refs.registerFormRef.validate(async (valid)=>{
              if(!valid) return;
              // 上面已经发送了验证码，现在需要验证验证码；我不需要then出拿到结果，只需要用if else语句判断下面是否继续执行
              const {data:res1} = await this.$http.get('/captcha/verify?phone='+this.registerForm.phone+'&captcha='+this.registerForm.captcha);
              if(res1.code !== 200){
                this.$message({
                    message: '验证码错误',
                    type: 'error'
                  });
              }
              else{
                const {data:res2} = await this.$http.get('/register/cellphone?phone='+this.registerForm.phone+
                '&password='+this.registerForm.password+
                '&captcha='+this.registerForm.captcha+
                '&nickname='+this.registerForm.nickname);
                if(res2.code == 505){
                  this.$message({
                    message: '该昵称已被占用',
                    type: 'warning'
                  });
                }
                else if(res2.code == 200){
                  this.$message({
                    message: '注册成功',
                    type: 'success'
                  });
                  // 注册成功后跳转到login页面
                  this.$router.push("/login")
                }
                else {
                  this.$message({
                    message: '注册失败',
                    type: 'error'
                  });
                }
              }
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
  height: 400px;
  background-color:#fff;
  border-radius: 4px;
  position: absolute;
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
    bottom: 20px;
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
    }
  }
  
}
  

</style>
