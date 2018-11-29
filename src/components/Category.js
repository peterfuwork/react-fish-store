import React, { Component } from 'react';
import Fish from './Fish';
import { Link } from "react-router-dom";

class Category extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        console.log('this.props',this.props)
        // console.log('category',this.props.fish)
        const filteredPanel = (
            <div className="filtered-fish-panel">
                <button onClick={(e) => this.props.onClickFilter(e)} value="angelfish" className="filtered-btn">Angel Fish</button><br/>
                <button onClick={(e) => this.props.onClickFilter(e)} value="butterflyfish" className="filtered-btn">Butterfly fish</button><br/>
                <button onClick={(e) => this.props.onClickFilter(e)} value="tang" className="filtered-btn">Tang fish</button><br/>
                <button onClick={(e) => this.props.onClickFilter(e)} value="all" className="filtered-btn">All</button><br/>
            </div>
          );

        if(this.props.filteredFish.length === 0) {
            return (
                <div className="col-sm-12 links">
                    { filteredPanel }
                    loading...
                </div>
            );
        }

        

        // const schoolOfFish = this.props.filteredFish.map(singleFish => {
        //     return (
        //         <Fish key={singleFish.id}
        //             id={singleFish.id}
        //             image={singleFish.image}
        //             name={singleFish.name}
        //             price={singleFish.price}
        //         />
        //     );
        // });

        const { filteredFish, currentPage, fishPerPage } = this.props;

        // Logic for displaying current todos
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
                    key={number}
                    id={number}
                    onClick={this.props.onHandleClickPage}
                >
                    {number}
                </span>
            );
        });

        return (
            <div>
                <div className="col-sm-12 links">
                    { filteredPanel }
                    <Link className="link" to="marinefish/type/angelfish">angelfish</Link>
                    <Link className="link" to="marinefish/type/butterflyfish">butterflyfish</Link>
                    <Link className="link" to="marinefish/type/tang">tang</Link>
                    <Link className="link" to="/form">Add a new fish product</Link>
                </div>
                {/* { schoolOfFish } */}
                { renderFish }
                <div className="col-sm-12 pagination">
                    { renderPageNumbers }
                </div>
            </div>
        );
    }
}

export default Category;