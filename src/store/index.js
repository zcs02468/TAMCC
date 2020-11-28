import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        home: {
            waterLevel: {
                oneH: 0,
                twoH: 0,
            },
            mapDialogType: '',
        },
        randomNum: 0
    },
    mutations: {
        setWaterLevel(state, obj) {
            state.home.waterLevel.oneH = obj.oneH;
            state.home.waterLevel.twoH = obj.twoH;
        },
        SET_RANDOM_NUM(state) {
            let date = new Date();
            state.randomNum = date.getTime();
        },
        SET_MAP_DIALOG_TYPE(state,value) {
            state.home.mapDialogType = value;
        },
        closeMapDialog(state) {
            state.home.mapDialogType = false;
        }
    },
    actions: {},
    modules: {},
    getters: {
        getWaterLevel: (state) => state.home.waterLevel,
    },
});
