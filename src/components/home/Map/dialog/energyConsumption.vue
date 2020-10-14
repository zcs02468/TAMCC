<!-- T1航站楼能耗指标 -->
<template>
    <div class="panel right-container-angle">
        <div class="title" @click="closeMapDialog">T1航站楼能耗指标</div>
        <div class="box">
            <div class="radar-charts-box">
                <div class="charts" id="energy_consumption_radar1"></div>
                <div class="direction-box" :style="`${directionStyle}`" v-show="isShowDirection">
                    <div class="direction-left">
                        <div style="opacity:0">111</div>
                        <div v-for="(item) in radarIndicator" :key="item.name">{{item.name}}</div>
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
            <div class="line-charts-box">
                <div class="charts" id="energy_consumption_line1"></div>
            </div>
        </div>
    </div>
</template>

<script>
import {getEnergyIndex} from "@/axios"
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
            isShowDirection: false
        }
    },
    mounted() {
        this.drawRadarCharts();
        this.drawLineCharts();
        this.getData();
    },
    methods: {
        ...mapMutations(['closeMapDialog']),
        updateData() {
            this.getData();
        },
        async getData() {
            let [res] = await getEnergyIndex();
            // let res = {"result":"true","message":"{\"realisticList\":[{\"pageNo\":null,\"orderBy\":null,\"isNewRecord\":false,\"pageSize\":null,\"id\":\"1296701636868870144\",\"status\":null,\"remarks\":null,\"createByName\":null,\"createDate\":null,\"updateDate\":null,\"lastUpdateDateTime\":null,\"updateBy\":null,\"createBy\":null,\"updateByName\":null,\"realisticId\":\"1296701636868870144\",\"quotaKey\":\"指标A\",\"collectionDate\":\"2020-08-21\",\"realisticValue\":756.45,\"updateDate_between\":null,\"updateDate_gte\":null,\"status_in\":null,\"updateDate_lte\":null,\"createDate_between\":null,\"createDate_gte\":null,\"createDate_lte\":null,\"id_in\":null},{\"pageNo\":null,\"orderBy\":null,\"isNewRecord\":false,\"pageSize\":null,\"id\":\"1296701514160312320\",\"status\":null,\"remarks\":null,\"createByName\":null,\"createDate\":null,\"updateDate\":null,\"lastUpdateDateTime\":null,\"updateBy\":null,\"createBy\":null,\"updateByName\":null,\"realisticId\":\"1296701514160312320\",\"quotaKey\":\"指标A\",\"collectionDate\":\"2020-08-20\",\"realisticValue\":233.23,\"updateDate_between\":null,\"updateDate_gte\":null,\"status_in\":null,\"updateDate_lte\":null,\"createDate_between\":null,\"createDate_gte\":null,\"createDate_lte\":null,\"id_in\":null},{\"pageNo\":null,\"orderBy\":null,\"isNewRecord\":false,\"pageSize\":null,\"id\":\"1296701688853073920\",\"status\":null,\"remarks\":null,\"createByName\":null,\"createDate\":null,\"updateDate\":null,\"lastUpdateDateTime\":null,\"updateBy\":null,\"createBy\":null,\"updateByName\":null,\"realisticId\":\"1296701688853073920\",\"quotaKey\":\"指标A\",\"collectionDate\":\"2020-08-19\",\"realisticValue\":321.23,\"updateDate_between\":null,\"updateDate_gte\":null,\"status_in\":null,\"updateDate_lte\":null,\"createDate_between\":null,\"createDate_gte\":null,\"createDate_lte\":null,\"id_in\":null},{\"pageNo\":null,\"orderBy\":null,\"isNewRecord\":false,\"pageSize\":null,\"id\":\"1296701722151653376\",\"status\":null,\"remarks\":null,\"createByName\":null,\"createDate\":null,\"updateDate\":null,\"lastUpdateDateTime\":null,\"updateBy\":null,\"createBy\":null,\"updateByName\":null,\"realisticId\":\"1296701722151653376\",\"quotaKey\":\"指标A\",\"collectionDate\":\"2020-08-18\",\"realisticValue\":434.86,\"updateDate_between\":null,\"updateDate_gte\":null,\"status_in\":null,\"updateDate_lte\":null,\"createDate_between\":null,\"createDate_gte\":null,\"createDate_lte\":null,\"id_in\":null},{\"pageNo\":null,\"orderBy\":null,\"isNewRecord\":false,\"pageSize\":null,\"id\":\"1296701876804030464\",\"status\":null,\"remarks\":null,\"createByName\":null,\"createDate\":null,\"updateDate\":null,\"lastUpdateDateTime\":null,\"updateBy\":null,\"createBy\":null,\"updateByName\":null,\"realisticId\":\"1296701876804030464\",\"quotaKey\":\"指标A\",\"collectionDate\":\"2020-08-17\",\"realisticValue\":847.54,\"updateDate_between\":null,\"updateDate_gte\":null,\"status_in\":null,\"updateDate_lte\":null,\"createDate_between\":null,\"createDate_gte\":null,\"createDate_lte\":null,\"id_in\":null},{\"pageNo\":null,\"orderBy\":null,\"isNewRecord\":false,\"pageSize\":null,\"id\":\"1296701961084375040\",\"status\":null,\"remarks\":null,\"createByName\":null,\"createDate\":null,\"updateDate\":null,\"lastUpdateDateTime\":null,\"updateBy\":null,\"createBy\":null,\"updateByName\":null,\"realisticId\":\"1296701961084375040\",\"quotaKey\":\"指标A\",\"collectionDate\":\"2020-08-16\",\"realisticValue\":675.46,\"updateDate_between\":null,\"updateDate_gte\":null,\"status_in\":null,\"updateDate_lte\":null,\"createDate_between\":null,\"createDate_gte\":null,\"createDate_lte\":null,\"id_in\":null},{\"pageNo\":null,\"orderBy\":null,\"isNewRecord\":false,\"pageSize\":null,\"id\":\"1296702035478745088\",\"status\":null,\"remarks\":null,\"createByName\":null,\"createDate\":null,\"updateDate\":null,\"lastUpdateDateTime\":null,\"updateBy\":null,\"createBy\":null,\"updateByName\":null,\"realisticId\":\"1296702035478745088\",\"quotaKey\":\"指标A\",\"collectionDate\":\"2020-08-15\",\"realisticValue\":78.56,\"updateDate_between\":null,\"updateDate_gte\":null,\"status_in\":null,\"updateDate_lte\":null,\"createDate_between\":null,\"createDate_gte\":null,\"createDate_lte\":null,\"id_in\":null},{\"pageNo\":null,\"orderBy\":null,\"isNewRecord\":false,\"pageSize\":null,\"id\":\"1296613936839860224\",\"status\":null,\"remarks\":null,\"createByName\":null,\"createDate\":null,\"updateDate\":null,\"lastUpdateDateTime\":null,\"updateBy\":null,\"createBy\":null,\"updateByName\":null,\"realisticId\":\"1296613936839860224\",\"quotaKey\":\"指标B\",\"collectionDate\":\"2020-08-21\",\"realisticValue\":33.32,\"updateDate_between\":null,\"updateDate_gte\":null,\"status_in\":null,\"updateDate_lte\":null,\"createDate_between\":null,\"createDate_gte\":null,\"createDate_lte\":null,\"id_in\":null},{\"pageNo\":null,\"orderBy\":null,\"isNewRecord\":false,\"pageSize\":null,\"id\":\"1296702256745058304\",\"status\":null,\"remarks\":null,\"createByName\":null,\"createDate\":null,\"updateDate\":null,\"lastUpdateDateTime\":null,\"updateBy\":null,\"createBy\":null,\"updateByName\":null,\"realisticId\":\"1296702256745058304\",\"quotaKey\":\"指标B\",\"collectionDate\":\"2020-08-20\",\"realisticValue\":446.43,\"updateDate_between\":null,\"updateDate_gte\":null,\"status_in\":null,\"updateDate_lte\":null,\"createDate_between\":null,\"createDate_gte\":null,\"createDate_lte\":null,\"id_in\":null},{\"pageNo\":null,\"orderBy\":null,\"isNewRecord\":false,\"pageSize\":null,\"id\":\"1296702337015648256\",\"status\":null,\"remarks\":null,\"createByName\":null,\"createDate\":null,\"updateDate\":null,\"lastUpdateDateTime\":null,\"updateBy\":null,\"createBy\":null,\"updateByName\":null,\"realisticId\":\"1296702337015648256\",\"quotaKey\":\"指标B\",\"collectionDate\":\"2020-08-19\",\"realisticValue\":343.34,\"updateDate_between\":null,\"updateDate_gte\":null,\"status_in\":null,\"updateDate_lte\":null,\"createDate_between\":null,\"createDate_gte\":null,\"createDate_lte\":null,\"id_in\":null},{\"pageNo\":null,\"orderBy\":null,\"isNewRecord\":false,\"pageSize\":null,\"id\":\"1296702453315309568\",\"status\":null,\"remarks\":null,\"createByName\":null,\"createDate\":null,\"updateDate\":null,\"lastUpdateDateTime\":null,\"updateBy\":null,\"createBy\":null,\"updateByName\":null,\"realisticId\":\"1296702453315309568\",\"quotaKey\":\"指标B\",\"collectionDate\":\"2020-08-18\",\"realisticValue\":876.43,\"updateDate_between\":null,\"updateDate_gte\":null,\"status_in\":null,\"updateDate_lte\":null,\"createDate_between\":null,\"createDate_gte\":null,\"createDate_lte\":null,\"id_in\":null},{\"pageNo\":null,\"orderBy\":null,\"isNewRecord\":false,\"pageSize\":null,\"id\":\"1296702513851699200\",\"status\":null,\"remarks\":null,\"createByName\":null,\"createDate\":null,\"updateDate\":null,\"lastUpdateDateTime\":null,\"updateBy\":null,\"createBy\":null,\"updateByName\":null,\"realisticId\":\"1296702513851699200\",\"quotaKey\":\"指标B\",\"collectionDate\":\"2020-08-17\",\"realisticValue\":334.34,\"updateDate_between\":null,\"updateDate_gte\":null,\"status_in\":null,\"updateDate_lte\":null,\"createDate_between\":null,\"createDate_gte\":null,\"createDate_lte\":null,\"id_in\":null},{\"pageNo\":null,\"orderBy\":null,\"isNewRecord\":false,\"pageSize\":null,\"id\":\"1296702563763916800\",\"status\":null,\"remarks\":null,\"createByName\":null,\"createDate\":null,\"updateDate\":null,\"lastUpdateDateTime\":null,\"updateBy\":null,\"createBy\":null,\"updateByName\":null,\"realisticId\":\"1296702563763916800\",\"quotaKey\":\"指标B\",\"collectionDate\":\"2020-08-16\",\"realisticValue\":43.45,\"updateDate_between\":null,\"updateDate_gte\":null,\"status_in\":null,\"updateDate_lte\":null,\"createDate_between\":null,\"createDate_gte\":null,\"createDate_lte\":null,\"id_in\":null},{\"pageNo\":null,\"orderBy\":null,\"isNewRecord\":false,\"pageSize\":null,\"id\":\"1296702609494413312\",\"status\":null,\"remarks\":null,\"createByName\":null,\"createDate\":null,\"updateDate\":null,\"lastUpdateDateTime\":null,\"updateBy\":null,\"createBy\":null,\"updateByName\":null,\"realisticId\":\"1296702609494413312\",\"quotaKey\":\"指标B\",\"collectionDate\":\"2020-08-15\",\"realisticValue\":573.34,\"updateDate_between\":null,\"updateDate_gte\":null,\"status_in\":null,\"updateDate_lte\":null,\"createDate_between\":null,\"createDate_gte\":null,\"createDate_lte\":null,\"id_in\":null},{\"pageNo\":null,\"orderBy\":null,\"isNewRecord\":false,\"pageSize\":null,\"id\":\"1296702818597244928\",\"status\":null,\"remarks\":null,\"createByName\":null,\"createDate\":null,\"updateDate\":null,\"lastUpdateDateTime\":null,\"updateBy\":null,\"createBy\":null,\"updateByName\":null,\"realisticId\":\"1296702818597244928\",\"quotaKey\":\"指标C\",\"collectionDate\":\"2020-08-21\",\"realisticValue\":233.23,\"updateDate_between\":null,\"updateDate_gte\":null,\"status_in\":null,\"updateDate_lte\":null,\"createDate_between\":null,\"createDate_gte\":null,\"createDate_lte\":null,\"id_in\":null},{\"pageNo\":null,\"orderBy\":null,\"isNewRecord\":false,\"pageSize\":null,\"id\":\"1296702867142119424\",\"status\":null,\"remarks\":null,\"createByName\":null,\"createDate\":null,\"updateDate\":null,\"lastUpdateDateTime\":null,\"updateBy\":null,\"createBy\":null,\"updateByName\":null,\"realisticId\":\"1296702867142119424\",\"quotaKey\":\"指标C\",\"collectionDate\":\"2020-08-20\",\"realisticValue\":43.32,\"updateDate_between\":null,\"updateDate_gte\":null,\"status_in\":null,\"updateDate_lte\":null,\"createDate_between\":null,\"createDate_gte\":null,\"createDate_lte\":null,\"id_in\":null},{\"pageNo\":null,\"orderBy\":null,\"isNewRecord\":false,\"pageSize\":null,\"id\":\"1296702926944505856\",\"status\":null,\"remarks\":null,\"createByName\":null,\"createDate\":null,\"updateDate\":null,\"lastUpdateDateTime\":null,\"updateBy\":null,\"createBy\":null,\"updateByName\":null,\"realisticId\":\"1296702926944505856\",\"quotaKey\":\"指标C\",\"collectionDate\":\"2020-08-19\",\"realisticValue\":321.23,\"updateDate_between\":null,\"updateDate_gte\":null,\"status_in\":null,\"updateDate_lte\":null,\"createDate_between\":null,\"createDate_gte\":null,\"createDate_lte\":null,\"id_in\":null},{\"pageNo\":null,\"orderBy\":null,\"isNewRecord\":false,\"pageSize\":null,\"id\":\"1296702969734795264\",\"status\":null,\"remarks\":null,\"createByName\":null,\"createDate\":null,\"updateDate\":null,\"lastUpdateDateTime\":null,\"updateBy\":null,\"createBy\":null,\"updateByName\":null,\"realisticId\":\"1296702969734795264\",\"quotaKey\":\"指标C\",\"collectionDate\":\"2020-08-18\",\"realisticValue\":123.12,\"updateDate_between\":null,\"updateDate_gte\":null,\"status_in\":null,\"updateDate_lte\":null,\"createDate_between\":null,\"createDate_gte\":null,\"createDate_lte\":null,\"id_in\":null},{\"pageNo\":null,\"orderBy\":null,\"isNewRecord\":false,\"pageSize\":null,\"id\":\"1296703019789619200\",\"status\":null,\"remarks\":null,\"createByName\":null,\"createDate\":null,\"updateDate\":null,\"lastUpdateDateTime\":null,\"updateBy\":null,\"createBy\":null,\"updateByName\":null,\"realisticId\":\"1296703019789619200\",\"quotaKey\":\"指标C\",\"collectionDate\":\"2020-08-17\",\"realisticValue\":33.32,\"updateDate_between\":null,\"updateDate_gte\":null,\"status_in\":null,\"updateDate_lte\":null,\"createDate_between\":null,\"createDate_gte\":null,\"createDate_lte\":null,\"id_in\":null},{\"pageNo\":null,\"orderBy\":null,\"isNewRecord\":false,\"pageSize\":null,\"id\":\"1296703056389115904\",\"status\":null,\"remarks\":null,\"createByName\":null,\"createDate\":null,\"updateDate\":null,\"lastUpdateDateTime\":null,\"updateBy\":null,\"createBy\":null,\"updateByName\":null,\"realisticId\":\"1296703056389115904\",\"quotaKey\":\"指标C\",\"collectionDate\":\"2020-08-16\",\"realisticValue\":756.45,\"updateDate_between\":null,\"updateDate_gte\":null,\"status_in\":null,\"updateDate_lte\":null,\"createDate_between\":null,\"createDate_gte\":null,\"createDate_lte\":null,\"id_in\":null},{\"pageNo\":null,\"orderBy\":null,\"isNewRecord\":false,\"pageSize\":null,\"id\":\"1296703091856150528\",\"status\":null,\"remarks\":null,\"createByName\":null,\"createDate\":null,\"updateDate\":null,\"lastUpdateDateTime\":null,\"updateBy\":null,\"createBy\":null,\"updateByName\":null,\"realisticId\":\"1296703091856150528\",\"quotaKey\":\"指标C\",\"collectionDate\":\"2020-08-15\",\"realisticValue\":321.23,\"updateDate_between\":null,\"updateDate_gte\":null,\"status_in\":null,\"updateDate_lte\":null,\"createDate_between\":null,\"createDate_gte\":null,\"createDate_lte\":null,\"id_in\":null}],\"quotaList\":[{\"pageNo\":null,\"orderBy\":null,\"isNewRecord\":false,\"pageSize\":null,\"id\":\"1314490334863085568\",\"status\":null,\"remarks\":null,\"createByName\":null,\"createDate\":null,\"updateDate\":null,\"lastUpdateDateTime\":null,\"updateBy\":null,\"createBy\":null,\"updateByName\":null,\"quotaId\":\"1314490334863085568\",\"quotaKey\":\"ECAh\",\"quotaValue\":123.0,\"factValue\":123.0,\"updateDate_between\":null,\"updateDate_gte\":null,\"status_in\":null,\"updateDate_lte\":null,\"createDate_between\":null,\"createDate_gte\":null,\"createDate_lte\":null,\"id_in\":null},{\"pageNo\":null,\"orderBy\":null,\"isNewRecord\":false,\"pageSize\":null,\"id\":\"1314489776798355456\",\"status\":null,\"remarks\":null,\"createByName\":null,\"createDate\":null,\"updateDate\":null,\"lastUpdateDateTime\":null,\"updateBy\":null,\"createBy\":null,\"updateByName\":null,\"quotaId\":\"1314489776798355456\",\"quotaKey\":\"HCA\",\"quotaValue\":213.0,\"factValue\":213.0,\"updateDate_between\":null,\"updateDate_gte\":null,\"status_in\":null,\"updateDate_lte\":null,\"createDate_between\":null,\"createDate_gte\":null,\"createDate_lte\":null,\"id_in\":null},{\"pageNo\":null,\"orderBy\":null,\"isNewRecord\":false,\"pageSize\":null,\"id\":\"1314488531564023808\",\"status\":null,\"remarks\":null,\"createByName\":null,\"createDate\":null,\"updateDate\":null,\"lastUpdateDateTime\":null,\"updateBy\":null,\"createBy\":null,\"updateByName\":null,\"quotaId\":\"1314488531564023808\",\"quotaKey\":\"ECAc\",\"quotaValue\":45.0,\"factValue\":50.0,\"updateDate_between\":null,\"updateDate_gte\":null,\"status_in\":null,\"updateDate_lte\":null,\"createDate_between\":null,\"createDate_gte\":null,\"createDate_lte\":null,\"id_in\":null},{\"pageNo\":null,\"orderBy\":null,\"isNewRecord\":false,\"pageSize\":null,\"id\":\"1314488322331168768\",\"status\":null,\"remarks\":null,\"createByName\":null,\"createDate\":null,\"updateDate\":null,\"lastUpdateDateTime\":null,\"updateBy\":null,\"createBy\":null,\"updateByName\":null,\"quotaId\":\"1314488322331168768\",\"quotaKey\":\"CCA\",\"quotaValue\":31.0,\"factValue\":23.0,\"updateDate_between\":null,\"updateDate_gte\":null,\"status_in\":null,\"updateDate_lte\":null,\"createDate_between\":null,\"createDate_gte\":null,\"createDate_lte\":null,\"id_in\":null},{\"pageNo\":null,\"orderBy\":null,\"isNewRecord\":false,\"pageSize\":null,\"id\":\"1314488159835443200\",\"status\":null,\"remarks\":null,\"createByName\":null,\"createDate\":null,\"updateDate\":null,\"lastUpdateDateTime\":null,\"updateBy\":null,\"createBy\":null,\"updateByName\":null,\"quotaId\":\"1314488159835443200\",\"quotaKey\":\"EUPe\",\"quotaValue\":123.0,\"factValue\":122.0,\"updateDate_between\":null,\"updateDate_gte\":null,\"status_in\":null,\"updateDate_lte\":null,\"createDate_between\":null,\"createDate_gte\":null,\"createDate_lte\":null,\"id_in\":null},{\"pageNo\":null,\"orderBy\":null,\"isNewRecord\":false,\"pageSize\":null,\"id\":\"1296701276817231872\",\"status\":null,\"remarks\":null,\"createByName\":null,\"createDate\":null,\"updateDate\":null,\"lastUpdateDateTime\":null,\"updateBy\":null,\"createBy\":null,\"updateByName\":null,\"quotaId\":\"1296701276817231872\",\"quotaKey\":\"EUI\",\"quotaValue\":344.23,\"factValue\":365.44,\"updateDate_between\":null,\"updateDate_gte\":null,\"status_in\":null,\"updateDate_lte\":null,\"createDate_between\":null,\"createDate_gte\":null,\"createDate_lte\":null,\"id_in\":null},{\"pageNo\":null,\"orderBy\":null,\"isNewRecord\":false,\"pageSize\":null,\"id\":\"1296696859413680128\",\"status\":null,\"remarks\":null,\"createByName\":null,\"createDate\":null,\"updateDate\":null,\"lastUpdateDateTime\":null,\"updateBy\":null,\"createBy\":null,\"updateByName\":null,\"quotaId\":\"1296696859413680128\",\"quotaKey\":\"EUIe\",\"quotaValue\":123.23,\"factValue\":110.12,\"updateDate_between\":null,\"updateDate_gte\":null,\"status_in\":null,\"updateDate_lte\":null,\"createDate_between\":null,\"createDate_gte\":null,\"createDate_lte\":null,\"id_in\":null},{\"pageNo\":null,\"orderBy\":null,\"isNewRecord\":false,\"pageSize\":null,\"id\":\"1291208784335327232\",\"status\":null,\"remarks\":null,\"createByName\":null,\"createDate\":null,\"updateDate\":null,\"lastUpdateDateTime\":null,\"updateBy\":null,\"createBy\":null,\"updateByName\":null,\"quotaId\":\"1291208784335327232\",\"quotaKey\":\"EUP\",\"quotaValue\":456.0,\"factValue\":443.54,\"updateDate_between\":null,\"updateDate_gte\":null,\"status_in\":null,\"updateDate_lte\":null,\"createDate_between\":null,\"createDate_gte\":null,\"createDate_lte\":null,\"id_in\":null}]}"}
            let {quotaList,realisticList} = JSON.parse( res.message );
            // let {radarIndicator,radarChartsSeries0,radarChartsSeries1} = this.getRadarChartsData(quotaList);
            let {radarIndicator,radarChartsSeries0,radarChartsSeries1,quotaArr,factArr} = this.getRadarChartsData(quotaList);

            
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
            this.myRadarChart.setOption(this.radarOption);

            let {xAxisLine,yAxisLine} = this.getLineChartsData(realisticList,radarIndicator);
            console.log( 'yAxisLineyAxisLine',xAxisLine, yAxisLine );
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
            data.forEach(item => {
                // radarChartsSeries0.push(item.quotaValue);
                // radarChartsSeries1.push(item.factValue);
                // radarIndicator.push({
                //     name: item.quotaKey,
                //     min: 0,
                // })
                quotaArr.push( item.quotaValue );
                factArr.push( item.factValue );
                let num = Math.round((item.factValue/item.quotaValue) * 1000) / 1000;
                radarChartsSeries0.push(100);
                radarChartsSeries1.push(num*100);
                radarIndicator.push({
                    name: item.quotaKey,
                    min: 0,
                })
            });
            return {radarIndicator,radarChartsSeries0,radarChartsSeries1,quotaArr,factArr};
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
                    selectedMode:false,
                    // icon: "circle",
                    // left: "10%",
                    // top: "6%",
                    right:"6%",
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
                        radius: "75%",
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
                document.getElementById("energy_consumption_radar1")
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
            this.lineOption = {
                tooltip: {
                    trigger: "axis",
                },
                grid: {
                    top: "10%",
                    left: "5%",
                    right: "5%",
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
                series: [ ],
            };
            // 基于准备好的dom，初始化this.$echarts实例
            this.myLineChart = this.$echarts.init(
                document.getElementById("energy_consumption_line1")
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
        }
    },
};
</script>

<style lang="scss" scoped>
.panel {
    // width: 537.5px;
    // height: 238.5px;
    width: 100%;
    height: 100%;
    position: relative;
    background: rgb(1, 23, 68);
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
    // display: flex;
}
.radar-charts-box {
    // width: 269px;
    // width: 381.5px;
    width: 100%;
    // height: 190px;
    height: 314px;
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
    // width: 268px;
    // width: 381.5px;
    width: 100%;
    // height: 190px;
    height: 314px;
    .charts {
        width: 100%;
        height: 100%;
    }
}
</style>
