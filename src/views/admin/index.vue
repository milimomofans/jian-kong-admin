<template>
    <div class="container">
        <a-page-header
            :show-back="false"
        >
            <template #title>人事信息综合管理系统</template>
            <template #extra>
                <a-dropdown trigger="hover" position="tr">
                <a-avatar :style="{ backgroundColor: '#3370ff' }">
                    <IconUser />
                </a-avatar>
                <template #content>
                    <a-doption @click="loginOut">退出登入</a-doption>
                </template>
                </a-dropdown>
            </template>
        </a-page-header>
        <div class="admin-container">
            <div class="admin-menu">
                <div class="menu-area">
                    <a-menu
                        class="admin-leftbar"
                        :style="{ width: '260px', height: '90vh' }"
                        :selected-keys="[activeMenuPath]"
                        show-collapse-button
                        auto-open-selected
                        breakpoint="xl"
                    >
                        <a-sub-menu v-for="submenu in store.routes" :key="submenu.name">
                            <template #icon>
                                <icon-apps />
                            </template>
                            <template #title>{{ submenu.name }}</template>
                            <a-menu-item 
                                v-for="menu in submenu.childs"
                                :key="menu.path"
                                @click="onNavigateTo(menu)"
                            >
                                {{ menu.name }}
                            </a-menu-item>
                        </a-sub-menu>
                    </a-menu>
                </div>
            </div>
            <div class="admin-content">
               <!-- <a-card :style="{width:'100%',height:'100%'}"></a-card> -->
               <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { ref, reactive, toRefs } from 'vue'
    import { userStore } from '@/stores/user-store'
    import { useRoute, useRouter } from "vue-router";
    import { MenuItemChild } from '@/types/userStore'

    const route = useRoute();
    const router = useRouter();
    const activeMenuPath = ref(route.fullPath); // 当前所激活的菜单路径
    router.afterEach((to) => (activeMenuPath.value = to.fullPath));


    const store = userStore()

    const state = reactive({
        collapsed:false
    })

    // 退出登录
    const loginOut = () => {
        store.$reset()
        router.push('login')
    }

    const onNavigateTo = (menu:MenuItemChild) => {
        router.push({path:menu.path})
    }

    const { collapsed } = toRefs(state)
</script>
<style lang="scss" scoped>
    .container {
        width: 100vw;
        // height: 100vh;
    }
    .menu-area {
        box-sizing: border-box;
        width: 100%;
        background-color: var(--color-neutral-2);
    }

    .admin {
        &-container {
            flex:1;
            display: flex;
            flex-direction: row;
        }
        &-content {
            flex: 1;
            width: 0;
            display: flex;
            flex-direction: column;
            background: var(--color-neutral-1);
            padding: 16px 24px;
            height: 100vh;
        }
    }
</style>