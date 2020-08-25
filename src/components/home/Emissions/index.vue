<!-- T1航站楼排放指标 -->
<template>
    <div class="panel right-container-angle">
        <div class="title">T1航站楼排放指标</div>
        <div class="content">
            <div class="select-box">
                <ul>
                    <li v-for="(item,i) in typeArr" :key="`${i}emissions`" :class="[item == 'none' ? 'dashed':'default',selectType == i ? 'select':'']" @click="selectTypeClick(item,i)">{{item == 'none'?'':item}}</li>
                    <!-- <li class="default">类目2</li>
                    <li class="default">类目3</li>
                    <li class="default">类目4</li>
                    <li class="default">类目5</li>
                    <li class="default">类目6</li>
                    <li class="default">类目7</li>
                    <li class="default">类目8</li>
                    <li class="default">类目9</li>
                    <li class="default">类目10</li>
                    <li class="dashed"></li>
                    <li class="dashed"></li> -->
                </ul>
            </div>
            <div class="charts-box">
                <div class="charts" id="chart_emissions"></div>
            </div>
        </div>
    </div>
</template>

<script>
import {getEmissionIndex} from "../../../axios"
export default {
    data() {
        return {
            dataList: null,
            typeArr:["none","none","none","none","none","none","none","none","none","none","none","none",],
            selectIndex: 0,
            selectType: null
        }
    },
    mounted() {
        this.drawRadarCharts()
        this.getData();
    },
    methods: {
        selectTypeClick(item,i) {
            this.selectType = item;
            this.selectIndex = i;
            this.option.radar[0].indicator = this.dataList[this.selectType].radarIndicator;
            this.option.series[0].data[0].value = this.dataList[this.selectType].indexValueArr;
            this.option.series[0].data[1].value = this.dataList[this.selectType].factValueArr;
            this.myChart.setOption(this.option);
        },
        async getData() {
            try {
                let [res] = await getEmissionIndex();
                // let res = {"result":"true","message":"{\"emissionIndexList\":[{\"pageNo\":null,\"pageSize\":null,\"id\":\"1296621640815190016\",\"isNewRecord\":false,\"orderBy\":null,\"createByName\":null,\"updateByName\":null,\"updateBy\":null,\"lastUpdateDateTime\":null,\"status\":null,\"createDate\":null,\"updateDate\":null,\"remarks\":null,\"createBy\":null,\"emissionId\":\"1296621640815190016\",\"indexName\":\"指标A\",\"type\":\"类目1\",\"indexValue\":12.23,\"factValue\":123.21,\"createTime\":\"2020-08-21 09:38:46\",\"createDate_lte\":null,\"createDate_between\":null,\"createDate_gte\":null,\"updateDate_lte\":null,\"updateDate_between\":null,\"status_in\":null,\"updateDate_gte\":null,\"id_in\":null},{\"pageNo\":null,\"pageSize\":null,\"id\":\"1296683509832265728\",\"isNewRecord\":false,\"orderBy\":null,\"createByName\":null,\"updateByName\":null,\"updateBy\":null,\"lastUpdateDateTime\":null,\"status\":null,\"createDate\":null,\"updateDate\":null,\"remarks\":null,\"createBy\":null,\"emissionId\":\"1296683509832265728\",\"indexName\":\"指标B\",\"type\":\"类目1\",\"indexValue\":23.23,\"factValue\":23.21,\"createTime\":\"2020-08-21 13:40:14\",\"createDate_lte\":null,\"createDate_between\":null,\"createDate_gte\":null,\"updateDate_lte\":null,\"updateDate_between\":null,\"status_in\":null,\"updateDate_gte\":null,\"id_in\":null},{\"pageNo\":null,\"pageSize\":null,\"id\":\"1296683624714252288\",\"isNewRecord\":false,\"orderBy\":null,\"createByName\":null,\"updateByName\":null,\"updateBy\":null,\"lastUpdateDateTime\":null,\"status\":null,\"createDate\":null,\"updateDate\":null,\"remarks\":null,\"createBy\":null,\"emissionId\":\"1296683624714252288\",\"indexName\":\"指标C\",\"type\":\"类目1\",\"indexValue\":55.32,\"factValue\":53.23,\"createTime\":\"2020-08-21 13:40:42\",\"createDate_lte\":null,\"createDate_between\":null,\"createDate_gte\":null,\"updateDate_lte\":null,\"updateDate_between\":null,\"status_in\":null,\"updateDate_gte\":null,\"id_in\":null}]}"}
                let data = JSON.parse(res.message);
                let { emissionIndexList } = data;
                let typeArr = [];
                let dataList = [];
                emissionIndexList.forEach((item,i) => {
                    typeArr.push( item.type );
                    if( !dataList.hasOwnProperty(item.type) ) {
                        dataList[item.type] = {};
                        dataList[item.type].radarIndicator = []
                        dataList[item.type].indexValueArr= []
                        dataList[item.type].factValueArr= []
                    }
                    // indexValue   指标
                    // factValue    实际
                    dataList[item.type].radarIndicator.push({
                        name: item.indexName,
                        min: 0,
                    })
                    dataList[item.type].indexValueArr.push(item.indexValue);
                    dataList[item.type].factValueArr.push(item.factValue);

                });
                typeArr = [...new Set(typeArr)];
                if( !this.selectType ) {
                    this.selectType = typeArr[0]
                }
                this.typeArr = this.gertNewTypeArr(typeArr);
                this.dataList = dataList;
                this.option.radar[0].indicator = this.dataList[this.selectType].radarIndicator;
                this.option.series[0].data[0].value = this.dataList[this.selectType].indexValueArr;
                this.option.series[0].data[1].value = this.dataList[this.selectType].factValueArr;
                this.myChart.setOption(this.option);
                setTimeout(()=> {
                    this.getData();
                },60000)
            } catch (error) {
                setTimeout(()=> {
                    this.getData();
                },60000)
            }
        },
        gertNewTypeArr(data) {
            let len = data.length;
            let targetLen = 12;
            let arr = [...data];
            for (let i = 0; i < targetLen- len; i++) {    
                arr.push("none")    
            }
            return arr;
        },
        drawRadarCharts() {
            this.option = {
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
                                value: [100, 59, 84],
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
            this.myChart = this.$echarts.init(
                document.getElementById("chart_emissions")
            );
            // 绘制图表
            this.myChart.setOption(this.option);
            window.addEventListener("resize", () => {
                this.myChart.resize();
            });
        },
    },
    computed:{
        typeList() {
            return this.typeArr;
        },
        radarData() {
            return this.dataObj;
        }
    }
};
</script>

<style lang="scss" scoped>
.panel {
    width: 537.5px;
    height: 277.5px;
    position: relative;
    margin-top: 15px;
}
.title {
    color: #c6d6fb;
    font-size: 22px;
    height: 34px;
    line-height: 34px;
    margin: 15px 0 0 21px;
}
.content {
    display: flex;
}
.select-box {
    width: 257px;
    height: 226.5px;
    padding-left: 24.5px;
    ul {
        display: flex;
        flex-wrap: wrap;
        li {
            width: 67.5px;
            height: 36px;
            text-align: center;
            line-height: 36px;
            color: #fff;
            font-size: 16px;
            margin-top: 15px;
            cursor: pointer;
            &:nth-child(2) {
                margin: 15px 15px 0 15px;
            }
            &:nth-child(5) {
                margin: 15px 15px 0 15px;
            }
            &:nth-child(8) {
                margin: 15px 15px 0 15px;
            }
            &:nth-child(11) {
                margin: 15px 15px 0 15px;
            }
        }
        .dashed {
            border-radius: 4.5px;
            background: transparent;
            border: 1.5px dashed rgba(97,175,255,0.65);
        }
        .default {
            border-radius: 4.5px;
            background: rgba(119, 161, 255, 0.18);
            border: 1.5px solid #61afff;
            box-shadow: 0px -4.5px 17.5px 5.5px rgba(27, 128, 255, 0.84) inset;
        }
        .select {
            background:rgba(119,255,193,0.18);
            box-shadow: 0px -4.5px 17.5px 5.5px rgba(53,236,168,0.84) inset;
            border:1.5px solid rgba(97,255,190,0.94)
        }
    }
}
.charts-box {
    width: 278px;
    height: 222px;
    .charts {
        width: 100%;
        height: 100%;
    }
}
</style>
