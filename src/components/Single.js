import React, { Component } from 'react';
import Back from './Back';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import * as actions from '../actions';
import { Link } from "react-router-dom";
import ScrollToTopOnMount from './ScrollToTopOnMount';
import { printResult } from './RatingStars';


class Single extends Component {

    handleKeyPress = (event, fid, cid, text, uid, value) => {
        if (event.key === 'Enter') {
            this.props.updateComment(fid, cid, text, uid, value);
        }
    }

    onSubmitAdd = (formProps, code) => {
        this.props.addComment(formProps, code);
    };

    render() {
        
    const { fish, comments, match, shownAccordion, isEditButtonClick, editMsgCid, editMsg, editRatingValue, randomFish} = this.props;
    if(fish.length === 0 || comments.length === 0) {
        return (
            <div>
                loading...
            </div>
        );
    }
    
    const random = randomFish.map(single => {
        return (
            <div className="recommend-item" key={single.id}>
                <Link to={`/marinefish/id/${single.id}`}>
                    <img src={single.image} alt={single.name} />
                </Link>
            </div>
        )
    })

    const singleFish = fish.filter(single => single.id === match.params.id);

    const arrOfOnePostComments = comments.filter(comment => comment.fid === singleFish[0].id) || [];

    const allComments = arrOfOnePostComments.map((comment, i) => {
        if(i < -1 || undefined) {
            return <div key={i}>&nbsp;</div>
        } else {
            return (
                <div className="comment" key={comment.cid}>
                    <div className="user">
                        <a className="delete-btn"
                        onClick={() => this.props.deleteComment(singleFish[0].id, comment.cid)}>X</a>&nbsp;
                        { comment.uid }:&nbsp;
                        <span className={`text ${isEditButtonClick && editMsgCid === comment.cid ? "" : "show"}`}>
                            { comment.text }
                            <a  
                            className={`edit-btn ${isEditButtonClick && editMsgCid === comment.cid ? "" : "show"}`}
                            onClick={() => this.props.clickEdit(comment.text, comment.rating, comment.cid)}>&nbsp;&nbsp;(edit)</a>
                        </span>
                    </div>
                    <form className={`edit-hidden ${isEditButtonClick && editMsgCid === comment.cid ? "show" : ""}`}>
                        <textarea
                            rows="3" 
                            cols="25"
                            name="text"
                            className="update-textarea"
                            onChange={(event) => this.props.changeMsg(event)}
                            onKeyPress={(event) => this.handleKeyPress(event, singleFish[0].id, comment.cid, editMsg, comment.uid, editRatingValue, i)}
                            value={editMsg}/>
                        <legend htmlFor="update-rating-select" className="update-rating-select-title">Rating:</legend>
                        <select
                            name="rating"
                            value={editRatingValue}
                            className="update-rating-select"
                            onChange={(event) => this.props.changeRating(event)}
                            onKeyPress={(event) => this.handleKeyPress(event, singleFish[0].id, comment.cid, editMsg, comment.uid, editRatingValue, i)}
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
                            onClick={(e) => this.props.updateComment(singleFish[0].id, comment.cid, editMsg, comment.uid, editRatingValue)}>(save)</a>
                    </form>
                    <div className="rating">
                        { comment.rating !== "" ? comment.rating !== undefined ? <div dangerouslySetInnerHTML={{__html: printResult(comment.rating)}} /> : <span></span> : <span></span> }
                    </div>
                </div>
            )
        }
    });
        return (
            <div className="product" key={singleFish[0].id}>
                <ScrollToTopOnMount />
                <Back />
                <div className="col-sm-7">
                    <img className="img single" src={singleFish[0].image} alt={singleFish[0].name} />
                    <div className="recommend">
                        <h6 className="recommend-title">You may also like...</h6>
                        { random }
                    </div>
                </div>
                <div className="col-sm-5">
                    <h4 className="name single">{singleFish[0].name}</h4>
                    <div className="desc single">{singleFish[0].desc}</div>
                    <div className="price single">${singleFish[0].price}</div>
                    <div className="spec">
                        <div className="list" onClick={() => this.props.clickAccordion(1)}>
                            <div className="title" dangerouslySetInnerHTML={{__html: `${shownAccordion[1] ? '<span class="fa fa-caret-down"></span><span>  Care Level</span>' : '<span class="fa fa-caret-right"></span><span>  Care Level</span>'}`}}></div>
                            <div className={`value ${shownAccordion[1]? "active" :""}`}>{singleFish[0].care_level}</div>
                        </div>
                        <div className="list" onClick={() => this.props.clickAccordion(2)}>
                            <div className="title" dangerouslySetInnerHTML={{__html: `${shownAccordion[2] ? '<span class="fa fa-caret-down"></span><span>  Temperament</span>' : '<span class="fa fa-caret-right"></span><span>  Temperament</span>'}`}}></div>
                            <div className={`value ${shownAccordion[2]? "active" :""}`}>{singleFish[0].temperament}</div>
                        </div>
                        <div className="list" onClick={() => this.props.clickAccordion(3)}>
                            <div className="title" dangerouslySetInnerHTML={{__html: `${shownAccordion[3] ? '<span class="fa fa-caret-down"></span><span>  Diet</span>' : '<span class="fa fa-caret-right"></span><span>  Diet</span>'}`}}></div>
                            <div className={`value ${shownAccordion[3]? "active" :""}`}>{singleFish[0].diet}</div>
                        </div>
                        <div className="list" onClick={() => this.props.clickAccordion(4)}>
                            <div className="title" dangerouslySetInnerHTML={{__html: `${shownAccordion[4] ? '<span class="fa fa-caret-down"></span><span>  Reef Safe</span>' : '<span class="fa fa-caret-right"></span><span>  Reef Safe</span>'}`}}></div>
                            <div className={`value ${shownAccordion[4]? "active" :""}`}>{singleFish[0].reef_safe ? "Yes" : "No"}</div>
                        </div>
                        <div className="list" onClick={() => this.props.clickAccordion(5)}>
                            <div className="title" dangerouslySetInnerHTML={{__html: `${shownAccordion[5] ? '<span class="fa fa-caret-down"></span><span>  Minimum Tank Size (gallon)</span>' : '<span class="fa fa-caret-right"></span><span>  Minimum Tank Size (gallon)</span>'}`}}></div>
                            <div className={`value ${shownAccordion[5]? "active" :""}`}>{singleFish[0].minimum_tank_size}g</div>
                        </div>
                    </div>
                    <h5 className="comments-title single">Customer Review</h5>
                    <div className="comments">{ allComments }</div>
                    <form className="leave-message-form" onSubmit={this.props.handleSubmit(formProps => this.onSubmitAdd(formProps, singleFish[0].id))} >
                        <fieldset>
                            <Field
                                className="new-comment"
                                placeholder="Leave a message..."
                                name="text"
                                type="textarea"
                                component="textarea"
                                autoComplete="none"
                            />
                        </fieldset><br />
                        <fieldset>
                            <label className="rating-select-title">Rating:</label>
                            <Field className="rating-select" name="rating" component="select">
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
                            </Field>
                        </fieldset><br />
                        <button className="submit" disabled={this.props.pristine || this.props.submitting}>Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { 
        fish: state.products.fish,
        comments: state.messages.comments,
        shownAccordion: state.products.shownAccordion,
        isEditButtonClick: state.messages.isEditButtonClick,
        editMsgCid: state.messages.editMsgCid,
        editMsg: state.messages.editMsg,
        editRatingValue: state.messages.editRatingValue,
        randomFish: state.products.randomFish
    };
}

export default compose(
    connect(mapStateToProps, actions),
    reduxForm({ form: 'addcomment' })
)(Single);