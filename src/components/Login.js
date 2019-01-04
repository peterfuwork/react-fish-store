import React, { Component } from 'react';
import Back from './Back';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Login extends Component {

    onSubmitLogin = (formProps) => {
        this.props.login(formProps, () => {
            this.props.history.push('/');
        });
    };
    
    render() {
        const { errorMessage } = this.props;
        return (
            <form className="col-sm-12 form" onSubmit={this.props.handleSubmit(this.onSubmitLogin)}>
                <Back />
                <h4>Login In</h4>
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

function mapStateToProps(state) {
    return { 
        errorMessage: state.users.error
    };
}

export default compose(
    connect(mapStateToProps, actions),
    reduxForm({ form: 'login' })
)(Login);