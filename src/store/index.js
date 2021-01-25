import vue from 'vue'
import Vuex from 'vuex'

//安装插件
vue.use(Vuex)

//创建对象
const store = new Vuex.Store({
    state: {
        accountId: '',
        orgId: '',
        regionCode: ''
    },
    mutations: {
        changeAccountId(state, acc) {
            this.state.accountId = acc;
        },  
    },
    actions: {      
    },
    getters: {},
    moudles: {}
})

export default store