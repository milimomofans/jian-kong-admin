<template>
    <div>
        <a-card style="height:89vh">
            <div class="flex flex-bewteen mb-20">
                <a-form :model="form" layout="inline">
                    <a-form-item label="搜索">
                        <a-input v-model="recordForm.keyWord" placeholder="请输入搜索的网页" />
                    </a-form-item>
                    <!-- <a-form-item label="使用状态">
                        <a-select style="width:100px"  v-model="recordForm.useStatus">
                            <a-option v-for="item in statusRadios" :key="item.value" :value="item.value" :label="item.name"></a-option>
                        </a-select>
                    </a-form-item> -->
                    <a-form-item label="页面状态">
                        <a-select style="width:100px" v-model="recordForm.pageStatus">
                            <a-option v-for="item in pageStatusRadios" :label="item.name" :key="item.value" :value="item.value"></a-option>
                        </a-select>
                    </a-form-item>
                </a-form>
                <a-space fill>
                    <a-button type="primary" @click="getRecord">查询</a-button>
                    <a-button @click="openModal('新增')">
                        <template #icon><icon-plus /></template>
                        <template #default>新增</template> 
                    </a-button>
                    <a-upload
                        :action="actionUrl"
                        @success="successHandle"
                        @error="errorHandle"
                        :show-file-list="false"
                    >
                        <a-button>
                            <template #icon><icon-upload /></template>
                            <template #default>导入excel</template>
                        </a-button>    
                    </a-upload>
                    
                    <a-button @click="downloadXlsx">
                        <template #icon><icon-to-bottom /></template>
                        <template #default>模板下载</template>
                    </a-button>
                </a-space>
            </div>
            <a-table
                :columns="columns"
                :data="dataList"
                row-key="id"
                :row-selection="rowSelection"
                :pagination="false"
                :bordered="{
                    cell:true
                }"
                :selected-keys="selectedKeys"
                @selection-change="selectChange"
            >
                <!-- <template #userStatus="{record}">
                    <div :class="[record.useStatus == 2 ? 'blue-color' : 'orange-color']">{{ record.useStatus === 2 ? '已禁用' : '已启用' }}</div>  
                </template> -->
                <template #pageStatus="{ record }">
                    <div :class="[record.useStatus == 2 ? 'blue-color' : 'orange-color']">{{ record.useStatus === 2 ? '已禁用' : '已启用' }}</div>  
                </template>
                <template #operation="{record}">
                    <a-button type="text" @click="openModal('编辑',record)">编辑</a-button>
                </template>
            </a-table>
            <div class="flex flex-bewteen mt-10">
                <a-space>
                    <a-popconfirm content="确定删除选择监控?" @ok="deleteClick">
                        <a-button status="danger">删除</a-button>
                    </a-popconfirm>
                    <!-- <a-button status="normal" @click="enableHandle(true)">启用</a-button>
                    <a-button status="warning" @click="enableHandle(false)">禁用</a-button> -->
                </a-space>
                <a-pagination @change="pageHandle" :total="pageParam.total"></a-pagination>
            </div> 
        </a-card>
        <jkymEditModal 
            :visible-show="visibleShow" 
            @ok="modalOk" 
            @cancel="modalCancel" 
            :editParam="editParam"
        />
    </div>
</template>
<script setup lang="ts">
    import { reactive, toRefs, onMounted, provide, ref } from 'vue'
    import { MockData } from '@/mock/mockAdminData'
    import jkymEditModal from './jkymEditModal.vue';
    import { getRecordApi, removeListApi } from '@/serve/index'
    import { Message } from '@arco-design/web-vue';
    import { exportExcel } from '@/utils/exportExcel'

    const actionUrl = ref('http://192.168.0.124:9005/v1/admin/importExcel')
    const downloadUrl = 'http://csces.oss-accelerate.aliyuncs.com/527443h1677854598457457.xlsx'

    const pageStatusSet:{[key:number | string]:string} = {
        0:'无',
        1:'正常',
        2:'异常'
    }
    const state = reactive({
        form:{
            status:'',
            pageStatus:''
        },
        statusRadios:[
            {
                name:'已启用',
                value:1
            },
            {
                name:'已禁用',
                value:2
            }
        ],
        pageStatusRadios:[
            {
                name:'已启用',
                value:'1'
            },
            {
                name:'已禁用',
                value:'0'
            },
        ],
        columns:[
            {
                title:'地盘名称',
                dataIndex:'siteName',
                align:'center'
            },
            {
                title:'系统名称',
                dataIndex:'systemName',
                align:'center'
            },
            {
                title:'页面地址',
                dataIndex:'url',
                align:'center',
                // slotName:''
            },
            {
                title:'页面状态',
                dataIndex:'pageStatus',
                align:'center',
                slotName:'pageStatus'
            },
            {
                title:'操作',
                align:'center',
                slotName:'operation'
            }
        ],
        dataList:[],
        selectedKeys:[],
        visibleShow:false,
        pageParam:{
            page:1,
            size:10,
            total:0
        },
        recordForm:{
            useStatus:"",
            pageStatus:"",
            keyWord:""
        },
        modalTitle:'',
        editParam:{}
    })


    const rowSelection = reactive({
        type: 'checkbox',
        showCheckedAll: true,
        onlyCurrent: false,
    })


    onMounted(()=>{
        getRecord()
    })

    const successHandle = (e:any) => {
        Message.success('上传成功')
        getRecord()
    }
    const errorHandle = (e:any) => {
        Message.error('上传失败，请稍后再试')
    }
    
    const getRecord = () => {
        let { recordForm, pageParam } = state,
            param = { ...recordForm, ...pageParam }
        getRecordApi(param).then(res=>{
            let { records, total } = res.data
            state.dataList = records
            state.pageParam.total = total
        })
    }

    const pageHandle = (page) => {
        state.pageParam.page = page
        getRecord()
    }

    // 删除列表中选中
    const deleteClick = () => {
        const { selectedKeys } = state
        if (selectedKeys.length) {
            removeListApi(selectedKeys).then(res=>{
                console.log(res)
                Message.success('删除成功')
                // 重新刷新加载
                getRecord()
            }).catch(error=>{
                Message.error(error.msg)
            })
        } else {
            Message.error('请选择删除项')
        }
    }


    // 选中取消
    const selectChange = (keys:any[]) => {
        state.selectedKeys = keys
    }

    // 打开新增or编辑模态弹窗
    const openModal = (title:string, param?:any) => {
        state.visibleShow = true
        state.modalTitle = title
        if (param) {
            state.editParam = param
        }
        
    }

    // 弹窗点击确定
    const modalOk = () => {
        getRecord()
        state.editParam = {}
        state.visibleShow = false
    }

    // 弹窗点击取消
    const modalCancel = () => {
        state.visibleShow = false
        state.editParam = {}
    }

    const downloadXlsx = () => {
        window.open(downloadUrl)
    }

    const { 
        form,
        statusRadios,
        pageStatusRadios,
        columns,
        dataList,
        selectedKeys,
        visibleShow,
        pageParam,
        recordForm,
        editParam
    } = toRefs(state)
</script>
<style lang="scss" scoped>
    .mt-10 {
        margin-top: .1rem;
    }
    .mb-20 {
        margin-bottom: .2rem;
    }
    .flex {
        display: flex;
    }
    .flex-align-center {
        align-items: center;
    }
    .flex-bewteen {
        justify-content: space-between;
    }
    .flex-shrink {
        flex-shrink: 0;
    }
    .orange-color {
        color: #FF7D00;
    }
    .blue-color {
        color: #165DFF;
    }
</style>