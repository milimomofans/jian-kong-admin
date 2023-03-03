<template>
    <a-spin :loading="loading">
        <div class="main">
            <div class="content">
                <div class="login-box">
                    <div class="title-1">WELCOME TO LOGIN</div>
                    <div class="title-2">登录管理平台</div>
                    <a-form ref="submitForm" :model="form">
                        <a-form-item
                            field="username"
                            :rules="[{ required: true, message: '请输入账号' }]"
                            :validate-trigger="['change', 'blur']"
                            hide-label
                        >
                            <a-input v-model="form.username" placeholder="请输入账号" allow-clear>
                                <template #prefix>
                                    <icon-user />
                                </template>
                            </a-input>
                        </a-form-item>
                        <a-form-item
                            field="password"
                            :rules="[{ required: true, message: '请输入密码' }]"
                            :validate-trigger="['change', 'blur']"
                            hide-label
                        >
                            <a-input-password v-model="form.password" placeholder="请输入密码" allow-clear>
                                <template #prefix>
                                    <icon-lock />
                                </template>
                            </a-input-password>
                        </a-form-item>
                        <a-form-item
                            field="verification"
                            :rules="[{ required: true, message: '请拖动验证滑块' }]"
                            :validate-trigger="['change', 'blur']"
                            hide-label
                        >
                            <slider-verification ref="sliderVerificationRef" :multiple="1" @status-change="statusChange" />
                        </a-form-item>
                        <a-button type="primary" html-type="submit" size="large" @click="submit" style="width:100%">
                            登&nbsp;&nbsp;&nbsp;&nbsp;录
                        </a-button>   
                    </a-form>
                </div>
            </div>
        </div>
    </a-spin>
</template>
<script setup lang="ts">
    import { reactive, toRefs, onMounted, ref } from 'vue'
    import { LodingHook } from '@/hooks/loading'
    import sliderVerification from './slider-verification.vue'
    import { ValidatedError } from '@arco-design/web-vue/es/form/interface';
    import { Message } from '@arco-design/web-vue';
    import { userStore } from '@/stores/user-store'
    import { useRoute, useRouter } from 'vue-router'
    
    const { loading, setLoading } = LodingHook()
    const submitForm = ref()
    const sliderVerificationRef = ref()
    const store = userStore()
    const router = useRouter()
    const state = reactive({
        form:{
            username:'',
            password:'',
            verification:''
        }
    })

    onMounted(()=>{
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 2000);
    })

    const submit = () => {
        submitForm.value?.validate(async (errors: undefined | Record<string, ValidatedError>) =>{
            // console.log(errors)
            if (!errors) {
                const { form } = state
                if (form.username === 'admin' && form.password === '123456') {
                    console.log('成功登录')
                    store.setAuthToken('eGlhb2ppYW54aW5kZXpoYW5naGFv')
                    store.changeUserName()
                    router.push('admin')
                } else {
                    Message.error('账号密码错误')
                }
            }
        })
    }

    const statusChange = (e: any) => {
        state.form.verification = e;
    };
    
    const { form } = toRefs(state)
</script>
<style lang="scss" scoped>
   .main {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    background-image: url('@/assets/img/login_bg.png');
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: top left;
    background-size: 100% 100%;

    .logo {
        margin: 0.3rem;

        img {
            height: 0.6rem;
        }
    }

    .content {
        flex: 1;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        // flex-direction: column;
        .login-box {
            margin-right: 1.4rem;
            width: 3.5rem;

            .title-1 {
                font-size: 0.24rem;
                font-family: SourceHanSansCN-Bold-, SourceHanSansCN-Bold;
                color: #1d8ffd;
                line-height: 0.3rem;
            }

            .title-2 {
                margin-top: 0.2rem;
                font-size: 0.3rem;
                font-family: SourceHanSansCN-Bold-, SourceHanSansCN-Bold;
                color: #333333;
                line-height: 0.3rem;
            }

            :deep(.arco-form) {
                margin-top: 0.6rem;
                font-family: SourceHanSansCN-Regular-, SourceHanSansCN-Regular;

                .arco-form-item {
                    margin-bottom: 0.24rem;
                }

                .arco-form-item.arco-form-item-error,
                .arco-form-item.arco-form-item-has-help {
                    margin-bottom: 0;
                }

                .arco-input-wrapper {
                    padding: 0 0.16rem;
                    height: 0.56rem;
                    border-radius: 0.33rem;
                    color: #7e8fb2;

                    .arco-input {
                        font-size: 0.18rem;
                    }

                    .arco-input-prefix,
                    .arco-input-suffix,
                    .arco-input-clear-btn {
                        font-size: 0.3rem;
                        color: #7e8fb2;

                        svg {
                            font-size: 0.3rem;
                        }
                    }

                    .arco-icon-hover::before {
                        width: 0.3rem;
                        height: 0.3rem;
                    }
                }

                .arco-form-item-message {
                    padding-left: 0.2rem;
                    line-height: 0.24rem;
                    font-size: 0.12rem;
                }

                .arco-btn {
                    margin-top: 0.24rem;
                    height: 0.56rem;
                    font-size: 0.2rem;
                    border-radius: 0.33rem;
                }
                .arco-divider-text {
                    color: #7e8fb2;
                    font-size: 0.14rem;
                    background: transparent;
                }
                .third-login {
                    display: flex;
                    justify-content: space-around;
                    &-item {
                        border-radius: 50%;
                        cursor: pointer;
                        img {
                            width: 0.35rem;
                            height: 0.35rem;
                        }
                    }
                }
            }
        }
    }
}

input:-webkit-autofill,
textarea:-webkit-autofill,
select:-webkit-autofill {
    -webkit-text-fill-color: #7e8fb2 !important;
    box-shadow: 0 0 0 1000px transparent inset !important;
    background-color: transparent;
    background-image: none;
    transition: background-color 50000s ease-in-out 0s;
}

input {
    background-color: transparent;
}
</style>