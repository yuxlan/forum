import React from 'react'
import {formatDate} from '../../utiles'
import defaultAvatar from '../../assets/imgs/userimg.png'

export default class Reply extends React.Component{
 render(){
     const {replys,k,showReply} = this.props;
     console.log(replys);

     return (
         <div className="replys">
             {replys.map((reply,i) => (
                 <div className="replys-item" key={i}>
                     <div className="reply-avatar">
                         <a href="#">
                             <img src={reply.u_id.avatar || defaultAvatar} alt=""/>
                         </a>
                     </div>
                     <div className="reply-body">
                         <div className="reply-header">
                             <span>{reply.u_id.nickname}</span>
                         </div>
                         <p className="reply-content">{reply.content}</p>
                         <div className="reply-footer">
                             <span className="reply-time">{formatDate(reply.created)}</span>
                             <a href="#"
                                className="reply-reply"
                                onClick={e=>showReply(e,k,reply.u_id.nickname)}>
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