<!-- T1一体化机房监控 -->
<template>
  <div class="panel right-container-angle">
    <div class="title">T1一体化机房监控</div>
    <div class="content">
      <div class="left box">
        <div class="video-box">
          <div
            class="video-floor"
            :class="[leftVideoType && !mapDialogType ? 'fixed' : '']"
            @click="leftVideoClick"
          >
            <myVideo
              v-if="leftVideoSrc"
              videoId="leftVideoId"
              :videoSrc="leftVideoSrc"
              :videoIp="leftIp"
            ></myVideo>
          </div>
        </div>
        <div class="select-box">
          <a-select
            :default-value="0"
            style="width: 100%;background: transparent;"
            @change="leftSelectChange"
          >
            <a-icon slot="suffixIcon" type="caret-down" style="color: #fff;" />
            <a-select-option
              :value="index"
              v-for="(item, index) in leftSelectList"
              :key="item.id"
            >
              {{ item.deviceName }}
            </a-select-option>
          </a-select>
        </div>
      </div>
      <div class="right box">
        <div class="video-box">
          <div
            class="video-floor"
            :class="[rightVideoType && !mapDialogType ? 'fixed' : '']"
            @click="rightVideoClick"
          >
            <myVideo
              v-if="rightVideoSrc"
              videoId="rightVideoId"
              :videoSrc="rightVideoSrc"
              :videoIp="rightIp"
            ></myVideo>
          </div>
        </div>
        <div class="select-box">
          <a-select
            :default-value="0"
            style="width: 100%;background: transparent;"
            @change="rightSelectChange"
          >
            <a-icon slot="suffixIcon" type="caret-down" style="color: #fff;" />
            <a-select-option
              :value="index"
              v-for="(item, index) in rightSelectList"
              :key="item.id"
            >
              {{ item.deviceName }}
            </a-select-option>
          </a-select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import myVideo from "./myVideo";
