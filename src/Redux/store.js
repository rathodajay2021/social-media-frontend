import { combineReducers, legacy_createStore as createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from './Reducers';

export const store = createStore(
    combineReducers({
        ...reducers
    }),
    composeWithDevTools()
);
