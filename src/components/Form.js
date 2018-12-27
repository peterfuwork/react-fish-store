import React, { Component } from 'react';
import Back from './Back';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Form extends Component {

    onSubmit = (formProps) => {
        this.props.addFish(formProps, () => {
            this.props.history.push('/');
        });
    };
    
    render() {

        const adaptFileEventToValue = delegate => e => delegate(e.target.files[0]);

        const FileInput = ({ 
            input: { value: omitValue, onChange, onBlur, ...inputProps }, 
            meta: omitMeta, 
            ...props 
        }) => {
            return (
                <input
                    onChange={adaptFileEventToValue(onChange)}
                    onBlur={adaptFileEventToValue(onBlur)}
                    type="file"
                    {...props.input}
                    {...props}
                />
            );
        };

        return (
            <form className="col-sm-12 form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Back />
                <h4>Add a new fish product</h4>
                <fieldset>
                    <Field 
                        placeholder="Name of fish" 
                        name="name"
                        type="text"
                        component="input"
                        autoComplete="none"
                    />
                </fieldset><br />
                <fieldset>
                    <Field 
                        placeholder="Price"
                        name="price"
                        type="number"
                        component="input"
                        autoComplete="none"
                    />
                </fieldset><br />
                <fieldset>
                    <Field 
                        placeholder="Type of fish"
                        name="type"
                        type="text"
                        component="input"
                        autoComplete="none"
                    />
                </fieldset><br />
                <fieldset>
                    <Field 
                        cols="50"
                        rows="4"
                        placeholder="Description"
                        name="desc"
                        type="textarea"
                        component="textarea"
                        autoComplete="none"
                    />
                </fieldset><br />
                <fieldset>
                    <Field
                        placeholder="Care Level"
                        name="care_level"
                        type="text"
                        component="input"
                        autoComplete="none"
                    />
                </fieldset><br />
                <fieldset>
                    <Field
                        placeholder="Temperament" 
                        name="temperament"
                        type="text"
                        component="input"
                        autoComplete="none"
                    />
                </fieldset><br />
                <fieldset>
                    <Field
                        placeholder="Diet" 
                        name="diet"
                        type="text"
                        component="input"
                        autoComplete="none"
                    />
                </fieldset><br />
                <fieldset>
                    <label>Is it reef safe?</label>
                    <Field
                        className="radio-button"
                        name="reef_safe"
                        type="radio"
                        component="input"
                        autoComplete="none"
                        value="Yes"
                    /> Yes&nbsp;&nbsp;&nbsp;
                    <Field
                        className="radio-button"
                        name="reef_safe"
                        type="radio"
                        component="input"
                        autoComplete="none"
                        value="No"
                    /> No&nbsp;&nbsp;&nbsp;
                </fieldset><br />
                <fieldset>
                    <Field
                        placeholder="Minimum tank size (g)" 
                        name="minimum_tank_size"
                        type="number"
                        component="input"
                        autoComplete="none"
                    />
                </fieldset><br />
                <fieldset>
                    <Field
                        name="image"
                        type="file"
                        component={FileInput}
                    />
                </fieldset><br />
                <button className="submit">Submit</button>
            </form>
        );
    }
}

export default compose(
    connect(null, actions),
    reduxForm({ form: 'addfish' })
)(Form);