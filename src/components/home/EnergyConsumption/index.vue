<!-- T1航站楼能耗指标 -->
<template>
    <div class="panel right-container-angle">
        <div class="title">T1航站楼能耗指标</div>
        <div class="box">
            <div class="radar-charts-box">
                <div class="charts" id="energy_consumption_radar"></div>
            </div>
            <div class="line-charts-box">
                <div class="charts" id="energy_consumption_line"></div>
            </div>
        </div>
    </div>
</template>

<script>
import {getEnergyIndex} from "../../../axios"
export default {
    mounted() {
        this.getData()
        this.drawRadarCharts();
        this.drawLineCharts();
    },
    methods: {
        async getData() {
            let [res] = await getEnergyIndex();
            let {quotaList,realisticList} = JSON.parse( res.message );
            let {radarIndicator,radarChartsSeries0,radarChartsSeries1} = this.getRadarChartsData(quotaList);
            this.radarOption.series[0].data[0].value = radarChartsSeries0;
            this.radarOption.series[0].data[1].value = radarChartsSeries1;
            this.myRadarChart.setOption(this.radarOption);

            let {xAxisLine,yAxisLine} = this.getLineChartsData(realisticList,radarIndicator);
            this.lineOption.xAxis[0].data = xAxisLine;
            let index = 0;
            for (const key in yAxisLine) {
                if (yAxisLine.hasOwnProperty(key)) {
                    const element = yAxisLine[key];
                    this.lineOption.series[index].name = key;
                    this.lineOption.series[index].data = element;
                    index++;
                }
            }
            this.myLineChart.setOption(this.lineOption);
            setTimeout(()=> {
                this.getData();
            },60000)
        },
        getRadarChartsData(data) {
            let radarChartsSeries0 = [];
            let radarChartsSeries1 = [];
            let radarIndicator = []
            data.forEach(item => {
                radarChartsSeries0.push(item.quotaValue);
                radarChartsSeries1.push(item.factValue);
                radarIndicator.push({
                    name: item.quotaKey,
                    min: 0,
                })
            });
            return {radarIndicator,radarChartsSeries0,radarChartsSeries1};
            
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
                    // icon: "circle",
                    left: "10%",
                    top: "6%",
                    itemWidth: 10,
                    itemHeight: 10,
                    // itemGap: 24,
                    textStyle: {
                        color: "#fff",
                        fontSize: 12,
                    },
                },
                radar: [
                    {
                        radius: "70%",
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
                        center: ["50%", "60%"], // 位置
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
                document.getElementById("energy_consumption_radar")
            );
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
                    right: "10%",
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
                series: [
                    {
                        name: "数据1",
                        type: "line",
                        // smooth: true, //是否平滑
                        showAllSymbol: true,
                        // symbol: 'image://./static/images/guang-circle.png',
                        symbol: "circle",
                        symbolSize: 5,
                        lineStyle: {
                            normal: {
                                color: "#5B8FF9",
                            },
                        },
                        label: {
                            show: false,
                        },
                        itemStyle: {
                            color: "#2C7AFA",
                            borderColor: "#5B8FF9",
                            borderWidth: 1,
                        },
                        tooltip: {
                            show: true,
                        },
                        areaStyle: {
                            normal: {
                                color: new this.$echarts.graphic.LinearGradient(
                                    0,
                                    0,
                                    0,
                                    1,
                                    [
                                        {
                                            offset: 0,
                                            color: "RGBA(72, 116, 204, .3)",
                                        },
                                        {
                                            offset: 1,
                                            color: "rgba(0,179,244,0)",
                                        },
                                    ],
                                    false
                                ),
                            },
                        },
                        data: [100, 120, 110, 120, 130, 140],
                    },
                    {
                        name: "数据2",
                        type: "line",
                        // smooth: true, //是否平滑
                        showAllSymbol: true,
                        // symbol: 'image://./static/images/guang-circle.png',
                        symbol: "circle",
                        symbolSize: 5,
                        lineStyle: {
                            normal: {
                                color: "#5AD8A6",
                            },
                        },
                        label: {
                            show: false,
                        },
                        itemStyle: {
                            color: "#67C3A2",
                            borderColor: "#5AD8A6",
                            borderWidth: 3,
                        },
                        tooltip: {
                            show: true,
                        },
                        areaStyle: {
                            normal: {
                                color: new this.$echarts.graphic.LinearGradient(
                                    0,
                                    0,
                                    0,
                                    1,
                                    [
                                        {
                                            offset: 0,
                                            color: "RGBA(90, 216, 166, .3)",
                                        },
                                        {
                                            offset: 1,
                                            color: "rgba(0,202,149,0)",
                                        },
                                    ],
                                    false
                                ),
                            },
                        },
                        data: [150, 170, 160, 170, 180, 190],
                    },
                    {
                        name: "数据1",
                        type: "line",
                        // smooth: true, //是否平滑
                        showAllSymbol: true,
                        // symbol: 'image://./static/images/guang-circle.png',
                        symbol: "circle",
                        symbolSize: 5,
                        lineStyle: {
                            normal: {
                                color: "#5B8FF9",
                            },
                        },
                        label: {
                            show: false,
                        },
                        itemStyle: {
                            color: "#2C7AFA",
                            borderColor: "#5B8FF9",
                            borderWidth: 1,
                        },
                        tooltip: {
                            show: true,
                        },
                        areaStyle: {
                            normal: {
                                color: new this.$echarts.graphic.LinearGradient(
                                    0,
                                    0,
                                    0,
                                    1,
                                    [
                                        {
                                            offset: 0,
                                            color: "RGBA(72, 116, 204, .3)",
                                        },
                                        {
                                            offset: 1,
                                            color: "rgba(0,179,244,0)",
                                        },
                                    ],
                                    false
                                ),
                            },
                        },
                        data: [200, 220, 210, 220, 230, 240],
                    },
                ],
            };
            // 基于准备好的dom，初始化this.$echarts实例
            this.myLineChart = this.$echarts.init(
                document.getElementById("energy_consumption_line")
            );
            // 绘制图表
            this.myLineChart.setOption(this.lineOption);
            window.addEventListener("resize", () => {
                this.myLineChart.resize();
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.panel {
    width: 537.5px;
    height: 238.5px;
    position: relative;
}
.title {
    color: #c6d6fb;
    font-size: 22px;
    height: 34px;
    line-height: 34px;
    margin-top: 12.5px;
    margin-left: 21.5px;
}
.box {
    display: flex;
}
.radar-charts-box {
    width: 269px;
    height: 190px;
    .charts {
        width: 100%;
        height: 100%;
    }
}
.line-charts-box {
    width: 268px;
    height: 190px;
    .charts {
        width: 100%;
        height: 100%;
    }
}
</style>
