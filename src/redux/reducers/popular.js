// 引入常量名
import { POPULAR } from '../constant'
// 该reducer用于存储数据，便于全局使用，不改变数据，直接返回
const ininState = []
export default function backDataRoducer(preState = ininState, action) {
    // console.log(preState, action)
    const { type, data } = action
    // 根据type决定如何加工数据
    switch (type) {
        case POPULAR:
            // 返回原来的数据
            return data
        default:
            return preState
    }
}