<template>
  <div id="mapview">
    <div class="mapviewtop">
      <div id="divmap">地图</div>
      <div id="devicedingwei" @click="openMonitorPoints">
        <img
          src="../assets/img/devicedingwei.png"
          width="30px"
          height="30px"
          alt=""
        />
      </div>
    </div>

    <div class="mapviewmiddle">
  
      <span @click="runLocation('e1')" :class="{ active: IsActived == 'e1' }"
        >PM2.5
      </span>
      <span @click="runLocation('e2')" :class="{ active: IsActived == 'e2' }"
        >PM10</span
      >
      <span @click="runLocation('e11')" :class="{ active: IsActived == 'e11' }"
        >SO<sub>2</sub></span
      >
      <span @click="runLocation('e16')" :class="{ active: IsActived == 'e16' }"
        >NO<sub>2</sub></span
      >
      <span @click="runLocation('e15')" :class="{ active: IsActived == 'e15' }"
        >O<sub>3</sub></span
      >
      <span @click="runLocation('e10')" :class="{ active: IsActived == 'e10' }"
        >CO</span
      >
       <span @click="runLocation('AQI')" :class="{ active: IsActived == 'AQI' }"
        >AQI</span
      >
      <span @click="runLocation('e17')" :class="{ active: IsActived == 'e17' }"
        >TVOC</span
      >
    </div>

    <img class="imglevel" src="../assets/img/sensorlevel.png" alt="" />

    <div id="devicename" v-if="isClicked">
      <img src="../assets/img/search.png" class="devicedingweiImage" alt="" />
      <input
        type="text"
        class="deviceinput"
        placeholder="请输入设备名"
        v-model="deviceNames"
      />
      <ul>
        <!-- ：key的作用，为了给vue一个提示，以便追踪每个节点的分身，从而重新排序现有元素，需要对每项提供一个唯一的key属性 -->
        <li
          :key="index"
          v-for="(items, index) in devices"
          @click="deviceClick(index, items.name)">
          {{ items.name }}
        </li>
      </ul>
    </div>

    <div id="mapid"></div>
  </div>
</template>
<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import《组件名称》from'《组件路径》';
import "leaflet/dist/leaflet.css";
import { bd09togcj02 } from "../components/transform.js";
import * as L from "leaflet";

import Request from "../network/request.js";

import VueCookie from "js-cookie";

import store from "../store";

import $ from "jquery";
//引入风场插件
import "leaflet-velocity/dist/leaflet-velocity.css";
import 'leaflet-velocity/dist/leaflet-velocity'

// var map;

