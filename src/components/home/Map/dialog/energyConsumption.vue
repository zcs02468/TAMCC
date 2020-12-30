<!-- T1航站楼能耗指标 -->
<template>
    <div class="panel right-container-angle">
        <div class="title" @click="closeMapDialog">T1航站楼能耗指标</div>
        <div class="box">
            <div class="radar-charts-box">
                <div class="charts" id="energy_consumption_radar1"></div>
                <div class="options-box">
                    <div v-for="(item) in options" :key="item.key">
                        <span class="options-key">{{item.key}}:</span>
                        <span>{{item.value}}</span>
                    </div>
                </div>
                <div class="direction-box" :style="`${directionStyle}`" v-show="isShowDirection">
                    <div class="direction-left">
                        <div style="opacity:0">111</div>
                        <div v-for="(item) in radarIndicator" :key="item.name">{{item.name}}</div>
                    </div>
                    <div class="direction-center">
                        <div>指标值</div>
                        <div v-for="(item) in quotaArr" :key="item">{{item}}</div>
                    </div>
                    <div class="direction-right">
                        <div>实际值</div>
                        <div v-for="(item) in factArr" :key="item">{{item}}</div>
                    </div>
                </div>
            </div>
            <div class="line-charts-box">
                <div class="charts" id="energy_consumption_line1"></div>
            </div>
        </div>
    </div>
</template>

