<!-- T1一体化机房监控 -->
<template>
    <div class="panel right-container-angle">
        <div class="title">T1一体化机房监控</div>
        <div class="content">
            <div class="left box">
                <div class="video-box">
                    <!-- <img src="../../../assets/image/monitor1.jpg" alt=""> -->
                    <myVideo
                        :videoId="leftVideoId"
                        :videoSrc="leftVideoSrc"
                    ></myVideo>
                </div>
                <div class="select-box">
                    <a-select
                        :default-value="0"
                        style="width: 100%;background: transparent;"
                        @change="leftSelectChange"
                    >
                        <a-icon
                            slot="suffixIcon"
                            type="caret-down"
                            style="color: #fff;"
                        />
                        <a-select-option
                            :value="index"
                            v-for="(item,index) in leftSelectList"
                            :key="item.id"
                        >
                            {{ item.deviceName }}
                        </a-select-option>
                    </a-select>
                </div>
            </div>
            <div class="right box">
                <div class="video-box">
                    <!-- <img src="../../../assets/image/monitor2.jpg" alt=""> -->
                    <!-- <video>
                        <source src="rtmp://10.160.8.103:1935/live/1" type="application/x-mpegURL">
                    </video> -->
                    <myVideo
                        :videoId="rightVideoId"
                        :videoSrc="rightVideoSrc"
                    ></myVideo>
                </div>
                <div class="select-box">
                    <a-select
                        :default-value="0"
                        style="width: 100%;background: transparent;"
                    >
                        <a-icon
                            slot="suffixIcon"
                            type="caret-down"
                            style="color: #fff;"
                        />
                        <a-select-option
                            :value="index"
                            v-for="(item,index) in rightSelectList"
                            :key="item.id"
                            @change="rightSelectChange"
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
export default {
    components: {
        myVideo,
    },
    data() {
        return {
            leftSelectList: [],
            rightSelectList: [],
            leftVideoId: "",
            rightVideoId: "",
            leftVideoSrc: "",
            rightVideoSrc: "",
        };
    },
    async created() {
        this.getDeviceList(1).then((res) => {
            console.log("res,aaaaaa", res);
            this.leftSelectList = res;
            this.leftSelectList.splice();
            this.getVideoUrl(1, this.leftSelectList[0].deviceIp);
        });
        await this.getDeviceList(2).then((res) => {
            this.rightSelectList = res;
            this.rightSelectList.splice();
            this.getVideoUrl(2, this.rightSelectList[0].deviceIp);
        });
    },
    methods: {
        leftSelectChange(value) {
            this.getVideoUrl(1, this.leftSelectList[value].deviceIp);
        },
        rightSelectChange(value) {
            this.getVideoUrl(2, this.rightSelectList[value].deviceIp);
        },
        async getDeviceList(type) {
            let [res] = await getDeviceList({window: type});
            // let res = {
            //     result: "true",
            //     data: [
            //         {
            //             isNewRecord: false,
            //             id: "1331149452718415872",
            //             createDate: "2020-11-24 16:15",
            //             updateDate: "2020-11-24 16:26",
            //             deviceName: "冷站房进出口",
            //             deviceIp: "192.168.1.1",
            //             window: "1",
            //         },
            //     ],
            //     message: "请求成功",
            // };
            // console.log( 'res')
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
            // let res = {
            //     result: "true",
            //     data: "rtmp://192.168.1.200:1935/live/1",
            //     message: "请求成功",
            // };
            if (type == 1) {
                this.leftVideoId = this.leftSelectList[0].id;
                this.leftVideoSrc = res.data;
            } else {
                this.rightVideoId = this.rightSelectList[0].id;
                this.rightVideoSrc = res.data;
            }
        },
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
    margin-top: 15px;
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
