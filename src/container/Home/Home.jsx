import React, { Component, Fragment,} from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import MemberDashboard from '../MemberDashboard/MemberDashboard';
import OverrideDashboard from '../OverrideDashboard/OverrideDashboard';
import ResetDashboard from '../ResetDashboard/ResetDashboard'
import '../../container/Home/Home.css';
import Login from '../Login/Login';

//Icon 
import { BsFillPeopleFill, BsExclamationDiamondFill, BsLockFill } from 'react-icons/bs';
import { RiLogoutBoxRLine} from "react-icons/ri";



class Home extends Component {

    refreshComponent = (bool) => {
        if(bool)
            this.forceUpdate();
    }

    handleLogout = () => {
        localStorage.clear("user");
        this.forceUpdate();
    }

    render() {
        return(
            <Router>
                <Fragment>
                    {/* <div className="sidenav">
                        { localStorage.getItem("user") !== null?
                            <Fragment>
                                <Link to="/member-list"><BsFillPeopleFill color="white"/> Pengguna</Link>
                                <Link to="/override-list"><BsExclamationDiamondFill color="white"/> Override</Link>
                                <Link to="/reset-list"><BsLockFill color="white"/> Reset Password</Link>
                                <Link onClick={this.handleLogout} to="/"> <RiLogoutBoxRLine color="white"/> Logout</Link>
                            </Fragment>
                            : null
                        }
                    </div> */}
                    <div className="navigation">
                        { localStorage.getItem("user") !== null?
                            <Fragment>
                                <Link to="/member-list"><BsFillPeopleFill color="white"/> Pengguna</Link>
                                <Link to="/override-list"><BsExclamationDiamondFill color="white"/> Override</Link>
                                <Link to="/reset-list"><BsLockFill color="white"/> Reset Password</Link>
                                <Link onClick={this.handleLogout} to="/"> <RiLogoutBoxRLine color="white"/> Logout</Link>
                            </Fragment>
                            : null
                        }
                    </div>
                    <Route path="/" exact component={routeProps => <Login {...routeProps} bool={(value)=>this.refreshComponent(value)}/>}/>          
                    <Route path="/member-list" component={routeProps => <MemberDashboard {...routeProps}/>}/>             
                    <Route path="/member-list" component={routeProps => <MemberDashboard {...routeProps}/>}/>             
                    <Route path="/member-list" component={routeProps => <MemberDashboard {...routeProps}/>}/>             
                    <Route path="/member-list" component={routeProps => <MemberDashboard {...routeProps}/>}/>             
                    <Route path="/member-list" component={routeProps => <MemberDashboard {...routeProps}/>}/>             
                    <Route path="/override-list" component={OverrideDashboard}/>
                    <Route path="/reset-list" component={ResetDashboard}/>
                </Fragment>
            </Router>
        )
    }
}

export default Home;