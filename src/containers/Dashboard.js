import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'
import { browserHistory } from 'react-router'
import User from '../components/User'
import SensingDevices from '../components/SensingDevices'
import MainLayout from '../components/MainLayout'
import ContentLayout from '../components/ContentLayout'
import Home from '../components/Home'
import {doLogout, accountManagement} from '../actions/securityActions'


class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showUserComponent: false,
      showSensingDevicesComponent: false
    };
  }
  
  componentDidMount() {
    //const { dispatch, authenticated, isAuthenticating} = this.props
  }

  render() {
    const userInfo = this.props.userInfo
    //var browserHistory = ReactRouter.browserHistory;

    return (
      <Router history={browserHistory}>
          <Route path="/" component={MainLayout}>
            <IndexRoute component={() => <Home userInfo={userInfo} />} />
            <Route component={ContentLayout}>
              <Route path="/home" component={() => <Home userInfo={userInfo} />} />
              <Route path="/userinfo" component={() => <User userInfo={userInfo} />} />
              <Route path="/sensingdevices" component={() => <SensingDevices userInfo={userInfo} />} />
              <Route path="/sensingdevices" component={() => <SensingDevices userInfo={userInfo} />} />
              <Route path="/accountmngmnt" component={() => this.props.dispatch(accountManagement())} />
              <Route path="/logout" component={() => this.props.dispatch(doLogout())} />
            </Route>
          </Route>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return { userInfo: state.security.userInfo }
}

export default connect(mapStateToProps)(Dashboard)