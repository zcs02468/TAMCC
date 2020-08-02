<!-- 当前维修信息 -->
<template>
    <div class="panel left-container-angle">
        <div class="panel-header">
            <div class="title">当前维修信息</div>
            <div class="name general-border">公区走廊照明故障</div>
        </div>
        <div class="content">
            <container name="chart_ring1"/>
            <container name="chart_ring2"/>
            <container name="chart_ring3"/>
            <container name="chart_ring4"/>
        </div>
    </div>
</template>

<script>
import container from "./container";
export default {
    components: {
        container,
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
    .name {
        font-size: 18px;
        width: 356px;
        height: 34px;
        line-height: 34px;
        margin-left: 15px;
        padding-left: 10px;
    }
}
.content {
    padding: 15.5px 19px 0 19px;
    display: flex;
    justify-content: space-between;
}
// .info {
//     .chart-box {
//         width: 104px;
//         height: 104px;
//         .charts {
//             width: 100%;
//             height: 100%;
//         }
//     }
// }
</style>
