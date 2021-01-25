<template>
  <div id="login">
  <div id="loginview">
    <input
      type="text"
      v-model="loginForm.account"
      placeholder="用户名"
      name=""
    /><br />
<br />
    <input
      type="text"
      v-model="loginForm.password"
      placeholder="密码"
      name=""
    /><br />
<br />
    <button @click="login">登录</button>
  </div>
    

  </div>
</template>

<script>
import cookie from "js-cookie";

//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import《组件名称》from'《组件路径》';
// import axios from "axios"
export default {
  name: "Login",
  //import 引入的组件需要注入到对象中才能使用
  components: {},
  props: {},
  data() {
    //这里存放数据
    return {
      loginForm: {
        account: "",
        password: "",
      },
      returnData: {
        accountId: "",
        token: "",
      },
    };
  },
  // 计算属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    login() {
      let _this = this;

      if (this.loginForm.account === "" || this.loginForm.password === "") {
        alert("账号或密码不能为空");
      } else {
        this.$axios({
          method: "post",
          url: "http://47.96.15.25:8080/screen_api_v2/web/login",
          data: this.loginForm,
        })
          .then((res) => {
             console.log(res)    
            let accountId = res.data.accountId;
            let token = res.data.token;
            cookie.set("token", token);
         
            if (accountId === -1) {
              alert("账号或密码错误，请重新输入");
            
            } else {      
            this.$store.state.accountId=accountId 
             
              this.$router.push({
                path: "/map/shouye",
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
  //生命周期 - 创建完成（可以访问当前 this 实例）
  created() {},

  //生命周期 - 挂载完成（可以访问 DOM 元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style scoped>
#login{
  margin: 0px;
  background:url('../assets/img/login.jpg');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  min-height: 100vh;
}
#loginview{
  position: absolute;
  margin-left: 50%;
  margin-top: 100%;
  transform: translate(-50%,-50%);
}
#loginview>button{
  vertical-align: middle;
  width:80%;
  margin-left: 10%;
}
</style>