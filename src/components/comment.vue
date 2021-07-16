<template>
  <div class="background">
    <div class="second-app">
<!--    <p><router-link to="/first">去第一个页面</router-link></p>-->
      <div class="block">
        <p><span class="demonstration">评论页面</span></p>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-row type="flex" justify="center">
                <el-col :span="18">
                  <el-form-item label="商家名称：" prop="name" class="label-style">
      <!--              <el-col :span="12" :offset="6">-->
                      <el-input v-model="ruleForm.name"
                                :disabled="true"
                                class = "merchantName"
                      ></el-input>
      <!--              </el-col>-->
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row type="flex" justify="center">
                <el-col :span="18">
                  <el-form-item label="评论：" prop="textarea" class="label-style">
                  <el-input
                    type="textarea"
                    :rows="4"
                    placeholder="请输入您对商家的评价吧"
                    v-model="ruleForm.textarea">
                  </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row type="flex" justify="center">
                <el-col :span="12">
                  <el-form-item label="评分：" prop="star" class="label-style">
                      <el-rate
                        v-model="ruleForm.star"
                        :colors="colors"
                        :texts="['难吃','还行','一般','好吃','超棒']"
                      show-text>
                      </el-rate>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row type="flex" justify="center">
                <el-col :span="12">
                  <el-form-item>
                    <el-button type="primary" icon="el-icon-check" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                  </el-form-item>
                  <el-link type="primary" @click="goback">返回上一页</el-link>
                </el-col>
              </el-row>
            </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Comment",
  data() {
    return {
      colors: ['#66CCFF', '#F7BA2A', '#CB3A56'],
      ruleForm: {
        name: this.$route.query.name,
        tokenid: this.$route.query.tokenid,
        textarea: "",
        star: null
      },
      rules: {
        textarea: [
          {required: true, message: '请输入对商家的评论...', trigger: 'blur'}
        ]
      }
    };
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert(this.ruleForm.textarea);
          this.$options.methods.pushForm();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    pushForm() {
      let _this = this;
      let data = {
        tokenid: this.$route.query.name,
        textarea: this.$route.query.tokenid,
        star: this.ruleForm.star
      }
      this.$axios.post(
        "http://localhost:8816/merchant/add",
        data
      )
      .then((res) => {
        console.log(res.data)
        if (res.data !== 0) {
          alert("该页面已经被其他用户评论过了");
          this.$router.push("/get_url");
        } else {
          alert("评价成功！");
          this.$router.push("/get_url");
        }
      }).catch((error) => {
        alert("该页面已经被其他用户评论过了");
        console.log(error);
        this.$router.push("/get_url");
      })
    }
  }
}
</script>

<style>
.demonstration {
  font-size: x-large;
  line-height: normal;
}
.merchantName >>> ruleForm.name{
  color: black;
}
.block {
  border: 1px solid #DCDFE6;
  width: 700px;
  margin: 180px auto;
  padding: 35px 35px 15px 35px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  box-shadow: 0 0 25px #e7dfdf;
  background: rgba(255, 255, 255, 0.58);
}
.label-style .el-form-item__label {
  color: #000000;
}
.background {
  background: url("../assets/bg2.jpg");
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
</style>
