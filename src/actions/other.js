// 显示相关正确或者错误信息，例如发表文章成功之类

import * as types from '../constants/index'

export const changeStyleMode = () =>{
    return {
        type:types.CHANGE_STYLE_MODE
    }
};
export const showMsg = (content,type='error') => {
    return {
        type:types.SHOW_MSG,
        message:{
            content:content,
            type:type
        }
    }
};
export const hideMsg = () =>{
    return {
        type:types.HIDE_MSG
    }
}