<!-- T1航站楼能耗指标 -->
<template>
    <div class="panel right-container-angle">
        <div class="title">T1航站楼能耗指标</div>
        <div class="radar-charts-box">
            <div class="charts" id="energy_consumption_radar"></div>
        </div>
        <div class="line-charts-box">
            <div class="charts" id="energy_consumption_line"></div>
        </div>
    </div>
</template>

<script>
export default {
    mounted() {
        this.drawRadarCharts();
        this.drawLineCharts();
    },
    methods: {
        drawRadarCharts() {
            this.radarOption = {
                color: ["#385CA5", "#FFFAFA"],
                legend: {
                    data: ["类目1", "类目2"],
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
                                name: "类目1",
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
                                name: "类目2",
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
            this.lineOption = {};
            // 基于准备好的dom，初始化this.$echarts实例
            this.myLineChart = this.$echarts.init(
                document.getElementById("energy_consumption_radar")
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
}
.radar-charts-box {
    width: 269px;
    height: 202px;
    .charts {
        width: 100%;
        height: 100%;
    }
}
.line-charts-box {
    width: 335px;
    height: 202px;
    .charts {
        width: 100%;
        height: 100%;
    }
}
</style>
