export interface UserStore {
    userName:string
    age:number
    authToken:string
    routes:MenuItem[]
}

export interface MenuItem {
    name:string
    icon:string
    childs:MenuItemChild[]
}

export interface MenuItemChild {
    name:string
    path:string
}