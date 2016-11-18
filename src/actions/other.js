import * as types from './types'
import api from '../api'

// 改变状态
export const changeStyleMode = () =>{
    return {
        type:types.CHANGE_STYLE_MODE
    }
};

// 以弹窗的形式显示相关信息，类似于登录注册成功、发布文章成功或者失败等信息
export const showMsg = (content,type='error') => {
    return {
        type:types.SHOW_MSG,
        message:{
            content:content,
            type:type
        }
    }
};

// 显示之后隐藏信息
export const hideMsg = () =>{
    return {
        type:types.HIDE_MSG
    }
}