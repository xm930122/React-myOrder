import React, { Component } from 'react';
import OrderItem from '../OrderItem';


class OrderList extends Component {
    constructor(props){
        super(props);
        this.state={data:[]};
    }
    componentDidMount(){
        fetch("/mock/orders.json").then(res=>{  //路径：通过create-react-app创建出来的项目，public文件夹下的静态资源是可以直接通过http请求方式获取到的，所以mock的第一级路径对应的是public下面的文件夹
            if(res.ok){
                res.json().then(data=>{
                    this.setState({
                        data
                    })
                })
            }
        })
   }

    render() {
        return (
            <div>
                {
                    this.state.data.map(item=>{
                        return  <OrderItem key={item.id} data={item} onSubmit={this.handleSubmit}/>
                    })
                }
               
            </div>
        );
    }

    handleSubmit=(id,comment,stars)=>{
        
        const newData=this.state.data.map(item=>{
            return item.id===id?
            {
                ...item,comment,stars,ifCommented:true
            }:item;
        });
        this.setState({
            data:newData
        })
    }
}

export default OrderList;