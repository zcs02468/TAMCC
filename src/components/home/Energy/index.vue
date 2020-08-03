<!-- 能源消耗信息 -->
<template>
    <div class="panel left-container-angle">
        <div class="select-box">
            <ul>
                <li class="select">电力</li>
                <li>市政水</li>
                <li>天然气</li>
                <li>中水</li>
            </ul>
        </div>
        <div class="charts-box">
            <div class="charts" id="chart_energy"></div>
        </div>
    </div>
</template>

<script>
export default {
    mounted() {
        this.drawLine();
    },
    methods: {
        drawLine() {
            this.option = {
                tooltip: {
                    trigger: "axis",
                },
                grid: {
                    left: "4%",
                    right: "6%",
                    bottom: "0%",
                    top: "12%",
                    containLabel: true,
                },
                xAxis: [
                    {
                        type: "category",
                        boundaryGap: false,
                        splitLine: {
                            show: false,
                        },
                        axisTick: {
                            show: true,
                        },
                        //坐标值标注
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: "#fff",
                            },
                        },
                        data: ['2019-01','2019-02','2019-03','2019-04','2019-05','2019-06','2019-07','2019-08','2019-09','2019-10','2019-11','2019-12','2020-01','2020-02','2020-03','2020-04'],
                    },
                ],
                yAxis: [
                    {
                        type: "value",
                        splitLine: {
                            show: true,
                            lineStyle: {
                                //  type: 'dashed',
                                color: "rgba(74, 158, 250, 0.17)",
                            },
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLine:{
                            show: false
                        },
                        //坐标值标注
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: "#fff",
                            },
                        },
                    },
                ],
                series: [
                    {
                        name: "用量",
                        smooth: true,
                        // showSymbol: false,
                        type: "line",
                        symbol: "circle",
                        symbolSize: 5,
                        itemStyle: {
                            color: "#2C7AFA",
                            borderColor: '#5B8FF9',
                            borderWidth: 2,
                        },
                        label: {
                            show: false,
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
                                            color: "RGBA(25, 50, 98, .9)",
                                        },
                                        {
                                            offset: 1,
                                            color: "rgba(2, 43, 74, .7)",
                                        },
                                    ],
                                    false
                                ),
                            },
                        },
                        lineStyle: {
                            normal: {
                                width: 2,
                                color: {
                                    type: "linear",

                                    colorStops: [
                                        {
                                            offset: 0,
                                            color: "#1890FF", // 0% 处的颜色
                                        },
                                        {
                                            offset: 1,
                                            color: "#1890FF", // 100% 处的颜色
                                        },
                                    ],
                                    globalCoord: false, // 缺省为 false
                                },
                            },
                        },
                        data: [10000, 9300, 8300, 8000, 8200, 8400, 8600, 8800, 9200, 12000, 10000, 9000, 8000, 7000, 6500, 6000],
                    }
                ],
            };
            // 基于准备好的dom，初始化this.$echarts实例
            this.myChart = this.$echarts.init(
                document.getElementById("chart_energy")
            );
            // 绘制图表
            this.myChart.setOption(this.option);
            window.addEventListener("resize", () => {
                this.myChart.resize();
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.panel {
    width: 765px;
    height: 292.5px;
    position: relative;
}
.select-box {
    padding-top: 15px;
    display: flex;
    flex-direction: row-reverse;
    padding-right: 8px;
    .select {
        background:linear-gradient(to right,rgba(1,77,204,1),rgba(3,55,152,1)) !important;
    }
    ul {
        display: flex;
    }
    li {
        width: 99px;
        height: 33px;
        font-size: 20px;
        border: 1px solid #4f85ff;
        background: rgba(119, 161, 255, 0.14);
        box-shadow: 0.5px 0.5px 17.5px 0px rgba(88, 185, 255, 0.41) inset;
        text-align: center;
        line-height: 33px;
        margin-right: 20px;
        cursor: pointer;
    }
}
.charts-box {
    width: 100%;
    height: 220px;
    .charts {
        width: 100%;
        height: 100%;
    }
}
</style>
