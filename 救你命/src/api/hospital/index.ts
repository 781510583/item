import request from '@/utils/request.ts'

export const hospitaldetailAPI = (hoscode: string) => {
  return request({
    url: `/hosp/hospital/${hoscode}`,
    method: 'GET',
    // params:hoscode
  })
}
export const departmentAPI = (hoscode: string) => {
  return request({
    url: `/hosp/hospital/department/${hoscode}`,
    method: 'GET',
  })
}
export const phonecodeAPI = (phone: number) => {
  return request({
    url: `/sms/send/${phone}`,
    method: 'GET',
  })
}
// export const wxAPI = () => {
//   return request({
//     url:'/user/weixin/getLoginParam',
//     method:'GET'
//   })
// }
// export const loginAPI = (data) => {
//   return request({
//     url:`user/login/${data}`,
//     method:'POST',
//   })
// }
export const guahaoAPI = (page: number, limit: number, hoscode: string, depcode: string) => {
  return request({
    url: `/hosp/hospital/auth/getBookingScheduleRule/${page}/${limit}/${hoscode}/${depcode}`,
    method: 'GET'
  })
}
export const doctorAPI = (hoscode: string, depcode: string, workDate: string) => {
  return request({
    url: `/hosp/hospital/auth/findScheduleList/${hoscode}/${depcode}/${workDate}`,
    method: 'GET'
  })
}
export const patientAPI = () => {
  return request({
    url: '/user/patient/auth/findAll',
    method: 'GET'
  })
}
export const currentdocAPI = (docId: any) => {
  return request({
    url: `/hosp/hospital/getSchedule/${docId}`,
    method: 'GET'
  })
}
//枚举请求地址
enum API {
  //用户登录接口
  USERLOGIN_URL = '/user/login',
  //获取微信扫码登录需要参数
  WXLOGIN_URL = '/user/weixin/getLoginParam/',
  //获取某一个医院的某一个科室预约挂号数据
}
//用户登录接口
export const loginAPI = (data: any) => request.post<any>(API.USERLOGIN_URL, data);
export const wxAPI = (wxRedirectUri: string) => request.get<any>(API.WXLOGIN_URL + `?wxRedirectUri=${wxRedirectUri}`);