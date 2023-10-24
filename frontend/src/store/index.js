// third-party
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'; //INFO: How to import persistance.
import storage from 'redux-persist/lib/storage';

// project import
import reducers from './reducers';

// ==============================|| REDUX TOOLKIT - MAIN STORE ||============================== //

const persistConfig = {
  key: 'root',
  version: 1,
  storage
};

const persistedReducer = persistReducer(persistConfig, reducers); //TIP: persist userReducer, in this way user info in the userRedux does not go away.

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
});

const persistor = persistStore(store);

const { dispatch } = store;

export { store, dispatch, persistor };
