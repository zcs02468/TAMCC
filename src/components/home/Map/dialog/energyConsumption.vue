<!-- T1航站楼能耗指标 -->
<template>
    <div class="panel right-container-angle">
        <div class="title" @click="closeMapDialog">T1航站楼能耗指标</div>
        <div class="box">
            <div class="radar-charts-box">
                <div class="charts" id="energy_consumption_radar1"></div>
                <div class="options-box">
                    <div v-for="(item) in options" :key="item.key">
                        <span class="options-key">{{item.key}}:</span>
                        <span>{{item.value}}</span>
                    </div>
                </div>
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
            isShowDirection: false,
            options:[]
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
            // let [res] = await getEnergyIndex();
            let res = {"result":"true","message":"{\"realisticList\":[{\"pageNo\":null,\"isNewRecord\":false,\"orderBy\":null,\"pageSize\":null,\"id\":\"1314815658764414976\",\"createByName\":null,\"updateBy\":null,\"status\":null,\"updateByName\":null,\"createBy\":null,\"lastUpdateDateTime\":null,\"createDate\":null,\"remarks\":null,\"updateDate\":null,\"realisticId\":\"1314815658764414976\",\"quotaName\":\"指标1\",\"quotaKey\":\"EUI\",\"collectionDate\":\"2020-08-01 00:00:00\",\"realisticValue\":199.0,\"updateDate_lte\":null,\"createDate_between\":null,\"createDate_gte\":null,\"createDate_lte\":null,\"updateDate_between\":null,\"updateDate_gte\":null,\"status_in\":null,\"id_in\":null},{\"pageNo\":null,\"isNewRecord\":false,\"orderBy\":null,\"pageSize\":null,\"id\":\"1314815774543982592\",\"createByName\":null,\"updateBy\":null,\"status\":null,\"updateByName\":null,\"createBy\":null,\"lastUpdateDateTime\":null,\"createDate\":null,\"remarks\":null,\"updateDate\":null,\"realisticId\":\"1314815774543982592\",\"quotaName\":\"指标1\",\"quotaKey\":\"EUI\",\"collectionDate\":\"2020-07-01 00:00:00\",\"realisticValue\":191.0,\"updateDate_lte\":null,\"createDate_between\":null,\"createDate_gte\":null,\"createDate_lte\":null,\"updateDate_between\":null,\"updateDate_gte\":null,\"status_in\":null,\"id_in\":null},{\"pageNo\":null,\"isNewRecord\":false,\"orderBy\":null,\"pageSize\":null,\"id\":\"1314815590053326848\",\"createByName\":null,\"updateBy\":null,\"status\":null,\"updateByName\":null,\"createBy\":null,\"lastUpdateDateTime\":null,\"createDate\":null,\"remarks\":null,\"updateDate\":null,\"realisticId\":\"1314815590053326848\",\"quotaName\":\"指标1\",\"quotaKey\":\"EUI\",\"collectionDate\":\"2020-06-01 00:00:00\",\"realisticValue\":170.0,\"updateDate_lte\":null,\"createDate_between\":null,\"createDate_gte\":null,\"createDate_lte\":null,\"updateDate_between\":null,\"updateDate_gte\":null,\"status_in\":null,\"id_in\":null},{\"pageNo\":null,\"isNewRecord\":false,\"orderBy\":null,\"pageSize\":null,\"id\":\"1314815404216299520\",\"createByName\":null,\"updateBy\":null,\"status\":null,\"updateByName\":null,\"createBy\":null,\"lastUpdateDateTime\":null,\"createDate\":null,\"remarks\":null,\"updateDate\":null,\"realisticId\":\"1314815404216299520\",\"quotaName\":\"指标1\",\"quotaKey\":\"EUI\",\"collectionDate\":\"2020-05-01 00:00:00\",\"realisticValue\":181.0,\"updateDate_lte\":null,\"createDate_between\":null,\"createDate_gte\":null,\"createDate_lte\":null,\"updateDate_between\":null,\"updateDate_gte\":null,\"status_in\":null,\"id_in\":null},{\"pageNo\":null,\"isNewRecord\":false,\"orderBy\":null,\"pageSize\":null,\"id\":\"1314815167120683008\",\"createByName\":null,\"updateBy\":null,\"status\":null,\"updateByName\":null,\"createBy\":null,\"lastUpdateDateTime\":null,\"createDate\":null,\"remarks\":null,\"updateDate\":null,\"realisticId\":\"1314815167120683008\",\"quotaName\":\"指标1\",\"quotaKey\":\"EUI\",\"collectionDate\":\"2020-04-01 00:00:00\",\"realisticValue\":187.0,\"updateDate_lte\":null,\"createDate_between\":null,\"createDate_gte\":null,\"createDate_lte\":null,\"updateDate_between\":null,\"updateDate_gte\":null,\"status_in\":null,\"id_in\":null},{\"pageNo\":null,\"isNewRecord\":false,\"orderBy\":null,\"pageSize\":null,\"id\":\"1296701514160312320\",\"createByName\":null,\"updateBy\":null,\"status\":null,\"updateByName\":null,\"createBy\":null,\"lastUpdateDateTime\":null,\"createDate\":null,\"remarks\":null,\"updateDate\":null,\"realisticId\":\"1296701514160312320\",\"quotaName\":\"指标1\",\"quotaKey\":\"EUI\",\"collectionDate\":\"2020-03-01 00:00:00\",\"realisticValue\":181.0,\"updateDate_lte\":null,\"createDate_between\":null,\"createDate_gte\":null,\"createDate_lte\":null,\"updateDate_between\":null,\"updateDate_gte\":null,\"status_in\":null,\"id_in\":null},{\"pageNo\":null,\"isNewRecord\":false,\"orderBy\":null,\"pageSize\":null,\"id\":\"1296701636868870144\",\"createByName\":null,\"updateBy\":null,\"status\":null,\"updateByName\":null,\"createBy\":null,\"lastUpdateDateTime\":null,\"createDate\":null,\"remarks\":null,\"updateDate\":null,\"realisticId\":\"1296701636868870144\",\"quotaName\":\"指标1\",\"quotaKey\":\"EUI\",\"collectionDate\":\"2020-02-01 00:00:00\",\"realisticValue\":192.0,\"updateDate_lte\":null,\"createDate_between\":null,\"createDate_gte\":null,\"createDate_lte\":null,\"updateDate_between\":null,\"updateDate_gte\":null,\"status_in\":null,\"id_in\":null},{\"pageNo\":null,\"isNewRecord\":false,\"orderBy\":null,\"pageSize\":null,\"id\":\"1296702818597244928\",\"createByName\":null,\"updateBy\":null,\"status\":null,\"updateByName\":null,\"createBy\":null,\"lastUpdateDateTime\":null,\"createDate\":null,\"remarks\":null,\"updateDate\":null,\"realisticId\":\"1296702818597244928\",\"quotaName\":\"指标1\",\"quotaKey\":\"EUIe\",\"collectionDate\":\"2020-08-01 00:00:00\",\"realisticValue\":233.23,\"updateDate_lte\":null,\"createDate_between\":null,\"createDate_gte\":null,\"createDate_lte\":null,\"updateDate_between\":null,\"updateDate_gte\":null,\"status_in\":null,\"id_in\":null},{\"pageNo\":null,\"isNewRecord\":false,\"orderBy\":null,\"pageSize\":null,\"id\":\"1296702867142119424\",\"createByName\":null,\"updateBy\":null,\"status\":null,\"updateByName\":null,\"createBy\":null,\"lastUpdateDateTime\":null,\"createDate\":null,\"remarks\":null,\"updateDate\":null,\"realisticId\":\"1296702867142119424\",\"quotaName\":\"指标1\",\"quotaKey\":\"EUIe\",\"collectionDate\":\"2020-07-01 00:00:00\",\"realisticValue\":43.32,\"updateDate_lte\":null,\"createDate_between\":null,\"createDate_gte\":null,\"createDate_lte\":null,\"updateDate_between\":null,\"updateDate_gte\":null,\"status_in\":null,\"id_in\":null},{\"pageNo\":null,\"isNewRecord\":false,\"orderBy\":null,\"pageSize\":null,\"id\":\"1296702926944505856\",\"createByName\":null,\"updateBy\":null,\"status\":null,\"updateByName\":null,\"createBy\":null,\"lastUpdateDateTime\":null,\"createDate\":null,\"remarks\":null,\"updateDate\":null,\"realisticId\":\"1296702926944505856\",\"quotaName\":\"指标1\",\"quotaKey\":\"EUIe\",\"collectionDate\":\"2020-06-01 00:00:00\",\"realisticValue\":321.23,\"updateDate_lte\":null,\"createDate_between\":null,\"createDate_gte\":null,\"createDate_lte\":null,\"updateDate_between\":null,\"updateDate_gte\":null,\"status_in\":null,\"id_in\":null},{\"pageNo\":null,\"isNewRecord\":false,\"orderBy\":null,\"pageSize\":null,\"id\":\"1296702969734795264\",\"createByName\":null,\"updateBy\":null,\"status\":null,\"updateByName\":null,\"createBy\":null,\"lastUpdateDateTime\":null,\"createDate\":null,\"remarks\":null,\"updateDate\":null,\"realisticId\":\"1296702969734795264\",\"quotaName\":\"指标1\",\"quotaKey\":\"EUIe\",\"collectionDate\":\"2020-05-01 00:00:00\",\"realisticValue\":123.12,\"updateDate_lte\":null,\"createDate_between\":null,\"createDate_gte\":null,\"createDate_lte\":null,\"updateDate_between\":null,\"updateDate_gte\":null,\"status_in\":null,\"id_in\":null},{\"pageNo\":null,\"isNewRecord\":false,\"orderBy\":null,\"pageSize\":null,\"id\":\"1296703019789619200\",\"createByName\":null,\"updateBy\":null,\"status\":null,\"updateByName\":null,\"createBy\":null,\"lastUpdateDateTime\":null,\"createDate\":null,\"remarks\":null,\"updateDate\":null,\"realisticId\":\"1296703019789619200\",\"quotaName\":\"指标1\",\"quotaKey\":\"EUIe\",\"collectionDate\":\"2020-04-01 00:00:00\",\"realisticValue\":33.32,\"updateDate_lte\":null,\"createDate_between\":null,\"createDate_gte\":null,\"createDate_lte\":null,\"updateDate_between\":null,\"updateDate_gte\":null,\"status_in\":null,\"id_in\":null},{\"pageNo\":null,\"isNewRecord\":false,\"orderBy\":null,\"pageSize\":null,\"id\":\"1296703056389115904\",\"createByName\":null,\"updateBy\":null,\"status\":null,\"updateByName\":null,\"createBy\":null,\"lastUpdateDateTime\":null,\"createDate\":null,\"remarks\":null,\"updateDate\":null,\"realisticId\":\"1296703056389115904\",\"quotaName\":\"指标1\",\"quotaKey\":\"EUIe\",\"collectionDate\":\"2020-03-01 00:00:00\",\"realisticValue\":756.45,\"updateDate_lte\":null,\"createDate_between\":null,\"createDate_gte\":null,\"createDate_lte\":null,\"updateDate_between\":null,\"updateDate_gte\":null,\"status_in\":null,\"id_in\":null},{\"pageNo\":null,\"isNewRecord\":false,\"orderBy\":null,\"pageSize\":null,\"id\":\"1296703091856150528\",\"createByName\":null,\"updateBy\":null,\"status\":null,\"updateByName\":null,\"createBy\":null,\"lastUpdateDateTime\":null,\"createDate\":null,\"remarks\":null,\"updateDate\":null,\"realisticId\":\"1296703091856150528\",\"quotaName\":\"指标1\",\"quotaKey\":\"EUIe\",\"collectionDate\":\"2020-02-01 00:00:00\",\"realisticValue\":321.23,\"updateDate_lte\":null,\"createDate_between\":null,\"createDate_gte\":null,\"createDate_lte\":null,\"updateDate_between\":null,\"updateDate_gte\":null,\"status_in\":null,\"id_in\":null},{\"pageNo\":null,\"isNewRecord\":false,\"orderBy\":null,\"pageSize\":null,\"id\":\"1314818135320571904\",\"createByName\":null,\"updateBy\":null,\"status\":null,\"updateByName\":null,\"createBy\":null,\"lastUpdateDateTime\":null,\"createDate\":null,\"remarks\":null,\"updateDate\":null,\"realisticId\":\"1314818135320571904\",\"quotaName\":\"指标1\",\"quotaKey\":\"EUP\",\"collectionDate\":\"2020-08-01 00:00:00\",\"realisticValue\":352.0,\"updateDate_lte\":null,\"createDate_between\":null,\"createDate_gte\":null,\"createDate_lte\":null,\"updateDate_between\":null,\"updateDate_gte\":null,\"status_in\":null,\"id_in\":null},{\"pageNo\":null,\"isNewRecord\":false,\"orderBy\":null,\"pageSize\":null,\"id\":\"1314818070124310528\",\"createByName\":null,\"updateBy\":null,\"status\":null,\"updateByName\":null,\"createBy\":null,\"lastUpdateDateTime\":null,\"createDate\":null,\"remarks\":null,\"updateDate\":null,\"realisticId\":\"1314818070124310528\",\"quotaName\":\"指标1\",\"quotaKey\":\"EUP\",\"collectionDate\":\"2020-07-01 00:00:00\",\"realisticValue\":332.0,\"updateDate_lte\":null,\"createDate_between\":null,\"createDate_gte\":null,\"createDate_lte\":null,\"updateDate_between\":null,\"updateDate_gte\":null,\"status_in\":null,\"id_in\":null},{\"pageNo\":null,\"isNewRecord\":false,\"orderBy\":null,\"pageSize\":null,\"id\":\"1314817940671311872\",\"createByName\":null,\"updateBy\":null,\"status\":null,\"updateByName\":null,\"createBy\":null,\"lastUpdateDateTime\":null,\"createDate\":null,\"remarks\":null,\"updateDate\":null,\"realisticId\":\"1314817940671311872\",\"quotaName\":\"指标1\",\"quotaKey\":\"EUP\",\"collectionDate\":\"2020-06-01 00:00:00\",\"realisticValue\":292.0,\"updateDate_lte\":null,\"createDate_between\":null,\"createDate_gte\":null,\"createDate_lte\":null,\"updateDate_between\":null,\"updateDate_gte\":null,\"status_in\":null,\"id_in\":null},{\"pageNo\":null,\"isNewRecord\":false,\"orderBy\":null,\"pageSize\":null,\"id\":\"1314817851361996800\",\"createByName\":null,\"updateBy\":null,\"status\":null,\"updateByName\":null,\"createBy\":null,\"lastUpdateDateTime\":null,\"createDate\":null,\"remarks\":null,\"updateDate\":null,\"realisticId\":\"1314817851361996800\",\"quotaName\":\"指标1\",\"quotaKey\":\"EUP\",\"collectionDate\":\"2020-05-01 00:00:00\",\"realisticValue\":232.0,\"updateDate_lte\":null,\"createDate_between\":null,\"createDate_gte\":null,\"createDate_lte\":null,\"updateDate_between\":null,\"updateDate_gte\":null,\"status_in\":null,\"id_in\":null},{\"pageNo\":null,\"isNewRecord\":false,\"orderBy\":null,\"pageSize\":null,\"id\":\"1314817761662611456\",\"createByName\":null,\"updateBy\":null,\"status\":null,\"updateByName\":null,\"createBy\":null,\"lastUpdateDateTime\":null,\"createDate\":null,\"remarks\":null,\"updateDate\":null,\"realisticId\":\"1314817761662611456\",\"quotaName\":\"指标1\",\"quotaKey\":\"EUP\",\"collectionDate\":\"2020-04-01 00:00:00\",\"realisticValue\":234.0,\"updateDate_lte\":null,\"createDate_between\":null,\"createDate_gte\":null,\"createDate_lte\":null,\"updateDate_between\":null,\"updateDate_gte\":null,\"status_in\":null,\"id_in\":null},{\"pageNo\":null,\"isNewRecord\":false,\"orderBy\":null,\"pageSize\":null,\"id\":\"1314817399807422464\",\"createByName\":null,\"updateBy\":null,\"status\":null,\"updateByName\":null,\"createBy\":null,\"lastUpdateDateTime\":null,\"createDate\":null,\"remarks\":null,\"updateDate\":null,\"realisticId\":\"1314817399807422464\",\"quotaName\":\"指标1\",\"quotaKey\":\"EUP\",\"collectionDate\":\"2020-03-01 00:00:00\",\"realisticValue\":321.0,\"updateDate_lte\":null,\"createDate_between\":null,\"createDate_gte\":null,\"createDate_lte\":null,\"updateDate_between\":null,\"updateDate_gte\":null,\"status_in\":null,\"id_in\":null},{\"pageNo\":null,\"isNewRecord\":false,\"orderBy\":null,\"pageSize\":null,\"id\":\"1314817307604037632\",\"createByName\":null,\"updateBy\":null,\"status\":null,\"updateByName\":null,\"createBy\":null,\"lastUpdateDateTime\":null,\"createDate\":null,\"remarks\":null,\"updateDate\":null,\"realisticId\":\"1314817307604037632\",\"quotaName\":\"指标1\",\"quotaKey\":\"EUP\",\"collectionDate\":\"2020-02-01 00:00:00\",\"realisticValue\":279.0,\"updateDate_lte\":null,\"createDate_between\":null,\"createDate_gte\":null,\"createDate_lte\":null,\"updateDate_between\":null,\"updateDate_gte\":null,\"status_in\":null,\"id_in\":null},{\"pageNo\":null,\"isNewRecord\":false,\"orderBy\":null,\"pageSize\":null,\"id\":\"1314842618982969344\",\"createByName\":null,\"updateBy\":null,\"status\":null,\"updateByName\":null,\"createBy\":null,\"lastUpdateDateTime\":null,\"createDate\":null,\"remarks\":null,\"updateDate\":null,\"realisticId\":\"1314842618982969344\",\"quotaName\":\"指标1\",\"quotaKey\":\"EUPe\",\"collectionDate\":\"2020-08-01 00:00:00\",\"realisticValue\":213.0,\"updateDate_lte\":null,\"createDate_between\":null,\"createDate_gte\":null,\"createDate_lte\":null,\"updateDate_between\":null,\"updateDate_gte\":null,\"status_in\":null,\"id_in\":null},{\"pageNo\":null,\"isNewRecord\":false,\"orderBy\":null,\"pageSize\":null,\"id\":\"1314842666114363392\",\"createByName\":null,\"updateBy\":null,\"status\":null,\"updateByName\":null,\"createBy\":null,\"lastUpdateDateTime\":null,\"createDate\":null,\"remarks\":null,\"updateDate\":null,\"realisticId\":\"1314842666114363392\",\"quotaName\":\"指标1\",\"quotaKey\":\"EUPe\",\"collectionDate\":\"2020-07-01 00:00:00\",\"realisticValue\":123.0,\"updateDate_lte\":null,\"createDate_between\":null,\"createDate_gte\":null,\"createDate_lte\":null,\"updateDate_between\":null,\"updateDate_gte\":null,\"status_in\":null,\"id_in\":null},{\"pageNo\":null,\"isNewRecord\":false,\"orderBy\":null,\"pageSize\":null,\"id\":\"1314842724872368128\",\"createByName\":null,\"updateBy\":null,\"status\":null,\"updateByName\":null,\"createBy\":null,\"lastUpdateDateTime\":null,\"createDate\":null,\"remarks\":null,\"updateDate\":null,\"realisticId\":\"1314842724872368128\",\"quotaName\":\"指标1\",\"quotaKey\":\"EUPe\",\"collectionDate\":\"2020-06-01 00:00:00\",\"realisticValue\":213.0,\"updateDate_lte\":null,\"createDate_between\":null,\"createDate_gte\":null,\"createDate_lte\":null,\"updateDate_between\":null,\"updateDate_gte\":null,\"status_in\":null,\"id_in\":null},{\"pageNo\":null,\"isNewRecord\":false,\"orderBy\":null,\"pageSize\":null,\"id\":\"1314843134848806912\",\"createByName\":null,\"updateBy\":null,\"status\":null,\"updateByName\":null,\"createBy\":null,\"lastUpdateDateTime\":null,\"createDate\":null,\"remarks\":null,\"updateDate\":null,\"realisticId\":\"1314843134848806912\",\"quotaName\":\"指标1\",\"quotaKey\":\"EUPe\",\"collectionDate\":\"2020-05-01 00:00:00\",\"realisticValue\":221.0,\"updateDate_lte\":null,\"createDate_between\":null,\"createDate_gte\":null,\"createDate_lte\":null,\"updateDate_between\":null,\"updateDate_gte\":null,\"status_in\":null,\"id_in\":null},{\"pageNo\":null,\"isNewRecord\":false,\"orderBy\":null,\"pageSize\":null,\"id\":\"1314843032583286784\",\"createByName\":null,\"updateBy\":null,\"status\":null,\"updateByName\":null,\"createBy\":null,\"lastUpdateDateTime\":null,\"createDate\":null,\"remarks\":null,\"updateDate\":null,\"realisticId\":\"1314843032583286784\",\"quotaName\":\"指标1\",\"quotaKey\":\"EUPe\",\"collectionDate\":\"2020-04-01 00:00:00\",\"realisticValue\":123.0,\"updateDate_lte\":null,\"createDate_between\":null,\"createDate_gte\":null,\"createDate_lte\":null,\"updateDate_between\":null,\"updateDate_gte\":null,\"status_in\":null,\"id_in\":null},{\"pageNo\":null,\"isNewRecord\":false,\"orderBy\":null,\"pageSize\":null,\"id\":\"1314842957744320512\",\"createByName\":null,\"updateBy\":null,\"status\":null,\"updateByName\":null,\"createBy\":null,\"lastUpdateDateTime\":null,\"createDate\":null,\"remarks\":null,\"updateDate\":null,\"realisticId\":\"1314842957744320512\",\"quotaName\":\"指标1\",\"quotaKey\":\"EUPe\",\"collectionDate\":\"2020-03-01 00:00:00\",\"realisticValue\":321.0,\"updateDate_lte\":null,\"createDate_between\":null,\"createDate_gte\":null,\"createDate_lte\":null,\"updateDate_between\":null,\"updateDate_gte\":null,\"status_in\":null,\"id_in\":null},{\"pageNo\":null,\"isNewRecord\":false,\"orderBy\":null,\"pageSize\":null,\"id\":\"1314842910835224576\",\"createByName\":null,\"updateBy\":null,\"status\":null,\"updateByName\":null,\"createBy\":null,\"lastUpdateDateTime\":null,\"createDate\":null,\"remarks\":null,\"updateDate\":null,\"realisticId\":\"1314842910835224576\",\"quotaName\":\"指标1\",\"quotaKey\":\"EUPe\",\"collectionDate\":\"2020-02-01 00:00:00\",\"realisticValue\":321.0,\"updateDate_lte\":null,\"createDate_between\":null,\"createDate_gte\":null,\"createDate_lte\":null,\"updateDate_between\":null,\"updateDate_gte\":null,\"status_in\":null,\"id_in\":null}],\"quotaList\":[{\"pageNo\":null,\"isNewRecord\":false,\"orderBy\":null,\"pageSize\":null,\"id\":\"1314490334863085568\",\"createByName\":null,\"updateBy\":null,\"status\":null,\"updateByName\":null,\"createBy\":null,\"lastUpdateDateTime\":null,\"createDate\":null,\"remarks\":null,\"updateDate\":null,\"quotaId\":\"1314490334863085568\",\"quotaName\":\"指标1\",\"quotaKey\":\"ECAh\",\"quotaValue\":123.0,\"factValue\":123.0,\"updateDate_lte\":null,\"createDate_between\":null,\"createDate_gte\":null,\"createDate_lte\":null,\"updateDate_between\":null,\"updateDate_gte\":null,\"status_in\":null,\"id_in\":null},{\"pageNo\":null,\"isNewRecord\":false,\"orderBy\":null,\"pageSize\":null,\"id\":\"1314489776798355456\",\"createByName\":null,\"updateBy\":null,\"status\":null,\"updateByName\":null,\"createBy\":null,\"lastUpdateDateTime\":null,\"createDate\":null,\"remarks\":null,\"updateDate\":null,\"quotaId\":\"1314489776798355456\",\"quotaName\":\"指标1\",\"quotaKey\":\"HCA\",\"quotaValue\":213.0,\"factValue\":213.0,\"updateDate_lte\":null,\"createDate_between\":null,\"createDate_gte\":null,\"createDate_lte\":null,\"updateDate_between\":null,\"updateDate_gte\":null,\"status_in\":null,\"id_in\":null},{\"pageNo\":null,\"isNewRecord\":false,\"orderBy\":null,\"pageSize\":null,\"id\":\"1314488531564023808\",\"createByName\":null,\"updateBy\":null,\"status\":null,\"updateByName\":null,\"createBy\":null,\"lastUpdateDateTime\":null,\"createDate\":null,\"remarks\":null,\"updateDate\":null,\"quotaId\":\"1314488531564023808\",\"quotaName\":\"指标1\",\"quotaKey\":\"ECAc\",\"quotaValue\":45.0,\"factValue\":50.0,\"updateDate_lte\":null,\"createDate_between\":null,\"createDate_gte\":null,\"createDate_lte\":null,\"updateDate_between\":null,\"updateDate_gte\":null,\"status_in\":null,\"id_in\":null},{\"pageNo\":null,\"isNewRecord\":false,\"orderBy\":null,\"pageSize\":null,\"id\":\"1314488322331168768\",\"createByName\":null,\"updateBy\":null,\"status\":null,\"updateByName\":null,\"createBy\":null,\"lastUpdateDateTime\":null,\"createDate\":null,\"remarks\":null,\"updateDate\":null,\"quotaId\":\"1314488322331168768\",\"quotaName\":\"指标1\",\"quotaKey\":\"CCA\",\"quotaValue\":31.0,\"factValue\":23.0,\"updateDate_lte\":null,\"createDate_between\":null,\"createDate_gte\":null,\"createDate_lte\":null,\"updateDate_between\":null,\"updateDate_gte\":null,\"status_in\":null,\"id_in\":null},{\"pageNo\":null,\"isNewRecord\":false,\"orderBy\":null,\"pageSize\":null,\"id\":\"1314488159835443200\",\"createByName\":null,\"updateBy\":null,\"status\":null,\"updateByName\":null,\"createBy\":null,\"lastUpdateDateTime\":null,\"createDate\":null,\"remarks\":null,\"updateDate\":null,\"quotaId\":\"1314488159835443200\",\"quotaName\":\"指标1\",\"quotaKey\":\"EUPe\",\"quotaValue\":123.0,\"factValue\":122.0,\"updateDate_lte\":null,\"createDate_between\":null,\"createDate_gte\":null,\"createDate_lte\":null,\"updateDate_between\":null,\"updateDate_gte\":null,\"status_in\":null,\"id_in\":null},{\"pageNo\":null,\"isNewRecord\":false,\"orderBy\":null,\"pageSize\":null,\"id\":\"1296701276817231872\",\"createByName\":null,\"updateBy\":null,\"status\":null,\"updateByName\":null,\"createBy\":null,\"lastUpdateDateTime\":null,\"createDate\":null,\"remarks\":null,\"updateDate\":null,\"quotaId\":\"1296701276817231872\",\"quotaName\":\"指标1\",\"quotaKey\":\"EUI\",\"quotaValue\":344.23,\"factValue\":365.44,\"updateDate_lte\":null,\"createDate_between\":null,\"createDate_gte\":null,\"createDate_lte\":null,\"updateDate_between\":null,\"updateDate_gte\":null,\"status_in\":null,\"id_in\":null},{\"pageNo\":null,\"isNewRecord\":false,\"orderBy\":null,\"pageSize\":null,\"id\":\"1296696859413680128\",\"createByName\":null,\"updateBy\":null,\"status\":null,\"updateByName\":null,\"createBy\":null,\"lastUpdateDateTime\":null,\"createDate\":null,\"remarks\":null,\"updateDate\":null,\"quotaId\":\"1296696859413680128\",\"quotaName\":\"指标1\",\"quotaKey\":\"EUIe\",\"quotaValue\":123.23,\"factValue\":110.12,\"updateDate_lte\":null,\"createDate_between\":null,\"createDate_gte\":null,\"createDate_lte\":null,\"updateDate_between\":null,\"updateDate_gte\":null,\"status_in\":null,\"id_in\":null},{\"pageNo\":null,\"isNewRecord\":false,\"orderBy\":null,\"pageSize\":null,\"id\":\"1291208784335327232\",\"createByName\":null,\"updateBy\":null,\"status\":null,\"updateByName\":null,\"createBy\":null,\"lastUpdateDateTime\":null,\"createDate\":null,\"remarks\":null,\"updateDate\":null,\"quotaId\":\"1291208784335327232\",\"quotaName\":\"指标1\",\"quotaKey\":\"EUP\",\"quotaValue\":456.0,\"factValue\":443.54,\"updateDate_lte\":null,\"createDate_between\":null,\"createDate_gte\":null,\"createDate_lte\":null,\"updateDate_between\":null,\"updateDate_gte\":null,\"status_in\":null,\"id_in\":null}]}"}

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
            let options = [];
            data.forEach(item => {
                // radarChartsSeries0.push(item.quotaValue);
                // radarChartsSeries1.push(item.factValue);
                // radarIndicator.push({
                //     name: item.quotaKey,
                //     min: 0,
                // })
                quotaArr.push( item.quotaValue );
                factArr.push( item.factValue );
                options.push({
                    key: item.quotaKey,
                    value: item.quotaName
                })
                let num = Math.round((item.factValue/item.quotaValue) * 1000) / 1000;
                radarChartsSeries0.push(100);
                radarChartsSeries1.push(num*100);
                radarIndicator.push({
                    name: item.quotaKey,
                    min: 0,
                })
            });
            this.options = options;
            this.options.splice();
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
                        center: ["40%", "50%"], // 位置
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
    .options-box{
        position: absolute;
        top: 45%;
        right: 6%;
        font-size: 16px;
        color: #72a4ff;
        .options-key{
            display: inline-block;
            min-width: 60px;
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
