// 封装的是具体接口请求方法
import request from '@/utils/request'
export const registerAPI = ( {username,password,repassword}) => {
  return request({
    url: '/api/reg',
    method: 'POST',
    data: {
      username,
      password,
      repassword
    }
  })
}
export const loginAPI = ( {username,password}) => {
  return request({
    url: '/api/login',
    method: 'POST',
    data: {
      username,
      password
    }
  })
}
export const getUserInfoAPI = () => {
  return request({
    url: '/my/userinfo',
  })
}
export const userMenusAPI = ()=>{
  return request({
    url:'/my/menus',
  })
}
export const updateUserAPI = ({id,email,nickname,user_pic,username})=> {
  return request({
    url:'/my/userinfo',
    method:'PUT',
    data: {
      id,
      email,
      nickname,
      user_pic,
      username
    }
  })
}
export const avatarAPI = (avatar) => {
  return request({
    url:'/my/update/avatar',
    method:'PATCH',
    data:{
      avatar
    }
  })
}
export const passwordAPI = ({old_pwd, new_pwd, re_pwd}) => {
  return request({
    url:'/my/updatepwd',
    method:'PATCH',
    data: {
      old_pwd, 
      new_pwd, 
      re_pwd
    }
  })
}
export const classifyAPI = () => {
  return request({
    url:'/my/cate/list'
  })
}
export const addArtCateAPI = ({cate_name, cate_alias }) => {
  return request ({
    url:'/my/cate/add',
    method:'POST',
    data:{
      cate_name,
      cate_alias
    }
  })
}
export const updateArtCateAPI = ({id,cate_name,cate_alias}) => {
  return request ({
    url:'/my/cate/info',
    method:'PUT',
    data: {
      id,
      cate_alias,
      cate_name
    }
  })
}
export const delArtCateAPI = (id) => {
  return request ({
    url:'/my/cate/del',
    method:'DELETE',
    params: {
      id
    }
  })
}
export const uploadArticleAPI = (fd) => {
  return request ({
    url:'/my/article/add',
    method:'POST',
    data:fd
  })
}
export const getArticleListAPI = ({pagenum,pagesize,cate_id,state}) => {
  return request({
    url:'/my/article/list',
    method:'GET',
    params:{
      pagenum,
      pagesize,
      cate_id,
      state
    }
  })
}
export const getArticleDetailAPI = (id) => {
  return request ({
    url:'/my/article/info',
    method:'GET',
    params:{id}
  })
}
export const delArticleAPI = (id) => {
  return request({
    url:'/my/article/info',
    method:'DELETE',
    params:{
      id
    }

  })
}