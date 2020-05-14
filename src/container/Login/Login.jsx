import React, { Component, Fragment } from 'react'
import './Login.css'
import logo from '../../../src/drawable/jdl_logo.png'
import {loginUser} from '../../service';

class Login extends Component {
    state = {
        user : {
            user_id : "",
            password : ""
        },
        isAdmin : false
    }

    handleLogin = () => {
        const userData = this.state.user
        let component = this;
        loginUser(userData).then( function(data) {
            if(data.error_code === "00") {
                localStorage.setItem("user", data);
                component.props.bool(true);
                component.props.history.push('/member-list');
            }
        });
    }
    
    handleFormChange = (event) => {
        console.log(this.props);
        let tempUser = {...this.state.user};
        tempUser[event.target.name] = event.target.value; 
        this.setState({
            user: tempUser
        }, () => {
            console.log('value', this.state.user);
        })
    }

    render() {
        return (
            <Fragment>
                <div className="form-login">
                    <div>
                        <img src={logo} className="jdl-logo" alt="Logo"></img>
                    </div>
                    <label htmlFor="user_id">User ID</label>
                    <input type="text" name="user_id"  placeholder="Input User ID" onChange={this.handleFormChange} value={this.state.user.user_id}/>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" cols="10"  name="password" placeholder="Input Password" onChange={this.handleFormChange} value={this.state.user.password}/>
                    <button className="btn-submit" onClick={this.handleLogin}>Login</button>          
                </div>
            </Fragment>
        )
    }
}

export default Login;