import { ref } from 'vue'
export const LodingHook = () => {
    const loading = ref(false)

    const setLoading = (status:boolean) => {
        loading.value = status
    }

    return {
        loading,
        setLoading
    }
}