<!-- T1航站楼能耗指标 -->
<template>
    <div class="panel right-container-angle">
        <div class="title" @click="SET_MAP_DIALOG_TYPE('energyConsumption')">T1航站楼能耗指标</div>
        <div class="box">
            <div class="radar-charts-box">
                <div class="charts" id="energy_consumption_radar"></div>
                <div class="direction-box" :style="`${directionStyle}`" v-show="isShowDirection">
                    <div class="direction-left">
                        <div style="opacity:0">111</div>
                        <div v-for="(item) in radarIndicator" :key="item.name">{{item.name}}</div>
                    </div>
                    <div class="direction-center">
                        <div>指标值</div>
                        <div v-for="(item,index) in quotaArr" :key="`${index}_${item}_quota`">{{item}}</div>
                    </div>
                    <div class="direction-right">
                        <div>实际值</div>
                        <div v-for="(item,index) in factArr" :key="`${index}_${item}fact`">{{item}}</div>
                    </div>
                </div>
            </div>
            <div class="line-charts-box">
                <div class="charts" id="energy_consumption_line"></div>
            </div>
        </div>
    </div>
</template>

<script>
import {getEnergyIndex} from "../../../axios"
import comMinxins from "@/components/common/comMinxins.js"
import {mapMutations} from "vuex"
export default {
    mixins:[ comMinxins ],
    data() {
        return {
            radarIndicator: [],
            quotaArr:[],
            factArr:[],
            directionStyle:``,
            isShowDirection: false,
            quotaObj:{},
            actualYData:{}
            // guide:{
            //     isShow: false,
            //     style: 'top:20%;left:60%;',
            //     targetValue: 0,
            //     nowValue: 0
            // }
        }
    },
    mounted() {
        this.drawRadarCharts();
        this.drawLineCharts();
        this.getData();
    },
    methods: {
        ...mapMutations(['SET_MAP_DIALOG_TYPE']),
        updateData() {
            this.getData();
        },
        async getData() {
            let [res] = await getEnergyIndex();
            if( !res ) return;


            let {quotaList,realisticList} = JSON.parse( res.message );
            let {radarIndicator,radarChartsSeries0,radarChartsSeries1,quotaArr,factArr,quotaObj} = this.getRadarChartsData(quotaList);

            
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
            this.quotaObj = quotaObj
            this.myRadarChart.setOption(this.radarOption);
            let {xAxisLine,yAxisLine,actualYData} = this.getLineChartsData(realisticList,quotaObj);
            this.actualYData = actualYData;
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
            let quotaObj = {}
            data.forEach(item => {
                quotaArr.push( item.quotaValue );
                factArr.push( item.factValue );
                let num = Math.round((item.factValue/item.quotaValue) * 1000) / 1000;
                quotaObj[item.quotaKey] = item.quotaValue;
                radarChartsSeries0.push(100);
                radarChartsSeries1.push(num*100);
                radarIndicator.push({
                    name: item.quotaKey,
                    min: 0,
                })
            });
            return {radarIndicator,radarChartsSeries0,radarChartsSeries1,quotaArr,factArr,quotaObj};
        },
        getLineChartsData(data,quotaObj) {
            let xArr = [];
            let obj = {};
            let actualYData = {};
            data.forEach(item => {
                if( !obj[item.quotaKey] ) {
                    obj[item.quotaKey] = []
                }
                if( !actualYData[item.quotaKey] ) {
                    actualYData[item.quotaKey] = []
                }
                
                xArr.unshift(item.collectionDate)
                // obj[item.quotaKey].unshift(item.realisticValue)
                let a = this._.divide(item.realisticValue*100/quotaObj[item.quotaKey]*100);
                    a = this._.round(a,2)
                obj[item.quotaKey].unshift(a)
                actualYData[item.quotaKey].unshift(item.realisticValue)
            });
            let xAxis = [...new Set(xArr)];
            return {
                yAxisLine: obj,
                xAxisLine: xAxis,
                actualYData: actualYData
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
                    right:0,
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
                        radius: "60%",
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
                        center: ["50%", "50%"], // 位置
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
            let _this = this;
            this.lineOption = {
                tooltip: {
                    trigger: "axis",
                     formatter: function (params) {
                        let name = params[0].name;
                        var res = `<div>${params[0].name}</div>`
                        for(var i=0;i<params.length;i++){
                            let seriesName = params[i].seriesName;
                            let data = _this.actualYData[seriesName][params[i].dataIndex]
                            res += `<p><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${params[i].color};"></span>${seriesName}:${data}</p>`
                        }
                        return res;
                    }
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
                series: [],
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
        },
        guideEnter(index) {
            this.guide.isShow = true;
            this.guide.targetValue = this.radarOption.series[0].data[0].value[index]
            this.guide.nowValue = this.radarOption.series[0].data[1].value[index]
            if( index == 0 ) {
                this.guide.style = `top:20%;left:60%;`
            }
            if( index == 1 ) {
                this.guide.style = `right:10%;bottom:32%;`
            }
            if( index == 2 ) {
                this.guide.style = `left:10%;bottom:32%;`
            }
        },
        guideLeave() {
            this.guide.isShow = false;
        }
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
    cursor: pointer;
}
.box {
    display: flex;
}
.radar-charts-box {
    width: 269px;
    height: 190px;
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
