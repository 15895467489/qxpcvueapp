import Vue from 'vue'
import Router from 'vue-router'


const Login=()=>import('../views/Login.vue')
const Map=()=>import('../map/map.vue')
const Shouye=()=>import('../views/shouye.vue')
const Mapview=()=>import('../views/mapview.vue')
const Paiming=()=>import('../views/paiming.vue')
// const Renwu=()=>import('../views/renwu.vue')
const Wode=()=>import('../views/Wode.vue')


Vue.use(Router)
const router= new Router({
    routes:[
        {
            path:'',
            redirect:'/login'
        },
        {
   path:'/login',
   component:Login
        },
        {
            path:'/map',
            component:Map,
            children:[
                {
                    path:"shouye",
                    component:Shouye
                
                },
                {
                    path:'mapview',
                    component:Mapview
                },
                {
                    path:'paiming',
                    component:Paiming
                },
                {
                    path:'wode',
                    component:Wode
                }

            ]
        }
    ],
    mode:'history'
})

export default  router