export default {
  //import 引入的组件需要注入到对象中才能使用
  components: {},
  props: {},
  data() {
    //这里存放数据
    return {
      devices: [],
      devicesMiddle: [],
      devicestate: 4,
      fiveMinutesInterval: null,
      map: null,
      devicesData: null,
      sensorKey: "e1",
      keys: [],
      markData: null,
      mark: null,
      IsActived: "e1",
      isClicked: false,
      deviceNames: "",
      markName: [],
      fiveMinutesDeviceData: {},
      monitorPointIdCount:[]
    };
  },
  // 计算属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {
    deviceNames(curVal, oldVal) {
      let newValue = this.devices;
      if (curVal != oldVal) {
        let newDevices = this.devices.filter((value) => {
          return value.name.match(curVal);
        });
        this.devices = newDevices;
      }
      if (curVal == "") {
        this.devices = this.devicesMiddle;
      }
    },
  },
  //方法集合
  methods: {
    //点击列表设备名，显示定位，显示弹窗   如何去除弹窗
    deviceClick(index, dn) {
      if (this.markName.length > 0) {
        this.map.removeLayer(this.markName[0]);
        this.markName = [];
      }
      // console.log(this.markName);
      let i = require("@/assets/img/deviceView.png");
      let htmlview =
        "<div style='background:url(" +
        i +
        ");height:100px;width:300px;background-size:300px 100px;font-size:16px; text-align:center;line-height:100px'>" +
        dn +
        "</div>";

      let latNew = this.devices[index].latitude;
      let lotNew = this.devices[index].longitude;
      this.map.setZoom(18);
      this.map.setView(bd09togcj02(lotNew, latNew));
      this.isClicked = false;
      var divIcon = L.divIcon({
        html: htmlview,
        className: "ViewName",
        iconSize: 250,
        iconAnchor: [150, 90],
      });

      let dName = new L.marker(bd09togcj02(lotNew, latNew), {
        icon: divIcon,
      });
      this.markName.push(dName);
      this.map.addLayer(dName);
    },
    openMonitorPoints() {
      this.isClicked = !this.isClicked;
    },
    runMapData(sensorKey) {
      Request.requestSensorKey({
        //网络请求传参
        baseConfig: sensorKey,
      })
        .then((res) => {
          console.log(res);
          this.devicesData = res.data.data.device;
          this.runSensorKeysData();
        })
        .catch((err) => console.log(err));
    },

    runSensorKeysData() {
      this.keys = [];
      this.markData = null;
      for (let i = 0; i < this.devicesData.length; i++) {
        if (this.devicesData[i].e1) {
          this.keys.push(Math.floor(JSON.parse(this.devicesData[i].e1)[0]));
        } else if (this.devicesData[i].e2) {
          this.keys.push(Math.floor(JSON.parse(this.devicesData[i].e2)[0]));
        } else if (this.devicesData[i].e10) {
          this.keys.push((JSON.parse(this.devicesData[i].e10)[0]).toFixed(2));
        }else if (this.devicesData[i].e11) {
          this.keys.push(Math.floor(JSON.parse(this.devicesData[i].e11)[0]));
        } else if (this.devicesData[i].e15) {
          this.keys.push(Math.floor(JSON.parse(this.devicesData[i].e15)[0]));
        } else if (this.devicesData[i].e16) {
          this.keys.push(Math.floor(JSON.parse(this.devicesData[i].e16)[0]));
        } else if (this.devicesData[i].e17) {
          this.keys.push((JSON.parse(this.devicesData[i].e17)[0]).toFixed(1));
        } else if (this.devicesData[i].AQI) {
          this.keys.push(Math.floor(JSON.parse(this.devicesData[i].AQI)[0]));
        } else {
          this.keys.push(JSON.parse("null"));
        }

        var lat = this.devicesData[i].latitude;
        var lng = this.devicesData[i].longitude;
        // var dName=this.devicestate[i].de
        //声明一个 device.name   每个name加入到bindPopup中，这样点击就会产生，  但是有个问题，单独点击如何显示数据
        var myIcon = L.divIcon({
          html: this.keys[i],
          className: "mapvalue",
          iconSize: 30,
          iconAnchor: [8, 15],
        });

        this.markData = new L.marker([lat, lng], {
          icon: myIcon,
        });

        this.markData.on("click", (e) => {
          // console.log(this.devicesData)
          this.runDeviceFiveMinutesData(this.devicesData[i]);
        });

        this.map.addLayer(this.markData);
      }
    },

    runInterval() {
      Request.request({})
        .then((res) => {
          console.log(res)
console.log(res.data.orgId)
          store.state.orgId = res.data.orgId;
          store.state.regionCode = res.data.regionCode;

          //网络请求，通过code得到账号下站点
          Request.requestMonitorPoints({}).then((res) => {      
            this.devices = [];
           this.monitorPointIdCount=[]
            for (let i in res.data.data) { 
                // console.log(res.data.data[i].id)
                this.monitorPointIdCount.push(res.data.data[i].id);

                //  console.log(this.monitorPointIdCount)
                // this.runWindData(res.data.data[i].id)

              for (let j in res.data.data[i].devices) {
                this.devices.push(res.data.data[i].devices[j]);
              }
            }
            this.runWindData(this.monitorPointIdCount);
            this.devicesMiddle = this.devices;
            if (!this.map) {
              this.runMap();
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },

    runMap() {
    
      // console.log(123);
      this.map = L.map("mapid", {
        //中心点
        center: bd09togcj02(
          this.devices[0].longitude,
          this.devices[0].latitude
        ),
        //进入缩放级别数
        zoom: 13,
        //放大缩写按钮
        zoomControl: false,
        //设定logo显示
        attributionControl: false,
      });

      // 通过给定URL模板和具有选项的对象来实例化一个切片图层。
      L.tileLayer(
        "http://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}"
      ).addTo(this.map);
      this.map.on("click", (e) => {
        if (this.isClicked === true) {
          this.isClicked = !this.isClicked;
        }
        if (this.markName.length > 0) {
          this.map.removeLayer(this.markName[0]);
        }
        this.markName = [];
      });
      this.map.on("dragstart", (e) => {
        if (this.isClicked === true) {
          this.isClicked = !this.isClicked;
        }
      });
      this.runLocation(this.sensorKey);
      
    },

    runLocation(sensorKey) {
      this.IsActived = sensorKey;
     
      if (this.map) {
        this.map.eachLayer(function (layer) {
          // 卸载之前的风场图层
          if (
            !layer._container &&
            ("" + $(layer._container).attr("class")).replace(/\s/g, "") !==
              "leaflet-layer"
          ) {
            layer.remove();
          }
        });
      }
      if (this.devices.length > 0) {
        // 定义图标
        for (let i in this.devices) {
          var iconColor = L.icon({
            iconUrl: require("@/assets/img/ico" +
              this.devices[i].state +
              ".png"),
            iconSize: [55, 55], //  图标的大小    【值1，值2】 为具体你自定义图标的尺寸，比如我图标尺寸是32×52，表示该图标：宽度32像素，高度：52像素，那么值1:就是32，值2：就是52
            // iconAnchor: [16, 52], //  图标将对应标记点的位置 这个是重点， 【值1，值2】，值1：为图标坐标第一个值(即32)的一半，值2：为图标坐标第二个值(即52)
          });
          //创建设备点
          this.devicestate = this.devices[i].state;
          let marker = new L.marker(
            bd09togcj02(this.devices[i].longitude, this.devices[i].latitude),
            {
              icon: iconColor,
            }
          );

          this.mark = marker;
          this.map.addLayer(marker);
        }
      }
      this.runMapData(sensorKey);
    },
    runDeviceFiveMinutesData(deviceli) {
      Request.requestFiveMinutesData({
        baseConfig: deviceli.mac,
      })
        .then((res) => {
          console.log(res)
          this.fiveMinutesDeviceData = {};
          this.fiveMinutesDeviceData = res.data.data;
          let htmlview = "";
          for (let key in this.fiveMinutesDeviceData) {
            // console.log(key+'-----'+this.fiveMinutesDeviceData[key])
            htmlview +=
              "<div><span>" +
              key +
              ":" +
              "</span><span>" +
              this.fiveMinutesDeviceData[key] +
              "</span></div>";
          }
          // console.log(htmlview);
          var popup = L.popup()
            .setLatLng([deviceli.latitude, deviceli.longitude])
            .setContent(htmlview)
            .openOn(this.map);
          this.markData.bindPopup = popup;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    runWindData(monitorPointIdCount) {
      Request.requestWindData({
        baseConfig: monitorPointIdCount,
      }).then((data) => {    
        // console.log(data);  
           let velocityLayer = L.velocityLayer({
                  displayValues: false,     // 是否显示当前鼠标移动位置，风场信息
                  displayOptions: {// 显示信息配置
                   velocityType: 'Global Wind',
                   displayPosition: 'bottomleft',
                   displayEmptyString: 'No wind data'
                   },
                   data: data.data[0], // 数据  格式可参照
                   // 以下为控制参数，后面为默认值
                   minVelocity: 0, // 粒子最小速度（ m/s ）
                   maxVelocity: 8, // 粒子最大速度（ m/s ）
                   velocityScale: 0.1, // 风速的比例 ( 粒子的小尾巴长度 )
                   particleAge: 90, // 粒子在再生之前绘制的最大帧数
                   lineWidth: 1.5, // 绘制粒子的线宽
                   particleMultiplier: 1 / 300, // 粒子计数标量（ 粒子密度 ）
                   frameRate: 15, // 每秒所需的帧数
                   colorScale: ['#A2D839', '#7EB530', '#6E9F26', '#4E7522', '#345B1B', '#186303', '#175103', '#053F03']
           }) 
           this.map.addLayer(velocityLayer)
           //velocityLayer.addTo(this.map)// 添加到图上
      });
    },
  },
  //生命周期 - 创建完成（可以访问当前 this 实例）
  created() {
    console.log('created')
    this.runInterval();
    
  },
  //生命周期 - 挂载完成（可以访问 DOM 元素）
  mounted() {
    //网络请求 得到regionCode  5分钟定时请求
    this.fiveMinutesInterval = setInterval(() => {
      this.runInterval();
      this.runLocation();
    }, 1000000);
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {
    clearInterval(this.fiveMinutesInterval);
  }, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style scoped>
#mapview {
  height: 100%;
}
.active {
  background-color: white; 
  color:#3079C6!important
}

#mapid {
  width: 100%;
  height: 100%;
  position: absolute;
}
.mapviewtop::-webkit-scrollbar {
  display: none;
}
.mapviewtop {
  display: flex;
  background: #3079C6;
  height: 45px;
  position: fixed;
  width: 100%;
  z-index: 999;
  top: 0px;

  vertical-align: middle;
}
#divmap {
  line-height: 45px;
  margin: 0 auto;
  color:white
}

.mapviewmiddle {
  width: 100%;
  justify-content: space-between;
  white-space: nowrap;
  overflow-y: hidden;
  overflow-x: scroll;
  display: flex;
  height: 40px;
  /* border: 1px solid gray; */
  position: fixed;
  top: 45px;
  z-index: 999;
  background: #4798EB;
}
.mapviewmiddle > span {
  padding: 11px;
  line-height: 20px;
  color:white
  
}
.styleback{
  color:red
}
.imglevel {
  z-index: 1001;
  position: fixed;
  margin: 10px;
  top: 90px;
}

#devicename {
  overflow-y: scroll;
  position: fixed;
  right: 0px;
  width: 170px;
  z-index: 1000;
  height: 300px;
  top: 45px;
  background: white;
  
}
#devicename > ul {
  list-style: none;
  padding: 0px;
  margin: 10px;
}
#devicename > ul li {
  border-bottom: 1px dashed;
  font-size: 10px;
}
#devicedingwei {
  position: absolute;
  right: 5px;
  top: 8px;
}
.devicedingweiImage {
  margin: 5px;
  widows: 20px;
  height: 20px;
  vertical-align: top;
}
.deviceinput {
  height: 18px;
  margin: 4px;
  width:120px;
}
</style>