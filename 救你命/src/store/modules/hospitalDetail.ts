import { createPinia, defineStore } from "pinia";
import {hospitaldetailAPI,departmentAPI} from "@/api/hospital"

const useDetailStore = defineStore('Detail', {
    state: () => {
        return {
            hospitalinfo:{},
            deparmentArr: []

        }
    },
    actions: {
        async getHospital(hoscode:string){
            let res:any = await hospitaldetailAPI(hoscode)
            this.hospitalinfo = res.data.data
        },
        async hosdepartment(hoscode:string){
            let res = await departmentAPI(hoscode);
            if (res.data.code == 200) {
                this.deparmentArr = res.data;
            }
        }
    },
    getters: {

    }
});
//获取仓库的方法对外暴露
export default useDetailStore;