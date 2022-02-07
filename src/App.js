import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom/cjs/react-router-dom.min";
import Login from "./pages/Login";
import Search from "./pages/Search";
import Album from "./pages/Album";
import Favorites from "./pages/Favorites";
import ProfileEdit from "./pages/ProfileEdit";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path='/search' component={Search} />
            <Route
              path='/album/:id'
              component={({ match: { params } }) => <Album {...params} />}
            />
            <Route path='/favorites' component={Favorites} />
            <Route
              path='/profile/edit'
              render={(route) => <ProfileEdit {...route} />}
            />
            <Route path='/profile' component={Profile} />
            <Route path='/*' component={NotFound} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