<script>
import {getEnergyIndex} from "@/axios"
import comMinxins from "@/components/common/comMinxins.js"
import {mapMutations} from "vuex"
// import energyConsumption from "@/json/energyConsumption.json"
export default {
    mixins:[ comMinxins ],
    data() {
        return {
            radarIndicator: [],
            quotaArr:[],
            factArr:[],
            directionStyle:``,
            isShowDirection: false,
            options:[]
        }
    },
    mounted() {
        this.drawRadarCharts();
        this.drawLineCharts();
        this.getData();
    },
    methods: {
        ...mapMutations(['closeMapDialog']),
        updateData() {
            this.getData();
        },
        async getData() {
            let [res] = await getEnergyIndex();
            // let res = energyConsumption;
            let {quotaList,realisticList} = JSON.parse( res.message );
            let {radarIndicator,radarChartsSeries0,radarChartsSeries1,quotaArr,factArr} = this.getRadarChartsData(quotaList);
            //新增
            //获取数组最大值
            let maxNum = Math.max(...radarChartsSeries1);
            if( maxNum < 100 ) {
                maxNum = 100;
            }
            radarIndicator.forEach(item => {
                item.max = maxNum + 20
            })

            this.radarOption.series[0].data[0].value = radarChartsSeries0;
            this.radarOption.series[0].data[1].value = radarChartsSeries1;
            this.radarOption.radar[0].indicator = radarIndicator;
            this.radarIndicator = radarIndicator;
            this.quotaArr = quotaArr;
            this.factArr = factArr;
            this.radarIndicator.splice();
            this.quotaArr.splice();
            this.factArr.splice();
            this.myRadarChart.setOption(this.radarOption);

            let {xAxisLine,yAxisLine} = this.getLineChartsData(realisticList,radarIndicator);
            this.lineOption.xAxis[0].data = xAxisLine;
            let index = 0;
            let series = [];
            for (const key in yAxisLine) {
                if (yAxisLine.hasOwnProperty(key)) {
                    const element = yAxisLine[key];
                    series.push( this.getSeriesData( key, element ) );
                    index++;
                }
            }
            this.lineOption.series = series;
            this.myLineChart.setOption(this.lineOption);
        },
        getRadarChartsData(data) {
            let radarChartsSeries0 = [];
            let radarChartsSeries1 = [];
            let radarIndicator = [];
            let quotaArr = [];
            let factArr = [];
            let options = [];
            data.forEach(item => {
                // radarChartsSeries0.push(item.quotaValue);
                // radarChartsSeries1.push(item.factValue);
                // radarIndicator.push({
                //     name: item.quotaKey,
                //     min: 0,
                // })
                quotaArr.push( item.quotaValue );
                factArr.push( item.factValue );
                options.push({
                    key: item.quotaKey,
                    value: item.quotaName
                })
                let num = Math.round((item.factValue/item.quotaValue) * 1000) / 1000;
                radarChartsSeries0.push(100);
                radarChartsSeries1.push(num*100);
                radarIndicator.push({
                    name: item.quotaKey,
                    min: 0,
                })
            });
            this.options = options;
            this.options.splice();
            return {radarIndicator,radarChartsSeries0,radarChartsSeries1,quotaArr,factArr};
        },
        getLineChartsData(data,radarIndicator) {
            let xArr = []
            let obj = {}
            data.forEach(item => {
                if( !obj[item.quotaKey] ) {
                    obj[item.quotaKey] = []
                }
                xArr.unshift(item.collectionDate)
                obj[item.quotaKey].unshift(item.realisticValue)
            });
            let xAxis = [...new Set(xArr)];
            return {
                yAxisLine: obj,
                xAxisLine: xAxis
            }
        },
        drawRadarCharts() {
            this.radarOption = {
                color: ["#385CA5", "RGBA(189, 26, 26, 1)"],
                legend: {
                    data: ["指标值", "实际值"],
                    orient: "vertical",
                    selectedMode:false,
                    // icon: "circle",
                    // left: "10%",
                    // top: "6%",
                    right:"6%",
                    top:0,
                    itemWidth: 10,
                    itemHeight: 10,
                    // itemGap: 24,
                    textStyle: {
                        color: "#fff",
                        fontSize: 12,
                    },
                    // show:false
                },
                radar: [
                    {
                        radius: "75%",
                        name: {
                            textStyle: {
                                color: "#C6D6FB",
                                fontSize: 12,
                            },
                        },
                        indicator: [
                            {
                                name: "指标A",
                                min: 0,
                            },
                            {
                                name: "指标B",
                                min: 0,
                            },
                            {
                                name: "指标C",
                                min: 0,
                            },
                        ],
                        center: ["30%", "50%"], // 位置
                        shape: "circle", //形状
                        splitArea: {
                            areaStyle: {
                                color: "transparent", //圆环颜色
                                shadowColor: "aqua", // 圆颜色
                                shadowBlur: 10,
                            },
                        },
                        axisLine: {
                            lineStyle: {
                                color: "#fff", // 分割线
                            },
                        },
                        splitLine: {
                            lineStyle: {
                                color: "rgba(163, 196, 255, 0.22)", //圆线
                                width: 1,
                            },
                        },
                    },
                ],
                series: [
                    {
                        type: "radar",
                        data: [
                            {
                                value: [100, 90, 84],
                                name: "指标值",
                                itemStyle: {
                                    normal: {
                                        borderColor: "#5B8FF9",
                                        borderWidth: 1,
                                    },
                                },
                                symbolSize: "5",
                                lineStyle: {
                                    normal: {
                                        color: "#5B8FF9",
                                        width: 2,
                                    },
                                },
                                areaStyle: {
                                    normal: {
                                        color: "RGBA(91, 143, 249, .5)",
                                    },
                                },
                            },
                            {
                                value: [56, 70, 100],
                                name: "实际值",
                                itemStyle: {
                                    normal: {
                                        borderColor: "#5AD2A5",
                                        borderWidth: 1,
                                    },
                                },
                                symbolSize: "5",
                                lineStyle: {
                                    normal: {
                                        color: "RGBA(189, 26, 26, 1)",
                                        width: 2,
                                    },
                                },
                                areaStyle: {
                                    normal: {
                                        color: "RGBA(205, 33, 33, .5)",
                                    },
                                },
                            },
                        ],
                    },
                ],
            };
            // 基于准备好的dom，初始化this.$echarts实例
            this.myRadarChart = this.$echarts.init(
                document.getElementById("energy_consumption_radar1")
            );
            this.myRadarChart.on('mouseover', (params)=> {
                this.isShowDirection = true;
                let event = params.event;
                let offsetX = event.offsetX;
                let offsetY = event.offsetY;
                this.directionStyle = `left:${offsetX + 20 }px;top:${offsetY + 20}px;`
            });
            this.myRadarChart.on('mouseout', (params)=> {
                this.isShowDirection = false;
            });
            // 绘制图表
            this.myRadarChart.setOption(this.radarOption);

            window.addEventListener("resize", () => {
                this.myRadarChart.resize();
            });
        },
        drawLineCharts() {
            this.lineOption = {
                tooltip: {
                    trigger: "axis",
                },
                grid: {
                    top: "10%",
                    left: "5%",
                    right: "5%",
                    bottom: "10%",
                    // containLabel: true
                },
                xAxis: [
                    {
                        type: "category",
                        axisLine: {
                            show: false,
                        },
                        axisLabel: {
                            show: false,
                            color: "#fff",
                        },
                        splitLine: {
                            show: false,
                        },
                        boundaryGap: false,
                        axisTick: {
                            show: false,
                        },
                        data: ["A", "B", "C", "D", "E", "F"],
                    },
                ],
                yAxis: [
                    {
                        type: "value",
                        min: 0,
                        // max: 140,
                        splitNumber: 4,
                        splitLine: {
                            show: false,
                        },
                        axisLine: {
                            show: false,
                        },
                        axisLabel: {
                            show: false,
                        },
                        axisTick: {
                            show: false,
                        },
                    },
                ],
                series: [ ],
            };
            // 基于准备好的dom，初始化this.$echarts实例
            this.myLineChart = this.$echarts.init(
                document.getElementById("energy_consumption_line1")
            );
            // 绘制图表
            this.myLineChart.setOption(this.lineOption);
            window.addEventListener("resize", () => {
                this.myLineChart.resize();
            });
        },
        getSeriesData(key,element) {
            return {
                name: key,
                type: "line",
                showAllSymbol: true,
                symbol: "circle",
                symbolSize: 5,
                lineStyle: {},
                label: {
                    show: false,
                },
                itemStyle: {
                    borderWidth: 1,
                },
                tooltip: {
                    show: true,
                },
                areaStyle: {
                    opacity: 0.2
                },
                data: element,
            }
        }
    },
};
</script>

