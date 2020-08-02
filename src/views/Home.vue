<template>
    <div class="home-container">
        <div class="wrap" ref="editor">
            <header>
                <div class="title">虹桥国际机场T1航站楼能管平台</div>
                <div class="line"></div>
            </header>
            <div class="main-box">
                <div class="colum">
                    <AllInfo />
                    <Electricity />
                    <MaintainInfo />
                    <Warning />
                </div>
                <div class="colum center">
                    <Energy />
                </div>
                <div class="colum">
                    <EnergyConsumption />
                    <Emissions />
                    <Monitoring />
                    <EquipmentState />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AllInfo from "../components/home/AllInfo"
import Electricity from "../components/home/Electricity"
import MaintainInfo from "../components/home/MaintainInfo"
import Warning from "../components/home/Warning"

import Energy from "../components/home/Energy"

import EnergyConsumption from "../components/home/EnergyConsumption"
import Emissions from "../components/home/Emissions"
import Monitoring from "../components/home/Monitoring"
import EquipmentState from "../components/home/EquipmentState"


export default {
    name: "Home",
    components: {
        AllInfo,
        Electricity,
        MaintainInfo,
        Warning,

        Energy,

        EnergyConsumption,
        Emissions,
        Monitoring,
        EquipmentState,
    },
    data() {
        return {};
    },
    computed: {},
    created() {},
    mounted() {},
    methods: {},
};
</script>

<style lang="scss" scoped>
.main-box {
    min-width: 1920px;
    padding: 0 20px;
    display: flex;
    .column {
        flex: 3;
    }
    .center {
        margin: 60px 20px 0 20px;
    }
}
header{
    height: 67px;
    width: 100%;
    text-align: center;
    // font-size: ;
    color: #fff;
    padding-top:14px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .title {
        font-size: 35px;
        height: 47.5px;
        line-height: 47.5px;
    }
    .line {
        width: 532.5px;
        height: 1px;
        background: #719EED;
        margin-top: 3.5px;
    }
}
</style>
