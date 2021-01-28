<template>
  <div>
    <div class="paiming">排名</div>
    <div class="btnstyle">
      <span
        :class="{ activate: isChecked == 'hour' }"
        @click="selecttime('hour')"
        >小时</span
      >
      <span :class="{ activate: isChecked == 'day' }" @click="selecttime('day')"
        >今日</span
      >
      <span
        :class="{ activate: isChecked == 'month' }"
        @click="selecttime('month')"
        >本月</span
      >
      <span
        :class="{ activate: isChecked == 'custom' }"
        @click="selecttime('custom')"
        >自定义</span
      >
    </div>
    <span
      :class="{
        datePickerSelecter: isChecked == 'custom',
        datePickerNoSelected: isChecked != 'custom',
      }"
    >
      <input
        class="js-date-picker"
        style="width: 100px;margin-left:25px"
        
        type="text"
        placeholder="开始日期"
        v-model="selectBirthDateStart"
        readonly
      /><span style="
    margin: 0px 15px;
">~</span>
      <input
        class="js-date-picker2"
       style="width: 100px;"
        type="text"
        placeholder="结束日期"
        v-model="selectBirthDateEnd"
        readonly
      />
      <span  style="
    background: #3FA6FE;
    margin-left: 12px;
    border-radius: 5px;
    color:white
