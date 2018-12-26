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
                placeholder="Name of fish" 
                type="text"
                onChange={(e) => props.onHandleInput(e)}
                value={props.newProductName}
                name="newProductName" /><br />
            <input
                placeholder="Price" 
                type="number"
                onChange={(e) => props.onHandleInput(e)}
                value={props.newProductPrice}
                name="newProductPrice" /><br />
            <input 
                placeholder="Type of fish" 
                type="text"
                onChange={(e) => props.onHandleInput(e)}
                value={props.newProductType}
                name="newProductType" /><br />
            <textarea
                cols="50"
                rows="4"
                placeholder="Description" 
                type="textarea"
                onChange={(e) => props.onHandleInput(e)}
                value={props.newProductDesc}
                name="newProductDesc" /><br />

            <input 
                placeholder="Care Level"
                type="text"
                onChange={(e) => props.onHandleInput(e)}
                value={props.newProductCare}
                name="newProductCare" /><br />
            <input 
                placeholder="Temperament" 
                type="text"
                onChange={(e) => props.onHandleInput(e)}
                value={props.newProductTemperament}
                name="newProductTemperament" /><br />
            <input 
                placeholder="Diet" 
                type="text"
                onChange={(e) => props.onHandleInput(e)}
                value={props.newProductDiet}
                name="newProductDiet" /><br />
            <div>Is it reef safe?</div>
            <input 
                className="radio-button" 
                type="radio" 
                name="newProductReef"
                onChange={(e) => props.onChangeReef(e)}
                value="Yes" /> Yes&nbsp;&nbsp;&nbsp;
            <input 
                className="radio-button" 
                type="radio" 
                name="newProductReef"
                onChange={(e) => props.onChangeReef(e)}
                value="No" /> No&nbsp;&nbsp;&nbsp;<br/>
            <input 
                placeholder="Minimum tank size (g)" 
                type="number"
                onChange={(e) => props.onHandleInput(e)}
                value={props.newProductTankSize}
                name="newProductTankSize" /><br />
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