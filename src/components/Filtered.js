import React from 'react';
import Fish from './Fish';

import Back from './Back';

const Filtered = (props) => {
    // console.log('filtered', props)
    if(props.fish.length === 0) {
        return (
            <div>
                loading...
            </div>
        );
    }

    const schoolOfFilteredFish = props.fish.filter(singleFish => {
        return singleFish.type === props.match.params.type;
    });

    const schoolOfFish = schoolOfFilteredFish.map(singleFish => {
        return (
            <Fish 
                key={singleFish.id} 
                id={singleFish.id}
                image={singleFish.image}
                name={singleFish.name}
                price={singleFish.price}
            />
        );
    });
    
    return (
        <div>
            <Back />
            { schoolOfFish }
        </div>
    );
}

export default Filtered;