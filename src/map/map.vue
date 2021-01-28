<template>
<div class="mapwaiceng">
    <keep-alive>
<router-view></router-view>
    </keep-alive>
   <tab-bar>
       <tab-bar-item path='/map/shouye' activeColor="#33CCFF">
           <img slot="item-icon" src="../assets/img/iconNocheck/zhuye.png"/>
            <img slot="item-icon-active" src="../assets/img/iconchecked/zhuye.png"/>
            <div slot="item-text">首页</div>
       </tab-bar-item>
       <tab-bar-item path='/map/mapview' activeColor="#33CCFF">
           <img slot="item-icon" src="../assets/img/iconNocheck/ditu.png"/>
            <img slot="item-icon-active" src="../assets/img/iconchecked/ditu.png"/>
            <div slot="item-text">地图</div>
       </tab-bar-item>
       <tab-bar-item path='/map/paiming' activeColor="#33CCFF">
           <img slot="item-icon" src="../assets/img/iconNocheck/paiming.png"/>
            <img slot="item-icon-active" src="../assets/img/iconchecked/paiming.png"/>
            <div slot="item-text">排名</div>
       </tab-bar-item>
       <!-- <tab-bar-item path='/map/renwu' activeColor="#33CCFF">
           <img slot="item-icon" src="../assets/img/iconNocheck/renwu.png"/>
            <img slot="item-icon-active" src="../assets/img/iconchecked/renwu.png"/>
            <div slot="item-text">任务</div>
       </tab-bar-item> -->
       <tab-bar-item path='/map/wode' activeColor="#33CCFF">
           <img slot="item-icon" src="../assets/img/iconNocheck/wode.png"/>
            <img slot="item-icon-active" src="../assets/img/iconchecked/wode.png"/>
            <div slot="item-text">我的</div>
       </tab-bar-item>
   </tab-bar>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import《组件名称》from'《组件路径》';
// import Shouye from '../views/shouye.vue'
import TabBar from '../components/tabbar/TabBar.vue'
import TabBarItem from '../components/tabbar/TabBarItem.vue'
export default {
//import 引入的组件需要注入到对象中才能使用
components: {
    TabBar,
    TabBarItem
},
props: {},
data() {
//这里存放数据
return {
path:'/map/shouye'
};
},
// 计算属性 类似于data概念
computed: {},
// 监控data中的数据变化
watch: {},
//方法集合
methods: {

},
//生命周期 - 创建完成（可以访问当前 this 实例）
created() {

},
//生命周期 - 挂载完成（可以访问 DOM 元素）
mounted() {

},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style scoped>
.mapflexdown{
    position: fixed;   
    bottom: 0;
    width:100%;
    display: flex;
    border-top:1px solid #eee;
    height: 45px;
    background:white;
    z-index: 999;
    
}
.mapflexdown>span{
    flex: 1;
    line-height: 45px;
    text-align: center;
}

</style>