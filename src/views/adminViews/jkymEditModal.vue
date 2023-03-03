<template>
    <div>
        <a-modal 
            :visible="visibleShow" 
            :on-before-ok="handleOk" 
            @cancel="handleCancel" 
            titleAlign="start"
            :closable="false" 
            width="600px"
            :ok-loading="false"
        >
            <a-form ref="formRef" :model="form">
                <a-form-item 
                    label="地盘名称"
                    field="siteName"
                    :rules="[{required:true,message:'请输入地盘名称'}]"
                >
                    <a-input-group>
                        <a-input v-model="form.siteName" placeholder="请输入" />
                        <a-select v-model="form.systemName">
                            <a-option 
                                v-for="item in typeOptions" 
                                :key="item.label" 
                                :value="item.label" 
                                :label="item.label" 
                            />
                        </a-select>
                    </a-input-group>
                </a-form-item>
                <a-form-item
                    label="监控地址"
                    field="url"
                    :rules="[{required:true,message:'请输入监控地址'}]"
                >
                    <a-input v-model="form.url" placeholder="请输入URL"></a-input>
                </a-form-item>
                <a-form-item
                    label="启用"
                    field="pageStatus"
                >
                    <!-- <a-switch v-model="form.pageStatus"></a-switch> -->
                    <a-switch v-model="form.pageStatus"></a-switch>
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>
<script setup lang="ts">
    import { ValidatedError } from '@arco-design/web-vue/es/form/interface';
    import { reactive, toRefs, ref, defineProps, defineEmits, inject, watchEffect } from 'vue'
    import { addMonitor, updateStatus } from '@/serve/index'
    import { Message } from '@arco-design/web-vue';
    const emit = defineEmits(['ok','cancel'])
    const state = reactive({
        form:{
            siteName:'',
            url:'',
            systemName:'劳资管理',
            id:'0',
            pageStatus:2
        },
        typeOptions:[
            {
                label:'劳资管理',
                value:1
            },
            {
                label:'物资管理',
                value:2
            },
            {
                label:'机械管理',
                value:3
            },
            {
                label:'人员管理',
                value:4
            },
            {
                label:'运输管理',
                value:5
            },
            {
                label:'进度管理',
                value:6
            },
            {
                label:'视频监控',
                value:7
            },
            {
                label:'安全管理',
                value:8
            },
            {
                label:'大屏1',
                value:9
            }
        ]
    })
    const formRef = ref()
    const props = defineProps({
        title:{
            type:String,
            defualt:'编辑监控'
        },
        visibleShow:{
            type:Boolean,
            defualt:false
        },
        editParam:{
            type:Object,
            defualt:false
        }
    })

    const editParam = inject('editParam',ref({}))

    watchEffect(()=>{
        console.log(props.editParam,'------------param')
        if (props.editParam.id) {
            const { editParam } = props
            state.form = {
                siteName:editParam.siteName,
                url:editParam.url,
                systemName:editParam.systemName,
                id:editParam.id,
                pageStatus:editParam.pageStatus
            }
            console.log(state.form.pageStatus,'-------------form')
        }
    })

    if (editParam) {
        console.log('-----------------',editParam.siteName)
        state.form = {
            siteName:editParam.siteName,
            url:editParam.url,
            systemName:editParam.systemName,
            id:editParam.id,
            pageStatus:editParam.pageStatus
        }
    }

    const handleOk = () => {
        formRef.value?.validate(async (errors: undefined | Record<string, ValidatedError>) => {
            if (!errors) {
                const { form } = state,
                    apiParam = {
                        ...form
                    }
                console.log(apiParam)
                if (props.editParam.id) {
                    updateStatus(form.id,form.pageStatus).then(res=>{
                        formRef.value.resetFields()
                        Message.success('修改成功')
                        emit('ok')
                    })
                } else {
                    addMonitor(apiParam).then(()=>{
                        formRef.value.resetFields()
                        Message.success('新增成功！')
                        emit('ok')
                    })
                }
            } else {
                Message.error('请检查填入项是否正确')
            }
        })
    }

    const handleCancel = () => {
        formRef.value.resetFields()
        emit('cancel')
    }

    const siwtchHandle = (status:boolean) => {
        state.form.pageStatus = status ? 1 : 0
    }

    const { 
        form,
        typeOptions
    } = toRefs(state)
    const {
        title,
        visibleShow
    } = toRefs(props)
</script>
<style lang="scss" scoped>
    .defualt-input {
        width: 200px;
    }
</style>