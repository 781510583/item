<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>文章列表</span>
      </div>
      <!-- 搜索区域 -->
      <div class="search-box">
        <el-form :inline="true" :model="q">
          <el-form-item label="文章分类">
            <el-select
              v-model="q.cate_id"
              placeholder="请选择分类"
              style="width: 100%"
            >
              <!-- 循环渲染分类的可选项 -->
              <el-option
                v-for="item in cateList"
                :label="item.cate_name"
                :value="item.id"
                :key="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发布状态" style="margin-left: 15px">
            <el-select v-model="q.state" placeholder="请选择状态" size="small">
              <el-option label="已发布" value="已发布"></el-option>
              <el-option label="草稿" value="草稿"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="sift"
              >筛选</el-button
            >
            <el-button type="info" size="small" @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
        <!-- 发表文章的按钮 -->
        <el-button
          type="primary"
          size="small"
          class="btn-pub"
          @click="showPubDialogFn"
          >发表文章</el-button
        >
      </div>

      <!-- 文章表格区域 -->
      <el-table :data="artList" style="width: 100%" border stripe>
        <el-table-column label="文章标题" prop="title">
          <template v-slot="scope">
            <el-link type="primary" @click="showDetailFn(scope.row.id)">{{
              scope.row.title
            }}</el-link>
          </template>
        </el-table-column>
        <el-table-column label="分类" prop="cate_name"></el-table-column>
        <el-table-column label="发表时间" prop="pub_date">
          <template v-slot="scope">
            <span>{{ $formatDate(scope.row.pub_date) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" prop="state"></el-table-column>
        <el-table-column label="操作" >
          <template v-slot="scope">
            <el-button type="danger" @click="removeFn(scope.row.id)">删除</el-button>
          </template>
          
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->


      <el-pagination
        @size-change="handleSizeChangeFn"
        @current-change="handleCurrentChangeFn"
        :current-page.sync="q.pagenum"
        :page-sizes="[2, 3, 5, 10]"
        :page-size.sync="q.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <el-dialog
      title="发表文章"
      :visible.sync="pubDialogVisible"
      :before-close="handleClose"
      @close="dialogCloseFn"
    >
      <el-form
        :model="pubForm"
        :rules="pubFormRules"
        ref="pubFormRef"
        label-width="100px"
      >
        <el-form-item label="文章标题" prop="title">
          <el-input v-model="pubForm.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="文章分类" prop="cate_id">
          <el-select
            v-model="pubForm.cate_id"
            placeholder="请选择分类"
            style="width: 100%"
          >
            <el-option
              v-for="obj in cateList"
              :key="obj.id"
              :label="obj.cate_name"
              :value="obj.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文章内容" prop="content">
          <!-- 使用 v-model 进行双向的数据绑定 -->
          <quill-editor
            v-model="pubForm.content"
            @change="contentChangeFn"
          ></quill-editor>
        </el-form-item>
        <el-form-item label="文章封面" prop="'cover_img'">
          <!-- 用来显示封面的图片 -->
          <img
            src="../../../assets/images/cover.jpg"
            alt=""
            class="cover-img"
            ref="imgRef"
          />
          <br />
          <!-- 文件选择框，默认被隐藏 -->
          <input
            type="file"
            style="display: none"
            accept="image/*"
            ref="iptFileRef"
            @change="onCoverChangeFn"
          />
          <!-- 选择封面的按钮 -->
          <el-button type="text" @click="chooseImgFn">+ 选择封面</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="pubArticleFn('已发布')"
            >发布</el-button
          >
          <el-button type="info" @click="pubArticleFn('草稿')"
            >存为草稿</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="文章预览" :visible.sync="detailVisible" width="80%">
      <h1 class="title">{{ artDetail.title }}</h1>

      <div class="info">
        <span>作者：{{ artDetail.nickname || artDetail.username }}</span>
        <span>发布时间：{{ $formatDate(artDetail.pub_date) }}</span>
        <span>所属分类：{{ artDetail.cate_name }}</span>
        <span>状态：{{ artDetail.state }}</span>
      </div>

      <!-- 分割线 -->
      <el-divider></el-divider>

      <!-- 文章的封面 -->
      <img :src="baseURL + artDetail.cover_img" alt="" />

      <!-- 文章的详情 -->
      <div v-html="artDetail.content" class="detail-box"></div>
    </el-dialog>
  </div>
</template>
  
  <script>
import {
  classifyAPI,
  uploadArticleAPI,
  getArticleListAPI,
  getArticleDetailAPI,
  delArticleAPI,
} from "@/api";
import { baseURL } from "@/utils/request";
import defaultImg from "@/assets/images/cover.jpg";
export default {
  name: "ArtList",
  data() {
    return {
      // 查询参数对象
      baseURL,
      page: 10,
      q: {
        pagenum: 1,
        pagesize: 5,
        cate_id: "",
        state: "",
      },
      cateList: [],
      pubFormRules: {
        // 表单的验证规则对象
        title: [
          { required: true, message: "请输入文章标题", trigger: "blur" },
          {
            min: 1,
            max: 30,
            message: "文章标题的长度为1-30个字符",
            trigger: "blur",
          },
        ],
        cate_id: [
          { required: true, message: "请选择文章标题", trigger: "change" },
        ],
        content: [
          { required: true, message: "请输入文章内容", trigger: "blur" },
        ],
        cover_img: [{ required: true, message: "请选择封面", trigger: "blur" }],
      },
      pubDialogVisible: false,
      detailVisible: false,
      pubForm: {
        title: "",
        cate_id: "",
        content: "",
        cover_img: "",
        state: "",
      },
      artList: [],
      total: 0,
      artDetail: {},
    };
  },
  methods: {
    async getCateListFn() {
      const { data: res } = await classifyAPI();
      this.cateList = res.data;
    },
    async getArticleListFn() {
      const { data: res } = await getArticleListAPI(this.q);
      // this.cateList = res.data
      this.artList = res.data;
      this.total = res.total;
    },
    async handleClose(done) {
      const confirmResult = await this.$confirm(
        "此操作将导致文章信息丢失, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      // 取消了关闭-阻止住, 什么都不干
      if (confirmResult === "cancel") return;
      // 确认关闭
      done();
    },
    showPubDialogFn() {
      this.pubDialogVisible = true;
    },
    chooseImgFn() {
      this.$refs.iptFileRef.click();
    },
    onCoverChangeFn(e) {
      const files = e.target.files;
      if (files.length === 0) {
        this.pubForm.cover_img = null;
        this.$refs.imgRef.setAttribute("src", defaultImg);
      } else {
        this.pubForm.cover_img = files[0];
        const url = URL.createObjectURL(files[0]);
        this.$refs.imgRef.setAttribute("src", url);
      }
      this.$refs.pubFormRef.validateField("cover_img");
    },
    pubArticleFn(str) {
      this.pubForm.state = str;
      this.$refs.pubFormRef.validate(async (valid) => {
        if (valid) {
          if (!this.pubForm.cover_img) {
            return this.$message.error("请选择文章封面！");
          }
          let fd = new FormData();
          fd.append("title", this.pubForm.title);
          fd.append("content", this.pubForm.content);
          fd.append("cate_id", this.pubForm.cate_id);
          fd.append("cover_img", this.pubForm.cover_img);
          fd.append("state", this.pubForm.state);
          const { data: res } = await uploadArticleAPI(fd);
          if (res.code !== 0) {
            console.log(res);
            return this.$message.error("文章发布失败");
          } else {
            this.$message.success("文章发布成功");
            // this.pubForm = ''
            this.pubDialogVisible = false;
            this.getArticleListFn();
          }
        } else {
          return false;
        }
      });
    },
    contentChangeFn() {
      this.$refs.pubFormRef.validateField("content");
    },
    dialogCloseFn() {
      this.$refs.pubFormRef.resetFields();
      this.$refs.imgRef.setAttribute("src", defaultImg);
    },
    handleSizeChangeFn() {
      this.getArticleListFn();
    },
    handleCurrentChangeFn() {
      this.getArticleListFn();
    },
    sift() {
      this.q.pagenum = 1;
      this.getArticleListFn();
    },
    reset() {
      this.q.pagenum = 1;
      this.q.pagesize = 5;
      this.q.cate_id = "";
      this.q.state = "";
      this.getArticleListFn();
    },
    async showDetailFn(artid) {
      const { data: res } = await getArticleDetailAPI(artid);
      if (res.code !== 0) return this.$message.error("获取详情失败");
      this.$message.success("获取详情成功");
      this.detailVisible = true;
      this.artDetail = res.data
    },
    removeFn(artid) {
      this.$confirm('确认删除','提示',{
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        this.$message({
          type:'success',
          message:'删除成功',
        })
        const { data : res } = await delArticleAPI(artid)
        if(res.code !== 0) return this.$message.error('删除失败')
        if (this.total % this.q.pagesize === 1 && (this.q.pagenum - 1) * this.q.pagesize + 1 === this.total) {
          this.q.pagenum -= 1
        }
        this.$message.success('删除成功')
        this.getArticleListFn();
      }).catch(() => {
        this.$message({
          type:'info',
          message:'取消删除'
        })
      })
    }
  },
  created() {
    this.getCateListFn();
    this.getArticleListFn();
  },
};
</script>

<style lang="less" scoped>
.search-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  .btn-pub {
    margin-top: 5px;
  }
}

// 设置富文本编辑器的默认最小高度
// ::v-deep作用: 穿透选择, 正常style上加了scope的话, 会给.ql-editor[data-v-hash]属性, 只能选择当前页面标签或者组件的根标签
// 如果想要选择组件内的标签(那些标签没有data-v-hash值)所以正常选择选不中, 加了::v-deep空格前置的话, 选择器就会变成如下形式
// [data-v-hash] .ql-editor 这样就能选中组件内的标签的class类名了
::v-deep .ql-editor {
  min-height: 300px;
}

// 设置图片封面的宽高
.cover-img {
  width: 400px;
  height: 280px;
  object-fit: cover;
}

.el-pagination {
  margin-top: 15px;
}

.title {
  font-size: 24px;
  text-align: center;
  font-weight: normal;
  color: #000;
  margin: 0 0 10px 0;
}

.info {
  font-size: 12px;
  span {
    margin-right: 20px;
  }
}

// 修改 dialog 内部元素的样式，需要添加样式穿透
::v-deep .detail-box {
  img {
    width: 500px;
  }
}
</style>