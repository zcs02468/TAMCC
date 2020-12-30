<!-- 能源消耗信息 -->
<template>
    <div class="panel left-container-angle">
        <div class="select-box">
            <ul>
                <li :class="selectType == 'electric'? 'select':''" @click="selectClick('electric')">电力</li>
                <li :class="selectType == 'water'? 'select':''" @click="selectClick('water')">市政水</li>
                <li :class="selectType == 'gas'? 'select':''" @click="selectClick('gas')">天然气</li>
                <!-- <li :class="selectType == 'awater'? 'select':''" @click="selectClick('awater')">中水</li> -->
            </ul>
        </div>
        <div class="charts-box">
            <div class="charts" id="chart_energy"></div>
        </div>
    </div>
</template>

<script>
import { getSumElectricList } from "../../../axios";
import comMinxins from "../../common/comMinxins";
import ajaxData from "./data.json"
export default {
    data() {
        return {
            selectType:'electric',
            list:{
                electric:{
                    x:[],
                    y:[],
                    standard:0
                },
                water:{
                    x: [],
                    y: [],
                    standard: 0,
                }
            }
        }
    },
    mixins:[comMinxins],
    mounted() {
        this.drawLine();
        this.getData();
    },
    created() {
    },
    methods: {
        updateData() {
            this.getData();
        },
        selectClick(type) {
            if( this.selectType == type ) {
                return;
            }
            this.selectType = type;
            this.option.xAxis[0].data = this.list[this.selectType].x;
            this.option.series[0].data = this.list[this.selectType].y;
            this.option.series[1].data = this.list[this.selectType].standard;
            this.option.yAxis[0].min = this.list[this.selectType].min;
            this.option.yAxis[0].max = this.list[this.selectType].max;
            this.myChart.setOption(this.option);
        },
        async getData() {
            let [res] = await getSumElectricList();
            // let res = ajaxData;
            let data = JSON.parse(res.message);
            // let res = this.getAjaxData();
            // let data = res.message
            // sumElectricList	电力对象
            // sumWaterList	市政水对象
            // fshowtime	日期
            // fusedvalue	日用能
            // electric	电力日基准值
            // water	市政水日基准值
            let baselineList = this.getBaseLineList(data.baselineList)
            let electricData = this.sortingData(data.sumElectricList.reverse(),baselineList.electric);
            let waterData = this.sortingData(data.sumWaterList.reverse(),baselineList.water);
            // let arr = data.naturalGas.splice(0,1)
            let gasData = this.sortingData(data.naturalGas.reverse(),baselineList.gas)
            // let gasData = this.sortingData(arr,baselineList.gas)
            let obj = {
                electric:{
                    x: electricData.x,
                    y: electricData.y,
                    standard: electricData.baseLineArr,
                    // min: baselineList.electricMin,
                    min: electricData.min,
                    max: electricData.max
                },
                water:{
                    x: waterData.x,
                    y: waterData.y,
                    standard: waterData.baseLineArr,
                    // min: baselineList.waterMin,
                    min: waterData.min,
                    max: waterData.max
                },
                gas:{
                    x: gasData.x,
                    y: gasData.y,
                    standard: gasData.baseLineArr,
                    // min: baselineList.waterMin,
                    min: gasData.min,
                    max: gasData.max
                }
            }
            electricData.min > baselineList.electricMin && ( obj.electric.min = baselineList.electricMin );
            waterData.min > baselineList.waterMin && ( obj.water.min = baselineList.waterMin );
            gasData.min > baselineList.gasMin && ( obj.gas.min = baselineList.gasMin );

            electricData.max < baselineList.electricMax && ( obj.electric.max = baselineList.electricMax );
            waterData.max < baselineList.waterMax && ( obj.water.max = baselineList.waterMax );
            gasData.max < baselineList.gasMax && ( obj.gas.max = baselineList.gasMax );

            obj.electric.min = Math.floor((obj.electric.min/4)*3);
            obj.water.min = Math.floor((obj.water.min/4)*3);
            obj.gas.min = Math.floor((obj.gas.min/4)*3);

            obj.electric.max = Math.floor((obj.electric.max/6)*7);
            obj.water.max = Math.floor((obj.water.max/6)*7);
            obj.gas.max = Math.floor((obj.gas.max/6)*7);

            Object.assign(this.list,obj);
            this.option.xAxis[0].data = this.list[this.selectType].x;
            this.option.series[0].data = this.list[this.selectType].y;
            this.option.series[1].data = this.list[this.selectType].standard;
            this.option.yAxis[0].min = this.list[this.selectType].min;
            this.option.yAxis[0].max = this.list[this.selectType].max;
            this.myChart.setOption(this.option);
        },
        sortingData(data,obj) {
            let yArr = [];
            let xArr = [];
            let maxNum = 0;
            let minNum = Infinity;
            let baseLineArr = [];
            data.forEach(item => {
                let time = item.fshowtime.split(" ")[0].split("-")
                xArr.push(`${time[1]}-${time[2]}`)
                yArr.push(item.fusedvalue)
                baseLineArr.push( obj[`${time[0]}-${time[1]}`].value )
                item.fusedvalue > maxNum && ( maxNum = item.fusedvalue );
                item.fusedvalue < minNum && ( minNum = item.fusedvalue );
            });
            return {
                x: xArr,
                y: yArr,
                max: maxNum,
                min: minNum,
                baseLineArr: baseLineArr
            }
        },
        getBaseLineList(data) {
            let obj = {
                electric:{},
                water:{},
                gas:{},
                electricMax: null,
                waterMax: null,
                gasMax: null,
                electricMin: null,
                waterMin: null,
                gasMin: null,
            }
            let arr = ['','electric','water','gas'];
            data.forEach(item => {
                if( obj[`${arr[item.type]}Min`] == null ) {
                    obj[`${arr[item.type]}Min`] = item.baselineValue;
                }else {
                    if( item.baselineValue < obj[`${arr[item.type]}Min`] ) {
                        obj[`${arr[item.type]}Min`] = item.baselineValue
                    }
                }
                if( obj[`${arr[item.type]}Max`] == null ) {
                    obj[`${arr[item.type]}Max`] = item.baselineValue;
                }else {
                    if( item.baselineValue > obj[`${arr[item.type]}Max`] ) {
                        obj[`${arr[item.type]}Max`] = item.baselineValue
                    }
                }
                let timeArr = item.yearMonth.split(' ')[0].split("-")
                obj[arr[item.type]][item.yearMonth] = {
                    year: timeArr[0],
                    month: timeArr[1],
                    value: item.baselineValue
                }
            })
            return obj;
        },
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
                        // min: 70,
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
                    },
                    {
                        name: '基准值',
                        type: 'line',
                        step: 'start',
                        symbolSize: 0,
                        data: [120, 120, 120, 140, 140, 140, 140]
                    },
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
    margin-top: 15px;
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
