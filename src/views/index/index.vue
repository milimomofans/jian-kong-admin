<template>
    <div class="container">
      <x-header @screenChange="screenChange"/>
      <div class="logos">
        <img class="logos_item mr-46" src="@/assets/img/logo-1.png" alt="">
        <img class="logos_item" src="@/assets/img/logo-2.png" alt="">
      </div>
      <div class="menu_area">
        <img class="menu_area_icon" src="@/assets/img/icon.png" alt="">
        <div class="menu_area_title">页面监控</div>
        <div class="menu_area_home">首页</div>
      </div>
      <div class="table-menu">
        <div class="table-menu-head">
            <div class="flex flex-baseline">
                <div class="table-menu-title">監控概況</div>
                <div class="table-menu-date">（最後更新時間{{ updateTime }} ）</div>
            </div>
            <div class="flex flex-align-center">
                <div class="flex flex-align-center mr-24">
                    <div class="square green-bg"></div>
                    <div class="fz18 color-white">正常</div>
                </div>
                <div class="flex flex-align-center">
                    <div class="square red-bg"></div>
                    <div class="fz18 color-white">异常</div>
                </div>
            </div>
        </div>
        <div class="table-menu-main">
            <a-table
                :columns="columns"
                :data="dataList"
                :pagination="false"
                :scroll="{
                    y:isFullscreen ? 680 : 580
                }"
                :scrollbar="true"
                :bordered="{
                    cell:true,
                    headerCell:true
                }"
                :loading="loading"
            >
                <template #name="{ record }">
                    <div class="table-name">
                        {{ record.name }}
                    </div>
                </template>
                <template #lzgl="{ record }">
                    <div class="flex flex-justify-center flex-align-center">
                        <div :class="['circle',record.lzgl ? 'green-bg' : 'red-bg']"></div>
                    </div>
                </template>
                <template #wzgl="{ record }">
                    <div class="flex flex-justify-center flex-align-center">
                        <div :class="['circle',record.wzgl ? 'green-bg' : 'red-bg']"></div>
                    </div>
                </template>
                <template #jxgl="{ record }">
                    <div class="flex flex-justify-center flex-align-center">
                        <div :class="['circle',record.jxgl ? 'green-bg' : 'red-bg']"></div>
                    </div>
                </template>
                <template #rygl="{ record }">
                    <div class="flex flex-justify-center flex-align-center">
                        <div :class="['circle',record.rygl ? 'green-bg' : 'red-bg']"></div>
                    </div>                
                </template>
                <template #ysgl="{ record }">
                    <div class="flex flex-justify-center flex-align-center">
                        <div :class="['circle',record.ysgl ? 'green-bg' : 'red-bg']"></div>
                    </div>                
                </template>
                <template #jdgl="{ record }">
                    <div class="flex flex-justify-center flex-align-center">
                        <div :class="['circle',record.jdgl ? 'green-bg' : 'red-bg']"></div>
                    </div>                
                </template>
                <template #spjk="{ record }">
                    <div class="flex flex-justify-center flex-align-center">
                        <div :class="['circle',record.spjk ? 'green-bg' : 'red-bg']"></div>
                    </div>                
                </template>
                <template #aqgl="{ record }">
                    <div class="flex flex-justify-center flex-align-center">
                        <div :class="['circle',record.aqgl ? 'green-bg' : 'red-bg']"></div>
                    </div>              
                </template>
                <template #dp1="{ record }">
                    <div class="flex flex-justify-center flex-align-center">
                        <div :class="['circle',record.dp1 ? 'green-bg' : 'red-bg']"></div>
                    </div>
                </template>
            </a-table>
        </div>
        
      </div>
    </div>
