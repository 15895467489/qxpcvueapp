<template>
  <!-- 分成三块 -->
  <div class="shouyeall">
    <div class="shouyetop">
      <div>
        <h2>+{{ cityName }}</h2>
      </div>
      <div class="gengxinshijian">
        <p>更新时间{{ datetime }}</p>
      </div>
      <div class="ring">
        <img class="aqiimgstyle" src="../assets/img/aqipicture.png" alt="" />
        <canvas id="tutorial" ref="tutorialref"> </canvas>
        <div class="fraction">
          <div>AQI</div>
          <div
            style="
              font-size: 26px;
              background: orange;
              border-radius: 15px;
              line-height: 50px;
              margin-top: 10px;
              margin-bottom: 10px;
            "
          >
            {{ AQIlevel }}
          </div>
          <span class="number">{{ AQIvalue }}</span>
        </div>
        <div style="position: relative; bottom: 113px; font-size: 16px">
          首要污染物：{{ pollutionimportantance }}
        </div>
      </div>

      <div class="shouyedown">
        <div class="tianqichild">
          <span
            ><img
              width="20"
              height="20"
              src="../assets/img/shouyetianqi/tianqi.png"
            />
            天气：</span
          >
          <span class="tianqistyle">{{ tianqi }}</span>
        </div>
        <div class="tianqichild">
          <span
            ><img
              width="20"
              height="20"
              src="../assets/img/shouyetianqi/wendu.png"
            />温度：</span
          >
          <span class="tianqistyle">{{ wendu }}℃</span>
        </div>
        <div class="tianqichild">
          <span
            ><img
              width="20"
              height="20"
              src="../assets/img/shouyetianqi/humidity.png"
            />湿度：</span
          >
          <span class="tianqistyle">{{ shidu }}%</span>
        </div>
        <div class="tianqichild">
          <span
            ><img
              width="20"
              height="20"
              src="../assets/img/shouyetianqi/fengli.png"
            />风向：</span
          >
          <span class="tianqistyle">{{ fengli }}</span>
        </div>
      </div>
    </div>

    <div class="shouyebianhua">
      <div class="pollutionlabelstyle">
        <img src="../assets/img/qushi.png" alt="" width="20px" height="20px" />
        污染物趋势变化
      </div>
      <div class="buttonselect">
        <span
          :class="{ active: isChecked }"
          @click="spanClick('hourly')"
          style="border-top-left-radius: 10px; border-bottom-left-radius: 10px"
          >最近24小时</span
        >
        <span
          :class="{ active: !isChecked }"
          @click="spanClick('daily')"
          style="
            border-top-right-radius: 10px;
            border-bottom-right-radius: 10px;
          "
          >最近30天</span
        >
      </div>

      <div class="sensorkeyselect">
        <span
          :class="{ sensorkeyActive: isSelected == 'AQI' }"
          @click="sensorkeySelected('AQI')"
          >AQI</span
        >
        <span
          :class="{ sensorkeyActive: isSelected == 'PM2.5' }"
          @click="sensorkeySelected('PM2.5')"
          >PM2.5</span
        >
        <span
          :class="{ sensorkeyActive: isSelected == 'PM10' }"
          @click="sensorkeySelected('PM10')"
          >PM10</span
        >
        <span
          :class="{ sensorkeyActive: isSelected == 'NO2' }"
          @click="sensorkeySelected('NO2')"
          >NO2</span
        >
        <span
          :class="{ sensorkeyActive: isSelected == 'SO2' }"
          @click="sensorkeySelected('SO2')"
          >SO2</span
        >
        <span
          :class="{ sensorkeyActive: isSelected == 'O3' }"
          @click="sensorkeySelected('O3')"
          >O3</span
        >
        <span
          :class="{ sensorkeyActive: isSelected == 'CO' }"
          @click="sensorkeySelected('CO')"
          >CO</span
        >        
      </div>
      <div class="Echarts" style="margin-bottom: 30px">
        <div id="main" style="width: 100%; height: 300px"></div>
      </div>
    </div>
  </div>
</template>

