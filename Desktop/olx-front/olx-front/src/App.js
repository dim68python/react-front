import Layout from "./hocs/Layout";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Activate from "./pages/Activate";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import ResetPasswordDone from "./pages/ResetPasswordDone";
import ResetPasswordConfirm from "./pages/ResetPasswordConfirm";
import CreationInfo from "./pages/CreationInfo";
import Register from "./pages/Register";
import { useImmerReducer } from "use-immer";
import { useEffect } from "react";
import DispatchContext from "./context/DispatchContext";
import StateContext from "./context/StateContext";
import Profile from "./pages/Profile";
import Listing from "./pages/Listing";
import AddProduct from "./pages/AddProduct";
import Users from "./pages/Users";
import UserDetail from "./pages/UserDetail";
import ProductDetail from "./pages/ProductDetail";
import WishList from "./pages/WishList";
import SearchItem from "./pages/SearchItem";
import ProductsCategory from "./pages/ProductsCategory";

function App() {
  const initialState = {
    userUsername: localStorage.getItem("theUserName"),
    userEmail: localStorage.getItem("theUserEmail"),
    userId: localStorage.getItem("theUserId"),
    userToken: localStorage.getItem("theUserToken"),
    userIsLoggedIn: localStorage.getItem("theUserName") ? true : false,
  };

  function ReducerFunction(draft, action) {
    switch (action.type) {
      case "catchToken":
        draft.userToken = action.tokenValue;
        break;
      case "userSignedIn":
        draft.userUsername = action.userNameInfo;
        draft.userEmail = action.userEmailInfo;
        draft.userId = action.userIdInfo;
        draft.userIsLoggedIn = true;
        break;
      case "userLoggedOut":
        draft.userIsLoggedIn = false;
        break;

      default:
        return;
    }
  }

  const [state, dispatch] = useImmerReducer(ReducerFunction, initialState);

  useEffect(() => {
    if (state.userIsLoggedIn) {
      localStorage.setItem("theUserName", state.userUsername);
      localStorage.setItem("theUserEmail", state.userEmail);
      localStorage.setItem("theUserId", state.userId);
      localStorage.setItem("theUserToken", state.userToken);
    } else {
      localStorage.removeItem("theUserName");
      localStorage.removeItem("theUserEmail");
      localStorage.removeItem("theUserId");
      localStorage.removeItem("theUserToken");
    }
  }, [state.userIsLoggedIn]);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <Router>
          <Layout />
          <Routes>
            <Route exact path="/" Component={Home} />
            <Route exact path="/register" Component={Register} />
            <Route exact path="/activate/:uid/:token" Component={Activate} />
            <Route exact path="/login" Component={Login} />
            <Route exact path="/reset-password" Component={ResetPassword} />
            <Route
              exact
              path="/reset-password/done"
              Component={ResetPasswordDone}
            />
            <Route exact path="/profile" Component={Profile} />
            <Route exact path="/created" Component={CreationInfo} />
            <Route exact path="/listing/:id" Component={Listing} />
            <Route exact path="/users" Component={Users} />
            <Route exact path="/users/:id" Component={UserDetail} />
            <Route exact path="/add-product" Component={AddProduct} />
            <Route exact path="/products/:id" Component={ProductDetail} />
            <Route exact path="/user/:id/wishlist/" Component={WishList} />
            <Route exact path="/search/:county/" Component={SearchItem} />
            <Route
              exact
              path="/product/:category/"
              Component={ProductsCategory}
            />
            <Route
              exact
              path="/password/reset/confirm/:uid/:token"
              Component={ResetPasswordConfirm}
            />
          </Routes>
        </Router>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export default App;