import { getDeviceList, getRTMPUrl } from "@/axios";
import { mapState, mapMutations } from "vuex";
export default {
  components: {
    myVideo,
  },
  data() {
    return {
      leftSelectList: [],
      rightSelectList: [],
      leftVideoSrc: "",
      rightVideoSrc: "",
      leftVideoType: false,
      rightVideoType: false,
      leftIp:'',
      rightIp:''
    };
  },
  async created() {
    this.getDeviceList(1).then((res) => {
      if (res) {
        this.leftSelectList = res;
        this.leftSelectList.splice();
        this.getVideoUrl(1, this.leftSelectList[0].deviceIp);
      }
    });
    this.getDeviceList(2).then((res) => {
      if (res) {
        this.rightSelectList = res;
        this.rightSelectList.splice();
        this.getVideoUrl(2, this.rightSelectList[0].deviceIp);
      }
    });
  },
  methods: {
    ...mapMutations(["closeMapDialog"]),
    leftVideoClick() {
      this.closeMapDialog();
      this.rightVideoType = false;
      this.leftVideoType = !this.leftVideoType;
    },
    rightVideoClick() {
      this.closeMapDialog();
      this.leftVideoType = false;
      this.rightVideoType = !this.rightVideoType;
    },
    leftSelectChange(value) {
      this.getVideoUrl(1, this.leftSelectList[value].deviceIp);
    },
    rightSelectChange(value) {
      this.getVideoUrl(2, this.rightSelectList[value].deviceIp);
    },
    async getDeviceList(type) {
      let [res] = await getDeviceList({window: type});
      if( !res ) return;
      // let res;
      // if (type == 1) {
      //   res = {
      //     result: "true",
      //     data: [
      //       {
      //         id: "1",
      //         isNewRecord: false,
      //         createDate: "2020-11-25 15:42",
      //         updateDate: "2021-01-04 11:08",
      //         deviceName: "给水泵房2号（红外）",
      //         deviceIp: "192.168.1.115",
      //         window: "1",
      //       },
      //       {
      //         id: "1337370101303373824",
      //         isNewRecord: false,
      //         createDate: "2020-12-11 20:14",
      //         updateDate: "2020-12-22 15:28",
      //         deviceName: "冷站房进出口",
      //         deviceIp: "192.168.1.107",
      //         window: "1",
      //       },
      //       {
      //         id: "3",
      //         isNewRecord: false,
      //         createDate: "2020-11-25 18:26",
      //         updateDate: "2020-12-11 15:23",
      //         deviceName: "冷站房",
      //         deviceIp: "192.168.1.114",
      //         window: "1",
      //       },
      //     ],
      //     message: "请求成功",
      //   };
      // } else {
      //   res = {
      //     result: "true",
      //     data: [
      //       {
      //         id: "1337370165287481344",
      //         isNewRecord: false,
      //         createDate: "2020-12-11 20:14",
      //         updateDate: "2020-12-22 15:29",
      //         deviceName: "热交换机房",
      //         deviceIp: "192.168.1.108",
      //         window: "2",
      //       },
      //       {
      //         id: "1337370238360645632",
      //         isNewRecord: false,
      //         createDate: "2020-12-11 20:14",
      //         updateDate: "2020-12-22 15:28",
      //         deviceName: "给水泵房通道",
      //         deviceIp: "192.168.1.109",
      //         window: "2",
      //       },
      //       {
      //         id: "2",
      //         isNewRecord: false,
      //         createDate: "2020-11-25 18:22",
      //         updateDate: "2020-12-11 15:33",
      //         deviceName: "锅炉房进出通道",
      //         deviceIp: "192.168.1.113",
      //         window: "2",
      //       },
      //     ],
      //     message: "请求成功",
      //   };
      // }
      let data = res.data;
      // deviceName	设备显示名称
      // deviceIp	设备IP地址
      return data;
    },
    async getVideoUrl(type, ip) {
      // window	窗口
      // ip	设备ip
      const params = {
        window: type,
        ip: ip,
      };

      let [res] = await getRTMPUrl(params);
      if( !res ) return;
      // let res = {
      //   result: "true",
      //   // data: "rtmp://192.168.1.200:1935/live/1",
      //   data:"https://open.ys7.com/v3/openlive/E92779081_1_1.m3u8?expire=1611344195&id=271045132019093504&t=6e702ce13d409ec4727b5572e9a84be90410ac876e518869f6b383db468b9cc3&ev=100",
      //   message: "请求成功",
      // };
      // console.log( 'ip', ip );
      // if( ip == '192.168.1.115' ) res.data = "https://open.ys7.com/v3/openlive/E92779081_1_1.m3u8?expire=1611344195&id=271045132019093504&t=6e702ce13d409ec4727b5572e9a84be90410ac876e518869f6b383db468b9cc3&ev=100";
      // if( ip == '192.168.1.107' ) res.data = "https://open.ys7.com/v3/openlive/E92779073_1_1.m3u8?expire=1611738213&id=272410875018993664&t=e4e1afde8aa2f82d0101c0bd60af13a1cba4a754cfd3da3b6288feb9ea471197&ev=100";
      // if( ip == '192.168.1.108' ) res.data = "https://open.ys7.com/v3/openlive/E92779075_1_1.m3u8?expire=1611738241&id=272410992397987840&t=617a3dcdd50e88347943b57b95d80a1fde1e22e60299daa651fabcd9bcd221ce&ev=100";
      // if( ip == '192.168.1.109' ) res.data = "https://open.ys7.com/v3/openlive/E92779075_1_1.m3u8?expire=1611738271&id=272411116930838528&t=ad3e1657bea23fc2056a0fd08780667eb0428550185d06a9661db4dbafc15737&ev=100";
      if (type == 1) {
        this.leftVideoSrc = res.data;
        this.leftIp = ip;
      } else {
        this.rightVideoSrc = res.data;
        this.rightIp = ip;
      }
    },
  },
  computed: {
    ...mapState({
      mapDialogType: (state) => state.home.mapDialogType,
    }),
  },
};
</script>

<style lang="scss" scoped>
.select-box /deep/ .ant-select-selection {
  background: transparent;
  color: #fff;
  border: none;
}
.select-box /deep/ .ant-select-selection-selected-value {
  line-height: 33px;
}
.panel {
  width: 537.5px;
  height: 258px;
  margin-top: 10px;
  position: relative;
}
.title {
  color: #c6d6fb;
  font-size: 22px;
  height: 34px;
  line-height: 34px;
  margin: 11.5px 0 0 22px;
}
.content {
  display: flex;
  justify-content: space-between;
  padding: 0 17.5px 0 21px;
}

.box {
  width: 240px;
  // height: 384px;
  .video-box {
    width: 100%;
    height: 145px;
    border-radius: 8px;
    border: 1px solid #4f85ff;
    background: rgba(119, 161, 255, 0.14);
    box-shadow: 0.5px 0.5px 17.5px 0px rgba(88, 185, 255, 0.41) inset;
    overflow: hidden;
    .video-floor {
      width: 100%;
      height: 100%;
    }
    .fixed {
      position: fixed;
      top: 105px;
      left: 575px;
      width: 765px;
      height: 657.5px;
    }
    img {
      width: 100%;
      height: 100%;
    }
    video {
      width: 100%;
      height: 100%;
    }
  }
  .select-box {
    width: 100%;
    height: 35px;
    border-radius: 5px;
    border: 1px solid rgba(79, 133, 255, 1);
    background: rgba(50, 101, 214, 0.52);
    margin-top: 12px;
  }
}
</style>
