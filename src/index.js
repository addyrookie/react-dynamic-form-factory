import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import throttle from "lodash/throttle";
import { reducer as rootReducer} from './reducers/reducer';
import { loadState, saveState } from "./localStorage";
const persistedState = loadState();

const store = createStore(
  				rootReducer,
  				persistedState,
  				applyMiddleware(thunk)
);

store.subscribe(
	throttle(() => {
		saveState(store.getState());
	}, 500)
);


ReactDOM.render(
	 	<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>,
		document.getElementById('root'));
registerServiceWorker();
