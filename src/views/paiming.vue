<template>
<div>
<div class="paiming"
    >排名</div>
      <div class="btnstyle">
          <span :class="{activate:isChecked=='shi'}" @click="selecttime('shi')">小时</span>
          <span :class="{activate:isChecked=='ri'}" @click="selecttime('ri')">今日</span>
          <span :class="{activate:isChecked=='yue'}" @click="selecttime('yue')">本月</span>
          <span :class="{activate:isChecked=='dingyi'}" @click="selecttime('dingyi')">自定义</span>
      </div>
    <div class="paiminglabel">
      <span>排名</span>
      <span>设备名</span>
      <span>位置</span>
      <span>所属街道</span>
      
      <span>PM2.5</span>
      <span>PM10</span>
      <span>NO2</span>
      <span>SO2</span>
      <span>O3</span>
      <span>CO</span>
      <span>AQI</span>
      <span>TVOC</span>
    </div>
    <!-- <div class="paimingdata">
      <span :key="index"  v-for="(items,index) in devices">{{items}}</span>
    </div> -->
</div>
  
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import《组件名称》from'《组件路径》';

export default {
  //import 引入的组件需要注入到对象中才能使用
  components: {},
  props: {},
  data() {
    //这里存放数据
    return {
        isChecked:'shi'
    };
  },
  // 计算属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
      selecttime(content)
      {
          this.isChecked=content;
          console.log(this.isChecked)
      }
  },
  //生命周期 - 创建完成（可以访问当前 this 实例）
  created() {},
  //生命周期 - 挂载完成（可以访问 DOM 元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style scoped>
.paiminglabel{
    overflow: hidden;
    overflow-x: scroll;
    display: flex;
    white-space: nowrap;
    font-size: 14px;
    color: #3FA6FE;
}
.paiminglabel>span{
    padding: 10px;
}
.btnstyle{
    height: 40px;
    display: flex;
    justify-content: space-around;
    background: #F7F7F7;
    font-size: 20px;
}
.btnstyle>span
{
    padding: 10px;
}
.activate{
        border-bottom: 2px solid #3FA6FE;
}
.paiming{
    width: 100%;
    height: 60px;
    display: flex;
    background: #3FA6FE;
    line-height: 60px;
    font-size: 30px;
    color: white;
    justify-content: center;
}
</style>