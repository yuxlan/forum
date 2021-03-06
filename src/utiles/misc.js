/*
 var str1='1,2,3,4,5,6,7';
 var strArray=Array();
 //字符串拆分为数组
 strArray=str1.split(',',5);//后面的5是可选参数，指返回的数组最大长度
 //数组合并为字符串
 str1=strArray.join('-');//这时候str1中的值是：1-2-3-4-5
 */
// 验证邮箱
export function validateEmail(u_email) {
    const re = /^([A-Za-z0-9_.]+@[A-Za-z0-9.]+.[A-Za-z]{2,4})$/;
    return re.test(u_email);
}

// 验证用户名
export function validateUsername(u_name) {
    const re = /^([a-z][a-z0-9.]{2,20})$/;
    return re.test(u_name);
}

// 获取返回的数据
export function parseJSON(response) {
    return response.data;
}

export function createConstants(...constants) {
    return constants.reduce((acc, constant) => {
        acc[constant] = constant;
        return acc;
    }, {});
}

export function createReducer(initialState, reducerMap) {
    return (state = initialState, action) => {
        const reducer = reducerMap[action.type];
        return reducer
            ? reducer(state, action.payload)
            : state;
    };
}