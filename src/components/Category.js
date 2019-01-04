import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Fish from './Fish';
import { Link } from "react-router-dom";

class Category extends Component {
    
    render() {
        const { fish, currentPage, fishPerPage, filteredFish } = this.props;
        const filteredPanel = (
            <div className="filtered-fish-panel">
                <button onClick={(event) => this.props.filterFish(event, fish)} value="angelfish" className="filtered-btn">Angel Fish</button><br/>
                <button onClick={(event) => this.props.filterFish(event, fish)} value="butterflyfish" className="filtered-btn">Butterfly fish</button><br/>
                <button onClick={(event) => this.props.filterFish(event, fish)} value="tang" className="filtered-btn">Tang fish</button><br/>
                <button onClick={(event) => this.props.filterFish(event, fish)} value="all" className="filtered-btn">All</button><br/>
            </div>
        );
        
        // Logic for displaying current fish
        const indexOfLastFish = currentPage * fishPerPage;
        const indexOfFirstFish = indexOfLastFish - fishPerPage;
        const currentFish = filteredFish.slice(indexOfFirstFish, indexOfLastFish);
        
        const renderFish = currentFish.map((singleFish) => {
            return (
                <Fish key={singleFish.id}
                    id={singleFish.id}
                    image={singleFish.image}
                    name={singleFish.name}
                    price={singleFish.price}
                />
            );
        });
  
        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(filteredFish.length / fishPerPage); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <span
                    className={(currentPage === number ? 'active ' : '')}
                    key={number}
                    id={number}
                    onClick={this.props.clickPage}
                >
                    {number}
                </span>
            );
        });

        if(filteredFish.length === 0) {
            return (
                <div className="col-sm-12 links">
                    { filteredPanel }
                    loading...
                </div>
            );
        }

        return (
            <div>
                <div className="col-sm-12 links">
                    { filteredPanel }
                    <Link className="link" to="marinefish/type/angelfish">angelfish</Link>
                    <Link className="link" to="marinefish/type/butterflyfish">butterflyfish</Link>
                    <Link className="link" to="marinefish/type/tang">tang</Link>
                    <Link className="link" to="/form">Add a new fish product</Link>
                    <Link className="link" to="/login">Login</Link>
                </div>
                { renderFish }
                <div className="col-sm-12 pagination">
                    { renderPageNumbers }
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { 
        fish: state.products.fish,
        currentPage: state.products.currentPage,
        fishPerPage: state.products.fishPerPage,
        filteredFish: state.products.filteredFish
    };
}

export default connect(mapStateToProps, actions)(Category);