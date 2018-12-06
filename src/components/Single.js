import React, { Component } from 'react';
import Back from './Back';
import { Link } from "react-router-dom";
import ScrollToTopOnMount from './ScrollToTopOnMount';
import { printResult } from './RatingStars';


class Single extends Component {

    handleKeyPress = (e, code, cid, text, user, value, i) => {
        if (e.key === 'Enter') {
            this.props.onSaveComment(e, code, cid, text, user, value, i);
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
    const randomFish = this.props.randomFish.map(single => {
        return (
            <div className="recommend-item" key={single.id}>
                <Link to={`/marinefish/id/${single.id}`}>
                    <img src={single.image} />
                </Link>
            </div>
        )
    })

    const singleFish = this.props.fish.filter(single => single.id === this.props.match.params.id);
    //console.log('singleFish',singleFish[0].code)

    const arrOfOnePostComments = this.props.comments[singleFish[0].code] || [];

    //console.log('arrOfOnePostComments', arrOfOnePostComments);

    const comments = arrOfOnePostComments.map((comment, i) => {
        if(i < -1 || undefined) {
            return <div key={i}>&nbsp;</div>
        } else {
            return (
                <div className="comment" key={comment.cid}>
                    <div className="user">
                        <a className="delete-btn"
                        onClick={(e) => this.props.onDeleteComment(e, singleFish[0].code, comment.cid)}>X</a>&nbsp;
                        { comment.user }:&nbsp;
                        <span className={`text ${this.props.isEditButtonClick && this.props.editMsgCid === comment.cid ? "" : "show"}`}>
                            { comment.text }
                            <a  
                            className={`edit-btn ${this.props.isEditButtonClick && this.props.editMsgCid === comment.cid ? "" : "show"}`}
                            onClick={() => this.props.onClickEdit(comment.text, comment.rating, comment.cid)}>&nbsp;&nbsp;(edit)</a>
                        </span>
                    </div>
                    <div className={`edit-hidden ${this.props.isEditButtonClick && this.props.editMsgCid === comment.cid ? "show" : ""}`}>
                        <textarea
                            rows="3" 
                            cols="25"
                            className="update-textarea"
                            onChange={(e) => this.props.onUpdateTextareaComment(e)}
                            onKeyPress={(e) => this.handleKeyPress(e, singleFish[0].code, comment.cid, this.props.editMsg, comment.user, this.props.editRatingValue, i)}
                            value={this.props.editMsg}/>
                        <legend htmlFor="update-rating-select" className="update-rating-select-title">Rating:</legend>
                        <select
                            value = {this.props.editRatingValue}
                            className="update-rating-select"
                            onChange={(e) => this.props.onUpdateSelectRating(e)} 
                            >
                            <option value="">No Option</option>
                            <option value="5">5</option>
                            <option value="4.5">4.5</option>
                            <option value="4">4</option>
                            <option value="3.5">3.5</option>
                            <option value="3">3</option>
                            <option value="2.5">2.5</option>
                            <option value="2">2</option>
                            <option value="1.5">1.5</option>
                            <option value="1">1</option>
                            <option value="0.5">0.5</option>
                            <option value="0">0</option>
                        </select>
                        <a  
                            className="save-btn"
                            onClick={(e) => this.props.onSaveComment(e, singleFish[0].code, comment.cid, this.props.editMsg, comment.user, this.props.editRatingValue, i)}>(save)</a>
                    </div>
                    <div className="rating">
                        { comment.rating !== "" ? comment.rating !== undefined ? <div dangerouslySetInnerHTML={{__html: printResult(comment.rating)}} /> : <span></span> : <span></span> }
                    </div>
                </div>
            )
        }
    });
    console.log('this.props.editRatingValue',this.props.editRatingValue)
        return (
            <div className="product" key={singleFish[0].id}>
                <ScrollToTopOnMount />
                <Back />
                <div className="col-sm-7">
                    <img className="img single" src={singleFish[0].image} alt={singleFish[0].name} />
                    <div className="recommend">
                        <h6 className="recommend-title">You may also like...</h6>
                        { randomFish }
                    </div>
                </div>
                <div className="col-sm-5">
                    <h4 className="name single">{singleFish[0].name}</h4>
                    <div className="desc single">{singleFish[0].desc}</div>
                    <div className="price single">${singleFish[0].price}</div>
                    <div className="spec">
                        <div className="list" onClick={() => this.props.handleAccordionClick(1)}>
                        
                            <div className="title" dangerouslySetInnerHTML={{__html: `${this.props.shown[1] ? '<span class="fa fa-caret-down"></span><span>  Care Level</span>' : '<span class="fa fa-caret-right"></span><span>  Care Level</span>'}`}}></div>
                            <div className={`value ${this.props.shown[1]? "active" :""}`}>{singleFish[0].care_level}</div>
                        </div>
                        <div className="list" onClick={() => this.props.handleAccordionClick(2)}>
                            <div className="title" dangerouslySetInnerHTML={{__html: `${this.props.shown[2] ? '<span class="fa fa-caret-down"></span><span>  Temperament</span>' : '<span class="fa fa-caret-right"></span><span>  Temperament</span>'}`}}></div>
                            <div className={`value ${this.props.shown[2]? "active" :""}`}>{singleFish[0].temperament}</div>
                        </div>
                        <div className="list" onClick={() => this.props.handleAccordionClick(3)}>
                            <div className="title" dangerouslySetInnerHTML={{__html: `${this.props.shown[3] ? '<span class="fa fa-caret-down"></span><span>  Diet</span>' : '<span class="fa fa-caret-right"></span><span>  Diet</span>'}`}}></div>
                            <div className={`value ${this.props.shown[3]? "active" :""}`}>{singleFish[0].diet}</div>
                        </div>
                        <div className="list" onClick={() => this.props.handleAccordionClick(4)}>
                            <div className="title" dangerouslySetInnerHTML={{__html: `${this.props.shown[4] ? '<span class="fa fa-caret-down"></span><span>  Reef Safe</span>' : '<span class="fa fa-caret-right"></span><span>  Reef Safe</span>'}`}}></div>
                            <div className={`value ${this.props.shown[4]? "active" :""}`}>{singleFish[0].reef_safe ? "Yes" : "No"}</div>
                        </div>
                        <div className="list" onClick={() => this.props.handleAccordionClick(5)}>
                            <div className="title" dangerouslySetInnerHTML={{__html: `${this.props.shown[5] ? '<span class="fa fa-caret-down"></span><span>  Minimum Tank Size (gallon)</span>' : '<span class="fa fa-caret-right"></span><span>  Minimum Tank Size (gallon)</span>'}`}}></div>
                            <div className={`value ${this.props.shown[5]? "active" :""}`}>{singleFish[0].minimum_tank_size}g</div>
                        </div>
                    </div>
                    <h5 className="comments-title single">Customer Review</h5>
                    <div className="comments">{ comments }</div>
                    <form className="leave-message-form" onSubmit={(e) => this.props.onHandleNewComment(e, singleFish[0].code, arrOfOnePostComments.length, this.props.selectedRatingValue)}>
                        <textarea 
                            className="new-comment" 
                            type="text" 
                            placeholder="Leave a message..."
                            value={this.props.newComment}
                            onChange={this.props.onChangeComment} />
                        <legend htmlFor="rating-select" className="rating-select-title">Rating:</legend>
                        <select
                            value = {this.props.selectedRatingValue}
                            className="rating-select"
                            onChange={(e) => this.props.onHandleSelectRating(e)} 
                            >
                            <option value="">No Option</option>
                            <option value="5">5</option>
                            <option value="4.5">4.5</option>
                            <option value="4">4</option>
                            <option value="3.5">3.5</option>
                            <option value="3">3</option>
                            <option value="2.5">2.5</option>
                            <option value="2">2</option>
                            <option value="1.5">1.5</option>
                            <option value="1">1</option>
                            <option value="0.5">0.5</option>
                            <option value="0">0</option>
                        </select>
                        <button className="submit" disabled={ this.props.newComment === "" ? true : false}>Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Single;