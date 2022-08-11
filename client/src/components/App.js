import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import RecipeList from "../pages/RecipeList";
import NewRecipe from "../pages/NewRecipe";
import Home from "../pages/Home";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";
import EditRecipe from "../pages/EditQuestion";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <main>
        <Switch>
        <Route exact path="/">
            <Home user={user} />
          </Route>
          <Route path="/new">
            <NewRecipe user={user} />
          </Route>
          <Route path="/questions/:id">
            <EditRecipe user={user} />
          </Route>
          <Route path="/questions">
            <RecipeList user={user} />
          </Route>
          <Route path="/signup">
            <SignUpForm onLogin={setUser} user={user} />
          </Route>
          <Route path="/signin">
            <LoginForm onLogin={setUser} user={user} />
          </Route>
        </Switch>
      </main>
    </>
  );
}

export default App;
