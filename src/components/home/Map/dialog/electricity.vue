<!-- T1航站楼用电占比 -->
<template>
    <div class="panel left-container-angle">
        <div class="title" @click="closeMapDialog">T1航站楼用电占比</div>
        <div class="content">
            <div class="select-box">
                <ul>
                    <li :class="selectType == 'electric'? 'select':''" @click="selectClick('electric')">电力</li>
                    <li :class="selectType == 'water'? 'select':''" @click="selectClick('water')">市政水</li>
                    <li :class="selectType == 'gas'? 'select':''" @click="selectClick('gas')">天然气</li>
                    <li></li>
                    <!-- <li :class="selectType == 'awater'? 'select':''" @click="selectClick('awater')">中水</li> -->
                </ul>
            </div>
            <div class="ping-box">
                <div class="charts" id="chart_electricity1"></div>
            </div>
        </div>
        <div class="info-box general-border">
            <div class="name">
                <span>当日总用量</span>
            </div>
            <div class="info">
                <div class="top">
                    <div class="block-box">
                        <span>电：</span>
                        <span>{{electricSum}}KWH</span>
                    </div>
                    <div class="block-box">
                        <span class="max">水：</span>
                        <span>{{waterSum}}m³</span>
                    </div>
                </div>
                <div class="bottom">
                    <div class="block-box">
                        <span>气：</span>
                        <span>{{gasSum}}m³</span>
                    </div>
                    <!-- <div class="block-box">
                        <span class="max">中水：</span>
                        <span>XXXXm²</span>
                    </div> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {getEnergyProportion} from "@/axios/index"
import comMinxins from "@/components/common/comMinxins"
import {mapMutations} from "vuex"
// import ajaxData from "@/components/home/Electricity/data.json"
export default {
    data() {
        return {
            selectType:'electric', //electric---电力    water---市政水   gas---天然气
            list:{
                electricList:[],
                waterList:[],
                gasList:[]
            },
            electricSum:0,
            waterSum:0,
            gasSum:0
        }
    },
    mixins:[comMinxins],
    mounted() {
        this.drawLine();
        this.getData()
    },
    methods: {
        ...mapMutations(['closeMapDialog']),
        updateData() {
            this.getData();
        },
        selectClick(type) {
            this.selectType = type;
            this.option.series[0].data = this.list[`${this.selectType}List`];
            this.option.tooltip.formatter = this.tooltipTitle;
            this.myChart.setOption(this.option);
        },
        async getData() {
            let [res] = await getEnergyProportion();
            if( !res ) return;
            // let res = ajaxData;
            let data =  JSON.parse(res.message);
            // electricList	电力对象
            // waterList	市政水对象
            // fengitemname	分项名称
            // fusedvalue	日用能
            // let {electricList,waterList} = data;
            let electricData = this.sortingData(data.electricList);
            let waterData = this.sortingData(data.waterList);
            let gasData = this.sortingData(data.naturalGas);
            
            this.electricSum = electricData.sum;
            this.waterSum = waterData.sum;
            this.gasSum = gasData.sum;
            let obj = {
                electricList: electricData.arr,
                waterList: waterData.arr,
                gasList: gasData.arr,
            }
            Object.assign(this.list, obj);
            this.option.series[0].data = this.list[`${this.selectType}List`];
            this.myChart.setOption(this.option);
        },
        sortingData(data) {
            let arr = [];
            let sum = 0; 
            data.forEach((item,index) => {
                if( item.fengitemname == '总用电' || item.fengitemname == '总用水' || item.fengitemname == '总用气' ) {
                    sum = item.fusedvalue;
                }else {
                    arr.push({
                        name: item.fengitemname,
                        value:item.fusedvalue
                    })
                }
            });
            return {
                arr:arr,
                sum:sum
            };
        },
        drawLine() {
            this.option = {
                color:['#3d8bc4','#cc4c1f','#bb7f11','#5f9877','#74418e','#c7a537','#205d96','#882e31','#22837d','#FF99C3'],
                tooltip: {
                    trigger: "item",
                    formatter: "用量 <br/>{b} : {c} ({d}%)",
                },
                series: [
                    {
                        name: "使用量",
                        type: "pie",
                        radius: "70%",
                        center: ["50%", "50%"],
                        data: [
                            {
                                value: 32.61,
                                name: "小于2万",
                            },
                            {
                                value: 19.52,
                                name: "2万至5万",
                            },
                            {
                                value: 18.96,
                                name: "10万至20万",
                            },
                            {
                                value: 18.77,
                                name: "5万至10万",
                            },
                            {
                                value: 9.27,
                                name: "20万至40万",
                            },
                            {
                                value: 0.87,
                                name: "40万至70万",
                            },
                        ],
                        roseType: "radius",
                        label: {
                            color: "#fff",
                        },
                        labelLine: {
                            lineStyle: {
                                color: "#888",
                            },
                        },
                        animationType: "scale",
                        animationEasing: "elasticOut",
                        animationDelay: function(idx) {
                            return Math.random() * 200;
                        },
                    },
                ],
            };
            // 基于准备好的dom，初始化this.$echarts实例
            this.myChart = this.$echarts.init(
                document.getElementById("chart_electricity1")
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
    padding-left: 19px;
    height: 100%;
    position: relative;
    // margin-top: 15px;
    background: rgb(1, 23, 68);
}
.title {
    font-size: 22px;
    color: #c6d6fb;
    padding: 11.5px 0 0 233px;
    cursor: pointer;
}
.content {
    margin-top: 12.5px;
    display: flex;
}
.ping-box {
    width: 620px;
    // height: 520px;
    height: 510px;
    .charts {
        width: 100%;
        height: 100%;
    }
}
.select-box {
    li {
        width: 99px;
        height: 33px;
        font-size: 20px;
        border: 1px solid #4f85ff;
        background: rgba(119, 161, 255, 0.14);
        box-shadow: 0.5px 0.5px 17.5px 0px rgba(88, 185, 255, 0.41) inset;
        text-align: center;
        line-height: 33px;
        margin-bottom: 40px;
    }
    li:last-child{
        visibility: hidden;
    }
    li.select {
        background:linear-gradient(to right,rgba(1,77,204,1),rgba(3,55,152,1)) !important;
    }
}
.info-box {
    width: 500px;
    height: 75px;
    // border: 1px solid #4f85ff;
    color: #72a4ff;
    display: flex;
    background: rgba(119, 161, 255, 0.04);
    // box-shadow: 0.5px 0.5px 17.5px 0px rgba(88, 185, 255, 0.41) inset;
    .name {
        width: 156px;
        height: 100%;
        font-size: 22px;
        text-align: center;
        line-height: 73px;
    }
    .info {
        margin-left: 6px;
        display: flex;
        flex-wrap: wrap;
        width: 342px;
        padding-top: 6px;
        .top {
            display: flex;
        }
        .bottom {
            display: flex;
        }
    }
    .block-box {
        font-size: 18px;
        span:nth-child(1) {
            display: inline-block;
            width: 42px;
            // height: 20px;
        }
        span:nth-child(2) {
            display: inline-block;
            width: 116px;
            height: 20px;
            font-size: 14px;
        }
        .max {
            width: 63px !important;
            // text-align: right;
        }
    }
}
</style>