<script>
import request from "../network/request.js";
import Request from "../network/request.js";
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import《组件名称》from'《组件路径》';
export default {
  //import 引入的组件需要注入到对象中才能使用
  components: {},
  props: {},
  data() {
    //这里存放数据
    return {
      datetime: null,
      tianqi: "晴",
      wendu: "10℃",
      shidu: "28%",
      fengli: "南风",
      isChecked: true,
      isSelected: "AQI",
      cityName: "",
      cityCode: "",
      AQIvalue: null,
      pollutionimportantance: null,
      AQIlevel: "优",
      timecontent: "hourly",
      timedatas: [],
      AQIS: [],
      PM2S: [],
      PM10S: [],
      COS: [],
      SO2S: [],
      O3S: [],
      NO2S: [],
    };
  },
  // 计算属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    runcity() {
      Request.requestcity({}).then((res) => {
      
        this.cityName = res.data.data.regionName;
        
        this.cityCode = res.data.data.regionCode;
        this.runrealweather();
        this.runsixParamAndAqi(this.cityCode);
      });
    },
    runrealweather() {
      Request.requestrealWeather({
        baseConfig: this.cityCode,
      }).then((res) => {
        this.tianqi = res.data.data.text;
        this.wendu = res.data.data.temp;
        this.shidu = res.data.data.humidity;
        this.fengli = res.data.data.windDir;
        this.datetime = res.data.data.TIME;
        this.runhoulyAQI();
      });
    },
    runhoulyAQI() {
      try {
        Request.requesthouylyAQI({
          baseConfig: this.cityCode,
        }).then((res) => {
        
          this.AQIvalue = res.data.data.AQI;

          this.pollutionimportantance = res.data.data.maxSensor;
          if (this.AQIvalue > 0 && this.AQIvalue <= 50) {
            this.AQIlevel = "优";
          } else if (this.AQIvalue >= 51 && this.AQIvalue <= 100) {
            this.AQIlevel = "良";
          } else if (this.AQIvalue >= 101 && this.AQIvalue <= 150) {
            this.AQIlevel = "轻度";
          } else if (this.AQIvalue >= 151 && this.AQIvalue <= 200) {
            this.AQIlevel = "中度";
          } else if (this.AQIvalue >= 201 && this.AQIvalue <= 300) {
            this.AQIlevel = "重度";
          } else if (this.AQIvalue >= 301) {
            this.AQIlevel = "严重";
          }
          // console.log( this.AQIlevel)
          this.mapping();
        });
      } catch {
     this.mapping();
      }
    },
    sensorkeySelected(sensorkey) {
      this.isSelected = sensorkey;
      
      this.myEcharts();
    },
    spanClick(time) {
      // console.log(time)
      this.timecontent = time;
      this.isChecked = !this.isChecked;
      this.runsixParamAndAqi(this.cityCode);
    },
    runsixParamAndAqi(citycode) {
      this.AQIS = [];
      this.PM2S = [];
      this.PM10S = [];
      this.COS = [];
      this.SO2S = [];
      this.O3S = [];
      this.NO2S = [];
      this.timedatas = [];
      Request.requestsixParamAndAqi({
        baseConfig: citycode,
        unit: this.timecontent,
      }).then((res) => {
        for (let i = 0; i < res.data.data.length; i++) {
          this.AQIS.push(res.data.data[i].AQI);
          this.PM2S.push(res.data.data[i].e1);
          this.PM10S.push(res.data.data[i].e2);
          this.COS.push(res.data.data[i].e10);
          this.SO2S.push(res.data.data[i].e11);
          this.O3S.push(res.data.data[i].e15);
          this.NO2S.push(res.data.data[i].e16);
          this.timedatas.push(res.data.data[i].time);
        }
       
        this.myEcharts();
      });
    },
    myEcharts() {
      // console.log(this.isSelected)
      let selectedsensorkey = this.isSelected;
      let text;
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById("main"));

      let sensorkeydata = [];
      if (this.isSelected === "AQI") {
        sensorkeydata = this.AQIS;
        text = "";
      } else if (this.isSelected === "PM2.5") {
        sensorkeydata = this.PM2S;
        text = "单位:ug/m3";
      } else if (this.isSelected === "PM10") {
        sensorkeydata = this.PM10S;
        text = "单位:ug/m3";
      } else if (this.isSelected === "NO2") {
        sensorkeydata = this.NO2S;
        text = "单位:ug/m3";
      } else if (this.isSelected === "SO2") {
        sensorkeydata = this.SO2S;
        text = "单位:ug/m3";
      } else if (this.isSelected === "O3") {
        sensorkeydata = this.O3S;
        text = "单位:ug/m3";
      } else if (this.isSelected === "CO") {
        sensorkeydata = this.COS;
        text = "单位:mg/m3";
      }

      // 指定图表的配置项和数据
      var option = {
        title: {
          text: text,
          padding: 20,

          textStyle: {},
        },
        tooltip: {},
        legend: {
          data: [],
        },

        dataZoom: [
          //滚动条
          {
            type: "slider", //x轴滑块
            show: false, //滑块显示隐藏
            start: 30, //滑块开始位置
            end: 100, //滑块结束位置
            handleSize: 16, //x轴显示几个单位
          },
          {
            type: "inside",
            start: 94,
            end: 100,
          },
          {
            type: "slider", //y轴滑块
            show: false, //y轴滑块隐藏
            yAxisIndex: 0,
            filterMode: "empty",
            width: 12,
            height: "70%",
            handleSize: 8,
            showDataShadow: false,
            left: "93%",
          },
        ],
        xAxis: {
          data: this.timedatas,
        },
        yAxis: {
          splitNumber: 6, //y轴间隔
        },

        series: [
          {
            data: sensorkeydata,
            // name: "销量",
            type: "bar",
            itemStyle: {
              normal: {
                color: function (params) {
                  let colorList = [
                    "#01FD20",
                    "#FDFE27",
                    "#FEA317",
                    "#FA0701",
                    "#A024EE",
                    "#AF2F5F",
                  ];
                  let col = []; //用colorList的下标表示的每个数据柱 bar 的取色
                  if (selectedsensorkey === "AQI") {
                    if (params.data < 50) {
                      return colorList[0];
                    } else if (params.data < 100) {
                      return colorList[1];
                    } else if (params.data < 150) {
                      return colorList[2];
                    } else if (params.data < 200) {
                      return colorList[3];
                    } else if (params.data < 300) {
                      return colorList[4];
                    } else {
                      return colorList[5];
                    }
                  } else if (selectedsensorkey === "PM2.5") {
                    if (params.data < 35) {
                      return colorList[0];
                    } else if (params.data < 75) {
                      return colorList[1];
                    } else if (params.data < 115) {
                      return colorList[2];
                    } else if (params.data < 150) {
                      return colorList[3];
                    } else if (params.data < 250) {
                      return colorList[4];
                    } else {
                      return colorList[5];
                    }
                  } else if (selectedsensorkey === "PM10") {
                    if (params.data < 50) {
                      return colorList[0];
                    } else if (params.data < 150) {
                      return colorList[1];
                    } else if (params.data < 250) {
                      return colorList[2];
                    } else if (params.data < 350) {
                      return colorList[3];
                    } else if (params.data < 420) {
                      return colorList[4];
                    } else {
                      return colorList[5];
                    }
                  } else if (selectedsensorkey === "NO2") {
                    if (params.data < 40) {
                      return colorList[0];
                    } else if (params.data < 80) {
                      return colorList[1];
                    } else if (params.data < 180) {
                      return colorList[2];
                    } else if (params.data < 280) {
                      return colorList[3];
                    } else if (params.data < 565) {
                      return colorList[4];
                    } else {
                      return colorList[5];
                    }
                  } else if (selectedsensorkey === "SO2") {
                    if (params.data < 150) {
                      return colorList[0];
                    } else if (params.data < 500) {
                      return colorList[1];
                    } else if (params.data < 650) {
                      return colorList[2];
                    } else if (params.data < 800) {
                      return colorList[3];
                    } else if (params.data < 1000) {
                      return colorList[4];
                    } else {
                      return colorList[5];
                    }
                  } else if (selectedsensorkey === "O3") {
                    if (params.data < 100) {
                      return colorList[0];
                    } else if (params.data < 160) {
                      return colorList[1];
                    } else if (params.data < 215) {
                      return colorList[2];
                    } else if (params.data < 265) {
                      return colorList[3];
                    } else if (params.data < 800) {
                      return colorList[4];
                    } else {
                      return colorList[5];
                    }
                  } else if (selectedsensorkey === "CO") {
                    if (params.data < 5) {
                      return colorList[0];
                    } else if (params.data < 10) {
                      return colorList[1];
                    } else if (params.data < 35) {
                      return colorList[2];
                    } else if (params.data < 60) {
                      return colorList[3];
                    } else if (params.data < 90) {
                      return colorList[4];
                    } else {
                      return colorList[5];
                    }
                  }
                },
              },
            },
          },
        ],
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },

    mapping() {
      let radius = 75; //外环半径
      let thickness = 10; //圆环厚度
      let innerRadius = radius - thickness; //内环半径 65
      let startAngle = -90; //开始角度
      let endAngle = 180; //结束角度
      let x = 0; //圆心x坐标
      let y = 0; //圆心y坐标
      // let canvas = document.getElementById('tutorial');
      let canvas = this.$refs.tutorialref;
      canvas.width = 150;
      canvas.height = 150;

      let ctx = canvas.getContext("2d");
      ctx.translate(canvas.width / 2, canvas.height / 2); //将绘图原点移到画布中央
      ctx.rotate(angle2Radian(225)); //将画布旋转225度
      ctx.fillStyle = "rgba(215,224,224,0.3)"; //初始填充颜色#D7E0E0
      ctx.opacity = 0.2;
      renderRing(startAngle, endAngle);
      let that = this;
      //渲染函数
      function renderRing(startAngle, endAngle) {
        ctx.beginPath();

        //绘制外环  x，y圆心 radius外环半径  开始弧度-1.57  结束弧度3.14
        ctx.arc(x, y, radius, angle2Radian(startAngle), angle2Radian(endAngle));

        //计算外环与内环第一个连接处的中心坐标  0，0  ， 70 ，180
        let oneCtrlPoint = calcRingPoint(
          x,
          y,
          innerRadius + thickness / 2,
          endAngle
        );

        //绘制外环与内环第一个连接处的圆环
        ctx.arc(
          oneCtrlPoint.x,
          oneCtrlPoint.y,
          thickness / 2,
          angle2Radian(-90),
          angle2Radian(270)
        );

        // //绘制内环
        ctx.arc(
          x,
          y,
          innerRadius,
          angle2Radian(endAngle),
          angle2Radian(startAngle),
          true
        );

        //计算外环与内环第二个连接处的中心坐标
        let twoCtrlPoint = calcRingPoint(
          x,
          y,
          innerRadius + thickness / 2,
          startAngle
        );

        //绘制外环与内环第二个连接处的圆环
        ctx.arc(
          twoCtrlPoint.x,
          twoCtrlPoint.y,
          thickness / 2,
          angle2Radian(-90),
          angle2Radian(270)
        );

        ctx.fill();
      }

      //计算圆环上点的坐标
      function calcRingPoint(x, y, radius, angle) {
        let res = {};
        res.x = x + radius * Math.cos((angle * Math.PI) / 180);
        res.y = y + radius * Math.sin((angle * Math.PI) / 180);
        return res;
      }

      //弧度转角度
      function radian2Angle(radian) {
        return (180 * radian) / Math.PI;
      }

      //角度转弧度
      function angle2Radian(angle) {
        return (angle * Math.PI) / 180;
      }

      //进度条颜色
      var lingrad = ctx.createLinearGradient(0, 0, 150, 0);
      lingrad.addColorStop(0, "white");
      lingrad.addColorStop(1, "white");
      ctx.fillStyle = lingrad;

      //开始绘画
      let tempAngle = startAngle; //初始值-90°
      let total = 500; //总分
      // let now =  //当前分数
      let percent = that.AQIvalue / total; //百分比

      let twoEndAngle = percent * 270 + startAngle;
      let step = (twoEndAngle - startAngle) / 80;
      let numberSpan = document.querySelector(".number");
      let inter = setInterval(() => {
        if (tempAngle > twoEndAngle) {
          clearInterval(inter);
        } else {
          numberSpan.innerText = this.AQIvalue;
          tempAngle += step;
          //  console.log(tempAngle)
        }
        renderRing(startAngle, tempAngle);
      }, 20);
    },
  },
  //生命周期 - 创建完成（可以访问当前 this 实例）
  created() {
    this.runcity();
  },
  //生命周期 - 挂载完成（可以访问 DOM 元素）
  mounted() {
    // this.mapping(this.AQIvalue);
    // this.myEcharts();
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
.shouyetop {
  display: flex;
  margin: 0px;
  color: white;
  background: url("../assets/img/shouyetop.png");
  height: 500px;
  width: 100%;
  background-size: 100% 100%;
  justify-content: center;
}

.shouyemiddle {
  display: flex;
  background: #5aaec6;
  margin-top: -1px;
}
.shouyemiddle > div {
  /* flex: 1; */
  text-align: center;
}

.ring {
  width: 150px;
  height: 150px;
  top: 140px;
  position: absolute;
}

.fraction {
  position: relative;
  font-size: 14px;
  bottom: 129px;
  color: white;
  left: 40px;
  width: 70px;
  text-align: center;
}

.small {
  font-size: 12px;
  font-weight: lighter;
}
.active {
  background: #5aaec6;
}

.gengxinshijian {
  position: absolute;
  top: 50px;
  right: 10px;
  font-size: 14px;
  opacity: 0.7;
}

.pollutionstyle {
  color: white;
  margin-top: 50px;
}
.aqiimgstyle {
  right: -50px;
  position: absolute;
  bottom: -6px;
}

.pollutionlabelstyle {
  margin: 20px 20px;
  font-weight: bold;
}
.buttonselect {
  display: flex;
  height: 35px;
  line-height: 35px;
  margin: 10px 20px;
  text-align: center;
}
.buttonselect > span {
  flex: 1;
  border: 1px solid #00a0b1;
}
.sensorkeyselect {
  display: flex;
  justify-content: space-between;
  margin: 10px 20px;
  font-size: 14px;
}
.sensorkeyActive {
  border-bottom: 2px solid #3fa6fe;
}
.shouyedown {
  position: absolute;
  display: flex;
  width: 264px;
  flex-wrap: wrap;
  top: 326px;
  font-size: 15px;
  border-radius: 20px;
  background: #81d5f1;
}
.tianqichild {
  margin: 5px 10px;
  width: 110px;
}
</style>