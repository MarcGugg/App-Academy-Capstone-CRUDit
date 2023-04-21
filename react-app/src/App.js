import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import OnePost from "./components/Post";
import Subcrudit from "./components/Subcrudit";
import CreateSubcruditForm from "./components/CreateSubcrudit";
import EditSubcruditForm from "./components/EditSubcrudit";
import CreatePostForm from "./components/CreatePost";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path='/' exact={true}>
            <HomePage />
          </Route>
          <Route path='/posts/:postId' exact={true}>
            <OnePost />
          </Route>
          <Route path='/subcrudits/:subcruditId' exact={true}>
            <Subcrudit />
          </Route>
          <Route path='/subcrudits/:subcruditId/new_post' exact={true}>
            <CreatePostForm />
          </Route>
          <Route path='/subcrudits/create/new' exact={true}>
            <CreateSubcruditForm />
          </Route>
          <Route path='/subcrudits/:subcruditId/edit' exact={true}>
            <EditSubcruditForm />
          </Route>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
