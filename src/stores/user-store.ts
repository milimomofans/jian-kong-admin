import { defineStore } from 'pinia'
import { UserStore } from '@/types/userStore'

export const userStore = defineStore<string,UserStore>('userStore',{
    state:() => {
        return {
            userName:'',
            age:10,
            authToken:'',
            routes:[
                {
                    name:'页面监控',
                    icon:'ri-apps-line',
                    childs:[
                        {
                            name:'页面监控',
                            path:'/admin'
                        }
                    ]
                }
            ],
            
        }
    },
    actions:{
        increment(){
            console.log('执行了')
            this.age ++
        },
        randomAge(){
            this.age = Math.round(100 * Math.random())
        },
        changeUserName(){
            this.userName = 'admin'
        },
        changeState(){
            this.$patch({
                userName:'admin',
                age:18
            })
        },
        setAuthToken(token:string){
            this.authToken = token 
        }
    },
    persist:{
        enabled:true,
        strategies:[
            { storage:localStorage, paths:['userName'] },
            { storage:sessionStorage, paths: ['age','authToken'] }
        ]
    }
})