import { createStore, applyMiddleware } from 'redux'
import RootReducer from './reducer/index'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
}
const persistedReducer = persistReducer(persistConfig, RootReducer)

const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)))
const persistor = persistStore(store)

export { store, persistor }

// import { createLogger } from 'redux-logger';
// import rootReducer from '../reducers/index.js';

// const loggerMiddleware = createLogger();
// const sagaMiddleware = createSagaMiddleware();

// const store = createStore(
//   persistedReducer,
//   applyMiddleware(thunk, sagaMiddleware, loggerMiddleware)
// );

// sagaMiddleware.run(rootSaga);