</template>
<script setup lang="ts">
    import { reactive,toRefs, onMounted } from 'vue'
    import { getList } from '@/serve/index'
    import dayjs from 'dayjs'
    import { DataItem, ListApiParam, MachArr, State } from '@/types/index'
    import { LodingHook } from '@/hooks/loading'
    const { setLoading, loading } = LodingHook()

    const state = reactive<State>({
        columns:[
            {
                title:'',
                dataIndex:'name',
                slotName:'name',
                width:300
            },
            {
                title:'劳资管理',
                dataIndex:'lzgl',
                slotName:'lzgl',
                align:'center',
                width:100
            },
            {
                title:'物资管理',
                dataIndex:'wzgl',
                slotName:'wzgl',
                align:'center',
                width:100
            },
            {
                title:'机械管理',
                dataIndex:'jxgl',
                slotName:'jxgl',
                align:'center',
                width:100
            },
            {
                title:'人员管理',
                dataIndex:'rygl',
                slotName:'rygl',
                align:'center',
                width:100
            },
            {
                title:'运输管理',
                dataIndex:'ysgl',
                slotName:'ysgl',
                align:'center',
                width:100
            },
            {
                title:'进度管理',
                dataIndex:'jdgl',
                slotName:'jdgl',
                align:'center',
                width:100
            },
            {
                title:'视频监控',
                dataIndex:'spjk',
                slotName:'spjk',
                align:'center',
                width:100
            },
            {
                title:'安全管理',
                dataIndex:'aqgl',
                slotName:'aqgl',
                align:'center',
                width:100
            },
            {
                title:'大屏1',
                dataIndex:'dp1',
                slotName:'dp1',
                align:'center',
                width:100
            }
        ],
        dataList:[],
        isFullscreen:false,
        updateTime:''
    })

    const matchArr = [
        {
            name:'劳资管理',
            key:'lzgl'
        },
        {
            name:'人员管理',
            key:'rygl'
        },
        {
            name:'大屏1',
            key:'dp1'
        },
        {
            name:'安全管理',
            key:'aqgl'
        },
        {
            name:'机械管理',
            key:'jxgl'
        },
        {
            name:'物资管理',
            key:'wzgl'
        },
        {
            name:'视频监控',
            key:'spjk'
        },
        {
            name:'运输管理',
            key:'ysgl'
        },
        {
            name:'进度管理',
            key:'jdgl'
        }
    ]

    onMounted(()=>{
        getData()
    })

    // 获取列表并将数据进行columns项处理
    const getData = () => {
        setLoading(true)
        getList().then(res=>{
            setLoading(false)
            let data = res.data
            state.dataList = listDataHandle(data)
            state.updateTime = data.length ? dayjs.unix(Number(data[0].historyResultDTOS[0].clock)).format('YYYY-MM-DD HH:mm:ss') : dayjs().format('YYYY-MM-DD HH:mm:ss')
        }).catch(()=>{
            setLoading(false)
        })
    }

    // 处理返回的数据 将返回的数据处理为DataItem形式
    const listDataHandle = ( record:ListApiParam[] ) => {
        const dataList:Partial<DataItem>[] = []
        record.map(item => {
            const current = {
                name:item.name
            }
            const { historyResultDTOS } = item
            const paramList:{[key:string]:unknown} & Partial<DataItem> = {}
            historyResultDTOS.map(param => {
                const matchParam:MachArr | undefined = matchArr.find(item => item.name === param.name )
                if (matchParam) {
                    paramList[matchParam.key] = Number(param.value) === 0 ? false : true                      
                } 
            })
            dataList.push(Object.assign(current,paramList))
        })

        return dataList
    }

    // 打开关闭全屏
    const screenChange = (isFullscreen:boolean) => {
        state.isFullscreen = isFullscreen
    }

    const { columns, dataList, isFullscreen, updateTime } = toRefs(state)
