import React, { Component } from 'react';
import Back from './Back';

class Single extends Component {
    handleKeyPress = (e, code, cid, text, user, i) => {
        if (e.key === 'Enter') {
            this.props.onSaveComment(e, code, cid, text, user, i);
        }
    }
    render() {
    //console.log('single',this.props)
    //console.log('comments',this.props.comments)
    if(this.props.fish.length === 0 || this.props.comments.length === 0) {
        return (
            <div>
                loading...
            </div>
        );
    }

    const singleFish = this.props.fish.filter(single => single.id === Number.parseInt(this.props.match.params.id));
    //console.log('singleFish',singleFish[0].code)

    const arrOfOnePostComments = this.props.comments[singleFish[0].code] || [];

    //console.log('arrOfOnePostComments', arrOfOnePostComments);

    const comments = arrOfOnePostComments.map((comment, i) => {
        if(i < -1 || undefined) {
            return <div key={i}>&nbsp;</div>
        } else {
            return (
                <div className="comments" key={comment.cid}>
                    <div className="comment">
                        <a className="delete-btn"
                        onClick={(e) => this.props.onDeleteComment(e, singleFish[0].code, comment.cid)}>X</a>&nbsp;
                        <span className="user">{ comment.user }</span>:&nbsp;
                        <span className={`text ${this.props.isEditButtonClick && this.props.editMsgCid === comment.cid ? "" : "show"}`}>{ comment.text }</span>
                        <a 
                            className={`edit-btn ${this.props.isEditButtonClick && this.props.editMsgCid === comment.cid ? "" : "show"}`}
                            onClick={() => this.props.onClickEdit(comment.text, comment.cid)}>(edit)</a>
                        <div className={`edit-hidden ${this.props.isEditButtonClick && this.props.editMsgCid === comment.cid ? "show" : ""}`}>
                            <input
                                className="update-input"
                                onChange={(e) => this.props.onUpdateInputComment(e)}
                                onKeyPress={(e) => this.handleKeyPress(e, singleFish[0].code, comment.cid, this.props.editMsg, comment.user, i)}
                                value={this.props.editMsg}/>
                            <a 
                                className="save-btn"
                                onClick={(e) => this.props.onSaveComment(e, singleFish[0].code, comment.cid, this.props.editMsg, comment.user, i)}>(save)</a>
                        </div>
                    </div>
                </div>
            )
        }
    });
    // console.log(comments)
        return (
            <div className="product" key={singleFish[0].id}>
                <Back />
                <img className="col-sm-8" src={singleFish[0].image} alt={singleFish[0].name} />
                <div className="col-sm-4">
                    <h4 className="name">{singleFish[0].name}</h4>
                    <div className="desc">{singleFish[0].desc}</div>
                    <div className="price">${singleFish[0].price}</div>
                    <h5 className="comments-title">Customer Review</h5>
                    <div>{ comments }</div>
                    <form onSubmit={(e) => this.props.onHandleNewComment(e, singleFish[0].code, arrOfOnePostComments.length)}>
                        <input 
                            className="new-comment" 
                            type="text" 
                            placeholder="leave a message..."
                            value={this.props.newComment}
                            onChange={this.props.onChangeComment} />
                    </form>
                </div>
            </div>
        );
    }
}

export default Single;