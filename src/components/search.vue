<template>
  <div class="background">
    <div>
      <img src="@/assets/logo.png" height="300" width="500" />
    </div>
    <el-input
      v-model="keyword"
      :disabled="disabled"
      :placeholder="placeholder"
      prefix-icon="el-icon-search"
      style="width: 350px; margin-right: 10px; margin-top: 20px "
      clearable
      @clear="search"
      @keydown.enter.native="search"
    ></el-input>
    <el-button
      :disabled="disabled"
      icon="el-icon-search"
      type="primary"
      @click="search"
    >
      搜索
    </el-button>
    <div class="login">
      <el-button type="info" @click="login">商户登录</el-button>
      <el-button type="info" @click="logon">商户入驻</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Search",
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: "请输入店铺进行搜索，可以直接回车搜索...",
    },
  },
  data() {
    return {
      keyword: "",
    };
  },
  methods: {
    search() {
      let _this = this;
      if (_this.keyword === "") {
        alert("搜索关键词不能为空");
      } else {
        _this.$router.push({
          path: "/rate_table",
          query: { name: _this.keyword },
        });
      }
    },
    login() {
      this.$router.push("/login");
    },
    logon() {
      this.$router.push("/logon");
    },
  },
};
</script>

<style scoped>
.background {
  background: url("../assets/search.jpg");
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
.login {
  margin-top: 6cm;
}
.el-button--info {
  color: #fff;
  background-color: #9fb6af6b;
  border-color: #13020a;
}
</style>