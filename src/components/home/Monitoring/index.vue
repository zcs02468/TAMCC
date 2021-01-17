<!-- T1一体化机房监控 -->
<template>
    <div class="panel right-container-angle">
        <div class="title">T1一体化机房监控</div>
        <div class="content">
            <div class="left box">
                <div class="video-box">
                    <div class="video-floor" :class="[ leftVideoType && !mapDialogType ? 'fixed':'' ]" @click="leftVideoClick">
                        <myVideo
                            v-if="leftVideoSrc"
                            :videoId="leftVideoId"
                            :videoSrc="leftVideoSrc"
                        ></myVideo>
                    </div>
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
                    <div class="video-floor" :class="[ rightVideoType && !mapDialogType ? 'fixed':'' ]" @click="rightVideoClick">
                        <myVideo
                            v-if="rightVideoSrc"
                            :videoId="rightVideoId"
                            :videoSrc="rightVideoSrc"
                        ></myVideo>
                    </div>
                </div>
                <div class="select-box">
                    <a-select
                        :default-value="0"
                        style="width: 100%;background: transparent;"
                        @change="rightSelectChange"
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
import {mapState,mapMutations} from "vuex"
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
            leftVideoType: false,
            rightVideoType: false,
        };
    },
    async created() {
        this.getDeviceList(1).then((res) => {
            if( res ) {
                this.leftSelectList = res;
                this.leftSelectList.splice();
                this.getVideoUrl(1, this.leftSelectList[0].deviceIp);
            }
        });
        this.getDeviceList(2).then((res) => {
            if( res ) {
                this.rightSelectList = res;
                this.rightSelectList.splice();
                this.getVideoUrl(2, this.rightSelectList[0].deviceIp);
            }
        });
    },
    methods: {
        ...mapMutations(['closeMapDialog']),
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
            //     result: "true",
            //     // data: "rtmp://192.168.1.200:1935/live/1",
            //     data: "rtmp://10.160.8.103:1935/live/1",
            //     message: "请求成功",
            // };
            if (type == 1) {
                this.leftVideoId = Math.random().toString(32).substr(2).padStart(12, "left963852");
                this.leftVideoSrc = res.data;
            } else {
                this.rightVideoId = Math.random().toString(32).substr(2).padStart(12, "right963852");
                this.rightVideoSrc = res.data;
            }
        },
    },
    computed:{
        ...mapState({
            mapDialogType: state => state.home.mapDialogType
        })
    }
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
        .video-floor {
            width: 100%;
            height: 100%;
        }
        .fixed {
            position: fixed;
            top: 67px;
            left: 575px;
            width: 765px;
            height: 678.5px;
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
