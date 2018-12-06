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
                onChange={(e) => props.onChangeName(e)}
                value={props.newProductName} /><br />
            <input
                placeholder="Price" 
                type="number"
                onChange={(e) => props.onChangePrice(e)}
                value={props.newProductPrice} /><br />
            <input 
                placeholder="Type of fish" 
                type="text"
                onChange={(e) => props.onChangeType(e)}
                value={props.newProductType} /><br />
            <textarea
                cols="50"
                rows="4"
                placeholder="Description" 
                type="textarea"
                onChange={(e) => props.onChangeDesc(e)}
                value={props.newProductDesc} /><br />

            <input 
                placeholder="Care Level"
                type="text"
                onChange={(e) => props.onChangeCare(e)}
                value={props.newProductCare} /><br />
            <input 
                placeholder="Temperament" 
                type="text"
                onChange={(e) => props.onChangeTemperament(e)}
                value={props.newProductTemperament} /><br />
            <input 
                placeholder="Diet" 
                type="text"
                onChange={(e) => props.onChangeDiet(e)}
                value={props.newProductDiet} /><br />
            <div>Is it reef safe?</div>
            <input 
                className="radio-button" 
                type="radio" 
                name="reef-safe"
                onChange={(e) => props.onChangeReef(e)}
                value="Yes" /> Yes&nbsp;&nbsp;&nbsp;
            <input 
                className="radio-button" 
                type="radio" 
                name="reef-safe"
                onChange={(e) => props.onChangeReef(e)}
                value="No" /> No&nbsp;&nbsp;&nbsp;<br/>
            <input 
                placeholder="Minimum tank size (g)" 
                type="number"
                onChange={(e) => props.onChangeTankSize(e)}
                value={props.newProductTankSize} /><br />
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