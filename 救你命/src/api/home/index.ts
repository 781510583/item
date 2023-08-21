import request from '@/utils/request.ts'

export const hospitalAPI = ( page:number,limit:number,hostype='',districtCode='') => {
    return request({
      url: `/hosp/hospital/${page}/${limit}`,
      method: 'GET',
      params:{hostype,districtCode}
    })
  }
  // export const getlevelandareaAPI = (dictCode: string) => {
  //   return request ({
  //     url:`/cmn/dict/findByDictCode/${dictCode}`,
  //     method:'GET'
  //   })
  // }
  // export const dictcodeAPI = (dictCode:string) => {
  //   return request ({
  //     url:`/cmn/dict/findByDictCode/${dictCode}`,
  //     method:'GET'
  //   })
  // }
  // export const basicnameAPI = (hosname:string) => {
  //   return request ({
  //     url:'/hosp/hospital/findByHosname/',
  //     method:'GET',
  //     data:hosname
  //   })
  // }
  enum API {
    //获取已有的医院的数据接口地址
    HOSPITAL_URL = '/hosp/hospital/',
    //获取医院的等级与地区接口
    HOSPITALLEVElANDREGION_URL = '/cmn/dict/findByDictCode/',
    //根据关键字医院的名字获取数据
    HOSPITALINFO_URL = '/hosp/hospital/findByHosname/'
}
//获取医院的数据
// export const hospitalAPI = (page: number, limit: number, hostype = '', districtCode = '') => request.get<any>(API.HOSPITAL_URL + `${page}/${limit}?hostype=${hostype}&districtCode=${districtCode}`)
//获取医院的等级或者获取医院地区的数据
export const getlevelandareaAPI = (dictCode: string) => request.get<any>(API.HOSPITALLEVElANDREGION_URL + dictCode);
//根据关键字获取医院的数据进行展示
export const basicnameAPI = (hosname: string) => request.get<any>(API.HOSPITALINFO_URL + hosname);