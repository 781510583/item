<template>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>更换头像</span>
      </div>
      <div>
        <!-- 图片，用来展示用户选择的头像 -->
        <img class="the_img" v-if="!this.avatar" src="../../assets/images/avatar.jpg" alt="" />
        <img class="the_img" v-else :src="this.avatar" alt="">
  
        <!-- 按钮区域 -->
        <div class="btn-box">
          <input type="file" accept="image/*" style="display: none" ref="iptRef" @change="onFileChange" />
          <el-button type="primary" icon="el-icon-plus" @click="chooseImg">选择图片</el-button>
          <el-button type="success" icon="el-icon-upload" :disabled="avatar === ''" @click="uploadFn">上传头像</el-button>
        </div>
      </div>
    </el-card>
  </template>
  
  <script>
  import { avatarAPI } from '@/api'
  export default {
    name: 'UserAvatar',
    data () {
      return {
        avatar: ''
      }
    },
    methods: {
      // 选择图片->点击事件->让选择框出现
      chooseImg () {
        this.$refs.iptRef.click()
      },
      // 在选择框中选择图片后触发的改变事件
      onFileChange (e) {
        // 获取用户选择的文件列表（伪数组）
        const files = e.target.files
        if (files.length === 0) {
          this.avatar = ''
        } else {
          const fr = new FileReader()
          fr.readAsDataURL(files[0])
          fr.onload = (e) => {
            this.avatar = e.target.result 
          }
        }
      },
      async uploadFn() {
        const res = await avatarAPI(this.avatar)
            if (res.data.code !== 0)return this.$message.error('上传文件失败')
            this.$message.success('上传头像成功！')
            this.$store.dispatch('getUserInfoActions')      
      }
    }
  }
  </script>
  
  <style lang="less" scoped>
  .btn-box {
    margin-top: 10px;
  }
  .preview {
    object-fit: cover;
  }
  .the_img{
      width: 350px;
      height: 350px;
  }
  </style>
  