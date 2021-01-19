<template>
    <div class="home-container">
        <div class="wrap" ref="editor">
            <header>
                <!-- <div class="title">虹桥国际机场T1航站楼能源总控平台</div>
                <div class="line"></div> -->
                 <!-- <a-dropdown :trigger="['click']" @visibleChange="openSelect"> -->
                    <div class="title" @click="e => e.preventDefault()">虹桥国际机场T1航站楼能源总控平台</div>
                    <!-- <a-menu slot="overlay">
                        <a-menu-item v-for="item in list" :key="item.id">
                            <a :href="getUrl(item.href)">{{item.name}}</a>
                        </a-menu-item>
                    </a-menu>
                </a-dropdown> -->
                <ul class="nav-box">
                    <li v-for="item in list" :key="item.id"><a :href="getUrl(item.href)">{{item.name}}</a></li>
                </ul>
            </header>
            <div class="main-box">
                <div class="colum">
                    <AllInfo />
                    <Electricity />
                    <MaintainInfo />
                    <Warning />
                </div>
                <div class="colum center">
                    <Map />
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

import Map from "../components/home/Map"
import Energy from "../components/home/Energy"

import EnergyConsumption from "../components/home/EnergyConsumption"
import Emissions from "../components/home/Emissions"
import Monitoring from "../components/home/Monitoring"
import EquipmentState from "../components/home/EquipmentState"

import {postNav} from "@/axios/index"


export default {
    name: "Home",
    components: {
        AllInfo,
        Electricity,
        MaintainInfo,
        Warning,
        
        Map,
        Energy,

        EnergyConsumption,
        Emissions,
        Monitoring,
        EquipmentState,
    },
    data() {
        return {
            visible: false,
            list:[]
        }
    },
    methods:{
        getUrl(value) {
            let url = value;
            if( url.indexOf("https://") != 0 || url.indexOf("http://") != 0 ) {
                url = `//${url}`
            }
            return url;
        },
        async openSelect() {
            let [res] = await postNav();
            if( !res ) return;
            this.list = res.data;
            this.list.splice();
        }
    }
};
</script>

<style lang="scss" scoped>

.main-box {
    min-width: 1920px;
    padding: 0 20px;
    display: flex;
    margin-top: 5px;
    .column {
        flex: 3;
    }
    .center {
        margin: 0px 20px 0 20px;
    }
}
header{
    height: 100px;
    width: 100%;
    text-align: center;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    cursor: pointer;
    background: url("../assets/image/title.png");
    background-size: 100% 100%;
    .title {
        font-size: 50px;
        height: 67px;
        line-height: 48px;
        font-family: PangMenZhengDao25b6197d7422e8e;
        color: #00ffff;
    }
    .line {
        width: 532.5px;
        height: 1px;
        background: #719EED;
        margin-top: 3.5px;
    }
}
.nav-box {
    position: absolute;
    left: 20px;
    top: 72px;
    display: flex;
    height: 40px;
    li {
        width: 80px;
        height: 27px;
        font-size: 15px;
        border: 1px solid #4f85ff;
        background: rgba(119, 161, 255, 0.14);
        box-shadow: 0.5px 0.5px 17.5px 0px rgba(88, 185, 255, 0.41) inset;
        text-align: center;
        line-height: 27px;
        margin-right: 15px;
        a {
            color: #fff;
        }
    }
}
</style>
