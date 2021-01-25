import axios from 'axios'

import store from '@/store/index.js'
import VueCookie from 'js-cookie'

//let token=VueCookie.get('token')

export default {
   
    //网络请求得到regioncode
    request(config){ 
        const instance=axios.create({
            baseURL:'http://47.96.15.25:8080/screen_api_v2/web/getAccountInfo',
           headers:{'token':VueCookie.get('token')}
        })   
        return instance(config)
    },
    requestMonitorPoints(config){
       
        let rcd=store.state.regionCode
        let ogd=store.state.orgId
       
        const instance=axios.create({
            baseURL:'http://47.96.15.25:8080/screen_api_v2/web/monitor-points',
           headers:{'token':VueCookie.get('token')},
           method:'get',
           params:{
               organizationId:ogd,
               regionCode:rcd
           },
          
        })  
        return instance(config)
    },
    requestSensorKey(config){
        let rcd=store.state.regionCode
        const instance=axios.create({       
            baseURL:'http://47.96.15.25:8080/screen_api_v2/web/fiveMinuteAvgDataNew',
            headers:{'token':VueCookie.get('token')},
            params:{
                sensorKey:config.baseConfig,
                regionCode:rcd
            }
        })
        return instance(config)
    },
    requestFiveMinutesData(config){     
        const instance=axios.create({
            baseURL:'http://47.96.15.25:8080/screen_api_v2/web/fiveMinuteAvgDataByMac',
            headers:{'token':VueCookie.get('token')
        },
            params:{
                mac:config.baseConfig
                
            }
        })
        return instance(config)
    },

    requestWindData(config){
        const instance=axios.create({
            baseURL:'http://47.96.15.25:8080/screen_api_v2/web/windAndDeviceDataBymIds',
            headers:{'token':VueCookie.get('token')
        },
            params:{
                   monitorPointIds:JSON.stringify(config.baseConfig) ,
                   orgId:store.state.orgId
            }
        })
        return instance(config)
    },

    requestcity(config){
        const instance=axios.create({
            baseURL:'http://47.96.15.25:8080/screen_api_v2/web/defaultCityOrArea',
            headers:{'token':VueCookie.get('token')
        },
        })
        return instance(config)
    },
    requestrealWeather(config){
        const instance=axios.create({
            baseURL:'http://47.96.15.25:8080/screen_api_v2/web/realWeather',
            headers:{'token':VueCookie.get('token')
        },
            params:{
                regionCode:config.baseConfig             
            }
        })
        return instance(config)
    },
    requesthouylyAQI(config){
        const instance=axios.create({
            baseURL:'http://47.96.15.25:8080/screen_api_v2/web/houylyAQI',
            headers:{'token':VueCookie.get('token')
        },
            params:{
                regionCode:config.baseConfig             
            }
        })
        return instance(config)
    },
    requestsixParamAndAqi(config){
        const instance=axios.create({
            baseURL:'http://47.96.15.25:8080/screen_api_v2/web/sixParamAndAqi',
            headers:{'token':VueCookie.get('token')
        },
            params:{
                regionCode:config.baseConfig,
                unit: config.unit            
            }
        })
        return instance(config)
    },
   
}

