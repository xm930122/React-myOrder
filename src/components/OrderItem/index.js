import React, { Component } from "react";
import "./style.css";

class OrderItem extends Component {
    constructor(props){
        super(props);
        this.state={
            editing:false,
            stars:props.data.stars||0,
            comment:props.data.comment||""
        }
    }
  render() {
      const {shop,product,price,picture,ifCommented}=this.props.data;
    return (
      <div className="orderItem">
        <div className="orderItem_picContainer">
          <img className="orderItem_pic" src={picture}/>
        </div>
        <div className="orderItem_content">
          <div className="orderItem_product">{product}</div>
          <div className="orderItem_shop">{shop}</div>
          <div className="orderItem_detail">
          <div className="orderItem_price">{price}</div>
          <div>
              {
                  ifCommented?(
                  <button className="orderItem_btn orderItem_btn-grey">已评价</button>):(
                    <button className="orderItem_btn orderItem_btn-red" onClick={this.handleopenEditArea}>评价</button>
                  )
              }
              </div>
        </div>
        </div>
        {this.state.editing?this.renderEditArea():null}
      </div>
    );
  }

  renderEditArea(){
      return(
          <div className="orderItem_commentContainer">
              <textarea onChange={this.handleCommentChange}
              value={this.state.comment}
              className="orderItem_comment"/>
              {this.renderStars()}
              <button className="orderItem_btn orderItem_btn-red" onClick={this.handleSubmitComment}>提交</button>
              <button className="orderItem_btn orderItem_btn-grey" onClick={this.handleCancelComment}>取消</button>
          </div>
      )
  }

  renderStars(){
      const {stars}=this.state;
      return(
          <div>
              {
                  [1,2,3,4,5].map((item,index)=>{
                      const lightClass=stars>=item?"orderItem_star-light":"";
                      return  (
                      <span className={"orderItem_star "+lightClass} key={index} onClick={this.handleClickStars.bind(this,item)}>★</span>
                      )
                  })
              }
          </div>
      )
  }

  handleopenEditArea=()=>{
      this.setState({
        editing:true
      });
  }

  handleCommentChange=(e)=>{
      this.setState({
          comment:e.target.value
      })
  }

  handleClickStars=(stars)=>{
      this.setState({
          stars:stars
      })
  }

  handleCancelComment=()=>{
      this.setState({
          editing:false,
          stars:this.props.data.stars||0,
          comment:this.props.data.comment||""   
      })
  }

  handleSubmitComment=()=>{
      const {id}=this.props.data;
      const {comment,stars}=this.state;
      this.setState({
          editing:false
      })
      this.props.onSubmit(id,comment,stars)
  }



}

export default OrderItem;