</script>
<style lang="scss" scoped>
    .container {
        width: 100vw;
        height: 100vh;
        background-image: url('@/assets/img/bg.png');
        background-size: 100% 100%;
    }
    .flex {
        display: flex;
        &-baseline {
            align-items: baseline;
        }
        &-align-center {
            align-items: center;
        }
        &-justify-center {
            justify-content: center;
        }
    }
    .fz18 {
        font-size: .18rem;
    }
    .color-white {
        color: #fff;
    }
    .mr-46 {
        margin-right: .46rem;
    }
    .mr-24 {
        margin-right: .24rem;
    }
    .logos {
        position: absolute;
        display: flex;
        top: .47rem;
        left: 1.34rem;
        &_item {
            width: 1.76rem;
            height: .4rem;
        }
    }
    .table-name {
        font-size: .15rem;
        color: #fff;
    }
    .menu_area {
        display: flex;
        align-items: center;
        margin-top: .37rem;
        padding-left: .49rem;
        &_icon {
            width: .76rem;
            height: .7rem;
            margin-right: .08rem;
        }
        &_title {
            font-size: 0.3rem;
            font-family: Source Han Sans CN;
            font-weight: 500;
            color: #78D2ED;
            background: linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        &_home {
            position: relative;
            color: #fff;
            background: linear-gradient(90deg,#0a3144,#17778e,#092537);
            -o-border-image: linear-gradient(0deg,#83dae5,#1e6085) 10 10;
            border-image: linear-gradient(0deg,#83dae5,#1e6085) 10 10;
            font-size: .18rem;
            cursor: pointer;
            width: 1.16rem;
            height: .4rem;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid #1b649b;
            margin-left: .35rem;
            &::before {
                top: 50%;
                left: 5%;
                display: block;
                position: absolute;
                transform: translateY(-50%);
                content: "";
                width: 0;
                height: 0;
                border-bottom: 3px solid transparent;
                border-right: 3px solid transparent;
                border-left: 3px solid #9efbff;
                border-top: 3px solid transparent;
            }
            &::after {
                top: 50%;
                right: 5%;
                transform: translateY(-50%);
                display: block;
                position: absolute;
                content: "";
                width: 0;
                height: 0;
                border-bottom: 3px solid transparent;
                border-right: 3px solid #9efbff;
                border-left: 3px solid transparent;
                border-top: 3px solid transparent;
            }
        }
    }
    .table-menu {
        width: 95%;
        height: calc(100vh - 20%);
        background-image: url('@/assets/img/table-bg.png');
        background-size: 100% 100%;
        padding: .5rem .5rem .5rem 1.2rem;
        box-sizing: border-box;
        &-head {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        &-title {
            font-size: 0.26rem;
            font-family: Source Han Sans CN;
            font-weight: 500;
            color: #FFFFFF;
            line-height: 0.24rem;
            background: linear-gradient(180deg, #FFFFFF 0%, #47CDFF 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        &-date {
            font-size: 0.18rem;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: #45C7F9;
            line-height: 0.24rem;
        }
        &-main {
            width: 100%;
            height: 80%;
            margin-top: .1rem;
        }
    }
    .square {
        width: .11rem;
        height: .11rem;
        margin-right: .08rem;
    }
    .green-bg {
        background-color: #2BFD9C;
    }
    .red-bg {
        background-color: #FF4A4A;
    }
    .circle {
        width: .14rem;
        height: .14rem;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    :deep(.arco-table-header) {
        text-align: center;
        background: rgba(50,134,183,0.25)
    }

    :deep(.arco-table-body) {
        background-color: transparent;
    }
    :deep(.arco-table-th) {
        color: rgba(69, 199, 249, 1);
        text-align: center;
        background-color: transparent;
    }
    :deep(.arco-table-td) {
        text-align: center;
        background-color: transparent;
        border-bottom: 1px solid rgba(92, 213, 235, 0.4);
    }
    :deep(.arco-table-border .arco-table-tr .arco-table-th) {
        border-color: rgba(92, 213, 235, 0.4);
    }

    :deep(.arco-table-border .arco-table-container) {
        border-color: rgba(92, 213, 235, 0.4);
    }
    :deep(.arco-table-border-cell .arco-table-td:not(.arco-table-tr-expand)) {
        border-right:1px solid rgba(92, 213, 235, 0.4);
    }
    :deep(.arco-table-border-cell .arco-table-td:hover) {
        border-right:1px solid rgba(92, 213, 235, 0.4);
    }
    :deep(.arco-table-hover:not(.arco-table-dragging) .arco-table-tr:not(.arco-table-tr-empty):not(.arco-table-tr-summary):hover .arco-table-td:not(.arco-table-col-fixed-left):not(.arco-table-col-fixed-right), .arco-table-hover .arco-table-tr-drag .arco-table-td:not(.arco-table-col-fixed-left):not(.arco-table-col-fixed-right)) {
        background-color: rgba(92, 213, 235, 0.4);
    }

    :deep(.arco-table-element > .arco-table-tr) {
        background-color: rgba(92, 213, 235, 0.4);
    }

    :deep(.arco-spin-mask) {
        background-color:transparent;
    }
</style>