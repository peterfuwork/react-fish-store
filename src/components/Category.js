import React from 'react';
import Fish from './Fish';

import { Link } from "react-router-dom";

const Category = (props) => {
    // console.log('category',props.fish)
    
    if(props.filteredfish.length === 0) {
        return (
            <div>
                loading...
            </div>
        );
    }
    const schoolOfFish = props.filteredfish.map(singleFish => {
        return (
            <Fish key={singleFish.id}
                id={singleFish.id}
                image={singleFish.image}
                name={singleFish.name}
                price={singleFish.price}
            />
        );
    });

    return (
        <div>
            <div className="col-sm-12 links">
                <div className="filtered-fish-panel">
                    <button onClick={(e) => props.onClickFilter(e)} type="radio" name="filteredFish" value="angelfish" className="filtered-btn">Angel Fish</button><br/>
                    <button onClick={(e) => props.onClickFilter(e)} type="radio" name="filteredFish" value="butterflyfish" className="filtered-btn">Butterfly fish</button><br/>
                    <button onClick={(e) => props.onClickFilter(e)} type="radio" name="filteredFish" value="tang" className="filtered-btn">Tang fish</button><br/>
                    <button onClick={(e) => props.onClickFilter(e)} type="radio" name="filteredFish" value="all" className="filtered-btn">All</button><br/>
                </div>
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