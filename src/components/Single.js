import React from 'react';
import Back from './Back';

const Single = (props) => {
    //console.log('single',props)
    //console.log('comments',props.comments)

    if(props.fish.length === 0 || props.comments.length === 0) {
        return (
            <div>
                loading...
            </div>
        );
    }


    const singleFish = props.fish.filter(single => single.id === Number.parseInt(props.match.params.id));
    console.log('singleFish',singleFish[0].code)

    const arrOfOnePostComments = props.comments[singleFish[0].code] || [];

    console.log('arrOfOnePostComments', arrOfOnePostComments);

    const comments = arrOfOnePostComments.map((comment, i) => {
        console.log('comment',comment);
        console.log('i',i)
        if(i < -1 || undefined) {
            return <div key={i}>&nbsp;</div>
        } else {
            return (
                <div className="comments" key={i}>
                    <a href="#" className="comment">X&nbsp;<span className="user">{ comment.user }</span>:&nbsp;<span className="text">{ comment.text }</span></a>
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
                <form onSubmit={(e) => props.onHandleNewComment(e, singleFish[0].code, arrOfOnePostComments.length)}>
                    <input 
                        className="new-comment" 
                        type="text" 
                        placeholder="leave a message..."
                        value={props.newComment}
                        onChange={props.onChangeComment} />
                </form>
            </div>
        </div>
    );
}

export default Single;