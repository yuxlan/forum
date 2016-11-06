// cookies // 只是尝试，无用
import cookie from 'react-cookie'
import {CookieDomain} from '../config'

let cookieConfig = {
    expires:new Date((new Date).valueOf() + 24*60*60*1000)
};

if(CookieDomain !== ''){
    cookieConfig = { domain: CookieDomain }
}

export function saveCookie(name,value){
    cookie.save(name,value,cookieConfig);
}

export function getCookie(name){
    return cookie.load(name);
}

export function removeCookie(name){
    cookie.remove(name,cookieConfig);
}

export function signOut(){
    cookie.remove('role',{domain: CookieDomain,path:'/'});
    cookie.remove('role',{domain: CookieDomain,path:'/article'});
}

export function isLogin(){
    return
}

export function redirectToBack(nextState,replaceState){
    if(isLogin()){
        replaceState(null,'/')
    }
}

export function redirectToLogin(nextState,replaceState){
    if(!isLogin()){
        replaceState(null,'/login')
    }
}


