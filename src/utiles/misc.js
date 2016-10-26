// 验证邮箱与用户名
export function validateName(name) {
    const re = /^(([a-z][a-z0-9.]{2,20}))$/;
    return re.test(name);
}

export function validateEmail(email) {
    const re = /^(([A-Za-z0-9_.]+@[A-Za-z0-9.]+.[A-Za-z]{2,4}))$/;
    return re.test(email);
}
