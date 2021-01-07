<!-- 当前维修信息 -->
<template>
    <div class="panel left-container-angle maintain">
        <div class="panel-header">
            <div class="title">当前维修信息</div>
            <div class="name general-border">
                <div class="text-box">
                    <div class="text-content">
                        <p class="text first-text">{{todayRepairInfo}}</p>
                        <p class="text padding" v-if="isShow">{{todayRepairInfo}}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="content">
            <container :prop="list[1]" name="chart_ring1" ref="chart_ring1" />
            <container :prop="list[2]" name="chart_ring2" ref="chart_ring2" />
            <container :prop="list[3]" name="chart_ring3" ref="chart_ring3" />
            <container :prop="list[4]" name="chart_ring4" ref="chart_ring4" />
        </div>
    </div>
</template>

<script>
import container from "./container";
import { getLastRepair } from "../../../axios";
import comMinxins from "../../common/comMinxins";
export default {
    components: {
        container,
    },
    data() {
        return {
            list: [
                {},
                {
                    allSum: 0,
                    finishSum: 0,
                    title: "供配电",
                },
                {
                    allSum: 0,
                    finishSum: 0,
                    title: "给排水",
                },
                {
                    allSum: 0,
                    finishSum: 0,
                    title: "暖通",
                },
                {
                    allSum: 0,
                    finishSum: 0,
                    title: "合计",
                },
            ],
            todayRepairInfo: "111",
            textLeft: "354px",
            isShow: true
        };
    },
    mixins:[comMinxins],
    mounted() {
        this.getData();
    },
    methods: {
        updateData() {
            this.getData();
        },
        async getData() {
            let [res] = await getLastRepair();
            if( !res ) return;
            // let res = {"result":"true","data":{"todayRepairInfo":"（1）国际到达边检男卫台盆下方水管脱落——已修复\n（2）T25登机口男卫 地漏堵——已修复  \n（3）1号低压室灯管坏——已修复","allSumList":45,"finishedSumList":9,"workCompleteInfos":[{"workType":"1","completeWork":5,"sumWork":22},{"workType":"2","completeWork":3,"sumWork":5},{"workType":"3","completeWork":1,"sumWork":18}]},"message":"请求成功"}
            let data = res.data;
            data.workCompleteInfos.forEach(item => {
                this.list[item.workType].allSum = item.sumWork;
                this.list[item.workType].finishSum = item.completeWork;
            })
            this.list[4].allSum = data.allSumList;
            this.list[4].finishSum = data.finishedSumList;
            this.$refs.chart_ring1.reloadLine();
            this.$refs.chart_ring2.reloadLine();
            this.$refs.chart_ring3.reloadLine();
            this.$refs.chart_ring4.reloadLine();
            this.todayRepairInfo = data.todayRepairInfo;

            this.$nextTick(()=> {
                this.textScroll();
            })
        },
        textScroll() {
            clearTimeout(window.maintainTimeout)
            let [box, content, text] = [
                document.querySelector(".maintain .text-box"),
                document.querySelector(".maintain .text-content"),
                document.querySelector(".maintain .first-text"),
            ];
            let [textWidth, boxWidth] = [text.offsetWidth, box.offsetWidth];
            // 判断文字长度是否大于盒子长度
            if (boxWidth > textWidth) {
                this.isShow = false;
                return false;
            }
            this.isShow = true;
            // 更新
            textWidth = document.querySelector(".maintain .first-text").offsetWidth;
            toScrollLeft();
            function toScrollLeft() {
                clearTimeout(window.maintainTimeout)
                //  如果文字长度大于滚动条距离，则递归拖动
                if (textWidth > box.scrollLeft) {
                    box.scrollLeft++;
                    window.maintainTimeout =  setTimeout(toScrollLeft, 20);
                } else {
                    window.maintainTimeout = setTimeout(fun2, 0);
                }
            }
            function fun2() {
                box.scrollLeft = 0;
                toScrollLeft();
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.panel {
    width: 535.5px;
    height: 221.5px;
    position: relative;
    margin-top: 15px;
}
.panel-header {
    display: flex;
    padding: 10px 0 0 19px;
    .title {
        color: #c6d6fb;
        font-size: 22px;
        height: 34px;
        line-height: 34px;
    }
}
.content {
    padding: 15.5px 19px 0 19px;
    display: flex;
    justify-content: space-between;
}

.general-border {
    width: 356px;
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
