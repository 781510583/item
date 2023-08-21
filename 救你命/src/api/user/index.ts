import request from '@/utils/request.ts'

export const submitorderAPI = (hoscode:string,scheduleId:string,patientId:number) => {
    return request({
        url:`/order/orderInfo/auth/submitOrder/${hoscode}/${scheduleId}/${patientId}`,
        method:'POST'
    })
}
export const getorderAPI = (id:string) => {
    return request({
        url:`/order/orderInfo/auth/getOrderInfo/${id}`,
        method:'GET'
    })
}
export const cancelorderAPI = (id:string) => {
    return request({
        url:`/order/orderInfo/auth/cancelOrder/${id}`,
        method:'GET'
    })
}
export const wxpayAPI = (id:string) => {
    return request({
        url:`/order/weixin/createNative/${id}`,
        method:'GET'
    })
}
export const searchpayAPI = (id:string) => {
    return request({
        url:`/order/weixin/queryPayStatus/${id}`,
        method:'GET'
    })
}
export const confirmAPI = () => {
    return request({
        url:'/user/auth/getUserInfo',
        method:'GET'
    })
}
export const identityAPI = () => {
    return request({
        url:`/cmn/dict/findByDictCode/CertificatesType`,
        method:'GET'
    })
}
export const userconfirmAPI = (data:any) => {
    return request({
        url:'/user/auth/userAuah',
        method:'POST',
        data
    })
}
export const allorderAPI = (page:number,limit:number,patientId: string, orderStatus: string) => {
    return request({
        url:`/order/orderInfo/auth/${page}/${limit}`,
        method:'GET',
        params:{
            patientId,
            orderStatus
        }
    })
}
export const allusersAPI = () => {
    return request({
        url:'/user/patient/auth/findAll',
        method:'GET'
    })
}

export const allstatesAPI = () => {
    return request({
        url:'/order/orderInfo/auth/getStatusList',
        method:'GET'
    })
}

export const cityAPI = (parentId:string) => {
    return request({
        url:`/cmn/dict/findByParentId/${parentId}`,
        method:'GET'
    })
}
export const addpatientAPI = (data:any) => {
    return request({
        url:'/user/patient/auth/save',
        method:'POST',
        data
    })
}
export const changepatientAPI = (data:any) => {
    return request({
        url:'/user/patient/auth/update',
        method:'PUT',
        data
    })
}
export const deleteAPI = (id:number) => {
    return request({
        url:`/user/patient/auth/remove/${id}`,
        method:'DELETE',
    })
}
// enum API {
// USERCERTATION_URL = '/user/auth/userAuah',
// }
// export const userconfirmAPI = (data:any) => request.post<any, any>(API.USERCERTATION_URL, data);
