<!-- T1一体化机房监控 -->
<template>
    <div class="panel right-container-angle">
        <div class="title">T1一体化机房监控</div>
        <div class="content">
            <div class="left box">
                <div class="video-box">
                    <img src="../../../assets/image/monitor1.jpg" alt="">
                </div>
                <div class="select-box">
                    <a-select
                        default-value="jack"
                        style="width: 100%;background: transparent;"
                    >
                        <a-icon
                            slot="suffixIcon"
                            type="caret-down"
                            style="color: #fff;"
                        />
                        <a-select-option value="jack">
                            区域1
                        </a-select-option>
                        <a-select-option value="lucy">
                            区域2
                        </a-select-option>
                        <a-select-option value="Yiminghe">
                            区域3
                        </a-select-option>
                    </a-select>
                </div>
            </div>
            <div class="right box">
                <div class="video-box">
                    <!-- <img src="../../../assets/image/monitor2.jpg" alt=""> -->
                    <!-- <video>
                        <source src="rtmp://10.160.8.103:1935/live/1" type="application/x-mpegURL">
                    </video> -->
                    <myVideo></myVideo>
                </div>
                <div class="select-box">
                    <a-select
                        default-value="jack"
                        style="width: 100%;background: transparent;"
                    >
                        <a-icon
                            slot="suffixIcon"
                            type="caret-down"
                            style="color: #fff;"
                        />
                        <a-select-option value="jack">
                            区域1
                        </a-select-option>
                        <a-select-option value="lucy">
                            区域2
                        </a-select-option>
                        <a-select-option value="Yiminghe">
                            区域3
                        </a-select-option>
                    </a-select>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import myVideo from "./myVideo"
export default {
    components:{
        myVideo
    }
};
</script>

<style lang="scss" scoped>
.select-box /deep/ .ant-select-selection {
    background: transparent;
    color: #fff;
    border: none;
}
.select-box /deep/ .ant-select-selection-selected-value {
    line-height: 33px;
}
.panel {
    width: 537.5px;
    height: 258px;
    margin-top: 15px;
    position: relative;
}
.title {
    color: #c6d6fb;
    font-size: 22px;
    height: 34px;
    line-height: 34px;
    margin: 11.5px 0 0 22px;
}
.content {
    display: flex;
    justify-content: space-between;
    padding: 0 17.5px 0 21px;
}

.box {
    width: 240px;
    // height: 384px;
    .video-box {
        width: 100%;
        height: 145px;
        border-radius: 8px;
        border: 1px solid #4f85ff;
        background: rgba(119, 161, 255, 0.14);
        box-shadow: 0.5px 0.5px 17.5px 0px rgba(88, 185, 255, 0.41) inset;
        overflow: hidden;
        img {
            width: 100%;
            height: 100%;
        }
        video {
            width: 100%;
            height: 100%;
        }
    }
    .select-box {
        width: 100%;
        height: 35px;
        border-radius: 5px;
        border: 1px solid rgba(79, 133, 255, 1);
        background: rgba(50, 101, 214, 0.52);
        margin-top: 12px;
    }
}
</style>
