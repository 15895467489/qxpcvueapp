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
            // name:'登录',
            redirect:'/login',
            meta:{
                title:'七星瓢虫环境科技'
            }
        },
        {
   path:'/login',
   component:Login,
   meta:{
       title:'七星瓢虫环境科技'
   }

        },
        {
            path:'/map',
            component:Map,
            meta:{
                title:'七星瓢虫环境科技'
            },
            children:[
                {
                    path:"shouye",
                    component:Shouye,
                   
                
                },
                {
                    path:'mapview',
                    component:Mapview,
                   
                },
                {
                    path:'paiming',
                    component:Paiming,
                  
                },
                {
                    path:'wode',
                    component:Wode,
                   
                }

            ]
        }
    ],
    mode:'history'
})

export default  router
//前置钩子（hook）  跳转之前调用
router.beforeEach((to,from,next)=>{
    //next() 方法必须配置，不然不会执行下一步，不然无法调用别的vue文件
    next()
    //从from跳转到to 定义标题
    document.title=to.matched[0].meta.title
    
  })