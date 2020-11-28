<template>
    <div class="panel right-container-angle system-device">
        <div class="panel-header">
            <div class="title">T1能源系统设备状态</div>
            <!-- <div class="name general-border">中心4#冷水机组停机维修</div> -->
            <div class="name general-border">
                <div class="text-box">
                    <div class="text-content">
                        <p class="text first-text">{{todayDeviceException}}</p>
                        <p class="text" v-if="isShow">{{todayDeviceException}}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="content">
            <ul>
                <!-- <li v-for="(item,index) in expDeviceInfoList" :key="`system-device${index}`">
                    <div class="left">{{item.expQuantity}}（{{item.totalQuantity}}）</div>
                    <div class="right">
                        <div class="name">正常{{item.normalQuantity}}</div>
                        <div class="type">异常{{item.expQuantity}}</div>
                    </div>
                </li> -->
                <li v-for="(item,index) in list" :key="`system-device${index}`">
                    <div class="left">{{item.systemName}}</div>
                    <div class="right">
                        <div class="name">正常{{item.normalQuantity}}</div>
                        <div class="type">异常{{item.expQuantity}}</div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { getDeviceStatus } from "../../../axios";
import comMinxins from "../../common/comMinxins";
export default {
    data() {
        return{
            todayDeviceException:"",
            list:[],
            isShow: true
        }
    },
    mixins:[comMinxins],
    created() {
        this.getData();
    },
    methods:{
        updateData() {
            this.getData();
        },
        async getData() {
            let [res] = await getDeviceStatus();
            // let res = {"result":"true","message":"{\"todayDeviceException\":\"中心4#冷水机组停机维修\",\"expDeviceInfoList\":[{\"pageNo\":null,\"orderBy\":null,\"isNewRecord\":false,\"pageSize\":null,\"id\":\"1296355281540980736\",\"status\":null,\"remarks\":null,\"createByName\":null,\"createDate\":null,\"updateDate\":null,\"lastUpdateDateTime\":null,\"updateBy\":null,\"createBy\":null,\"updateByName\":null,\"expId\":\"1296355281540980736\",\"systemName\":\"弱电系统\",\"expQuantity\":1,\"normalQuantity\":7,\"createDate_lte\":null,\"updateDate_between\":null,\"createDate_between\":null,\"createDate_gte\":null,\"updateDate_gte\":null,\"updateDate_lte\":null,\"status_in\":null,\"id_in\":null},{\"pageNo\":null,\"orderBy\":null,\"isNewRecord\":false,\"pageSize\":null,\"id\":\"1296355231188361216\",\"status\":null,\"remarks\":null,\"createByName\":null,\"createDate\":null,\"updateDate\":null,\"lastUpdateDateTime\":null,\"updateBy\":null,\"createBy\":null,\"updateByName\":null,\"expId\":\"1296355231188361216\",\"systemName\":\"暖通系统\",\"expQuantity\":0,\"normalQuantity\":2,\"createDate_lte\":null,\"updateDate_between\":null,\"createDate_between\":null,\"createDate_gte\":null,\"updateDate_gte\":null,\"updateDate_lte\":null,\"status_in\":null,\"id_in\":null},{\"pageNo\":null,\"orderBy\":null,\"isNewRecord\":false,\"pageSize\":null,\"id\":\"1296354954062307328\",\"status\":null,\"remarks\":null,\"createByName\":null,\"createDate\":null,\"updateDate\":null,\"lastUpdateDateTime\":null,\"updateBy\":null,\"createBy\":null,\"updateByName\":null,\"expId\":\"1296354954062307328\",\"systemName\":\"给排水系统\",\"expQuantity\":2,\"normalQuantity\":2,\"createDate_lte\":null,\"updateDate_between\":null,\"createDate_between\":null,\"createDate_gte\":null,\"updateDate_gte\":null,\"updateDate_lte\":null,\"status_in\":null,\"id_in\":null},{\"pageNo\":null,\"orderBy\":null,\"isNewRecord\":false,\"pageSize\":null,\"id\":\"1296354386371649536\",\"status\":null,\"remarks\":null,\"createByName\":null,\"createDate\":null,\"updateDate\":null,\"lastUpdateDateTime\":null,\"updateBy\":null,\"createBy\":null,\"updateByName\":null,\"expId\":\"1296354386371649536\",\"systemName\":\"供配电系统\",\"expQuantity\":2,\"normalQuantity\":4,\"createDate_lte\":null,\"updateDate_between\":null,\"createDate_between\":null,\"createDate_gte\":null,\"updateDate_gte\":null,\"updateDate_lte\":null,\"status_in\":null,\"id_in\":null}]}"}
            let {todayDeviceException,expDeviceInfoList} = JSON.parse(res.message);
            // expDeviceInfoList	设备状态对象
            // expQuantity	异常设备数量
            // totalQuantity	全部设备数量

            this.todayDeviceException = todayDeviceException;
            // this.todayDeviceException = "asdfgnakdfjlkajflkajfdl;asdfasd发生发发打发;lasjdflkajsdklf";
            let arr = [];
            expDeviceInfoList.forEach((item,i) => {
                arr.push({
                    systemName: item.systemName,
                    normalQuantity: item.normalQuantity,
                    expQuantity: item.expQuantity,
                })
                // this.expDeviceInfoList[i].systemName = item.systemName;
                // this.expDeviceInfoList[i].normalQuantity = item.normalQuantity;//正常
                // this.expDeviceInfoList[i].expQuantity = item.expQuantity;//异常
                // this.expDeviceInfoList[i].totalQuantity = item.totalQuantity;
                // this.expDeviceInfoList[i].expQuantity = item.expQuantity;
                // this.expDeviceInfoList[i].normalQuantity = Number(item.totalQuantity) - Number(item.expQuantity);
            });
            this.list = arr;
            this.list.splice();
            this.$nextTick(()=> {
                this.textScroll();
            })
            // setTimeout(()=> {
            //     this.getData();
            // },60000)
        },
        textScroll() {
            clearTimeout(window.systemDeviceTimeout)
            let [box, content, text] = [
                document.querySelector(".system-device .text-box"),
                document.querySelector(".system-device .text-content"),
                document.querySelector(".system-device .first-text"),
            ];
            let [textWidth, boxWidth] = [text.offsetWidth, box.offsetWidth];
            // 判断文字长度是否大于盒子长度
            // console.log("textWidth, boxWidth", textWidth, boxWidth);
            if (boxWidth > textWidth) {
                this.isShow = false;
                return false;
            }
            this.isShow = true;
            // 更新
            textWidth = document.querySelector(".system-device .first-text")
                .offsetWidth;
            toScrollLeft();
            function toScrollLeft() {
                clearTimeout(window.systemDeviceTimeout)
                //  如果文字长度大于滚动条距离，则递归拖动
                if (textWidth > box.scrollLeft) {
                    box.scrollLeft++;
                    window.systemDeviceTimeout =  setTimeout(toScrollLeft, 20);
                } else {
                    window.systemDeviceTimeout =  setTimeout(fun2, 0);
                }
            }
            function fun2() {
                box.scrollLeft = 0;
                toScrollLeft();
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.panel {
    width: 537.5px;
    height: 167px;
    position: relative;
    margin-top: 15px;
}
.panel-header {
    display: flex;
    padding: 6.5px 0 0 19px;
    .title {
        color: #c6d6fb;
        font-size: 22px;
        height: 34px;
        line-height: 34px;
    }
    .general-border {
        width: 279px;
        height: 34px;
        position: relative;
        margin-left: 15px;
        padding: 0 10px;
    }
    .text-box{
        width: 100%;
        height: 100%;
        white-space: nowrap;
        overflow: hidden;
    }
    .text-content {
        display: inline-block;
    }
    .text-content p {
        display: inline-block;
        font-size: 18px;
        line-height: 34px;
    }
    .text-content p.padding {
        padding-right: 100px;
    }
}
.content {
    padding-top: 11.5px;
}
ul {
    display: flex;
    flex-wrap: wrap;
    padding-left: 21px;
}
li {
    width: 240px;
    height: 48px;
    background: rgba(50, 101, 214, 0.52);
    box-shadow: 1px 1px 17.5px 0px rgba(52, 166, 249, 0.41) inset;
    border: 1px solid rgba(93, 181, 255, 1);
    display: flex;
    position: relative;
    margin-bottom: 9px;
    &:nth-child(1),
    &:nth-child(3) {
        margin-right: 18px;
    }
    .left {
        width: 129px;
        height: 100%;
        text-align: center;
        font-size: 18px;
        line-height: 46px;
    }
    .right {
        position: absolute;
        right: -1px;
        top: -1px;
        height: 48px;
        width: 111px;
        background: rgba(204, 19, 19, 0.41);
        box-shadow: 0px -4.5px 17.5px 11px rgba(189, 0, 0, 0.98) inset;
        border: 1px solid rgba(242, 26, 26, 1);
        .name {
            position: absolute;
            left: -1px;
            top: -1px;
            width: 111px;
            height: 25.5px;
            background: #fff;
            color: #565555;
            font-size: 16px;
            text-align: center;
            position: absolute;
        }
        .type {
            position: absolute;
            bottom: -1px;
            right: -1px;
            width: 111px;
            height: 22.5px;
            line-height: 22.5px;
            color: #ffbcbc;
            font-size: 14px;
            text-align: center;
        }
    }
}
</style>
