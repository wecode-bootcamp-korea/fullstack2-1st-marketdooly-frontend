import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ScrollToTop from './utils/ScrollToTop';
import TopNav from './components/Nav/TopNav';
import Footer from './components/Footer/Footer';
import Detail from './pages/Detail/Detail';
import Main from './pages/Main/Main';
import Cart from './pages/Cart/Cart';
import Login from './pages/User/Login/Login';
import FindAccount from './pages/User/FindAccount/FindAccount';
import FindPw from './pages/User/FindPw/FindPw';
import SignUp from './pages/User/SignUp/SignUp';

class Routes extends React.Component {
  constructor() {
    super();
    this.state = { isAuthenticated: false, userInfo: {} };
  }

  authentication = userInfo => {
    const isAuthenticated = window.sessionStorage.hasOwnProperty('token');
    this.setState({ isAuthenticated, userInfo });
  };

  render() {
    return (
      <Router>
        <ScrollToTop>
          <Route
            render={props => (
              <TopNav
                {...props}
                isAuthenticated={this.state.isAuthenticated}
                userName={this.state.userInfo?.name}
                authentication={this.authentication}
              />
            )}
          />
          <Switch>
            <Route exact path='/' component={Main} />
            <Route
              exact
              path='/login'
              render={props => (
                <Login {...props} authentication={this.authentication} />
              )}
            />
            <Route exact path='/signup' component={SignUp} />
            <Route exact path='/detail/:id' component={Detail} />
            <Route exact path='/cart' component={Cart}></Route>
            <Route exact path='/findaccount' component={FindAccount} />
            <Route exact path='/findpw' component={FindPw} />
          </Switch>
          <Footer />
        </ScrollToTop>
      </Router>
    );
  }
}

export default Routes;
