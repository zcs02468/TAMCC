<!--  -->
<template>
    <div class="header-box">
        <!-- <div class="header-back">智慧水站防汛检测</div> -->
        <div class="header-back">{{title}}</div>
    </div>
</template>

<script>
export default {
    name: "Header",

    props: {
        title: {
            type: String,
            default: "",
        },
    },

    data() {
        return {};
    },

    components: {},

    methods: {},

    computed: {},
};
</script>
<style lang="scss" scoped>
.header-box {
    // height: 67px;
    height: 84px;
    margin: 0 20px;
    position: relative;
    .header-back {
        position: absolute;
        // top: 30px;
        // left: 0;
        // height: 70px;
        height: 100%;
        width: 100%;
        background: url("../../../assets/image/title.png");
        background-size: 100% 100%;
        color: #fff;
        font-size: 35px;
        line-height: 70px;
        text-align: center;
    }
}
</style>
