import React from 'react';
import Back from './Back';

const Single = (props) => {
    // console.log('single',props)
    if(props.fish.length === 0) {
        return (
            <div>
                loading...
            </div>
        );
    }
    const singleFish = props.fish.filter(single => single.id === Number.parseInt(props.match.params.id));
    // console.log(singleFish)
    const comments = singleFish[0].messages.map((comment, i) => {
        if(i === -1) {
            return <div key={i}>&nbsp;</div>
        } else {
            return (
                <div className="comments" key={i}>
                    <a href="#" className="comment">X&nbsp;<span className="text">{ comment.text }</span></a>
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
                { comments }
            </div>
        </div>
    );
}

export default Single;