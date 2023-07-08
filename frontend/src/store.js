import { createStore, combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'
import { userLoginReducer, userRegisterReducer } from './reducers/userReducers';

const  reduser = combineReducers({
      userLogin : userLoginReducer,
      userRegister : userRegisterReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const inithialState={
      userLogin: { userInfo: userInfoFromStorage },  
};

const middleware =[thunk];

const store = createStore(
      reduser,
      inithialState,
      composeWithDevTools( applyMiddleware(...middleware))
      );

      export default store;