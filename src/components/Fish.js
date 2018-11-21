import React from 'react';

import { Link } from "react-router-dom";

const Fish = (props) => {
    // console.log('fish', props)
    return (
        <div className="col-sm-4 product">
            <Link to={`/marinefish/id/${props.id}`}>
                <img className="img" src={props.image} alt={props.name} />
            </Link>
            <h4 className="name">{props.name}</h4>
            <div className="price">${props.price}</div>
            <div className="desc">{props.desc}</div>
        </div>
    );
}

export default Fish;