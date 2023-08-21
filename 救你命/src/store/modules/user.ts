import { defineStore } from "pinia";
import {phonecodeAPI,loginAPI} from "@/api/hospital"
import { GET_TOKEN, SET_TOKEN, REMOVE_TOKEN } from "@/utils/user";

const useUserStore = defineStore('User', {
    state: () => {
        return {
            visiable: false,//用于控制登录组件的dialog显示与隐藏
            code:'',
            userinfo:JSON.parse(GET_TOKEN() as string) || {}
        }
    },
    actions:{
        async getphonecode(phone:number){
            let res:any = await phonecodeAPI(phone)
            if (res.data.code === 200) {
                this.code = res.data.data
                return 'ok'
            } else {
                return Promise.reject(new Error(res.data.message))
            }
        },

        async userlogin(data) {
            let res = await loginAPI(data)     
            if (res.data.code===200) {
                this.userinfo.value = res.data.data
                localStorage.setItem('USERINFO',JSON.stringify(this.userinfo))
                return 'ok'
            } else {
                return Promise.reject(new Error(res.data.message))
            }
        },

        logout() {
            this.userinfo = {name:'',token:''}
            REMOVE_TOKEN();
        },

        queryState() {
            //开启定时器每隔一段时间问:本地村是都拥有用户信息
            let timer = setInterval(() => {
                //本地存储已有有数据:扫码成功
                if (GET_TOKEN()) {
                    //关闭对话框
                    this.visiable = false;
                    this.userinfo.value = JSON.parse(GET_TOKEN() as string);
                    clearInterval(timer);
                }
            }, 1000);
        }
    },
    getters:{

    },
})

export default useUserStore;