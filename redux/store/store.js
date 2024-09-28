// store.js
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../rootSaga/rootSaga';
import rootReducer from '../rootReducer/rootReducer';

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Configure store
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware), // Use a function to configure middleware
});

// Run the root saga
sagaMiddleware.run(rootSaga);

export default store;
