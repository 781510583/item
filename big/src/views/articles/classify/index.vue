<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix header-box">
        <span>文章分类</span>
        <el-button type="primary" size="mini" @click="addCateBtnFn"
          >添加分类</el-button
        >
      </div>
      <!-- 表格区域 -->
      <el-table style="width: 100%" :data="cateList" border stripe>
        <el-table-column
          label="序号"
          type="index"
          width="100"
        ></el-table-column>
        <el-table-column label="分类名称" prop="cate_name"></el-table-column>
        <el-table-column label="分类别名" prop="cate_alias"></el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button type="primary" size="mini" @click="updateFn(scope.row)"
              >修改</el-button
            >
            <el-button type="danger" size="mini" @click="removeFn(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加分类的对话框 -->
    <el-dialog
      :title="isEdit ? '编辑文章分类' : '添加文章分类'"
      :visible.sync="addVisible"
      width="35%"
      @closed="onAddClosedFn"
    >
      <!-- 添加的表单 -->
      <el-form
        :model="addForm"
        :rules="addRules"
        ref="addRef"
        label-width="80px"
      >
        <el-form-item label="分类名称" prop="cate_name">
          <el-input
            v-model="addForm.cate_name"
            minlength="1"
            maxlength="10"
          ></el-input>
        </el-form-item>
        <el-form-item label="分类别名" prop="cate_alias">
          <el-input
            v-model="addForm.cate_alias"
            minlength="1"
            maxlength="15"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="cancelFn">取 消</el-button>
        <el-button size="mini" type="primary" @click="addFn">{{ btn }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  classifyAPI,
  addArtCateAPI,
  updateArtCateAPI,
  delArtCateAPI,
} from "@/api";
export default {
  name: "myClassify",
  data() {
    return {
      cateList: [],
      addForm: {
        cate_name: "",
        cate_alias: "",
      },
      btn:'添加',
      isEdit: false,
      editId:'',
      addVisible: false,
      addRules: {
        // 添加表单的验证规则对象
        cate_name: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
          {
            pattern: /^\S{1,10}$/,
            message: "分类名必须是1-10位的非空字符",
            trigger: "blur",
          },
        ],
        cate_alias: [
          { required: true, message: "请输入分类别名", trigger: "blur" },
          {
            pattern: /^[a-zA-Z0-9]{1,15}$/,
            message: "分类别名必须是1-15位的字母数字",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    // 获取文章分类
    this.initCateListFn();
  },
  methods: {
    async initCateListFn() {
      const res = await classifyAPI();
      this.cateList = res.data.data;
    },
    addCateBtnFn() {
      this.addVisible = true;
      this.editId = ''
      this.isEdit = false
    },
    updateFn(e) {
        this.addVisible = true
        this.editId = e.id
        this.isEdit = true
        this.btn = '修改'
        this.$nextTick(() => {
        // 先让对话框出现, 它绑定空值的对象, 才能resetFields清空用初始空值
          this.addForm.cate_name = e.cate_name
          this.addForm.cate_alias = e.cate_alias
      })

    },
    async removeFn(id) {
      const res = await delArtCateAPI(id)
      if (res.data.code !== 0)  return this.$message.error('删除失败')
      this.$message.success("删除成功")
      this.initCateListFn()
    },
    cancelFn() {
      this.addVisible = false;
      this.btn = '添加'
    },
    onAddClosedFn () {
      this.$refs.addRef.resetFields()
    },
    async addFn() {
        // this.addForm.cate_name = ''
        // this.addForm.cate_alias = ''
        this.$refs.addRef.validate(async valid => {
            if (valid) {
                if (this.isEdit) {
                    const res = await updateArtCateAPI({ id: this.editId, ...this.addForm })
                    if(res.data.code !== 0) return this.$message.error('更新分类失败')
                    this.$message.success('更新分类成功')
                    this.btn = '添加'
                } else {
                    const res = await addArtCateAPI(this.addForm)
                    if(res.data.code !== 0) return this.$message.error('添加分类失败')
                    this.$message.success('添加分类成功')
                }

                this.initCateListFn()
                this.addVisible = false
            } else {
                return false
            }
        })
    },
  },
};
</script>

<style lang="less" scoped>
.header-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