<style lang="scss" scoped>
.panel {
    // width: 537.5px;
    // height: 238.5px;
    width: 100%;
    height: 100%;
    position: relative;
    background: rgb(1, 23, 68);
}
.title {
    color: #c6d6fb;
    font-size: 22px;
    height: 34px;
    line-height: 34px;
    margin-top: 12.5px;
    margin-left: 21.5px;
    cursor: pointer;
}
.box {
    // display: flex;
}
.radar-charts-box {
    // width: 269px;
    // width: 381.5px;
    width: 100%;
    // height: 190px;
    height: 314px;
    position: relative;
    .charts {
        width: 100%;
        height: 100%;
    }
    .direction-box {    
        position: absolute;
        border-style: solid;
        white-space: nowrap;
        z-index: 9999999;
        transition: left 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s, top 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s;
        background-color: rgba(50, 50, 50, 0.7);
        border-width: 0px;
        border-color: rgb(51, 51, 51);
        border-radius: 4px;
        color: rgb(255, 255, 255);
        font: 14px / 21px "Microsoft YaHei";
        padding: 5px;
        pointer-events: none;
        display: flex;
        .direction-center{
            margin: 0 10px;
        }
    }
    .options-box{
        position: absolute;
        top: 45%;
        right: 6%;
        font-size: 16px;
        color: #72a4ff;
        .options-key{
            display: inline-block;
            min-width: 60px;
        }
    }
}
.line-charts-box {
    // width: 268px;
    // width: 381.5px;
    width: 100%;
    // height: 190px;
    height: 314px;
    .charts {
        width: 100%;
        height: 100%;
    }
}
</style>
