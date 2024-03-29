import { createStore, compse } from 'redux';

import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';


// import the root reducer
import rootReducer from './reducers/index';


// create an object for the default data
const defaultState = {
    
};

const store = createStore(rootReducer, defaultState);
const history = syncHistoryWithStore(browserHistory, store);