<!-- 警示信息 -->
<template>
    <div class="panel left-container-angle panel-warning">
        <div class="panel-header">
            <div class="title">警示信息</div>
            <!-- <div class="name general-border">检区照明灯具故障</div> -->
            <div class="name general-border">
                <div class="text-box">
                    <div class="text-content">
                        <p class="text first-text padding">{{ todayWarnInfo }}</p>
                        <p class="text" v-if="isShow">{{todayWarnInfo}}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="content-box">
            <div class="info general-border">
                <div class="left">
                    <div class="name">维修遗留问题</div>
                    <div class="btn general-border" @click="openDialog('work')">明细</div>
                </div>
                <div class="right">
                    <span class="max">{{ maintainNum }}</span>
                    <span class="unit">单</span>
                </div>
            </div>
            <div class="info general-border spacing">
                <div class="left">
                    <div class="name">环保指标问题</div>
                    <div class="btn general-border" @click="openDialog('order')">明细</div>
                </div>
                <div class="right">
                    <span class="max">{{orderNum}}</span>
                    <span class="unit">单</span>
                </div>
            </div>
        </div>
        <div>
            <workDialog :propList="getDialogData" v-if="dialogType" @closeDailog="closeDailog"/>
            <!-- <workDialog :propList="workList" v-if="dialogType" @closeDailog="closeWorkDailog"/> -->
        </div>
    </div>
</template>

<script>
import { getLastWarn } from "../../../axios";
import comMinxins from "../../common/comMinxins";
import workDialog from "./dialog/workDialog"
export default {
    data() {
        return {
            todayWarnInfo:"",
            maintainNum: 0,
            orderNum: 0,
            workList: [],
            orderList: [],
            showWorkDialog: false,
            showWarnDialog: false,
            dialogType:null,
            isShow: true
        };
    },
    mixins:[comMinxins],
    components:{
        workDialog
    },
    created() {
        this.getData();
    },
    methods: {
        updateData() {
            this.getData();
        },
        async getData() {
            let [res, err] = await getLastWarn();
            let data = JSON.parse(res.message);
            let {workList,orderList,todayWarnInfo} = data;
            this.maintainNum = workList.length;
            this.workList = workList;
            this.orderList = orderList;
            this.orderNum = orderList.length;
            this.todayWarnInfo = todayWarnInfo;
            // this.todayWarnInfo = '撒撒旦发射点发啊手动阀啊手动阀啊手动阀啊手动阀啊手动阀啊手动阀阿斯弗啊手动阀发';
            this.$nextTick(()=> {
                this.textScroll()
            })
        },
        textScroll() {
            clearTimeout(window.warningTime)
            let [box, content, text] = [
                document.querySelector(".panel-warning .text-box"),
                document.querySelector(".panel-warning .text-content"),
                document.querySelector(".panel-warning .text"),
            ];
            let [textWidth, boxWidth] = [text.offsetWidth, box.offsetWidth];
            // 判断文字长度是否大于盒子长度
            if (boxWidth > textWidth) {
                this.isShow = false;
                return false;
            }
            this.isShow = true;
            // 更新
            textWidth = document.querySelector(".panel-warning .text").offsetWidth;
            toScrollLeft();
            function toScrollLeft() {
                clearTimeout(window.warningTime);
                //  如果文字长度大于滚动条距离，则递归拖动
                if (textWidth > box.scrollLeft) {
                    box.scrollLeft++;
                    window.warningTime =  setTimeout(toScrollLeft, 20);
                } else {
                    window.warningTime = setTimeout(fun2, 0);
                }
            }
            function fun2() {
                box.scrollLeft = 0;
                toScrollLeft();
            }
        },
        openDialog(val) {
            this.dialogType = val
        },
        closeDailog() {
            this.dialogType = null
        }
    },
    computed:{
        getDialogData() {
            if( this.dialogType ) {
                return this[`${this.dialogType}List`];
            }else {
                return [];
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.panel {
    width: 535.5px;
    height: 130px;
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
        width: 356px;
        height: 34px;
        position: relative;
        margin-left: 15px;
        padding: 0 10px;
    }
    .text-box {
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
.content-box {
    display: flex;
    margin-top: 7px;
    justify-content: center;
}
.spacing {
    margin-left: 16px;
}
.info {
    width: 245px;
    height: 71px;
    display: flex;
    .left {
        width: 135px;
        height: 100%;
        font-size: 18px;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        .name {
            width: 100%;
        }
        .btn {
            width: 112px;
            height: 30px;
            border-radius: 5px;
            text-align: center;
            line-height: 30px;
            margin-top: 7.5px;
            cursor: pointer;
        }
    }
    .right {
        span {
            display: inline-block;
            height: 100%;
            line-height: 71px;
        }
        .max {
            font-size: 48px;
            vertical-align: bottom;
            width: 75px;
            text-align: center;
        }
        .unit {
            font-size: 18px;
            vertical-align: bottom;
        }
    }
}
@keyframes marginLeft {
    0% {
        left: 100%;
    }

    50% {
        left: 0%;
    }

    100% {
        right: 100%;
    }
}
</style>
