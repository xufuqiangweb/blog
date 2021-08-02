/*
    该文件用于汇总所有的reducer为一个总的reducer
*/
// 引入combineReducers，用于汇总对个reducer
import { combineReducers } from 'redux'
// 引入为Home组件服务的reducer
import original from './reducers/original'
import popular from './reducers/popular'
import recommend from './reducers/recommend'
import classify from './reducers/classify'
import search from './reducers/search'
import detail from './reducers/detail'
import comment from './reducers/comment'
import rank from './reducers/rank'
import paging from './reducers/paging'

// 汇总所有的reducer变为一个总的reducer
export default combineReducers({
    backData: original,
    popular,
    recommend,
    classify,
    search,
    detail,
    comment,
    rank,
    paging
})