<template>
    <div class="content-box">
        <div class="charts-box">
            <div class="charts" :id="name"></div>
        </div>
        <div class="btn general-border">15件</div>
    </div>
</template>

<script>
export default {
    props:{
        name:{
            type:String,
            default:''
        }
    },
    mounted() {
        this.drawLine();
    },
    methods: {
        drawLine() {
            var tot = "70%";
            this.option = {
                title: {
                    text: "占比" + "\n" + 80 + "%",
                    textStyle: {
                        color: "#fff",
                        fontWeight: "400",
                        fontSize: 18,
                        lineHeight: 20,
                    },
                    x: "center",
                    y: "center",
                },
                series: [
                    {
                        name: "任务完成情况",
                        type: "pie",
                        clockWise: true,
                        radius: ["78%", "98%"],
                        itemStyle: {
                            normal: {
                                label: {
                                    show: false,
                                },
                                labelLine: {
                                    show: false,
                                },
                            },
                        },
                        hoverAnimation: false,
                        data: [
                            {
                                value: 70,
                                name: "完成",
                                itemStyle: {
                                    normal: {
                                        color: "rgba(23, 92, 219, 0.6)",
                                        borderWidth: 1,
                                        borderColor: "rgba(77, 154, 249, 1)",
                                        label: {
                                            show: false,
                                        },
                                        labelLine: {
                                            show: false,
                                        },
                                    },
                                },
                            },
                            {
                                name: "剩余",
                                value: 30,
                                itemStyle: {
                                    normal: {
                                        color: "transparent",
                                        label: {
                                            show: false,
                                        },
                                        labelLine: {
                                            show: false,
                                        },
                                    },
                                },
                            },
                        ],
                    },
                ],
            };
            // 基于准备好的dom，初始化this.$echarts实例
            this.myChart = this.$echarts.init(
                document.getElementById(this.name)
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

<style scoped lang="scss">
.content-box {
    height: 150px;
    width: 104px;
    display: flex;
    flex-direction: column;
}
.charts-box {
    width: 104px;
    height: 104px;
    .charts {
        width: 100%;
        height: 100%;
    }
}
.btn {
    width: 104px;
    height: 33px;
    margin-top: 13px;
    font-size: 18px;
    line-height: 33px;
    text-align: center;
}
</style>>
