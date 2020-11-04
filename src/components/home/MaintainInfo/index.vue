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
                    title: "其他",
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
            // let res = {"result":"true","message":"{\"finishedSumList\":[{\"work_type\":\"1\",\"finish_sum\":1},{\"work_type\":\"2\",\"finish_sum\":1}],\"todayRepairInfo\":\"公区走廊照明故障,公区走廊照明故障,检区照明灯具故障,检区照明灯具故障,检区照明灯具故障,检区照明灯具故障,检区照明灯具故障,检区照明灯具故障\",\"allSumList\":[{\"work_type\":\"1\",\"all_sum\":3},{\"work_type\":\"2\",\"all_sum\":2}]}"}
            let data = JSON.parse(res.message);
            data.allSumList.forEach((item) => {
                this.list[item.work_type].allSum = item.all_sum;
            });
            data.finishedSumList.forEach((item) => {
                this.list[item.work_type].finishSum = item.finish_sum;
            });
            this.$refs.chart_ring1.reloadLine();
            this.$refs.chart_ring2.reloadLine();
            this.$refs.chart_ring3.reloadLine();
            this.$refs.chart_ring4.reloadLine();
            this.todayRepairInfo = data.todayRepairInfo;

            this.$nextTick(()=> {
                this.textScroll();
            })
            // finish_sum
            // all_sum
            // setTimeout(()=> {
            //     this.getData();
            // },60000)
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
