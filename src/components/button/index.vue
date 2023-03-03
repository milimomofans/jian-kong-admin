<template>
    <button>
        <div v-if="msg.length">{{ msg }}</div>
        <div v-else>
            <slot />
        </div>
    </button>
</template>
<script setup lang="ts">
    import { defineProps, toRefs } from 'vue'
    const props = defineProps({
        msg:{
            type:String,
            default:''
        }
    })
    const { msg } = toRefs(props)

</script>
<style lang="scss" scoped>

</style>