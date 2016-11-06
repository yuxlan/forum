import React from 'react'
import tiny from '../../assets/imgs/tiny.gif'

export default class Tags extends React.Component{

    constructor(){
        super();
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(changeSort,options){
        return function(e){
            changeSort(e,options);
        }
    }
    render(){
        const {tagList,options,changeSort,isFetching} = this.props;

        return(

            <ul className="sort-tags list-unstyled clearfix">
                <li>
                    <a href="#"
                       className={(options.sortName == 'created')&&'active'}
                       onClick={this.handleClick(changeSort,{'currentPage':1,'sortName':'created','tagId':''})}>
                        最新
                    </a>
                </li>
                <li>
                    <a href="#"
                       className={(options.sortName == 'visit_count')&&'active'}
                       onClick={this.handleClick(changeSort,{'currentPage':1,'sortName':'visit_count','tagId':''})}>
                        最热
                    </a>
                </li>
                {
                    tagList.map((tag,i) => {
                        return (
                            <li key={i}>
                                <a className={(options.tagId == i)&&'active'}
                                   href="#"
                                   onClick={this.handleClick(changeSort,{'currentPage':1,'sortName':'','tagId':''})}>
                                    {tag[i]}
                                </a>
                            </li>
                        )
                    })
                }
                {isFetching&&
                <li>
                    <img src={tiny} alt="" className="loader-tiny"/>
                </li>
                }
            </ul>

        )
    }
}