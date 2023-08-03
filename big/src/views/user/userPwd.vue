<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>重置密码</span>
    </div>
    <!-- 表单 -->
    <el-form
      :model="pwdForm"
      :rules="pwdFormRules"
      ref="pwdFormRef"
      label-width="100px"
    >
      <el-form-item label="原密码" prop="old_pwd">
        <el-input v-model="pwdForm.old_pwd" type="password"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="new_pwd">
        <el-input v-model="pwdForm.new_pwd" type="password"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="re_pwd">
        <el-input v-model="pwdForm.re_pwd" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updatePwdFn">修改密码</el-button>
        <el-button @click="resetFn">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
  
<script>
import {passwordAPI} from '@/api'
export default {
  name: "UserPwd",
  data() {
    const samepwd = (rule,value,callback) => {
      if (value === this.pwdForm.old_pwd) {
        return callback(new Error('新旧密码不能相同'))
      } else {
        callback()
      }
    }
    const repwd = (rule,value,callback) => {
      if (value !== this.pwdForm.new_pwd) {
        return callback(new Error('两次新密码不一样'))
      } else {
        callback()
      }
    }
    return {
      pwdForm: {
        old_pwd: "",
        new_pwd: "",
        re_pwd: "",
      },
      pwdFormRules: {
        old_pwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            pattern: /^\S{6,15}$/,
            message: "密码长度必须是6-15位的非空字符串",
            trigger: "blur",
          },
        ],
        new_pwd: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          {
            pattern: /^\S{6,15}$/,
            message: "密码长度必须是6-15位的非空字符串",
            trigger: "blur",
          },
          { validator: samepwd, trigger: "blur" },
        ],
        re_pwd: [
          { required: true, message: "请再次确认新密码", trigger: "blur" },
          {
            pattern: /^\S{6,15}$/,
            message: "密码长度必须是6-15位的非空字符串",
            trigger: "blur",
          },
          { validator: repwd, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    updatePwdFn() {
      this.$refs.pwdFormRef.validate(async valid => {
        if (!valid) return false
        const res = await passwordAPI(this.pwdForm)
        if (res.data.code !== 0) return this.$message.error('更新密码失败')
        this.$message.success('更新密码成功')
        this.$refs.pwdFormRef.resetFields()
      })
    },
    resetFn() {
      this.$refs.pwdFormRef.resetFields()
    },
  },
};
</script>

<style>
</style>