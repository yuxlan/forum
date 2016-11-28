import React from 'react'
import {Link} from 'react-router'
import tworoadgif013 from '../../assets/images/tworoad-gif013.png';
import tworoadgif010 from '../../assets/images/tworoad-gif010.png';

export default class UserPage extends React.Component{
    render(){
        return (
            <div>
                <br />
                <br />
                <br />
            <table className="table-1">
                <tr>
                    <td className="td-1"> </td>
                    <td className="td-2"><img src={tworoadgif010} className="img-2"/></td>
                    <td className="td-1"> </td>
                </tr>
                <tr>
                    <td> </td>
                    <td>
                        {
                            sessionStorage.getItem('u_intro') === null
                                ?
                                <p className="text-center">&nbsp;</p>
                                :
                                <p className="text-center">{sessionStorage.getItem('u_intro')}</p>
                        }
                        <p>&nbsp;</p>
                        <p>&nbsp;</p>
                        <p>&nbsp;</p>
                    </td>
                    <td> </td>
                </tr>
                <tr>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                </tr>
                <tr>
                    <td> </td>
                    <td className="td-3"> </td>
                    <td> </td>
                </tr>
                <tr>
                    <td> </td>
                    <td><img src={tworoadgif013} className="img-1"/></td>
                    <td> </td>
                </tr>
                <tr>
                    <td> </td>
                    <td>
                        <table className="l-r-b-1pxline table-3">
                            <tr>
                                <td className="td-4"><table className="l-r-t-b-1pxline table-4">
                                    <tr>
                                        <td> </td>
                                    </tr>
                                </table>
                                </td>
                                <td className="td-5"><table className="table-5">
                                    <tr>
                                        {
                                            sessionStorage.getItem('u_name') === null
                                                ?
                                                <td className="td-6">用户名：</td>
                                                :
                                                <td className="td-6">用户名：{sessionStorage.getItem('u_name')}</td>
                                        }
                                        <td className="td-7">&nbsp;</td>
                                        {
                                            sessionStorage.getItem('u_email') === null
                                                ?
                                                <td className="td-6">邮&nbsp;&nbsp;&nbsp;&nbsp;箱：</td>
                                                :
                                                <td className="td-6">邮&nbsp;&nbsp;&nbsp;&nbsp;箱：{sessionStorage.getItem('u_email')}</td>

                                        }
                                        <td className="td-7">&nbsp;</td>
                                    </tr>
                                    <tr>
                                        {
                                            sessionStorage.getItem('u_reputation') === null
                                                ?
                                                <td>声望值：</td>
                                                :
                                                <td>声望值：{sessionStorage.getItem('u_reputation')}</td>
                                        }
                                        <td>&nbsp;</td>
                                        {
                                            sessionStorage.getItem('u_level') === null
                                                ?
                                                <td>用户等级：</td>
                                                :
                                                <td>用户等级：{sessionStorage.getItem('u_level')}</td>
                                        }
                                        <td>&nbsp;</td>
                                    </tr>
                                    <tr>
                                        {
                                            sessionStorage.getItem('u_realname') === null
                                                ?
                                                <td>真实姓名：</td>
                                                :
                                                <td>真实姓名：{sessionStorage.getItem('u_realname')}</td>
                                        }
                                        <td>&nbsp;</td>
                                        {
                                            sessionStorage.getItem('u_blog') === null
                                                ?
                                                <td>博&nbsp;&nbsp;&nbsp;&nbsp;客：</td>
                                                :
                                                <td>博&nbsp;&nbsp;&nbsp;&nbsp;客：{sessionStorage.getItem('u_blog')}</td>
                                        }
                                        <td>&nbsp;</td>
                                    </tr>
                                    <tr>
                                        {
                                            sessionStorage.getItem('u_github') === null
                                                ?
                                                <td><p>GitHub：</p></td>
                                                :
                                                <td><p>GitHub：{sessionStorage.getItem('u_github')}</p></td>
                                        }
                                        <td>&nbsp;</td>
                                        <td>&nbsp;</td>
                                        <td>&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td>&nbsp;</td>
                                        <td>&nbsp;</td>
                                        <td>&nbsp;</td>
                                        <td>&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td>&nbsp;</td>
                                        <td>&nbsp;</td>
                                        <td>&nbsp;</td>
                                        <td>&nbsp;</td>
                                    </tr>
                                </table></td>
                            </tr>
                        </table>
                    </td>
                    <td> </td>
                </tr>
                <tr>
                    <td> </td>
                    <td className="td-8">&nbsp;</td>
                    <td> </td>
                </tr>
            </table>
            </div>
        )
    }
}