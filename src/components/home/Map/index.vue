<template>
    <div class="map-panel">
        <div class="map-box"></div>
        <div class="footer-panel">今日航班数<span class="max">&nbsp;&nbsp;{{flights}}&nbsp;&nbsp;</span>单</div>
        <div class="dialog-box">
            <electricity v-if="mapDialogType == 'electricity'"/>
            <energyConsumption v-if="mapDialogType == 'energyConsumption'"/>
            <emissions v-if="mapDialogType == 'emissions'"/>
        </div>
    </div>
</template>

<script>
import {getTodayFlightsNumber} from "../../../axios"
import comMinxins from "../../common/comMinxins";
import electricity from "./dialog/electricity"
import energyConsumption from "./dialog/energyConsumption"
import emissions from "./dialog/emissions"
import {mapState} from "vuex"
export default {
    data() {
        return {
            flights: 0
        }
    },
    mixins:[comMinxins],
    created() {
        this.getData()
    },
    components:{
        electricity,
        energyConsumption,
        emissions
    },
    methods:{
        updateData() {
            this.getData();
        },
        async getData() {
            let [res] = await getTodayFlightsNumber();
            let data = JSON.parse(res.message).flights;
            this.flights = data;
            // setTimeout(()=> {
            //     this.getData();
            // },60000)
        }
    },
    computed:{
        ...mapState({
            mapDialogType: state => state.home.mapDialogType
        })
    }
};
</script>

<style lang="scss" scoped>
.map-panel {
    width: 100%;
    height: 678.5px;
    position: relative;
}
.map-box {
    width: 100%;
    height: 610px;
    background: url('../../../assets/image/timg3.png');
    background-size: 100% 100%;
}
.footer-panel {
    height: 40px;
    position: absolute;
    bottom: 25px;
    font-size: 18px;
    line-height: 40px;
    color: #fff;
    .max {
        height: 40px;
        font-size: 34px;
        display: inline-block;
        line-height: 40px;
        margin: 0 10px;
        vertical-align: middle;
    }
}
.dialog-box {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 10px;
}
</style>
