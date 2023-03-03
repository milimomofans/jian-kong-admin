import { TableColumnData } from '@arco-design/web-vue'

export interface ColumnsItem {
    title:string
    dataIndex:string
    slotName:string
    width?:number
    align?:string
} 

export interface DataItem {
    name:string
    lzgl:boolean
    wzgl:boolean
    jxgl:boolean
    rygl:boolean
    ysgl:boolean
    jdgl:boolean
    spjk:boolean
    aqgl:boolean
    dp1:boolean
}


export interface State {
    dataList:Partial<DataItem>[]
    columns:TableColumnData[]
    isFullscreen:boolean
    updateTime:string
}

export interface HistoryResultDTOSItem {
    clock:string
    itemid:string
    name:string
    ns:string
    value:string
}

export interface ListApiParam {
    name:string
    historyResultDTOS:HistoryResultDTOSItem[]
}

export interface MachArr {
    name:string
    key:string
}