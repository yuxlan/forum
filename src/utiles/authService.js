// cookies

import cookie from 'react-cookie';
import {CookieDomain} from '../config';

let cookieConfig = {
    expires:new Date((new Date).valueOf() + 24*60*60*1000)
};

if(CookieDomain !== ''){
    cookieConfig = { domain: CookieDomain };
}

export function saveCookie(name,value){  // 保存cookies
    cookie.save(name,value,cookieConfig);
}

export function getCookie(name){  // 获取cookies
    return cookie.load(name);
}

export function removeCookie(name){ // 移除cookies
    cookie.remove(name,cookieConfig);
}

export function signOut(){  // 退出
    cookie.remove('role',{domain: CookieDomain,path:'/'});
    cookie.remove('role',{domain: CookieDomain,path:'/article'});
   // cookie.remove('role',{domain: CookieDomain,path:'/admin'});
    cookie.remove('token',{domain: CookieDomain,path:'/'});
    cookie.remove('token',{domain: CookieDomain,path:'/article'});
   // cookie.remove('token',{domain: CookieDomain,path:'/admin'});
}

export function isLogin(){  // 判断是否是登录状态
    return !!cookie.load('token');
}

export function redirectToBack(nextState,replaceState){
    if(isLogin()){
        replaceState(null,'/');
    }
}

/*export function isAdmin(){
    return cookie.load('role') === 'admin';
}*/

export function redirectToLogin(nextState,replaceState){
    if(!isLogin()){
        replaceState(null,'/login');
    }
}

/*export function adminAuth(nextState,replaceState){
    if(!isAdmin()){
        replaceState(null,'/');
    }
}*/
