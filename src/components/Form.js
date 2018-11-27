import React from 'react';
import Back from './Back';

const Form = (props) => {
    //console.log(props)
    return (
        <form className="col-sm-12 form" onSubmit={(e) => props.onHandleSubmit(e)}>
            <h4>Add a new fish product</h4>
            <input
                placeholder="name of fish" 
                type="text"
                onChange={(e) => props.onChangeName(e)}
                value={props.newProductName} /><br />
            <input
                placeholder="price" 
                type="number"
                onChange={(e) => props.onChangePrice(e)}
                value={props.newProductPrice} /><br />
            <input 
                placeholder="type of fish" 
                type="text"
                onChange={(e) => props.onChangeType(e)}
                value={props.newProductType} /><br />
            <textarea
                cols="50"
                rows="4"
                placeholder="desc" 
                type="textarea"
                onChange={(e) => props.onChangeDesc(e)}
                value={props.newProductDesc} /><br />
            <input 
                placeholder="image link" 
                type="text"
                onChange={(e) => props.onChangeImage(e)}
                value={props.newProductImageLink} /><br />
            <button className="submit">Submit</button>
            <Back />
        </form>
    );
}

export default Form;