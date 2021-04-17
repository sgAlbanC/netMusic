# netmusic

### 网易云音乐 vue+nodejs

网易云音乐后端的api用的下面这个；我是把api部署到vercel上，vercel监听github项目。（后期前端也打算部署到这上面）

https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e5%8a%9f%e8%83%bd%e7%89%b9%e6%80%a7



### 记录前端开发流程

1. #### 首先用vue脚手架创建netMusic项目

   babel + 使用配置文件 + less + router ；（暂时取消eslint校验）

2. #### 在github上创建仓库；并把本地项目上传到github仓库中去

   全局只需配置一次

   git config --global user.name "Oliver6565"

   git config --global user.emal "...."

   cat ~/.gitconfig	查看配置

   **本地仓库**：git status 查看项目中文件的状态	

   ​				git add . / git add "文件名"，把所有或单个更改了的文件上传到暂存区；红色文件变绿色

   ​				git commit -m "描述"  把所有文件上传到项目中去，并此操作的描述；

   git checkout -b login

   git branch	查看项目分支情况

   **github远程仓库**： git push -m "日志"；-m是message。通常是完成某个模块的时候，上传一次

3. #### VScode打开项目

   - main.js：项目入口；将路由挂载到vue实例上；并用实例将根组件渲染到页面上

   - App.vue：根组件；创建一个vue的实例app；router-view路由占位符

   - router/index.js ： 路由

   - components/各种.vue组件

