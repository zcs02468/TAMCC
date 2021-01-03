<!-- 左侧顶部信息 -->
<template>
    <div class="panel left-container-angle">
        <div class="left-panel">
            <div class="info-top">
                <div class="info-content" :class="[`process${arr2.length}`]">
                    <div class="top-box">
                        <div class="content">
                            <div class="item">
                                <img
                                    class="userImg"
                                    src="../../../assets/image/boss.png"
                                />
                                <div class="username">
                                    {{ arr1[0] ? arr1[0].userName : "" }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="two-box">
                        <div class="content">
                            <div
                                class="item-child"
                                v-for="(item, i) in arr2"
                                :key="i"
                            >
                                <img class="userImg" src="../../../assets/image/user.png" />
                                <div class="username">{{ item.userName }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="info-bottom">
                <!-- <div>
                    <span>总值班电话：</span>
                    <span>{{totalDutyPhone}}</span>
                </div>
                <div>
                    <span>EMC电话：</span>
                    <span>{{emcDutyPhone}}</span>
                </div> -->
                <div class="info general-border">
                    <div class="left">
                        <div class="name">能源系统保障信息</div>
                        <div
                            class="btn general-border"
                            @click="openDialog"
                        >
                            明细
                        </div>
                    </div>
                    <div class="right">
                        <span class="max">{{ count }}</span>
                        <span class="unit">个</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="right-panel">
            <div class="time-box">
                <span>{{ date.day }}</span>
                <span>{{ date.time }}</span>
                <span>{{ date.week }}</span>
            </div>
            <div class="weather-box">
                <div class="weather-top">
                    <div>
                        <span class="img-box">
                            <img :src="weatherImagePath" alt="" srcset="" />
                        </span>
                        <span class="temperature">{{ temperature }}℃</span>
                    </div>
                    <div>
                        <span>{{ weather }}</span>
                        <span
                            >{{ lowTemperature }}～{{ highTemperature }}℃</span
                        >
                    </div>
                </div>
                <div class="weather-bottom">
                    <div class="weather-left">
                        <div>湿度：{{ humidity }}%</div>
                        <div class="marginTop15">雨量：{{ rainfall }}mm</div>
                        <div class="marginTop15">AQI：{{ aqi }}</div>
                    </div>
                    <div class="weather-right">
                        <div>照度：{{ illuminance }}klux</div>
                        <div class="marginTop15">风向：{{ windDirection }}</div>
                        <span
                            class="btn marginTop15"
                            :style="{ background: colorArr[btnBgindex] }"
                            >{{ apiName }}</span
                        >
                    </div>
                </div>
            </div>
        </div>
        <div>
            <workDialog
                v-if="isShow"
                @closeDialog="closeDialog"
            />
        </div>
    </div>
</template>

<script>
import { getMetaInfo, getT1Duty, getEnergySecurity } from "../../../axios";
import comMinxins from "../../common/comMinxins";
import workDialog from "./workDialog/index"
export default {
    components:{
      workDialog
    },
    data() {
        return {
            date: {
                day: "2020-07-27",
                time: "09:15:55",
                week: "星期一",
            },
            weather: null,
            highTemperature: null,
            lowTemperature: null,
            illuminance: null,
            rainfall: null,
            windDirection: null,
            aqi: null,
            weatherImagePath: null,
            temperature: 55,
            humidity: 50,
            colorArr: ["green", "yellow", "orange", "red", "purple", "#964B00"],
            btnBgindex: 0,
            apiName: "",
            arr1: [],
            arr2: [],
            //能源系统保障信息
            isShow: false,
            count: 0,
        };
    },
    mixins: [comMinxins],
    created() {
        this.showTime();
        this.getData();
    },
    methods: {
        updateData() {
            this.getData();
        },
        async getData() {
            this.getMetadata();
            this.getT1Duty();
            this.getEnergySecurity();
        },
        async getMetadata() {
            let [res] = await getMetaInfo();
            // let res = {"result":"true","message":"{\"metar\":{\"orderBy\":null,\"isNewRecord\":false,\"id\":\"1297772791943258112\",\"pageSize\":null,\"pageNo\":null,\"createByName\":null,\"createDate\":null,\"status\":null,\"updateBy\":null,\"updateDate\":null,\"lastUpdateDateTime\":null,\"updateByName\":null,\"remarks\":null,\"createBy\":null,\"metarId\":\"1297772791943258112\",\"date\":\"2020-10-26 00:00:00\",\"weather\":\"晴\",\"temperature\":21.0,\"humidity\":35.0,\"highTemperature\":36.0,\"lowTemperature\":28.0,\"illuminance\":20.0,\"rainfall\":0.0,\"windDirection\":\"正北\",\"aqi\":130,\"weatherImagePath\":\"http://192.168.1.10/smartEnergy/profile/1297771563383967746.jpg\",\"createDate_between\":null,\"createDate_lte\":null,\"updateDate_between\":null,\"createDate_gte\":null,\"updateDate_lte\":null,\"updateDate_gte\":null,\"status_in\":null,\"id_in\":null},\"airList\":[{\"orderBy\":null,\"isNewRecord\":false,\"id\":\"1295887375621595136\",\"pageSize\":null,\"pageNo\":null,\"createByName\":null,\"createDate\":\"2020-08-19 08:56\",\"status\":\"0\",\"updateBy\":\"system\",\"updateDate\":\"2020-08-19 08:56\",\"lastUpdateDateTime\":null,\"updateByName\":null,\"remarks\":\"绿色\",\"createBy\":\"system\",\"parentCodes\":\"0,\",\"treeSorts\":\"0000000030,\",\"isQueryChildren\":null,\"treeLevel\":0,\"childList\":null,\"treeLeaf\":\"1\",\"treeSort\":30,\"treeNames\":\"优\",\"description\":\"0~50\",\"isSys\":\"1\",\"dictCode\":\"1295887375621595136\",\"dictLabelOrig\":\"优\",\"dictType\":\"air_quality_index\",\"cssClass\":\"\",\"cssStyle\":\"\",\"extend\":{\"extendF1\":null,\"extendS1\":\"\",\"extendS8\":\"\",\"extendS4\":\"\",\"extendS2\":\"\",\"extendF3\":null,\"extendD2\":null,\"extendS7\":\"\",\"extendF4\":null,\"extendI4\":null,\"extendF2\":null,\"extendI3\":null,\"extendS5\":\"\",\"extendD3\":null,\"extendS6\":\"\",\"extendI2\":null,\"extendI1\":null,\"extendD1\":null,\"extendS3\":\"\",\"extendD4\":null},\"dictValue\":\"1\",\"dictLabel\":\"优\",\"isRoot\":true,\"parentCode\":\"0\",\"isTreeLeaf\":true,\"createDate_between\":null,\"createDate_lte\":null,\"updateDate_between\":null,\"createDate_gte\":null,\"updateDate_lte\":null,\"updateDate_gte\":null,\"status_in\":null,\"id_in\":null},{\"orderBy\":null,\"isNewRecord\":false,\"id\":\"1295887639296516096\",\"pageSize\":null,\"pageNo\":null,\"createByName\":null,\"createDate\":\"2020-08-19 08:57\",\"status\":\"0\",\"updateBy\":\"system\",\"updateDate\":\"2020-08-19 08:57\",\"lastUpdateDateTime\":null,\"updateByName\":null,\"remarks\":\"黄色\",\"createBy\":\"system\",\"parentCodes\":\"0,\",\"treeSorts\":\"0000000060,\",\"isQueryChildren\":null,\"treeLevel\":0,\"childList\":null,\"treeLeaf\":\"1\",\"treeSort\":60,\"treeNames\":\"良\",\"description\":\"51~100\",\"isSys\":\"1\",\"dictCode\":\"1295887639296516096\",\"dictLabelOrig\":\"良\",\"dictType\":\"air_quality_index\",\"cssClass\":\"\",\"cssStyle\":\"\",\"extend\":{\"extendF1\":null,\"extendS1\":\"\",\"extendS8\":\"\",\"extendS4\":\"\",\"extendS2\":\"\",\"extendF3\":null,\"extendD2\":null,\"extendS7\":\"\",\"extendF4\":null,\"extendI4\":null,\"extendF2\":null,\"extendI3\":null,\"extendS5\":\"\",\"extendD3\":null,\"extendS6\":\"\",\"extendI2\":null,\"extendI1\":null,\"extendD1\":null,\"extendS3\":\"\",\"extendD4\":null},\"dictValue\":\"2\",\"dictLabel\":\"良\",\"isRoot\":true,\"parentCode\":\"0\",\"isTreeLeaf\":true,\"createDate_between\":null,\"createDate_lte\":null,\"updateDate_between\":null,\"createDate_gte\":null,\"updateDate_lte\":null,\"updateDate_gte\":null,\"status_in\":null,\"id_in\":null},{\"orderBy\":null,\"isNewRecord\":false,\"id\":\"1295887877545566208\",\"pageSize\":null,\"pageNo\":null,\"createByName\":null,\"createDate\":\"2020-08-19 08:58\",\"status\":\"0\",\"updateBy\":\"system\",\"updateDate\":\"2020-08-19 08:58\",\"lastUpdateDateTime\":null,\"updateByName\":null,\"remarks\":\"橙色\",\"createBy\":\"system\",\"parentCodes\":\"0,\",\"treeSorts\":\"0000000090,\",\"isQueryChildren\":null,\"treeLevel\":0,\"childList\":null,\"treeLeaf\":\"1\",\"treeSort\":90,\"treeNames\":\"轻度污染\",\"description\":\"101~150\",\"isSys\":\"1\",\"dictCode\":\"1295887877545566208\",\"dictLabelOrig\":\"轻度污染\",\"dictType\":\"air_quality_index\",\"cssClass\":\"\",\"cssStyle\":\"\",\"extend\":{\"extendF1\":null,\"extendS1\":\"\",\"extendS8\":\"\",\"extendS4\":\"\",\"extendS2\":\"\",\"extendF3\":null,\"extendD2\":null,\"extendS7\":\"\",\"extendF4\":null,\"extendI4\":null,\"extendF2\":null,\"extendI3\":null,\"extendS5\":\"\",\"extendD3\":null,\"extendS6\":\"\",\"extendI2\":null,\"extendI1\":null,\"extendD1\":null,\"extendS3\":\"\",\"extendD4\":null},\"dictValue\":\"3\",\"dictLabel\":\"轻度污染\",\"isRoot\":true,\"parentCode\":\"0\",\"isTreeLeaf\":true,\"createDate_between\":null,\"createDate_lte\":null,\"updateDate_between\":null,\"createDate_gte\":null,\"updateDate_lte\":null,\"updateDate_gte\":null,\"status_in\":null,\"id_in\":null},{\"orderBy\":null,\"isNewRecord\":false,\"id\":\"1295888088141570048\",\"pageSize\":null,\"pageNo\":null,\"createByName\":null,\"createDate\":\"2020-08-19 08:59\",\"status\":\"0\",\"updateBy\":\"system\",\"updateDate\":\"2020-08-19 08:59\",\"lastUpdateDateTime\":null,\"updateByName\":null,\"remarks\":\"红色\",\"createBy\":\"system\",\"parentCodes\":\"0,\",\"treeSorts\":\"0000000120,\",\"isQueryChildren\":null,\"treeLevel\":0,\"childList\":null,\"treeLeaf\":\"1\",\"treeSort\":120,\"treeNames\":\"中度污染\",\"description\":\"151~200\",\"isSys\":\"1\",\"dictCode\":\"1295888088141570048\",\"dictLabelOrig\":\"中度污染\",\"dictType\":\"air_quality_index\",\"cssClass\":\"\",\"cssStyle\":\"\",\"extend\":{\"extendF1\":null,\"extendS1\":\"\",\"extendS8\":\"\",\"extendS4\":\"\",\"extendS2\":\"\",\"extendF3\":null,\"extendD2\":null,\"extendS7\":\"\",\"extendF4\":null,\"extendI4\":null,\"extendF2\":null,\"extendI3\":null,\"extendS5\":\"\",\"extendD3\":null,\"extendS6\":\"\",\"extendI2\":null,\"extendI1\":null,\"extendD1\":null,\"extendS3\":\"\",\"extendD4\":null},\"dictValue\":\"4\",\"dictLabel\":\"中度污染\",\"isRoot\":true,\"parentCode\":\"0\",\"isTreeLeaf\":true,\"createDate_between\":null,\"createDate_lte\":null,\"updateDate_between\":null,\"createDate_gte\":null,\"updateDate_lte\":null,\"updateDate_gte\":null,\"status_in\":null,\"id_in\":null},{\"orderBy\":null,\"isNewRecord\":false,\"id\":\"1295888348410716160\",\"pageSize\":null,\"pageNo\":null,\"createByName\":null,\"createDate\":\"2020-08-19 09:00\",\"status\":\"0\",\"updateBy\":\"system\",\"updateDate\":\"2020-08-19 09:00\",\"lastUpdateDateTime\":null,\"updateByName\":null,\"remarks\":\"紫色\",\"createBy\":\"system\",\"parentCodes\":\"0,\",\"treeSorts\":\"0000000150,\",\"isQueryChildren\":null,\"treeLevel\":0,\"childList\":null,\"treeLeaf\":\"1\",\"treeSort\":150,\"treeNames\":\"重度污染\",\"description\":\"201~300\",\"isSys\":\"1\",\"dictCode\":\"1295888348410716160\",\"dictLabelOrig\":\"重度污染\",\"dictType\":\"air_quality_index\",\"cssClass\":\"\",\"cssStyle\":\"\",\"extend\":{\"extendF1\":null,\"extendS1\":\"\",\"extendS8\":\"\",\"extendS4\":\"\",\"extendS2\":\"\",\"extendF3\":null,\"extendD2\":null,\"extendS7\":\"\",\"extendF4\":null,\"extendI4\":null,\"extendF2\":null,\"extendI3\":null,\"extendS5\":\"\",\"extendD3\":null,\"extendS6\":\"\",\"extendI2\":null,\"extendI1\":null,\"extendD1\":null,\"extendS3\":\"\",\"extendD4\":null},\"dictValue\":\"5\",\"dictLabel\":\"重度污染\",\"isRoot\":true,\"parentCode\":\"0\",\"isTreeLeaf\":true,\"createDate_between\":null,\"createDate_lte\":null,\"updateDate_between\":null,\"createDate_gte\":null,\"updateDate_lte\":null,\"updateDate_gte\":null,\"status_in\":null,\"id_in\":null},{\"orderBy\":null,\"isNewRecord\":false,\"id\":\"1295888664791261184\",\"pageSize\":null,\"pageNo\":null,\"createByName\":null,\"createDate\":\"2020-08-19 09:01\",\"status\":\"0\",\"updateBy\":\"system\",\"updateDate\":\"2020-08-19 09:01\",\"lastUpdateDateTime\":null,\"updateByName\":null,\"remarks\":\"褐红色\",\"createBy\":\"system\",\"parentCodes\":\"0,\",\"treeSorts\":\"0000000180,\",\"isQueryChildren\":null,\"treeLevel\":0,\"childList\":null,\"treeLeaf\":\"1\",\"treeSort\":180,\"treeNames\":\"严重污染\",\"description\":\"＞300\",\"isSys\":\"1\",\"dictCode\":\"1295888664791261184\",\"dictLabelOrig\":\"严重污染\",\"dictType\":\"air_quality_index\",\"cssClass\":\"\",\"cssStyle\":\"\",\"extend\":{\"extendF1\":null,\"extendS1\":\"\",\"extendS8\":\"\",\"extendS4\":\"\",\"extendS2\":\"\",\"extendF3\":null,\"extendD2\":null,\"extendS7\":\"\",\"extendF4\":null,\"extendI4\":null,\"extendF2\":null,\"extendI3\":null,\"extendS5\":\"\",\"extendD3\":null,\"extendS6\":\"\",\"extendI2\":null,\"extendI1\":null,\"extendD1\":null,\"extendS3\":\"\",\"extendD4\":null},\"dictValue\":\"6\",\"dictLabel\":\"严重污染\",\"isRoot\":true,\"parentCode\":\"0\",\"isTreeLeaf\":true,\"createDate_between\":null,\"createDate_lte\":null,\"updateDate_between\":null,\"createDate_gte\":null,\"updateDate_lte\":null,\"updateDate_gte\":null,\"status_in\":null,\"id_in\":null}]}"}
            let data = JSON.parse(res.message);
            let {
                weather,
                highTemperature,
                lowTemperature,
                illuminance,
                rainfall,
                windDirection,
                aqi,
                weatherImagePath,
                temperature,
                humidity,
            } = data.metar;
            this.weather = weather;
            this.highTemperature = highTemperature;
            this.lowTemperature = lowTemperature;
            this.illuminance = illuminance;
            this.rainfall = rainfall;
            this.windDirection = windDirection;
            this.aqi = aqi;
            this.weatherImagePath = weatherImagePath;
            this.temperature = temperature;
            this.humidity = humidity;
            // metar	气象信息对象
            // weather	天气
            // highTemperature	最高温度
            // lowTemperature	最低温度
            // illuminance	照度
            // rainfall	雨量
            // windDirection	风向
            // aqi	空气质量指数值
            // weatherImagePath	天气图片地址
            // airList	空气质量指数信息对象
            // description	空气质量指数值范围
            // dictLabel	空气质量指数类别
            // remarks	空气质量指数颜色
            this.getAqiData(data.airList, aqi);
        },
        getAqiData(data, aqi) {
            for (let i = 0; i < data.length; i++) {
                const item = data[i];
                let description = item.description.split("~");
                if (description.length == 1) {
                    this.btnBgindex = i;
                    this.apiName = item.dictLabel;
                } else {
                    let min = description[0];
                    let max = description[1];
                    if (min <= aqi && aqi <= max) {
                        this.btnBgindex = i;
                        this.apiName = item.dictLabel;
                        return;
                    }
                }
            }
        },
        async getT1Duty() {
            // let res = {
            //     result: "true",
            //     message:
            //         '{"emcDutyPhone":"13888886eee868","t1DutyList":[{"pageNo":null,"orderBy":null,"isNewRecord":false,"pageSize":null,"id":"1296331931154653184","status":null,"remarks":null,"createByName":null,"createDate":null,"updateDate":null,"lastUpdateDateTime":null,"updateBy":null,"createBy":null,"updateByName":null,"dutyId":"1296331931154653184","userCode":"user15_1g7d","userName":"用户15","tier":2,"avatar":"http://192.168.1.10/smartEnergy/userfiles/avatar/0/employee/user15_1g7d.jpg","status_in":null,"createDate_gte":null,"createDate_lte":null,"updateDate_lte":null,"createDate_between":null,"updateDate_between":null,"updateDate_gte":null,"id_in":null}],"totalDutyPhone":"021-24348742"}',
            // };
            let [res] = await getT1Duty();
            let data = JSON.parse(res.message);
            this.totalDutyPhone = data.totalDutyPhone;
            this.emcDutyPhone = data.emcDutyPhone;
            let t1DutyList = data.t1DutyList;
            let arr1 = [],
                arr2 = [];
            t1DutyList.forEach((item) => {
                if (item.tier == 1) {
                    arr1.push({
                        userName: item.userName,
                        avatar: item.avatar,
                    });
                }
                if (item.tier == 2) {
                    arr2.push({
                        userName: item.userName,
                        avatar: item.avatar,
                    });
                }
            });
            this.arr1 = arr1;
            this.arr2 = arr2;
            this.arr1.splice();
            this.arr2.splice();
        },
        showTime() {
            var now = new Date();
            var year = now.getFullYear();
            var month = now.getMonth() + 1;
            var day = now.getDate();
            var hours = now.getHours();
            var minutes = now.getMinutes();
            var seconds = now.getSeconds();
            var dd = now.getDay();
            var d = [
                "星期日",
                "星期一",
                "星期二",
                "星期三",
                "星期四",
                "星期五",
                "星期六",
            ];
            this.date.day = `${year}-${String(month).padStart(2, "0")}-${String(
                day
            ).padStart(2, "0")}`;
            this.date.time = `${String(hours).padStart(2, "0")}:${String(
                minutes
            ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
            this.date.week = `${d[dd]}`;
            var timeID = setTimeout(this.showTime, 1000);
        },
        //能源保障系统
        openDialog() {
          this.isShow = true;
        },
        closeDialog() {
          this.isShow = false;
        },
        async getEnergySecurity() {
            let params = {
                pageNo: 1,
                pageSize: 10,
            };
            let res = await getEnergySecurity(params);
            let data = res.data;
            this.count = data.count;
        },
    },
    computed: {},
};
</script>

<style lang="scss" scoped>
.panel {
    width: 535.5px;
    height: 238.5px;
    position: relative;
    display: flex;
    justify-content: space-between;
    color: #72a4ff;
}
.left-panel {
    width: 223px;
    height: 100%;
    padding: 0 0 10px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .info-top {
        position: relative;
        display: flex;
        justify-content: center;
        .info-content {
            position: relative;
        }
    }
    .info-bottom {
        .info {
            height: 71px;
            display: flex;
            color: #fff;
            .left {
                width: 115px;
                height: 100%;
                font-size: 18px;
                text-align: center;
                display: flex;
                flex-direction: column;
                align-items: center;
                .name {
                    width: 100%;
                    font-size: 14px;
                    margin-left: 10px;
                    line-height: 26px;
                }
                .btn {
                    width: 100px;
                    height: 28px;
                    border-radius: 5px;
                    text-align: center;
                    line-height: 28px;
                    margin-top: 7.5px;
                    cursor: pointer;
                    font-size: 14px;
                }
            }
            .right {
                span {
                    display: inline-block;
                    height: 100%;
                    line-height: 71px;
                }
                .max {
                    font-size: 48px;
                    vertical-align: bottom;
                    width: 75px;
                    text-align: center;
                }
                .unit {
                    font-size: 18px;
                    vertical-align: bottom;
                }
            }
        }
    }
}
.right-panel {
    width: 285px;
    height: 100%;
    margin-right: 14.5px;
    .time-box {
        font-size: 18px;
        height: 38.5px;
        line-height: 38.5px;
        display: flex;
        justify-content: space-between;
        color: #fff;
    }
    .weather-box {
        width: 100%;
        height: 190px;
        border: 1px solid #4f85ff;
        border-radius: 5px;
        box-shadow: 1px 1px 17.5px rgba(88, 185, 255, 0.41) inset;
        padding: 13px 0 0 13px;
    }
    .weather-top {
        display: flex;
        justify-content: space-between;
        span {
            display: inline-block;
        }
        .img-box {
            width: 62.5px;
            height: 52px;
            border: 1px solid #4f85ff;
            border-radius: 4px;
            background: rgba(119, 161, 255, 0.14);
            overflow: hidden;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .temperature {
            font-size: 28px;
            margin-left: 23.5px;
        }
        div:nth-child(2) {
            height: 50px;
            width: 120px;
            border-left: 3px solid #72a4ff;
            margin-top: 2px;
            display: flex;
            flex-direction: column;
            padding-left: 8px;
            span {
                font-size: 20px;
            }
            span:nth-child(1) {
                font-size: 20px;
            }
        }
    }
    .weather-bottom {
        font-size: 20px;
        display: flex;
        line-height: 20px;
        .marginTop15 {
            margin-top: 13px;
        }
        .weather-left {
        }
        .weather-right {
            margin-left: 16.5px;
        }
        .btn {
            display: inline-block;
            width: 109px;
            height: 28px;
            border-radius: 5px;
            color: #000;
            text-align: center;
            line-height: 28px;
            font-size: 16px;
        }
    }
}

.userImg {
    width: 100%;
    height: 38px;
}
.username {
    width: 100%;
    text-align: center;
    font-size: 10px;
    line-height: 12px;
}
.top-box {
    margin-top: 15.5px;
    height: 50px;
    .content {
        position: relative;
    }
    .item {
        width: 40px;
        height: 50px;
        box-shadow: 1px 1px 14px 0px rgba(88, 185, 255, 0.41);
        border-radius: 4px;
        border: 1px solid #4f85ff;
        filter: blur(0px);
        position: absolute;
        &::after {
            position: absolute;
            content: "";
            height: 10px;
            width: 1px;
            background: #4f85ff;
            left: 50%;
            transform: translateX(-50%);
            bottom: -11px;
        }
    }
}
.two-box {
    margin-top: 10px;
    .content {
        height: 60px;
        padding-top: 10px;
        border-top: 1px solid #4f85ff;
        position: relative;
    }
    .item-child {
        width: 40px;
        height: 50px;
        box-shadow: 1px 1px 14px 0px rgba(88, 185, 255, 0.41);
        border-radius: 4px;
        border: 1px solid #4f85ff;
        filter: blur(0px);
        position: absolute;
        &::after {
            position: absolute;
            content: "";
            height: 10px;
            width: 1px;
            background: #4f85ff;
            left: 50%;
            transform: translateX(-50%);
            top: -11px;
        }
    }
}

.process0 {
    .top-box {
        .content {
            width: 40px;
            .item::after {
                display: none;
            }
        }
    }
}

.process1 {
    .top-box {
        .content {
            width: 40px;
        }
    }
    .two-box {
        .content {
            border-top: none !important;
        }
    }
}
.process2 {
    .top-box {
        .content {
            width: 90px;
            .item {
                left: 25.5px;
            }
        }
    }
    .two-box {
        .content {
            width: 90px;
            .item-child:nth-child(1) {
                left: -19.5px;
            }
            .item-child:last-child {
                right: -19.5px !important;
            }
        }
    }
}
.process3 {
    .top-box {
        .content {
            width: 90px;
            .item {
                left: 25.5px;
            }
        }
    }
    .two-box {
        .content {
            width: 90px;
            .item-child:nth-child(1) {
                left: -19.5px;
            }
            .item-child:nth-child(2) {
                left: 25.5px;
            }
            .item-child:last-child {
                right: -19.5px !important;
            }
        }
    }
}
.process4 {
    .top-box {
        .content {
            width: 135px;
            .item {
                left: 48.5px;
            }
        }
    }
    .two-box {
        .content {
            width: 135px;
            .item-child:nth-child(1) {
                left: -19.5px;
            }
            .item-child:nth-child(2) {
                left: 25.5px;
            }
            .item-child:nth-child(3) {
                left: 70.5px;
            }
            .item-child:last-child {
                right: -19.5px !important;
            }
        }
    }
}
.process5 {
    .top-box {
        .content {
            width: 180px;
            .item {
                left: 70.5px;
            }
        }
    }
    .two-box {
        .content {
            width: 180px;
            .item-child:nth-child(1) {
                left: -19.5px;
            }
            .item-child:nth-child(2) {
                left: 25.5px;
            }
            .item-child:nth-child(3) {
                left: 70.5px;
            }
            .item-child:nth-child(4) {
                left: 115.5px;
            }
            .item-child:last-child {
                right: -19.5px !important;
            }
        }
    }
}
</style>
