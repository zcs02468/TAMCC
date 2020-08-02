<!-- 警示信息 -->
<template>
    <div class="panel left-container-angle">
        <div class="panel-header">
            <div class="title">警示信息</div>
            <div class="name general-border">检区照明灯具故障</div>
        </div>
        <div class="content-box">
            <div class="info general-border">
                <div class="left">
                    <div class="name">维修遗留问题</div>
                    <div class="btn">明细</div>
                </div>
                <div class="right">
                    <span class="max"></span>
                    <span class="unit"></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {};
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
    .name {
        font-size: 18px;
        width: 356px;
        height: 34px;
        line-height: 34px;
        margin-left: 15px;
        padding-left: 10px;
    }
}
.content-box {
    display: flex;
}
.info {
    width: 245px;
    height: 71px;
    .left {
        width: 270px;
        height: 100%;
        .name {
            width: 100%;

        }
    }
}
</style>
