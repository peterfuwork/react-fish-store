import React, { Component } from 'react';
import { connect } from 'react-redux';
import Fish from './Fish';
import Back from './Back';

class Filtered extends Component {
    render() {
        const { fish, match } = this.props;
        if(fish.length === 0) {
            return (
                <div>
                    loading...
                </div>
            );
        }

        const schoolOfFilteredFish = fish.filter(singleFish => {
            return singleFish.type.toLowerCase().replace(/\s/g, "") === match.params.type;
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
}

function mapStateToProps(state) {
    return { 
        fish: state.products.fish
    };
}

export default connect(mapStateToProps, null)(Filtered);