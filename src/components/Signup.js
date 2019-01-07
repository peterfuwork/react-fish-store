import React, { Component } from 'react';
import Back from './Back';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Signup extends Component {

    onSubmitSignup = (formProps) => {
        this.props.signup(formProps, () => {
            this.props.history.push('/');
        });
    };
    
    render() {
        const { errorMessage } = this.props;
        return (
            <form className="col-sm-12 form" onSubmit={this.props.handleSubmit(this.onSubmitSignup)}>
                <Back />
                <h4>Sign up</h4>
                <fieldset>
                    <Field 
                        placeholder="First Name" 
                        name="first_name"
                        type="text"
                        component="input"
                        autoComplete="none"
                    />
                </fieldset><br />
                <fieldset>
                    <Field 
                        placeholder="Last Name" 
                        name="last_name"
                        type="text"
                        component="input"
                        autoComplete="none"
                    />
                </fieldset><br />
                <fieldset>
                    <Field 
                        placeholder="Birth Year" 
                        name="birth_year"
                        type="number"
                        component="input"
                        autoComplete="none"
                    />
                </fieldset><br />
                <fieldset>
                    <Field 
                        placeholder="Email" 
                        name="email"
                        type="text"
                        component="input"
                        autoComplete="none"
                    />
                </fieldset><br />
                <fieldset>
                    <Field 
                        placeholder="Username" 
                        name="username"
                        type="text"
                        component="input"
                        autoComplete="none"
                    />
                </fieldset><br />
                <fieldset>
                    <Field 
                        placeholder="Password"
                        name="password"
                        type="password"
                        component="input"
                        autoComplete="none"
                    />
                </fieldset><br />
                <div className="error">{ errorMessage === "" ? "" : errorMessage }</div>
                <button className="submit">Submit</button>
            </form>
        );
    }
}

export default compose(
    connect(null, actions),
    reduxForm({ form: 'signup' })
)(Signup);