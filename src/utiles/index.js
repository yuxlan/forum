import {API_ROOT} from '../config.js';

// 计算文章或者问答的发布时间
export function customTime(item){
    let nowTime = new Date().getTime();
    let tmp = nowTime/1000;
    let minuteTime = 60*1000;
    let hourTime = 60*minuteTime;
    let dayTime = 24*hourTime;
    let monthTime = 30*dayTime;
    let yearTime = monthTime*12;

    console.log(minuteTime,hourTime,dayTime,monthTime,yearTime);
    console.log("time1：",tmp,'time2:',item);
    let delta = parseInt(tmp) - parseInt(item);
    console.log('time3：',delta);
    let descTime;
    if(delta >= yearTime){
        descTime = parseInt(delta/yearTime) + '年前';
    }else if(delta >= monthTime){
        descTime = parseInt(delta/monthTime) + '月前'
    }else if(delta >= dayTime){
        descTime = parseInt(delta/dayTime) +'天前'
    }else if(delta >=hourTime){
        descTime = parseInt(delta/hourTime) + '小时前'
    }else if(delta >= minuteTime){
        descTime = parseInt(delta/minuteTime) + '分钟前'
    }else{
        descTime = '刚刚'
    }
    return descTime
}

export function formatDate(time){
        return new Date(parseInt(time) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
   // let tmp = new Date(time);
   // let year = tmp.getFullYear();
   // let month = tmp.getMonth() + 1;
   // let day = tmp.getDate();
   // let hours = tmp.getHours();
   // let minutes = tmp.getMinutes();
   // let second = tmp.getSeconds();
   // return   year+"-"+month+"-"+day+"   "+hours+":"+minutes+":"+second;
}


/*export function formatDate(time){
    let tmp = new Date(time);
    let year = tmp.getFullYear();
    let month = tmp.getMonth() + 1;
    let day = tmp.getDate();
    let hours = tmp.getHours();
    let minutes = tmp.getMinutes();
    let second=tmp.getSeconds();
    return year+"-"+month+"-"+day+"   "+hours+":"+minutes+":"+second+"   ";
}*/

//分离title和content
export function parseArticle(text){

    let titleRegex = /#*\s+/;
    let divide = text.indexOf('\n');
    if(divide == -1){
        return {
            title:text.replace(titleRegex,''),
            content:''
        }
    }


    let title = text.slice(0,divide).replace(titleRegex,'');
    let content = text.slice(divide+1);

    
    content = content.replace(/([^\(]*\.(jpe?g|png|gif))(?=\))/g,function(match,$1,$2){
        return API_ROOT + 'upload/' + match
    });
    
    return {
        title,
        content
    }

}