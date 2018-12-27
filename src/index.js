import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';

import './styles/index.scss';

import App from './components/App';
import Category from './components/Category';
import Single from './components/Single';
import Filtered from './components/Filtered';
import Form from './components/Form';
import Demo from './components/Demo';
import SimpleSlider from './components/SimpleSlider';

import reducers from './reducers';
import { fetchFish, fetchComments, createRandomFish } from './actions';

import * as serviceWorker from './serviceWorker';

const middleware = [
    reduxThunk
];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(...middleware)
    )
);

store.dispatch(fetchFish());
store.dispatch(fetchComments());
store.dispatch(createRandomFish());

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App>
                <Route exact path="/" component={() => <Category />} />
                <Route exact path="/marinefish/type/:type" component={(props) => <Filtered {...props} />} />
                <Route exact path="/marinefish/id/:id" render={(props) => <Single {...props} />} />
                <Route exact path="/form" render={(props) => <Form {...props} />} />
                <Route exact path="/demo" component={(props) => <Demo />} />
                <Route exact path="/slider" component={(props) => <SimpleSlider />} />
            </App>
        </BrowserRouter>
    </Provider>, 
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
