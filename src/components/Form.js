import React from 'react';
import Back from './Back';
// import Cropper from 'react-cropper';
// import 'cropperjs/dist/cropper.css';

const Form = (props) => {
    //console.log(props)
    return (
        <form className="col-sm-12 form" onSubmit={(e) => props.onHandleSubmit(e)}>
            <Back />
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
                type="file"
                onChange={(e) => props.onChangeImage(e)} /><br />
            {/* <Cropper
                style={{ height: 400, width: '100%' }}
                aspectRatio={16 / 16}
                preview=".img-preview"
                src={props.newProductImageLink}
                ref={cropper => { this.cropper = cropper; }}
            /> */}
            <button className="submit">Submit</button>
        </form>
    );
}

export default Form;