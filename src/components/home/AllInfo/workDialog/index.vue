<!--  -->
<template>
    <div class="map-mark">
        <div class="dialog-box">
            <div class="close" @click="closeDialog">X</div>
            <div class="dialog-content">
                <div class="title">能源系统保障信息</div>
                <div class="content">
                    <ul class="head">
                        <li>
                            <div>重要等级</div>
                            <div>保障方式</div>
                            <div>设备系统</div>
                            <div>厂商简称</div>
                            <div>联系人</div>
                            <div>联系电话</div>
                            <div>提交时间</div>
                        </li>
                    </ul>
                    <ul class="body">
                        <li v-for="(item, i) in dataList" :key="`phone${i}`">
                            <div>{{ item.grade }}</div>
                            <div>{{ item.safeguardManner }}</div>
                            <div>{{ item.deviceSys }}</div>
                            <div>{{ item.manufacturerName }}</div>
                            <div>{{ item.contactName }}</div>
                            <div>{{ item.phoneNum }}</div>
                            <div>{{ item.createDate }}</div>
                        </li>
                    </ul>
                </div>
                <div class="pagination">
                    <el-pagination
                        background
                        layout="total, prev, pager, next"
                        prev-text="上一页"
                        next-text="下一页"
                        :page-size="params.pageSize"
                        :total="total"
                        @current-change="currentChange"
                    >
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getEnergySecurity } from "@/axios";
export default {
    name: "Dialog",

    data() {
        return {
          dataList:[],
          total: 0,
          params:{
            pageSize: 10,
            pageNo: 1
          }
        };
    },

    created() {
        this.getData();
    },

    components: {},

    methods: {
        closeDialog() {
            this.$emit("closeDialog");
        },
        currentChange(val) {
            this.params.pageNo = val;
            this.getData()
        },
        async getData() {
            let [res] = await getEnergySecurity(this.params);
            if(!res) return;
            this.total = res.data.count;
            this.dataList = res.data.list;
        }
    },

    computed: {},
};
</script>
<style lang="scss" scoped>
.map-mark {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(7, 7, 7, 0.43);
    .dialog-box {
        border: 1px solid #57bdff;
        position: relative;
        padding: 0 15px;
        background: rgba(1, 24, 63, 0.8);
    }
    .close {
        position: absolute;
        right: -26.5px;
        top: -26.5px;
        width: 26.5px;
        height: 26.5px;
        border-radius: 50%;
        border: 1px solid #499fdc;
        text-align: center;
        line-height: 26.5px;
        color: #499fdc;
        font-weight: bold;
        font-size: 14px;
        cursor: pointer;
    }
    .dialog-content {
        .title {
            font-size: 15px;
            margin-top: 5px;
        }
        .content {
            margin-top: 8px;
            min-height: 205px;
        }
        li {
            display: flex;
            height: 34px;
            border-top: 1px solid rgba(87, 189, 255, 0.56);
            border-left: 1px solid rgba(87, 189, 255, 0.56);
            display: table;
            &:last-child {
                border-bottom: 1px solid rgba(87, 189, 255, 0.56);
            }
            div {
                height: 100%;
                font-size: 12px;
                text-align: center;
                // line-height: 34px;
                border-right: 1px solid rgba(87, 189, 255, 0.56);
                padding: 0 10px;
                display: table-cell;
                vertical-align: middle;
                &:nth-child(1) {
                    width: 150px;
                }
                &:nth-child(2) {
                    width: 120px;
                }
                &:nth-child(3) {
                    width: 140px;
                }
                &:nth-child(4) {
                    width: 210px;
                }
                &:nth-child(5) {
                    width: 120px;
                }
                &:nth-child(6) {
                    width: 120px;
                }
                &:nth-child(7) {
                    width: 150px;
                }
            }
        }
        .head {
            li {
                border-bottom: none !important;
                div {
                    padding: 0 !important;
                    font-size: 14px !important;
                }
            }
        }
    }
    .pagination {
        margin-top: 13px;
        float: right;
        /deep/.el-pagination__total {
            color: #636363 !important;
        }
        /deep/.number {
            height: 20px !important;
            font-size: 10px !important;
            line-height: 20px !important;
            background: transparent !important;
            border: 1px solid #bcbcbc !important;
            min-width: 20px !important;
            font-size: 10px !important;
        }
        /deep/.more {
            height: 20px !important;
            font-size: 10px !important;
            line-height: 20px !important;
            background: transparent !important;
            border: none !important;
            font-size: 10px !important;
        }
        /deep/.btn-prev {
            background: transparent !important;
            border: 1px solid #bcbcbc !important;
            color: #bcbcbc !important;
            vertical-align: middle !important;
            width: 42px;
            height: 20px;
            span {
                font-size: 10px !important;
                line-height: 20px !important;
            }
        }
        /deep/.btn-next {
            background: transparent !important;
            border: 1px solid #bcbcbc;
            color: #bcbcbc !important;
            width: 42px;
            height: 20px;
            span {
                font-size: 10px !important;
                line-height: 20px !important;
            }
        }
        /deep/.active {
            border-color: #0e8ce5 !important;
            color: #0e8ce5 !important;
            font-weight: 400 !important;
        }
    }
}
</style>
