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
                    <div class="btn general-border">明细</div>
                </div>
                <div class="right">
                    <span class="max">6</span>
                    <span class="unit">单</span>
                </div>
            </div>
            <div class="info general-border spacing">
                <div class="left">
                    <div class="name">环保指标问题</div>
                    <div class="btn general-border">明细</div>
                </div>
                <div class="right">
                    <span class="max">6</span>
                    <span class="unit">单</span>
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
        }
    }
    .right {
        margin-left: 24px;
        span {
            display: inline-block;
            height: 100%;
            line-height: 71px;
        }
        .max {
            font-size: 48px;
            vertical-align: bottom;
        }
        .unit {
            font-size: 18px;
            vertical-align: bottom;
            margin-left: 13px;
        }
    }
}
</style>
