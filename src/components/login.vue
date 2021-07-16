<template>
  <div class="login-container">
    <el-form
      :model="ruleForm2"
      :rules="rules2"
      status-icon
      ref="ruleForm2"
      label-position="left"
      label-width="0px"
      class="demo-ruleForm login-page"
    >
      <h3 class="title">商户登录</h3>
      <el-form-item prop="username">
        <el-input
          type="text"
          v-model="ruleForm2.username"
          auto-complete="off"
          placeholder="用户名"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="ruleForm2.password"
          auto-complete="off"
          placeholder="密码"
        ></el-input>
      </el-form-item>
      <!--<el-checkbox v-model="checked" class="rememberme">记住密码</el-checkbox>-->
      <el-form-item style="width: 100%">
        <el-button
          type="primary"
          style="width: 100%"
          @click="login"
          :loading="logining"
          >登录</el-button
        >
      </el-form-item>
      <router-link to="/">返回首页</router-link>
    </el-form>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  data() {
    return {
      logining: false,
      ruleForm2: {
        username: "",
        password: "",
      },
      rules2: {
        username: [
          {
            required: true,
            message: "please enter your account",
            trigger: "blur",
          },
        ],
        password: [
          { required: true,
            message: "enter your password",
            trigger: "blur"
          },
        ],
      },
      checked: false,
    };
  },
  methods: {
    ...mapMutations(['changeLogin']),
    login(){
      let _this = this;
      if(this.ruleForm2.username === '' || this.ruleForm2.password === '') {
        alert('账号或密码不能为空');
      }
      else {
        this.axios({
          method: 'post',
          url: 'http://localhost:8816/merchantlogin',
          data: {
            account: _this.ruleForm2.username,
            password: _this.ruleForm2.password
          }
        }).then(res => {
          console.log(res.data);
          _this.userToken = res.data.data.token;
          _this.changeLogin({Authorization: _this.userToken });
          _this.$router.push({
            path: '/get_url',
            query: {name : _this.ruleForm2.username}
          });
          alert('登录成功');
        }).catch(error => {
          alert('账号或密码错误');
          console.log(error);
        });
      }
    }
  }
}
</script>

<style scoped>
.login-container {
  background: url("../assets/background.jpg");
  background-size: cover;
  background-position: center;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
}
.login-page {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  margin: 150px auto;
  width: 350px;
  padding: 35px 35px 15px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #e7dfdf;
  background: transparent;
  background: rgba(255, 255, 255, 0.58);
}
label.el-checkbox.rememberme {
  margin: 0px 0px 15px;
  text-align: left;
}
</style>
