import React from 'react';
import Fish from './Fish';

import { Link } from "react-router-dom";

const Category = (props) => {
    // console.log('category',props.fish)
    if(props.fish.length === 0) {
        return (
            <div>
                loading...
            </div>
        );
    }
    const schoolOfFish = props.fish.map(singleFish => {
        return (
            <Fish key={singleFish.id}
                id={singleFish.id}
                image={singleFish.image}
                name={singleFish.name}
                desc={singleFish.desc}
                price={singleFish.price}
                messages={singleFish.messages}
            />
        );
    });

    return (
        <div>
            <div className="col-sm-12 links">
                <Link className="link" to="marinefish/type/angelfish">angelfish</Link>
                <Link className="link" to="marinefish/type/butterflyfish">butterflyfish</Link>
                <Link className="link" to="marinefish/type/tang">tang</Link>
                <Link className="link" to="/form">Add a new fish product</Link>
            </div>
            { schoolOfFish }
        </div>
    );
}

export default Category;