import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import authReducer from './state/index.js'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
// import promiseMiddleware from "redux-promise";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'

const persistConfig = {key:"root",storage,version:1}
const persistedReducer = persistReducer(persistConfig,authReducer)
// serializableCheck: false
const store = configureStore({
  reducer : persistedReducer,
  
  middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware({
      serializableCheck:false
    })
})


// {
//         ignoreActions:[FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER]
//       }



ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)} >
        <App />
      </PersistGate>
    </Provider>,
)
