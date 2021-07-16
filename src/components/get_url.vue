<template>
  <div class="background">
    <el-form class="body">
      <el-button type="primary" icon="el-icon-download" @click="get_url"
        >获取链接</el-button
      >
      <br /><br />
      <el-input
        placeholder="评论链接"
        v-model="input"
        :disabled="false"
        style="width: 500px"
      >
      </el-input>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: "",
    };
  },
  methods: {
    get_url() {
      let _this = this;
      let data = {
        user: this.$route.query.name
      };
      this.axios
        .get("http://localhost:8816/commentCode/getComment", { params: data })
        .then(function (response) {
          JSON.stringify(response);
          console.log(response.data);
          // _this.input = response.data;
          if (response.data.rtCode !== "0") {
            alert("获取失败");
          } else {
            alert("获取成功");
            _this.input = response.data.data;
          }
        })
        .catch((error) => {
          alert("BUG");
          console.log(error);
        });
    },
  },
};
</script>


<style scoped>
.background {
  background: url("../assets/get_url.jpg");
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

.body {
  position: absolute;
  top: 35%;
  left: 35%;
}
</style>
