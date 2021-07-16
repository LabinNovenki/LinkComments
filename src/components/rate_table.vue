<template>
  <div>
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
    >
      <el-menu-item index=""
        ><el-button type="primary" @click="back" >返回搜索</el-button></el-menu-item
      >
    </el-menu>
    <el-table :data="tableData" style="width: 100%">
  <!--    <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="所属店铺">
              <span>{{ props.row.shop }}</span>
            </el-form-item>
            <el-form-item label="商品 ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="店铺 ID">
              <span>{{ props.row.shopId }}</span>
            </el-form-item>
            <el-form-item label="商品分类">
              <span>{{ props.row.category }}</span>
            </el-form-item>
            <el-form-item label="店铺地址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="商品描述">
              <span>{{ props.row.desc }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column> -->
      <el-table-column label="商品 ID" prop="id"> </el-table-column>
      <el-table-column label="商品名称" prop="name"> </el-table-column>
      <el-table-column label="描述" prop="desc"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
      ],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData: function () {
      let _this = this;
      this.axios({
        method: "post",
        url: "",
        data: {
          name: this.$route.query.name,
        },
      })
        .then((res) => {
          console.log(res.data);
          _this.tableData = res.data;
        })
        .catch((error) => {
          alert("搜索失败");
          console.log(error);
        });
    },
    back() {
      this.$router.push("/");
    },
    /*
    handleSizeChange: function (pageSize) {
      // 每页条数切换
      this.pageSize = pageSize;
      this.handleCurrentChange(this.currentPage);
    },
    handleCurrentChange: function (currentPage) {
      //页码切换
      this.currentPage = currentPage;
      this.currentChangePage(this.bondsAllList, currentPage);
    },
    //分页方法（重点）
    currentChangePage(list, currentPage) {
      let from = (currentPage - 1) * this.pageSize;
      let to = currentPage * this.pageSize;
      this.tempList = [];
      for (; from < to; from++) {
        if (list[from]) {
          this.tempList.push(list[from]);
        }
      }
    },*/
  },
};
</script>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
