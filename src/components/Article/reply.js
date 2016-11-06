import React from 'react'
import {formatDate} from '../../utiles'
import defaultAvatar from '../../assets/imgs/userimg.png'

export default class Reply extends React.Component{
 render(){
     const {replys,k,showReply} = this.props;
     console.log(replys)
     return (

         <div className="replys">
             {replys.map((reply,i) => (
                 <div className="replys-item" key={i}>
                     <div className="reply-avatar">
                         <a href="javascript:;">
                             <img src={reply.user_info.avatar || defaultAvatar} alt=""/>
                         </a>
                     </div>
                     <div className="reply-body">
                         <div className="reply-header">
                             <span>{reply.user_info.nickname}</span>
                         </div>
                         <p className="reply-content">{reply.content}</p>
                         <div className="reply-footer">
                             <span className="reply-time">{formatDate(reply.created)}</span>
                             <a href="javascript:;" className="reply-reply" onClick={e=>showReply(e,k,reply.user_info.nickname)}>
                                 <i className="fa fa-mail-reply"> </i>
                                 回复
                             </a>
                         </div>
                     </div>

                 </div>
             ))
             }
         </div>
     )
 }
}