<template>
    <div class="panel">
        <div class="map-box"></div>
        <div class="footer-panel">今日航班数<span class="max">&nbsp;&nbsp;{{flights}}&nbsp;&nbsp;</span>单</div>
    </div>
</template>

<script>
import {getTodayFlightsNumber} from "../../../axios"
export default {
    data() {
        return {
            flights: 0
        }
    },
    created() {
        this.getData()
    },
    methods:{
        async getData() {
            let [res] = await getTodayFlightsNumber();
            let data = JSON.parse(res.message).flights;
            this.flights = data;
            setTimeout(()=> {
                this.getData();
            },60000)
        }
    }
};
</script>

<style lang="scss" scoped>
.panel {
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
    .max {
        height: 40px;
        font-size: 34px;
        display: inline-block;
        line-height: 40px;
        margin: 0 10px;
        vertical-align: middle;
    }
}
</style>
