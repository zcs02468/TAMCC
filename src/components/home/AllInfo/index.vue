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
                <span>2020-07-27</span>
                <span>09:15:55</span>
                <span>星期一</span>
            </div>
            <div class="weather-box">
                <div class="weather-top">
                    <div>
                        <span class="img-box"></span>
                        <span class="temperature">35℃</span>
                    </div>
                    <div>
                        <span>晴</span>
                        <span>25～35℃</span>
                    </div>
                </div>
                <div class="weather-bottom">
                    <div class="weather-left">
                        <div>湿度：55%</div>
                        <div class="marginTop15">雨量：0mm</div>
                        <div class="marginTop15">AQI：130</div>
                    </div>
                    <div class="weather-right">
                        <div>照度：20klux</div>
                        <div class="marginTop15">风向：正北</div>
                        <span class="btn marginTop15">轻度污染</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {};
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
            background: #f2a625;
            color: #000;
            text-align: center;
            line-height: 28px;
            font-size: 16px;
        }
    }
}
</style>