"> <img style="margin-left:10px" src="../assets/img/paimingsearch.png" alt=""><span @click="rungetpaimingdata('custom')" style="margin-left: 2px;
    margin-right: 10px;">查询</span>
     
      </span>
     
    </span>

    <div class="paiminglabel">
      <table class="tablestyle">
        <th>排名</th>
        <th>设备名</th>
        <th>位置</th>
        <th>
          PM2.5
          <div class="thshangstyle" @click="topclick('e1')"></div>
          <div class="thxiastyle" @click="downclick('e1')"></div>
        </th>

        <th>
          PM10
          <div class="thshangstyle" @click="topclick('e2')"></div>
          <div class="thxiastyle" @click="downclick('e2')"></div>
        </th>

        <th>
          CO
          <div class="thshangstyle" @click="topclick('e10')"></div>
          <div class="thxiastyle" @click="downclick('e10')"></div>
        </th>

        <th>
          SO2
          <div class="thshangstyle" @click="topclick('e11')"></div>
          <div class="thxiastyle" @click="downclick('e11')"></div>
        </th>

        <th>
          O3
          <div class="thshangstyle" @click="topclick('e15')"></div>
          <div class="thxiastyle" @click="downclick('e15')"></div>
        </th>

        <th>
          NO2
          <div class="thshangstyle" @click="topclick('e16')"></div>
          <div class="thxiastyle" @click="downclick('e16')"></div>
        </th>

        <th>
          AQI
          <div class="thshangstyle" @click="topclick('AQI')"></div>
          <div class="thxiastyle" @click="downclick('AQI')"></div>
        </th>

        <th>
          TVOC
          <div class="thshangstyle" @click="topclick('e17')"></div>
          <div class="thxiastyle" @click="downclick('e17')"></div>
        </th>

        <tr :key="index" v-for="(items, index) in sortdatas">
          <td >{{ index + 1 }}</td>
          <td @click="devicenameClick(items.name)">{{ items.name }}</td>
          <td  @click="devicenameClick(items.address)">{{ items.address }}</td>
          <td
            :class="{
              level6td: items.e1 > 251,
              level5td: items.e1 <= 250 && items.e1 > 150,
              level4td: items.e1 <= 150 && items.e1 > 115,
              level3td: items.e1 <= 115 && items.e1 > 75,
              level2td: items.e1 <= 75 && items.e1 > 35,
              level1td: items.e1 <= 35 && items.e1 >= 0,
            }"
          >
            {{ Math.floor(items.e1) }}
          </td>
          <td
            :class="{
              level6td: items.e2 > 421,
              level5td: items.e2 <= 420 && items.e2 > 350,
              level4td: items.e2 <= 350 && items.e2 > 250,
              level3td: items.e2 <= 250 && items.e2 > 150,
              level2td: items.e2 <= 150 && items.e2 > 50,
              level1td: items.e2 <= 50 && items.e2 >= 0,
            }"
          >
            {{ Math.floor(items.e2) }}
          </td>

          <td
            :class="{
              level6td: items.e10 > 37,
              level5td: items.e10 <= 36 && items.e10 > 24,
              level4td: items.e10 <= 24 && items.e10 > 14,
              level3td: items.e10 <= 14 && items.e10 > 4,
              level2td: items.e10 <= 4 && items.e10 > 2,
              level1td: items.e10 <= 2 && items.e10 >= 0,
            }"
          >
            {{ items.e10 }}
          </td>
          <td
            :class="{
              level6td: items.e11 > 1001,
              level5td: items.e11 <= 1000 && items.e11 > 800,
              level4td: items.e11 <= 800 && items.e11 > 650,
              level3td: items.e11 <= 650 && items.e11 > 500,
              level2td: items.e11 <= 500 && items.e11 > 150,
              level1td: items.e11 <= 150 && items.e11 >= 0,
            }"
          >
            {{ Math.floor(items.e11) }}
          </td>
          <td
            :class="{
              level6td: items.e15 > 801,
              level5td: items.e15 <= 800 && items.e15 > 265,
              level4td: items.e15 <= 265 && items.e15 > 215,
              level3td: items.e15 <= 215 && items.e15 > 160,
              level2td: items.e15 <= 160 && items.e15 > 100,
              level1td: items.e15 <= 100 && items.e15 >= 0,
            }"
          >
            {{ Math.floor(items.e15) }}
          </td>
          <td
            :class="{
              level6td: items.e16 > 2341,
              level5td: items.e16 <= 2340 && items.e16 > 1200,
              level4td: items.e16 <= 1200 && items.e16 > 700,
              level3td: items.e16 <= 700 && items.e16 > 200,
              level2td: items.e16 <= 200 && items.e16 > 100,
              level1td: items.e16 <= 100 && items.e16 >= 0,
            }"
          >
            {{ Math.floor(items.e16) }}
          </td>
          <td
            :class="{
              level6td: items.AQI > 301,
              level5td: items.AQI <= 300 && items.AQI > 200,
              level4td: items.AQI <= 200 && items.AQI > 150,
              level3td: items.AQI <= 150 && items.AQI > 100,
              level2td: items.AQI <= 100 && items.AQI > 50,
              level1td: items.AQI <= 50 && items.AQI >= 0,
            }"
          >
            {{ Math.floor(items.AQI) }}
          </td>
          <td>{{ items.e17 }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import《组件名称》from'《组件路径》';
import Request from "../network/request.js";
export default {
  //import 引入的组件需要注入到对象中才能使用
  components: {},
  props: {},
  data() {
    //这里存放数据
    return {
      isChecked: "hour",
      paimingdata: [],
      sortdatas: [],
      selectBirthDateStart: "",
      selectBirthDateEnd: "",
    };
  },
  // 计算属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {
    isChecked(curVal, oldVal) {
      if (curVal != oldVal) {
        this.rundeviceAvgDataInTimes(curVal);
      }
    },
  },
  //方法集合
  methods: {
    rungetpaimingdata(timecontent){
      
    Request.requestdeviceAvgDataInTimes({
          baseConfig: timecontent,
          startTime:this.selectBirthDateStart,
          endTime:this.selectBirthDateEnd
      }).then((res) => {    
        this.isChecked="" 
        this.paimingdata = res.data.data;
        this.sortdatas=this.sortbykey(this.paimingdata, "e1");
        
      })
    },
    BirthDateSelect() {
      var calendar1 = new datePicker();
      calendar1.init({
        trigger: ".js-date-picker" /*按钮选择器，用于触发弹出插件*/,
        type:
          "date" /*模式：date日期；datetime日期时间；time时间；ym年月；year:年*/,
        minDate: "1900-1-1" /*最小日期*/,
        maxDate: "2100-12-31" /*最大日期*/,
        onSubmit: function () {
          /*确认时触发事件*/
          let theSelectData1 = calendar1.value;
          // this.selectBirthDate=theSelectData;
        },
        onClose: function () {
          /*取消时触发事件*/
        },
      });
      var calendar2 = new datePicker();
      calendar2.init({
        trigger: ".js-date-picker2" /*按钮选择器，用于触发弹出插件*/,
        type:
          "date" /*模式：date日期；datetime日期时间；time时间；ym年月；year:年*/,
        minDate: "1900-1-1" /*最小日期*/,
        maxDate: "2100-12-31" /*最大日期*/,
        onSubmit: function () {
          /*确认时触发事件*/
          let theSelectData2 = calendar2.value;
          // this.selectBirthDate=theSelectData;
        },
        onClose: function () {
          /*取消时触发事件*/
        },
      });
    },

    devicenameClick(devicename) {
      alert(devicename);
    },
    topclick(sensorkey) {
      if (sensorkey === "e1") {
        this.sortdatas = this.reversekey(this.sortdatas, sensorkey);
      } else {
       console.log(1)
        this.sortdatas = this.sortbykey(this.paimingdata, sensorkey);
      }
    },
    downclick(sensorkey) {
      this.sortdatas = this.reversekey(this.sortdatas, sensorkey);
    },
    reversekey(array, key) {
      return array.reverse();
    },
    sortbykey(array, key) {
      
      return array.sort(function (a, b) {
        var x = a[key];
        var y = b[key];
        return x < y ? -1 : x > y ? 1 : 0;
      });
    },
    selecttime(content) {
      // 防重复点击  监听事件
      this.isChecked = content;
    },

    rundeviceAvgDataInTimes(timecontent) {
      
      if(timecontent!=='custom'&& timecontent!=='')   
      {
      
       Request.requestdeviceAvgDataInTimes({
          baseConfig: timecontent,
        }).then((res) => {
          this.paimingdata = res.data.data;
          this.sortdatas = this.sortbykey(this.paimingdata, "e1");
        })
      }
      
    },
  },
  //生命周期 - 创建完成（可以访问当前 this 实例）
  created() {
    this.rundeviceAvgDataInTimes(this.isChecked);
  },
  //生命周期 - 挂载完成（可以访问 DOM 元素）
  mounted() {
    this.BirthDateSelect(); //加载日期选择控件
  },
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
.paiminglabel {
  overflow: hidden;
  overflow-x: scroll;
  display: flex;
  white-space: nowrap;
  font-size: 14px;
  color: #3fa6fe;
}
.paiminglabel > span {
  padding: 10px;
}
.btnstyle {
  height: 40px;
  display: flex;
  justify-content: space-around;
  background: #f7f7f7;
  font-size: 20px;
  margin-bottom: 10px;
}
.btnstyle > span {
  padding: 10px;
}
.activate {
  border-bottom: 2px solid #3fa6fe;
}
.paiming {
  width: 100%;
  height: 60px;
  display: flex;
  background: #3fa6fe;
  line-height: 60px;
  font-size: 30px;
  color: white;
  justify-content: center;
}
.tablestyle {
  table-layout: fixed;
  width: 100%;
  font-size: 15px;

  border-spacing: 5px;
  margin-bottom: 60px;
}
.tablestyle td {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 10px;
}
.tablestyle th {
  width: 54px;
  font-size: 13px;
}
.tablestyle tr {
  text-align: center;
  color: black;
  height: 30px;
}

.level1td {
  background: #01fd20;
}
.level2td {
  background: #fdfe27;
}
.level3td {
  background: #fea317;
}
.level4td {
  background: #fa0701;
}
.level5td {
  background: #a024ee;
}
.level6td {
  background: #af2f5f;
}
.thshangstyle {
  margin-left: 48px;
  margin-top: -14px;
  width: 12px;
  height: 5px;
  background-size: 100% 100%;
  background-image: url("../assets/img/xiangshang.png");
}
.thxiastyle {
  margin-left: 48px;

  width: 12px;
  height: 5px;
  background-size: 100% 100%;
  background-image: url("../assets/img/xiangxia.png");
  margin-top: 2px;
}
.datePickerSelecter {
  position: fixed;
  right: 0px;
  background: url(../assets/img/zidingyipaiming.png);
  width:100%;
    height: 50px;
    top: 102px;
    line-height: 60px;
    background-size: 100% 100%;
}
.datePickerNoSelected {
  display: none;
}
</style>