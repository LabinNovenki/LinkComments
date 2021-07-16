<template>
  <div class="background">
    <el-container>
      <el-header>
        <el-header>
          <el-row>
            <el-col :span="8">
              <div class="grid-content bg-purple"></div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple-light">这个是商户注册页面</div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <router-link to="/login">
                  <el-button type="primary" round
                    >已经有账户了,去登录</el-button
                  >
                </router-link>
                <router-link to="/">
                  <el-button type="primary" round>返回搜索商家</el-button>
                </router-link>
              </div>
            </el-col>
          </el-row>
        </el-header>
      </el-header>
      <el-main>
        <div class="user_logon_develop_ym">
          <div style="font-size: 35px">商户注册</div>
          <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            label-width="120px"
            id="selectForm"
          >
            <el-form-item label=" 用 户 名 : " prop="userid">
              <el-input
                class="textarea"
                type="text"
                v-model="ruleForm.userid"
                placeholder="请输入用户名:"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label=" 密 码 : " prop="pass">
              <el-input
                class="textarea"
                type="password"
                v-model="ruleForm.pass"
                placeholder="请输入密码:"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label=" 确认密码 : " prop="checkPass">
              <el-input
                class="textarea"
                type="password"
                v-model="ruleForm.checkPass"
                placeholder="请再输入一遍密码:"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-divider />
            <el-form-item label=" 商 家 名 : " prop="username">
              <el-input
                class="textarea"
                type="text"
                v-model="ruleForm.username"
                placeholder="请输入商家名:"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label=" 商 家 地 址 : " prop="address">
              <el-input
                class="textarea"
                type="text"
                v-model="ruleForm.address"
                placeholder="请输入地址:"
              ></el-input>
            </el-form-item>
            <el-form-item label="创 立 时 间: " prop="set_time">
              <el-date-picker
                v-model="ruleForm.set_time"
                type="date"
                placeholder="选择日期"
                style="width: 380px"
                class="textarea"
              >
              </el-date-picker>
            </el-form-item>

            <el-form-item label="联 系 方 式: " prop="userPhone">
              <el-input
                class="textarea"
                type="text"
                v-model.number="ruleForm.userPhone"
                placeholder="请输入联系方式:"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm">立即注册</el-button>
              <el-button @click="resetForm('ruleForm')"> 重 置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "LogonDevelop",
  data() {
    var checkUserid = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空!"));
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var checkPhone = (rule, value, callback) => {
      const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/;
      if (!value) {
        return callback(new Error("电话号码不能为空"));
      }
      setTimeout(() => {
        // Number.isInteger是es6验证数字是否为整数的方法,实际输入的数字总是识别成字符串
        // 所以在前面加了一个+实现隐式转换

        if (!Number.isInteger(+value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (phoneReg.test(value)) {
            callback();
          } else {
            callback(new Error("电话号码格式不正确"));
          }
        }
      }, 100);
    };

    return {
      ruleForm: {
        userid: "",
        username: "",
        address: "",
        set_time: "",
        pass: "",
        checkPass: "",
        userPhone: "",
      },
      rules: {
        userid: [{ validator: checkUserid, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        userPhone: [{ validator: checkPhone, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm() {
      let data = {
        id: this.ruleForm.userid,
        name: this.ruleForm.username,
        address: this.ruleForm.address,
        set_time: this.ruleForm.set_time,
        password: this.ruleForm.pass,
        phone: this.ruleForm.userPhone,
      };
      console.log(data);
      this.axios
        .post("http://localhost:8816/merchant/add", data)
        .then((res) => {
          console.log(res.data);
          this.$router.push("/login");
          if (res.rtCode !== "0") {
            alert("注册失败");
          } else {
            alert("注册成功");
          }
        })
        .catch((error) => {
          alert("注册失败");
          console.log(error);
        });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
.background {
  background: url("../assets/logon.jpg");
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

.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
  background: transparent;
  background: rgba(255, 255, 255, 0.58);
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  width: 1400px;
  height: 660px;
  position: absolute;
  left: 50%;
  top: 54.1%;
  transform: translate(-50%, -50%);
  line-height: 95px;
  background: transparent;
  background: rgba(192, 189, 189, 0.7);
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.user_logon_develop_ym {
  width: 500px;
  margin: auto;
}

#selectForm >>> .el-form-item__label {
  font-size: 20px;
  color: #000000;
}

.textarea >>> .el-input__inner {
  color: #000000 !important;
  background: transparent;
  background: rgba(255, 255, 255, 0.58);
}
</style>

