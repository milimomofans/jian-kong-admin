import { ListApiParam } from '@/types/index'
import Api from '@/utils/http'

export const getList = () => {
    return Api.get<ListApiParam[]>('/v1/open/api/getItem')
}

// 获取列表
export const getRecordApi = (param) => {
    return Api.post(
        '/v1/admin/queryPage',
        JSON.stringify(param),
        {
            headers:{"Content-Type":"application/json"}
        }
    )
}

// 修改列表中的详情状态
export const updateStatus = (id:string,status:number | string) => {
    return Api.get(`/v1/admin/update/${id}/${status}`)
}

// 新增监控项
export const addMonitor = (param) => {
    return Api.post('/v1/admin/addMonitor',JSON.stringify(param),{
        headers:{"Content-Type":"application/json"}
    })
}

// 删除列表选中项
export const removeListApi = (param) => {
    return Api.post('/v1/admin/remove',JSON.stringify(param),{
        headers:{"Content-Type":"application/json"}
    })
}

