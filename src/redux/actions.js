// 引入常量名
import { ORIGINAL, POPULAR, RECOMMEND, CLASSIFY, SEARCH, DETAIL, COMMENT, RANK ,PAGING} from './constant'

// 同步action，就是指action的值为Object类型的一般对象

export const original = (data) => ({ type: ORIGINAL, data })
export const popular = data => ({ type: POPULAR, data })
export const recommend = data => ({ type: RECOMMEND, data })
export const classify = data => ({ type: CLASSIFY, data })
export const search = data => ({ type: SEARCH, data })
export const detail = data => ({ type: DETAIL, data })
export const comment = data => ({ type: COMMENT, data })
export const rank = data => ({ type: RANK, data })
// export const paging = data => ({ type: PAGING, data})
export const paging = (data,total) => ({ type: PAGING, data:{data,total} })







// 异步action，就是指action的值为函数
/* export const gethomeAsync = (data) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(gethome(data))
        })
    }
} */