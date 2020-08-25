<!-- 能源消耗信息 -->
<template>
    <div class="panel left-container-angle">
        <div class="select-box">
            <ul>
                <li :class="selectType == 'electric'? 'select':''" @click="selectClick('electric')">电力</li>
                <li :class="selectType == 'water'? 'select':''" @click="selectClick('water')">市政水</li>
                <li :class="selectType == 'gas'? 'select':''" @click="selectClick('gas')">天然气</li>
                <li :class="selectType == 'awater'? 'select':''" @click="selectClick('awater')">中水</li>
            </ul>
        </div>
        <div class="charts-box">
            <div class="charts" id="chart_energy"></div>
        </div>
    </div>
</template>

<script>
import { getSumElectricList } from "../../../axios";
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
    mounted() {
        this.drawLine();
        this.getData();
    },
    created() {
    },
    methods: {
        selectClick(type) {
            this.selectType = type;
            this.option.xAxis[0].data = this.list[this.selectType].x;
            this.option.series[0].data = this.list[this.selectType].y;
            this.myChart.setOption(this.option);
        },
        async getData() {
            // let [res] = await getSumElectricList();
            let res = this.getAjaxData();
            let data = JSON.parse(res.message)
            // sumElectricList	电力对象
            // sumWaterList	市政水对象
            // fshowtime	日期
            // fusedvalue	日用能
            // electric	电力日基准值
            // water	市政水日基准值
            let electricData = this.sortingData(data.sumElectricList);
            let waterData = this.sortingData(data.sumWaterList);
            let obj = {
                electric:{
                    x: electricData.x,
                    y: electricData.y,
                    standard: data.electric,
                },
                water:{
                    x: waterData.x,
                    y: waterData.y,
                    standard: data.water,
                },
            }
            Object.assign(this.list,obj);
            this.option.xAxis[0].data = this.list[this.selectType].x;
            this.option.series[0].data = this.list[this.selectType].y;
            this.myChart.setOption(this.option);
            setTimeout(()=> {
                this.getData();
            },60000)
        },
        sortingData(data) {
            let yArr = [];
            let xArr = [];
            data.forEach(item => {
                let time = item.fshowtime.split(" ")[0].split("-")
                xArr.push(`${time[1]}-${time[2]}`)
                yArr.push(item.fusedvalue)
            });
            return {
                x: xArr,
                y: yArr
            }
        },
        getAjaxData() {
            return {"result":"true","message":"{\"sumElectricList\":[{\"pageNo\":null,\"pageSize\":null,\"id\":\"222222222\",\"isNewRecord\":false,\"orderBy\":null,\"createByName\":null,\"updateByName\":null,\"updateBy\":null,\"lastUpdateDateTime\":null,\"status\":null,\"createDate\":null,\"updateDate\":null,\"remarks\":null,\"createBy\":null,\"fid\":\"222222222\",\"fengitemcode\":\"01000\",\"fusedvalue\":3433.1211,\"fshowtime\":\"2020-08-11 10:49:19\",\"finserttime\":null,\"fnote\":null,\"fengitemname\":null,\"updateDate_gte\":null,\"createDate_between\":null,\"status_in\":null,\"updateDate_between\":null,\"createDate_gte\":null,\"createDate_lte\":null,\"updateDate_lte\":null,\"id_in\":null},{\"pageNo\":null,\"pageSize\":null,\"id\":\"333333333\",\"isNewRecord\":false,\"orderBy\":null,\"createByName\":null,\"updateByName\":null,\"updateBy\":null,\"lastUpdateDateTime\":null,\"status\":null,\"createDate\":null,\"updateDate\":null,\"remarks\":null,\"createBy\":null,\"fid\":\"333333333\",\"fengitemcode\":\"01000\",\"fusedvalue\":3432.1143,\"fshowtime\":\"2020-08-10 10:50:00\",\"finserttime\":null,\"fnote\":null,\"fengitemname\":null,\"updateDate_gte\":null,\"createDate_between\":null,\"status_in\":null,\"updateDate_between\":null,\"createDate_gte\":null,\"createDate_lte\":null,\"updateDate_lte\":null,\"id_in\":null},{\"pageNo\":null,\"pageSize\":null,\"id\":\"444444444\",\"isNewRecord\":false,\"orderBy\":null,\"createByName\":null,\"updateByName\":null,\"updateBy\":null,\"lastUpdateDateTime\":null,\"status\":null,\"createDate\":null,\"updateDate\":null,\"remarks\":null,\"createBy\":null,\"fid\":\"444444444\",\"fengitemcode\":\"01000\",\"fusedvalue\":5444.2354,\"fshowtime\":\"2020-08-09 10:50:23\",\"finserttime\":null,\"fnote\":null,\"fengitemname\":null,\"updateDate_gte\":null,\"createDate_between\":null,\"status_in\":null,\"updateDate_between\":null,\"createDate_gte\":null,\"createDate_lte\":null,\"updateDate_lte\":null,\"id_in\":null},{\"pageNo\":null,\"pageSize\":null,\"id\":\"555555555\",\"isNewRecord\":false,\"orderBy\":null,\"createByName\":null,\"updateByName\":null,\"updateBy\":null,\"lastUpdateDateTime\":null,\"status\":null,\"createDate\":null,\"updateDate\":null,\"remarks\":null,\"createBy\":null,\"fid\":\"555555555\",\"fengitemcode\":\"01000\",\"fusedvalue\":2345.1234,\"fshowtime\":\"2020-08-08 10:50:48\",\"finserttime\":null,\"fnote\":null,\"fengitemname\":null,\"updateDate_gte\":null,\"createDate_between\":null,\"status_in\":null,\"updateDate_between\":null,\"createDate_gte\":null,\"createDate_lte\":null,\"updateDate_lte\":null,\"id_in\":null}],\"electric\":\"3000\",\"sumWaterList\":[{\"pageNo\":null,\"pageSize\":null,\"id\":\"777777777\",\"isNewRecord\":false,\"orderBy\":null,\"createByName\":null,\"updateByName\":null,\"updateBy\":null,\"lastUpdateDateTime\":null,\"status\":null,\"createDate\":null,\"updateDate\":null,\"remarks\":null,\"createBy\":null,\"fid\":\"777777777\",\"fengitemcode\":\"02000\",\"fusedvalue\":35333.5533,\"fshowtime\":\"2020-08-11 11:09:20\",\"finserttime\":null,\"fnote\":null,\"fengitemname\":null,\"updateDate_gte\":null,\"createDate_between\":null,\"status_in\":null,\"updateDate_between\":null,\"createDate_gte\":null,\"createDate_lte\":null,\"updateDate_lte\":null,\"id_in\":null},{\"pageNo\":null,\"pageSize\":null,\"id\":\"888888888\",\"isNewRecord\":false,\"orderBy\":null,\"createByName\":null,\"updateByName\":null,\"updateBy\":null,\"lastUpdateDateTime\":null,\"status\":null,\"createDate\":null,\"updateDate\":null,\"remarks\":null,\"createBy\":null,\"fid\":\"888888888\",\"fengitemcode\":\"02000\",\"fusedvalue\":56554.3432,\"fshowtime\":\"2020-08-10 11:12:10\",\"finserttime\":null,\"fnote\":null,\"fengitemname\":null,\"updateDate_gte\":null,\"createDate_between\":null,\"status_in\":null,\"updateDate_between\":null,\"createDate_gte\":null,\"createDate_lte\":null,\"updateDate_lte\":null,\"id_in\":null},{\"pageNo\":null,\"pageSize\":null,\"id\":\"999999999\",\"isNewRecord\":false,\"orderBy\":null,\"createByName\":null,\"updateByName\":null,\"updateBy\":null,\"lastUpdateDateTime\":null,\"status\":null,\"createDate\":null,\"updateDate\":null,\"remarks\":null,\"createBy\":null,\"fid\":\"999999999\",\"fengitemcode\":\"02000\",\"fusedvalue\":88383.3428,\"fshowtime\":\"2020-08-09 11:13:34\",\"finserttime\":null,\"fnote\":null,\"fengitemname\":null,\"updateDate_gte\":null,\"createDate_between\":null,\"status_in\":null,\"updateDate_between\":null,\"createDate_gte\":null,\"createDate_lte\":null,\"updateDate_lte\":null,\"id_in\":null},{\"pageNo\":null,\"pageSize\":null,\"id\":\"000000000\",\"isNewRecord\":false,\"orderBy\":null,\"createByName\":null,\"updateByName\":null,\"updateBy\":null,\"lastUpdateDateTime\":null,\"status\":null,\"createDate\":null,\"updateDate\":null,\"remarks\":null,\"createBy\":null,\"fid\":\"000000000\",\"fengitemcode\":\"02000\",\"fusedvalue\":93839.1253,\"fshowtime\":\"2020-08-08 11:14:00\",\"finserttime\":null,\"fnote\":null,\"fengitemname\":null,\"updateDate_gte\":null,\"createDate_between\":null,\"status_in\":null,\"updateDate_between\":null,\"createDate_gte\":null,\"createDate_lte\":null,\"updateDate_lte\":null,\"id_in\":null},{\"pageNo\":null,\"pageSize\":null,\"id\":\"666666666\",\"isNewRecord\":false,\"orderBy\":null,\"createByName\":null,\"updateByName\":null,\"updateBy\":null,\"lastUpdateDateTime\":null,\"status\":null,\"createDate\":null,\"updateDate\":null,\"remarks\":null,\"createBy\":null,\"fid\":\"666666666\",\"fengitemcode\":\"02000\",\"fusedvalue\":46456.2211,\"fshowtime\":\"2020-08-07 10:48:19\",\"finserttime\":null,\"fnote\":null,\"fengitemname\":null,\"updateDate_gte\":null,\"createDate_between\":null,\"status_in\":null,\"updateDate_between\":null,\"createDate_gte\":null,\"createDate_lte\":null,\"updateDate_lte\":null,\"id_in\":null}],\"water\":\"200\"}"}

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
