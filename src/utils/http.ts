import { Message } from '@arco-design/web-vue'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import qs from 'qs'
import { HttpResultModel } from '@/types/http'
// const BaseUrl = 'http://47.242.86.127/zabbix_api'
const BaseUrl = 'http://192.168.0.124:9005'

axios.defaults.baseURL = BaseUrl
// 处理get请求参数
axios.defaults.paramsSerializer = {
    serialize: (params: any) => {
        return qs.stringify(params, {
            indices: false,
            allowDots: true,
        });
    },
};
// 处理post请求参数
axios.defaults.transformRequest = (data: any) => {
    return typeof data === 'object'
        ? qs.stringify(data, {
              indices: false,
              allowDots: true,
          })
        : data;
};

axios.interceptors.request.use(
    (config) => {
        return config
    },
    (error) => {
        Message.error(error)
    }
)

axios.interceptors.response.use(
    (response:AxiosResponse) => {
        const responseStatus = response.status;
        const responseData = response.data;
        console.log('--------进来了',response)
        if (responseStatus === 200) {
            if (responseData.code === 200) {
                return responseData
            } else {
                Message.error(responseData)
                return Promise.reject(responseData)
            }
        } else if (responseStatus === 400) {
            console.log('----------------进入400了')
            return Promise.reject(responseData)
        }
    },
    (error) => {
        Message.error(error)
        return Promise.reject(error)
    }
)


class Api {
    get<T>(
        url:string,
        config?:AxiosRequestConfig
    ):Promise<HttpResultModel<T>>{
        return axios.get(url,config)
    }
    post<T>(
        url:string,
        data?:any,
        config?:AxiosRequestConfig,
    ):Promise<HttpResultModel<T>>{
        return axios.post(url,data,config)
    }
}

export default new Api
