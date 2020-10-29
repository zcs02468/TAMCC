import { get } from "./tools";

// const baseUrl = 'http://47.110.226.205:8980'
// const baseUrl = 'https://www.easy-mock.com/mock/5f3942727c850a226dfc1fbd'
// const baseUrl = 'http://47.110.226.205:8980'
const baseUrl = '';

//T1航站楼能耗占比接口
export const getEnergyProportion = async () => await get({ url: baseUrl + "/smartEnergy/energyProportion" });

// T1航站楼能耗趋势接口
// export const getSumElectricList = async () => await get({url:baseUrl + '/smartEnergy/sumElectricList'});
export const getSumElectricList = async () => await get({url:baseUrl + '/smartEnergy/energyTrend'});

// 当前维修信息接口
export const getLastRepair = async () => await get({url:baseUrl + '/smartEnergy/lastRepair'});

//今日航班数接口
export const getTodayFlightsNumber = async () => await get({url:baseUrl + '/smartEnergy/todayflightsNumber'});

//当前警示信息接口
export const getLastWarn = async () => await get({url:baseUrl + '/smartEnergy/lastWarn'});

//二十二、	T1航站楼能耗指标接口
export const getEnergyIndex = async () => await get({url:baseUrl + '/smartEnergy/energyIndex'});

//二十三、	T1航站楼排放指标接口
export const getEmissionIndex = async (obj) => await get({url:baseUrl + '/smartEnergy/emissionIndex', params:{...obj}});

export const getEmissionType = async () => await get({url:baseUrl + '/smartEnergy/getType'});



//T1能源系统设备状态接口 
export const getDeviceStatus = async () => await get({url:baseUrl + '/smartEnergy/deviceStatus'});

//T1气象信息接口
export const getMetaInfo = async () => await get({url:baseUrl + '/smartEnergy/metarInfo'});

//T1值班信息接口
export const getT1Duty = async () => await get({url:'/smartEnergy/t1Duty'});