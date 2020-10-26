<!-- 左侧顶部信息 -->
<template>
    <div class="panel left-container-angle">
        <div class="left-panel">
            <div class="info-top">
               <div class="info-content" :class="[ `process${ arr2.length }` ]">
                    <div class="top-box">
                        <div class="content">
                            <div class="item">
                                <img class="userImg" :src="arr1[0] ? arr1[0].avatar : ''">
                                <div class="username">{{arr1[0] ? arr1[0].userName : ''}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="two-box">
                        <div class="content">
                            <div class="item-child" v-for="(item,i) in arr2" :key="i">
                                <img class="userImg" :src="item.avatar">
                                <div class="username">{{item.userName}}</div>
                            </div>
                        </div>
                    </div>
               </div>
                <!-- <div class="content-box"></div>
                <div class="top-box">
                    <div class="item">
                        <div class="img-box" :style="{ backgroundImage: `url('${arr1[0] ? arr1[0].avatar : ''}')` }"></div>
                        <div>{{arr1[0].userName}}</div>
                    </div>
                </div>
                <div class="two-box">
                    <div class="child-item">
                        <div class="img-box" :style="{ backgroundImage: `url('${arr2[0] ? arr2[0].avatar : ''}')` }"></div>
                        <div>{{arr2[0] ? arr2[0].userName : ''}}</div>
                    </div>
                    <div class="child-item">
                        <div class="img-box" :style="{ backgroundImage: `url('${arr2[1] ? arr2[1].avatar : ''}')` }"></div>
                        <div>{{arr2[1] ? arr2[1].userName : ''}}</div>
                    </div>
                </div>
                <div class="three-box">
                    <div class="child-item"></div>
                    <div class="child-item"></div>
                    <div class="child-item"></div>
                    <div class="child-item"></div>
                    <div class="child-item"></div>
                </div> -->
            </div>
            <div class="info-bottom">
                <div>
                    <span>总值班电话：</span>
                    <span>{{totalDutyPhone}}</span>
                </div>
                <div>
                    <span>EMC电话：</span>
                    <span>{{emcDutyPhone}}</span>
                </div>
            </div>
        </div>
        <div class="right-panel">
            <div class="time-box">
                <span>{{date.day}}</span>
                <span>{{date.time}}</span>
                <span>{{date.week}}</span>
            </div>
            <div class="weather-box">
                <div class="weather-top">
                    <div>
                        <span class="img-box">
                            <img :src="weatherImagePath" alt="" srcset="">
                        </span>
                        <span class="temperature">35℃</span>
                    </div>
                    <div>
                        <span>{{weather}}</span>
                        <span>{{lowTemperature}}～{{highTemperature}}℃</span>
                    </div>
                </div>
                <div class="weather-bottom">
                    <div class="weather-left">
                        <div>湿度：55%</div>
                        <div class="marginTop15">雨量：{{rainfall}}mm</div>
                        <div class="marginTop15">AQI：{{aqi}}</div>
                    </div>
                    <div class="weather-right">
                        <div>照度：{{illuminance}}klux</div>
                        <div class="marginTop15">风向：{{windDirection}}</div>
                        <span class="btn marginTop15" :style="{ background: colorArr[btnBgindex] }">{{apiName}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {getMetaInfo, getT1Duty} from "../../../axios"
import comMinxins from "../../common/comMinxins";
export default {
    data() {
        return {
            date:{
                day:'2020-07-27',
                time:'09:15:55',
                week:'星期一',
            },
            weather:null,
            highTemperature:null,
            lowTemperature:null,
            illuminance:null,
            rainfall:null,
            windDirection:null,
            aqi:null,
            weatherImagePath:null,
            colorArr:['green','yellow','orange','red','purple','#964B00'],
            btnBgindex: 0,
            apiName: '',
            totalDutyPhone: '111111111', //总值班电话
            emcDutyPhone:'2222222222',// emc电话
            arr1:[],
            arr2:[]
        }
    },
    mixins:[comMinxins],
    created() {
        this.showTime();
        this.getData();
    },
    methods:{
        updateData() {
            this.getData();
        },
        async getData() {
            let [res] = await getMetaInfo();
            // let res = {"result":"true","message":"{\"metar\":{\"pageSize\":null,\"id\":\"1297772791943258112\",\"isNewRecord\":false,\"orderBy\":null,\"pageNo\":null,\"lastUpdateDateTime\":null,\"updateBy\":null,\"status\":null,\"createDate\":null,\"updateDate\":null,\"createBy\":null,\"remarks\":null,\"updateByName\":null,\"createByName\":null,\"metarId\":\"1297772791943258112\",\"date\":\"2020-08-24\",\"weather\":\"晴\",\"highTemperature\":36.0,\"lowTemperature\":28.0,\"illuminance\":20.0,\"rainfall\":0.0,\"windDirection\":\"正北\",\"aqi\":130,\"weatherImagePath\":\"http://47.110.226.205:8980/smartEnergy/profile/1297771563383967746.jpg\",\"status_in\":null,\"createDate_lte\":null,\"createDate_gte\":null,\"updateDate_gte\":null,\"updateDate_lte\":null,\"createDate_between\":null,\"updateDate_between\":null,\"id_in\":null},\"airList\":[{\"pageSize\":null,\"id\":\"1295887375621595136\",\"isNewRecord\":false,\"orderBy\":null,\"pageNo\":null,\"lastUpdateDateTime\":null,\"updateBy\":\"system\",\"status\":\"0\",\"createDate\":\"2020-08-19 08:56\",\"updateDate\":\"2020-08-19 08:56\",\"createBy\":\"system\",\"remarks\":\"绿色\",\"updateByName\":null,\"createByName\":null,\"treeLeaf\":\"1\",\"childList\":null,\"treeLevel\":0,\"treeSorts\":\"0000000030,\",\"isQueryChildren\":null,\"parentCodes\":\"0,\",\"treeSort\":30,\"treeNames\":\"优\",\"dictCode\":\"1295887375621595136\",\"cssStyle\":\"\",\"dictType\":\"air_quality_index\",\"isSys\":\"1\",\"dictLabelOrig\":\"优\",\"extend\":{\"extendD4\":null,\"extendF4\":null,\"extendS7\":\"\",\"extendI3\":null,\"extendS1\":\"\",\"extendD3\":null,\"extendF1\":null,\"extendF2\":null,\"extendS6\":\"\",\"extendS2\":\"\",\"extendD1\":null,\"extendS5\":\"\",\"extendI1\":null,\"extendF3\":null,\"extendS8\":\"\",\"extendD2\":null,\"extendS4\":\"\",\"extendI2\":null,\"extendS3\":\"\",\"extendI4\":null},\"dictValue\":\"1\",\"description\":\"0~50\",\"cssClass\":\"\",\"dictLabel\":\"优\",\"parentCode\":\"0\",\"isRoot\":true,\"isTreeLeaf\":true,\"status_in\":null,\"createDate_lte\":null,\"createDate_gte\":null,\"updateDate_gte\":null,\"updateDate_lte\":null,\"createDate_between\":null,\"updateDate_between\":null,\"id_in\":null},{\"pageSize\":null,\"id\":\"1295887639296516096\",\"isNewRecord\":false,\"orderBy\":null,\"pageNo\":null,\"lastUpdateDateTime\":null,\"updateBy\":\"system\",\"status\":\"0\",\"createDate\":\"2020-08-19 08:57\",\"updateDate\":\"2020-08-19 08:57\",\"createBy\":\"system\",\"remarks\":\"黄色\",\"updateByName\":null,\"createByName\":null,\"treeLeaf\":\"1\",\"childList\":null,\"treeLevel\":0,\"treeSorts\":\"0000000060,\",\"isQueryChildren\":null,\"parentCodes\":\"0,\",\"treeSort\":60,\"treeNames\":\"良\",\"dictCode\":\"1295887639296516096\",\"cssStyle\":\"\",\"dictType\":\"air_quality_index\",\"isSys\":\"1\",\"dictLabelOrig\":\"良\",\"extend\":{\"extendD4\":null,\"extendF4\":null,\"extendS7\":\"\",\"extendI3\":null,\"extendS1\":\"\",\"extendD3\":null,\"extendF1\":null,\"extendF2\":null,\"extendS6\":\"\",\"extendS2\":\"\",\"extendD1\":null,\"extendS5\":\"\",\"extendI1\":null,\"extendF3\":null,\"extendS8\":\"\",\"extendD2\":null,\"extendS4\":\"\",\"extendI2\":null,\"extendS3\":\"\",\"extendI4\":null},\"dictValue\":\"2\",\"description\":\"51~100\",\"cssClass\":\"\",\"dictLabel\":\"良\",\"parentCode\":\"0\",\"isRoot\":true,\"isTreeLeaf\":true,\"status_in\":null,\"createDate_lte\":null,\"createDate_gte\":null,\"updateDate_gte\":null,\"updateDate_lte\":null,\"createDate_between\":null,\"updateDate_between\":null,\"id_in\":null},{\"pageSize\":null,\"id\":\"1295887877545566208\",\"isNewRecord\":false,\"orderBy\":null,\"pageNo\":null,\"lastUpdateDateTime\":null,\"updateBy\":\"system\",\"status\":\"0\",\"createDate\":\"2020-08-19 08:58\",\"updateDate\":\"2020-08-19 08:58\",\"createBy\":\"system\",\"remarks\":\"橙色\",\"updateByName\":null,\"createByName\":null,\"treeLeaf\":\"1\",\"childList\":null,\"treeLevel\":0,\"treeSorts\":\"0000000090,\",\"isQueryChildren\":null,\"parentCodes\":\"0,\",\"treeSort\":90,\"treeNames\":\"轻度污染\",\"dictCode\":\"1295887877545566208\",\"cssStyle\":\"\",\"dictType\":\"air_quality_index\",\"isSys\":\"1\",\"dictLabelOrig\":\"轻度污染\",\"extend\":{\"extendD4\":null,\"extendF4\":null,\"extendS7\":\"\",\"extendI3\":null,\"extendS1\":\"\",\"extendD3\":null,\"extendF1\":null,\"extendF2\":null,\"extendS6\":\"\",\"extendS2\":\"\",\"extendD1\":null,\"extendS5\":\"\",\"extendI1\":null,\"extendF3\":null,\"extendS8\":\"\",\"extendD2\":null,\"extendS4\":\"\",\"extendI2\":null,\"extendS3\":\"\",\"extendI4\":null},\"dictValue\":\"3\",\"description\":\"101~150\",\"cssClass\":\"\",\"dictLabel\":\"轻度污染\",\"parentCode\":\"0\",\"isRoot\":true,\"isTreeLeaf\":true,\"status_in\":null,\"createDate_lte\":null,\"createDate_gte\":null,\"updateDate_gte\":null,\"updateDate_lte\":null,\"createDate_between\":null,\"updateDate_between\":null,\"id_in\":null},{\"pageSize\":null,\"id\":\"1295888088141570048\",\"isNewRecord\":false,\"orderBy\":null,\"pageNo\":null,\"lastUpdateDateTime\":null,\"updateBy\":\"system\",\"status\":\"0\",\"createDate\":\"2020-08-19 08:59\",\"updateDate\":\"2020-08-19 08:59\",\"createBy\":\"system\",\"remarks\":\"红色\",\"updateByName\":null,\"createByName\":null,\"treeLeaf\":\"1\",\"childList\":null,\"treeLevel\":0,\"treeSorts\":\"0000000120,\",\"isQueryChildren\":null,\"parentCodes\":\"0,\",\"treeSort\":120,\"treeNames\":\"中度污染\",\"dictCode\":\"1295888088141570048\",\"cssStyle\":\"\",\"dictType\":\"air_quality_index\",\"isSys\":\"1\",\"dictLabelOrig\":\"中度污染\",\"extend\":{\"extendD4\":null,\"extendF4\":null,\"extendS7\":\"\",\"extendI3\":null,\"extendS1\":\"\",\"extendD3\":null,\"extendF1\":null,\"extendF2\":null,\"extendS6\":\"\",\"extendS2\":\"\",\"extendD1\":null,\"extendS5\":\"\",\"extendI1\":null,\"extendF3\":null,\"extendS8\":\"\",\"extendD2\":null,\"extendS4\":\"\",\"extendI2\":null,\"extendS3\":\"\",\"extendI4\":null},\"dictValue\":\"4\",\"description\":\"151~200\",\"cssClass\":\"\",\"dictLabel\":\"中度污染\",\"parentCode\":\"0\",\"isRoot\":true,\"isTreeLeaf\":true,\"status_in\":null,\"createDate_lte\":null,\"createDate_gte\":null,\"updateDate_gte\":null,\"updateDate_lte\":null,\"createDate_between\":null,\"updateDate_between\":null,\"id_in\":null},{\"pageSize\":null,\"id\":\"1295888348410716160\",\"isNewRecord\":false,\"orderBy\":null,\"pageNo\":null,\"lastUpdateDateTime\":null,\"updateBy\":\"system\",\"status\":\"0\",\"createDate\":\"2020-08-19 09:00\",\"updateDate\":\"2020-08-19 09:00\",\"createBy\":\"system\",\"remarks\":\"紫色\",\"updateByName\":null,\"createByName\":null,\"treeLeaf\":\"1\",\"childList\":null,\"treeLevel\":0,\"treeSorts\":\"0000000150,\",\"isQueryChildren\":null,\"parentCodes\":\"0,\",\"treeSort\":150,\"treeNames\":\"重度污染\",\"dictCode\":\"1295888348410716160\",\"cssStyle\":\"\",\"dictType\":\"air_quality_index\",\"isSys\":\"1\",\"dictLabelOrig\":\"重度污染\",\"extend\":{\"extendD4\":null,\"extendF4\":null,\"extendS7\":\"\",\"extendI3\":null,\"extendS1\":\"\",\"extendD3\":null,\"extendF1\":null,\"extendF2\":null,\"extendS6\":\"\",\"extendS2\":\"\",\"extendD1\":null,\"extendS5\":\"\",\"extendI1\":null,\"extendF3\":null,\"extendS8\":\"\",\"extendD2\":null,\"extendS4\":\"\",\"extendI2\":null,\"extendS3\":\"\",\"extendI4\":null},\"dictValue\":\"5\",\"description\":\"201~300\",\"cssClass\":\"\",\"dictLabel\":\"重度污染\",\"parentCode\":\"0\",\"isRoot\":true,\"isTreeLeaf\":true,\"status_in\":null,\"createDate_lte\":null,\"createDate_gte\":null,\"updateDate_gte\":null,\"updateDate_lte\":null,\"createDate_between\":null,\"updateDate_between\":null,\"id_in\":null},{\"pageSize\":null,\"id\":\"1295888664791261184\",\"isNewRecord\":false,\"orderBy\":null,\"pageNo\":null,\"lastUpdateDateTime\":null,\"updateBy\":\"system\",\"status\":\"0\",\"createDate\":\"2020-08-19 09:01\",\"updateDate\":\"2020-08-19 09:01\",\"createBy\":\"system\",\"remarks\":\"褐红色\",\"updateByName\":null,\"createByName\":null,\"treeLeaf\":\"1\",\"childList\":null,\"treeLevel\":0,\"treeSorts\":\"0000000180,\",\"isQueryChildren\":null,\"parentCodes\":\"0,\",\"treeSort\":180,\"treeNames\":\"严重污染\",\"dictCode\":\"1295888664791261184\",\"cssStyle\":\"\",\"dictType\":\"air_quality_index\",\"isSys\":\"1\",\"dictLabelOrig\":\"严重污染\",\"extend\":{\"extendD4\":null,\"extendF4\":null,\"extendS7\":\"\",\"extendI3\":null,\"extendS1\":\"\",\"extendD3\":null,\"extendF1\":null,\"extendF2\":null,\"extendS6\":\"\",\"extendS2\":\"\",\"extendD1\":null,\"extendS5\":\"\",\"extendI1\":null,\"extendF3\":null,\"extendS8\":\"\",\"extendD2\":null,\"extendS4\":\"\",\"extendI2\":null,\"extendS3\":\"\",\"extendI4\":null},\"dictValue\":\"6\",\"description\":\"＞300\",\"cssClass\":\"\",\"dictLabel\":\"严重污染\",\"parentCode\":\"0\",\"isRoot\":true,\"isTreeLeaf\":true,\"status_in\":null,\"createDate_lte\":null,\"createDate_gte\":null,\"updateDate_gte\":null,\"updateDate_lte\":null,\"createDate_between\":null,\"updateDate_between\":null,\"id_in\":null}]}"}
            let data = JSON.parse(res.message);
            let {weather,highTemperature,lowTemperature,illuminance,rainfall,windDirection,aqi,weatherImagePath} = data.metar;
            this.weather = weather;
            this.highTemperature = highTemperature;
            this.lowTemperature = lowTemperature;
            this.illuminance = illuminance;
            this.rainfall = rainfall;
            this.windDirection = windDirection;
            this.aqi = aqi;
            this.weatherImagePath = weatherImagePath;
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
            this.getAqiData(data.airList,aqi);
            this.getT1Duty();
            // setTimeout(()=> {
            //     this.getData();
            // },60000);
        },
        getAqiData(data,aqi) {
            for (let i = 0; i < data.length; i++) {
                const item = data[i];
                let description = item.description.split("~");
                if(description.length == 1 ) {
                    this.btnBgindex = i;
                    this.apiName = item.dictLabel;
                }else {
                    let min = description[0];
                    let max = description[1];
                    if( min <= aqi && aqi <= max  ) {
                        this.btnBgindex = i;
                        this.apiName = item.dictLabel;
                        return;
                    }
                }
            }
        },
        async getT1Duty() {
            // let res = {"result":"true","message":"{\"emcDutyPhone\":\"13888886eee868\",\"t1DutyList\":[{\"pageNo\":null,\"orderBy\":null,\"isNewRecord\":false,\"pageSize\":null,\"id\":\"1296331931154653184\",\"status\":null,\"remarks\":null,\"createByName\":null,\"createDate\":null,\"updateDate\":null,\"lastUpdateDateTime\":null,\"updateBy\":null,\"createBy\":null,\"updateByName\":null,\"dutyId\":\"1296331931154653184\",\"userCode\":\"user15_1g7d\",\"userName\":\"用户15\",\"tier\":2,\"avatar\":\"http://192.168.1.10/smartEnergy/userfiles/avatar/0/employee/user15_1g7d.jpg\",\"status_in\":null,\"createDate_gte\":null,\"createDate_lte\":null,\"updateDate_lte\":null,\"createDate_between\":null,\"updateDate_between\":null,\"updateDate_gte\":null,\"id_in\":null}],\"totalDutyPhone\":\"021-24348742\"}"}
            let [res] = await getT1Duty();
            let data = JSON.parse(res.message);
//             let data = {
//     "t1DutyList": [
//         {
//             "pageNo": null,
//             "orderBy": null,
//             "isNewRecord": false,
//             "pageSize": null,
//             "id": "1310141025229508608",
//             "status": null,
//             "remarks": null,
//             "createByName": null,
//             "createDate": null,
//             "updateDate": null,
//             "lastUpdateDateTime": null,
//             "updateBy": null,
//             "createBy": null,
//             "updateByName": null,
//             "dutyId": "1310141025229508608",
//             "userCode": "user9_gfpv",
//             "userName": "用户09",
//             "tier": 1,
//             "avatar": null,
//             "createDate_gte": null,
//             "status_in": null,
//             "createDate_between": null,
//             "createDate_lte": null,
//             "updateDate_between": null,
//             "updateDate_gte": null,
//             "updateDate_lte": null,
//             "id_in": null
//         },
//         {
//             "pageNo": null,
//             "orderBy": null,
//             "isNewRecord": false,
//             "pageSize": null,
//             "id": "1296331931154653184",
//             "status": null,
//             "remarks": null,
//             "createByName": null,
//             "createDate": null,
//             "updateDate": null,
//             "lastUpdateDateTime": null,
//             "updateBy": null,
//             "createBy": null,
//             "updateByName": null,
//             "dutyId": "1296331931154653184",
//             "userCode": "user15_1g7d",
//             "userName": "用户15",
//             "tier": 2,
//             "avatar": "http://192.168.1.10/smartEnergy/userfiles/avatar/0/employee/user15_1g7d.jpg",
//             "createDate_gte": null,
//             "status_in": null,
//             "createDate_between": null,
//             "createDate_lte": null,
//             "updateDate_between": null,
//             "updateDate_gte": null,
//             "updateDate_lte": null,
//             "id_in": null
//         },
//         {
//             "pageNo": null,
//             "orderBy": null,
//             "isNewRecord": false,
//             "pageSize": null,
//             "id": "1310141025229508608",
//             "status": null,
//             "remarks": null,
//             "createByName": null,
//             "createDate": null,
//             "updateDate": null,
//             "lastUpdateDateTime": null,
//             "updateBy": null,
//             "createBy": null,
//             "updateByName": null,
//             "dutyId": "1310141025229508608",
//             "userCode": "user9_gfpv",
//             "userName": "用户10",
//             "tier": 2,
//             "avatar": null,
//             "createDate_gte": null,
//             "status_in": null,
//             "createDate_between": null,
//             "createDate_lte": null,
//             "updateDate_between": null,
//             "updateDate_gte": null,
//             "updateDate_lte": null,
//             "id_in": null
//         },
//         {
//             "pageNo": null,
//             "orderBy": null,
//             "isNewRecord": false,
//             "pageSize": null,
//             "id": "1310141025229508608",
//             "status": null,
//             "remarks": null,
//             "createByName": null,
//             "createDate": null,
//             "updateDate": null,
//             "lastUpdateDateTime": null,
//             "updateBy": null,
//             "createBy": null,
//             "updateByName": null,
//             "dutyId": "1310141025229508608",
//             "userCode": "user9_gfpv",
//             "userName": "用户11",
//             "tier": 2,
//             "avatar": null,
//             "createDate_gte": null,
//             "status_in": null,
//             "createDate_between": null,
//             "createDate_lte": null,
//             "updateDate_between": null,
//             "updateDate_gte": null,
//             "updateDate_lte": null,
//             "id_in": null
//         },
//         {
//             "pageNo": null,
//             "orderBy": null,
//             "isNewRecord": false,
//             "pageSize": null,
//             "id": "1310141025229508608",
//             "status": null,
//             "remarks": null,
//             "createByName": null,
//             "createDate": null,
//             "updateDate": null,
//             "lastUpdateDateTime": null,
//             "updateBy": null,
//             "createBy": null,
//             "updateByName": null,
//             "dutyId": "1310141025229508608",
//             "userCode": "user9_gfpv",
//             "userName": "用户12",
//             "tier": 2,
//             "avatar": null,
//             "createDate_gte": null,
//             "status_in": null,
//             "createDate_between": null,
//             "createDate_lte": null,
//             "updateDate_between": null,
//             "updateDate_gte": null,
//             "updateDate_lte": null,
//             "id_in": null
//         },
//         {
//             "pageNo": null,
//             "orderBy": null,
//             "isNewRecord": false,
//             "pageSize": null,
//             "id": "1310141025229508608",
//             "status": null,
//             "remarks": null,
//             "createByName": null,
//             "createDate": null,
//             "updateDate": null,
//             "lastUpdateDateTime": null,
//             "updateBy": null,
//             "createBy": null,
//             "updateByName": null,
//             "dutyId": "1310141025229508608",
//             "userCode": "user9_gfpv",
//             "userName": "用户13",
//             "tier": 2,
//             "avatar": null,
//             "createDate_gte": null,
//             "status_in": null,
//             "createDate_between": null,
//             "createDate_lte": null,
//             "updateDate_between": null,
//             "updateDate_gte": null,
//             "updateDate_lte": null,
//             "id_in": null
//         }
//     ],
//     "totalDutyPhone": "021-24348742"
// }
            // console.log(data,"adskfkaljfklajsflkj" );
            this.totalDutyPhone = data.totalDutyPhone;
            this.emcDutyPhone = data.emcDutyPhone;
            let t1DutyList = data.t1DutyList;
            let arr1 = [], arr2 = [];
            t1DutyList.forEach(item => {
                if( item.tier == 1 ) {
                    arr1.push({
                        userName: item.userName,
                        avatar: item.avatar
                    })
                }
                if( item.tier == 2 ) {
                    arr2.push({
                        userName: item.userName,
                        avatar: item.avatar
                    })
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
            var d = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
            this.date.day = `${year}-${String(month).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
            this.date.time = `${String(hours).padStart(2,"0")}:${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;
            this.date.week = `${d[dd]}`;
            var timeID = setTimeout(this.showTime, 1000);
        },
    },
    computed:{
    }
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
        // width: 50px;
        // height: 50px;
        position: relative;
            display: flex;
            justify-content: center;
        .info-content {
            position: relative;
        }
    }
    .info-bottom {
        font-size: 16px;
        div {
            span {
                display: inline-block;
                height: 20px;
                line-height: 20px;
            }
            span:nth-child(1) {
                width: 108px;
                text-align: right;
            }
        }
        div:nth-child(2) {
            margin-top: 6px;
        }
    }
}
.right-panel {
    width: 285px;
    height: 100%;
    // display: flex;
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
            img{
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
            // background: #f2a625;
            color: #000;
            text-align: center;
            line-height: 28px;
            font-size: 16px;
        }
    }
}




















// w362  h201
// .content-box {
//     width: 181px;
//     height: 100.5px;
//     background: url("../../../assets/image/border.png");
//     background-size: 100% 100%;
//     position: absolute;
//     top: 64px;
//     left: 23px;
// }



// .top-box {
//     display: flex;
//     justify-content: center;
//     margin-top: 15.5px;
// }
// .two-box {
//     display: flex;
//     justify-content: space-between;
//     margin-top: 20px;
//     .child-item:nth-child(1){
//         margin-left: 29px;
//     }
//     .child-item:nth-child(2){
//         margin-right: 45px;
//     }
// }
// .three-box {
//     display: flex;
//     margin-top: 18px;
//     justify-content: center;
//     .child-item{
//         margin-left: 5px;
//     }
//     .child-item:nth-child(1) {
//         margin-left: 2px;
//     }
// }
// .item {
//     width: 40px;
//     height: 50px;
//     box-shadow: 1px 1px 14px 0px rgba(88, 185, 255, 0.41);
//     border-radius: 4px;
//     border: 1px solid #4F85FF;
//     filter: blur(0px);
//     margin-left: -18px;
//     background: #081b44;
//     .img-box {
//         width: 100%;
//         height: 38px;    
//         background-position: 50%;
//         background-repeat: no-repeat;
//         background-size: cover;
//     }
//     div {
//         font-size: 10px;
//     }
// }
// .child-item {
//     width: 40px;
//     height: 30px;
//     box-shadow: 1px 1px 14px 0px rgba(88, 185, 255, 0.41);
//     border-radius: 4px;
//     border: 1px solid #4F85FF;
//     filter: blur(0px);
//     background: #081b44;
//     .img-box {
//         width: 100%;
//         height: 18px;    
//         background-position: 50%;
//         background-repeat: no-repeat;
//         background-size: cover;
//     }
//     div {
//         font-size: 10px;
//     }
// }



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
    // width: 180px;
    position: relative;
  }
  .item {
    width: 40px;
    height: 50px;
    box-shadow: 1px 1px 14px 0px rgba(88, 185, 255, 0.41);
    border-radius: 4px;
    border: 1px solid #4F85FF;
    filter: blur(0px);
    // margin-left: 91.5px;
    // background: #081b44;
    position: absolute;
    // left: 70.5px;
    &::after {
      position: absolute;
      content: '';
      height: 10px;
      width: 1px;
      background: #4F85FF;
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
    border-top: 1px solid  #4F85FF;
    // width: 180px;
    // width: 135px;
    // width: 90px;
    // width: 45px;
    // width: 40px;
    position: relative;
  }
  .item-child {
    width: 40px;
    height: 50px;
    box-shadow: 1px 1px 14px 0px rgba(88, 185, 255, 0.41);
    border-radius: 4px;
    border: 1px solid #4F85FF;
    filter: blur(0px);
    position: absolute;
    &::after {
      position: absolute;
      content: '';
      height: 10px;
      width: 1px;
      background:  #4F85FF;
      left: 50%;
      transform: translateX(-50%);
      top: -11px;
    }
  }
}




.process0 {
  .top-box{
    .content {
      width: 40px;
      .item::after {
        display: none;
      }
    }
  }
}

.process1 {
  .top-box{
    .content {
      width: 40px;
    }
  }
  .two-box{
    .content {
      border-top: none !important;
    }
  }
}
.process2 {
  .top-box{
    .content {
      width: 90px;
      .item{
        left: 25.5px;
      }
    }
  }
  .two-box{
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
  .top-box{
    .content {
      width: 90px;
      .item{
        left: 25.5px;
      }
    }
  }
  .two-box{
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
  .top-box{
    .content {
      width: 135px;
      .item{
        left: 48.5px;
      }
    }
  }
  .two-box{
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
  .top-box{
    .content {
      width: 180px;
      .item{
        left: 70.5px;
      }
    }
  }
  .two-box{
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
