<template>
    <div class="panel left-container-angle">
        <div class="panel-header">
            <div class="title">T1能源系统设备状态</div>
            <div class="name general-border">中心4#冷水机组停机维修</div>
        </div>
        <div class="content">
            <ul>
                <li>
                    <div class="left">2（2）</div>
                    <div class="right">
                        <div class="name">正常设备1</div>
                        <div class="type">异常4</div>
                    </div>
                </li>
                <li>
                    <div class="left">2（4）</div>
                    <div class="right">
                        <div class="name">正常设备1</div>
                        <div class="type">异常4</div>
                    </div>
                </li>
                <li>
                    <div class="left">0（2）</div>
                    <div class="right">
                        <div class="name">正常设备1</div>
                        <div class="type">异常4</div>
                    </div>
                </li>
                <li>
                    <div class="left">1（7）</div>
                    <div class="right">
                        <div class="name">正常设备1</div>
                        <div class="type">异常4</div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {};
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
    .name {
        font-size: 18px;
        width: 279px;
        height: 34px;
        line-height: 34px;
        margin-left: 15px;
        padding-left: 10px;
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
    &:nth-child(1),&:nth-child(3) {
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
