<!-- 左侧顶部信息 -->
<template>
    <div class="panel left-container-angle">
        <div class="left-panel">
            <div class="info-top"></div>
            <div class="info-bottom">
                <div>
                    <span>总值班电话：</span>
                    <span>13888886868</span>
                </div>
                <div>
                    <span>EMC电话：</span>
                    <span>13888886868</span>
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
                        <span class="btn marginTop15" :style="{ background: colorArr[btnBgindex] }">轻度污染</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {getMetaInfo} from "../../../axios"
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
            btnBgindex: 0
        }
    },
    created() {
        this.showTime();
        this.getData()
    },
    methods:{
        async getData() {
            let [res] = await getMetaInfo();
            let data = JSON.parse(res.message);
            console.log('resfffffffff', data);
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
            this.getAqiData(data.airList,aqi)

        },
        getAqiData(data,aqi) {
            
            for (let i = 0; i < data.length; i++) {
                const item = data[i];
                let description = item.description.split("~");
                if(description.length == 1 ) {
                    this.btnBgindex = i;
                }else {
                    let min = description[0];
                    let max = description[1];
                    if( min <= aqi && aqi <= max  ) {
                        this.btnBgindex = i;
                        return;
                    }
                }
            }
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
        width: 50px;
        height: 50px;
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
</style>
