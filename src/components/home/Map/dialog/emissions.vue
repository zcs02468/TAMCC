<!-- T1航站楼排放指标 -->
<template>
    <div class="panel right-container-angle">
        <div class="title" @click="closeMapDialog">T1航站楼排放指标</div>
        <div class="content">
            <div class="select-box">
                <ul>
                    <li v-for="(item,i) in typeArr" :key="`${i}emissions`" :class="[item == 'none' ? 'dashed':'default',selectIndex == i ? 'select':'']" @click="selectTypeClick(item,i)">{{item == 'none'?'':item}}</li>
                </ul>
            </div>
            <div class="charts-box">
                <div class="charts" id="chart_emissions1"></div>
                <div class="direction-box" :style="`${directionStyle}`" v-show="isShowDirection">
                    <div class="direction-left">
                        <div style="opacity:0">111</div>
                        <div v-for="(item) in indicatorArr" :key="item.name">{{item.name}}</div>
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
        </div>
    </div>
</template>

<script>
import {getEmissionType,getEmissionIndex} from "@/axios"
import comMinxins from "@/components/common/comMinxins.js"
import {mapMutations} from "vuex"
export default {
    mixins:[ comMinxins ],
    data() {
        return {
            dataList: null,
            typeArr:["none","none","none","none","none","none","none","none","none","none","none","none",],
            selectIndex: 0,
            selectType: null,
            guide:{
                isShow: false,
                style: 'top:20%;left:60%;',
                targetValue: 0,
                nowValue: 0
            },
            indicatorArr: [],
            quotaArr:[],
            factArr:[],
            directionStyle:``,
            isShowDirection: false
        }
    },
    mounted() {
        this.drawRadarCharts()
        this.getData('first');
    },
    methods: {
        ...mapMutations(['closeMapDialog']),
        updateData() {
            this.getData();
        },
        selectTypeClick(item,i) {
            if( item == 'none' ) return;
            this.getAssginType(item);
            this.selectType = item;
            this.selectIndex = i;
        },
        async getData(type) {
            let [res] = await getEmissionType();
            // let res = {"result":"true","message":"{\"typeList\":[\"类目1\",\"类目2\"]}"};
            let data = JSON.parse(res.message);
            let newArr = this.gertNewTypeArr( data.typeList );
            this.typeArr = newArr;
            this.typeArr.splice();
            if( type ) {
                this.getAssginType(newArr[0]);
                this.selectType = newArr[0];
            }else {
                this.getAssginType(this.selectType)
            }
        },
        async getAssginType(type) {
            let [res] = await getEmissionIndex({type: type});
            // let res;
            // if( type == '类目1' ) {
            //     res = {"result":"true","message":"{\"emissionIndexList\":[{\"pageNo\":null,\"orderBy\":null,\"isNewRecord\":false,\"pageSize\":null,\"id\":\"1296621640815190016\",\"status\":null,\"remarks\":null,\"createByName\":null,\"createDate\":null,\"updateDate\":null,\"lastUpdateDateTime\":null,\"updateBy\":null,\"createBy\":null,\"updateByName\":null,\"emissionId\":\"1296621640815190016\",\"indexName\":\"指标A\",\"type\":\"类目1\",\"indexValue\":12.23,\"factValue\":12.21,\"createTime\":\"2020-08-21 09:38:46\",\"createDate_between\":null,\"createDate_gte\":null,\"createDate_lte\":null,\"updateDate_gte\":null,\"updateDate_lte\":null,\"updateDate_between\":null,\"status_in\":null,\"id_in\":null},{\"pageNo\":null,\"orderBy\":null,\"isNewRecord\":false,\"pageSize\":null,\"id\":\"1296683509832265728\",\"status\":null,\"remarks\":null,\"createByName\":null,\"createDate\":null,\"updateDate\":null,\"lastUpdateDateTime\":null,\"updateBy\":null,\"createBy\":null,\"updateByName\":null,\"emissionId\":\"1296683509832265728\",\"indexName\":\"指标B\",\"type\":\"类目1\",\"indexValue\":23.23,\"factValue\":23.21,\"createTime\":\"2020-08-21 13:40:14\",\"createDate_between\":null,\"createDate_gte\":null,\"createDate_lte\":null,\"updateDate_gte\":null,\"updateDate_lte\":null,\"updateDate_between\":null,\"status_in\":null,\"id_in\":null},{\"pageNo\":null,\"orderBy\":null,\"isNewRecord\":false,\"pageSize\":null,\"id\":\"1296683624714252288\",\"status\":null,\"remarks\":null,\"createByName\":null,\"createDate\":null,\"updateDate\":null,\"lastUpdateDateTime\":null,\"updateBy\":null,\"createBy\":null,\"updateByName\":null,\"emissionId\":\"1296683624714252288\",\"indexName\":\"指标C\",\"type\":\"类目1\",\"indexValue\":55.32,\"factValue\":53.23,\"createTime\":\"2020-08-21 13:40:42\",\"createDate_between\":null,\"createDate_gte\":null,\"createDate_lte\":null,\"updateDate_gte\":null,\"updateDate_lte\":null,\"updateDate_between\":null,\"status_in\":null,\"id_in\":null}]}"}
            // }else {
            //     res = {"result":"true","message":"{\"emissionIndexList\":[{\"pageNo\":null,\"orderBy\":null,\"isNewRecord\":false,\"pageSize\":null,\"id\":\"1296622836941807616\",\"status\":null,\"remarks\":null,\"createByName\":null,\"createDate\":null,\"updateDate\":null,\"lastUpdateDateTime\":null,\"updateBy\":null,\"createBy\":null,\"updateByName\":null,\"emissionId\":\"1296622836941807616\",\"indexName\":\"指标A\",\"type\":\"类目2\",\"indexValue\":544.22,\"factValue\":433.23,\"createTime\":\"2020-08-21 09:39:09\",\"createDate_between\":null,\"createDate_gte\":null,\"createDate_lte\":null,\"updateDate_gte\":null,\"updateDate_lte\":null,\"updateDate_between\":null,\"status_in\":null,\"id_in\":null}]}"}
            // }
            // let a = {
            //     result:true,
            //     message:{
            //         emissionIndexList:[
            //             {
            //                 indexValue:123,
            //                 factValue:123,
            //                 indexName:'ECAh'
            //             },
            //             {
            //                 indexValue:213,
            //                 factValue:213,
            //                 indexName:'HCA'
            //             },
            //             {
            //                 indexValue:45,
            //                 factValue:50,
            //                 indexName:'ECAc'
            //             },
            //             {
            //                 indexValue:31,
            //                 factValue:23,
            //                 indexName:'CCA'
            //             },
            //             {
            //                 indexValue:123,
            //                 factValue:122,
            //                 indexName:'EUPe'
            //             },
            //             {
            //                 indexValue:344.23,
            //                 factValue:365.44,
            //                 indexName:'EUI'
            //             },
            //             {
            //                 indexValue:123.23,
            //                 factValue:110.12,
            //                 indexName:'EUIe'
            //             },
            //             {
            //                 indexValue:456,
            //                 factValue:443.54,
            //                 indexName:'EUP'
            //             },
            //         ]
            //     }
            // }
            let data = JSON.parse( res.message ).emissionIndexList;
            // let data = a.message.emissionIndexList;
            let quotaArr = [];//指标真实数据
            let factArr = [];//实际真实数据
            let indicatorArr = [];
            let indexValueArr = [];//指标值换算之后的数据
            let factValueArr = [];//实际值换算之后的数据
            data.forEach(item => {
                quotaArr.push( item.indexValue );
                factArr.push( item.factValue );
                let num = Math.round((item.factValue/item.indexValue) * 1000) / 1000;
                indexValueArr.push( 100 );
                factValueArr.push( num*100 );
                indicatorArr.push({
                    name: item.indexName,
                    min: 0,
                });
            });

            //新增
             //获取数组最大值
            let maxNum = Math.max(...factValueArr);
            if( maxNum < 100 ) {
                maxNum = 100;
            }
            indicatorArr.forEach(item => {
                item.max = maxNum + 20
            })
            this.option.radar[0].indicator = indicatorArr;
            this.option.series[0].data[0].value = indexValueArr;
            this.option.series[0].data[1].value = factValueArr;
            this.indicatorArr = indicatorArr;
            this.quotaArr = quotaArr;
            this.factArr = factArr;
            this.indicatorArr.splice();
            this.quotaArr.splice();
            this.factArr.splice();
            this.myChart.setOption(this.option);
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
                    selectedMode:false,
                    // icon: "circle",
                    // left: "10%",
                    // top: "6%",
                    right:"10%",
                    top:0,
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
                        center: ["50%", "55%"], // 位置
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
                document.getElementById("chart_emissions1")
            );
            this.myChart.on('mouseover', (params)=> {
                this.isShowDirection = true;
                let event = params.event;
                let offsetX = event.offsetX;
                let offsetY = event.offsetY;
                let width = document.querySelector('#chart_emissions1').offsetWidth;
                this.directionStyle = `right:${ width - offsetX - 20 }px;top:${offsetY + 20}px;`
            });
            this.myChart.on('mouseout', (params)=> {
                this.isShowDirection = false;
            });
            // 绘制图表
            this.myChart.setOption(this.option);
            window.addEventListener("resize", () => {
                this.myChart.resize();
            });
        },
        guideEnter(index) {
            this.guide.isShow = true;
            this.guide.targetValue = this.option.series[0].data[0].value[index]
            this.guide.nowValue = this.option.series[0].data[1].value[index]
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
    width: 100%;
    height: 100%;
    position: relative;
    margin-top: 15px;
    background: rgb(1, 23, 68);
}
.title {
    color: #c6d6fb;
    font-size: 22px;
    height: 34px;
    line-height: 34px;
    margin: 15px 0 0 21px;
    cursor: pointer;
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
    // width: 278px;
    flex: 1;
    // height: 222px;
    height: 444px;
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
</style>
