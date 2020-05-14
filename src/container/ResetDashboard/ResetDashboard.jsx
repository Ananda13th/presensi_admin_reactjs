import React, { Fragment } from 'react'
import './ResetDashboard.css'
import Axios from 'axios'
import { Component } from 'react'
import UpdatePopup from '../UpdatePopup/UpdatePopup'
import { BsPencilSquare } from 'react-icons/bs';
import URL from '../../string_value';

class ResetDashboard extends Component {
    state = {
        item : [],
        see : false,
        memberData: {
            user_id: null,
            name: null,
            password: null
        }
    }

    componentDidMount() {
        this.getResetList();
    }

    tooglePopup = (value, member) => {
        this.setState({
            seen       : value,
            memberData : member
        })
    }

    handleCancelUpdate = (value) => {
        this.setState({
            seen : value
        })
    } 

    getResetList = () => {
        if(localStorage.getItem("user") !== null)
        {
            Axios.get(URL.URL_MOCK+'pass-req')
            .then((res) => {
                console.log(res); 
                this.setState({
                    item : res.data.reset_pass_list
                })
            })
        }
        else {
            window.alert("Please Login First!");
            this.props.history.push("/");
        }
    }

    renderTableHeader() {
        return (
            <tr>
                <th>USER ID</th>
                <th>NAMA</th>
                <th>AKSI</th>
            </tr>
        )
     }

    renderTableData() {
        return this.state.item.map(item => {
            return (
                <tr key={item.user_id}>
                    <td>{item.user_id}</td>
                    <td>{item.name}</td>
                    <td>
                        <button className="update" onClick={()=>this.tooglePopup(true, item)}>< BsPencilSquare color="white"/> Ganti Password</button>
                    </td>
                </tr>
            )
        })
    }

    render () {
        return (
            <div>
                {
                    this.state.seen ?
                    <Fragment>
                        <UpdatePopup post={false} data={this.state.memberData} cancel={(value)=>this.handleCancelUpdate(value)}/>
                      </Fragment>
                    :
                    <Fragment>
                        <h1 id='title'>Daftar Permintaan Reset Password</h1>
                            <table id='table_reset'>
                                <tbody>
                                    {this.renderTableHeader()}
                                    {this.renderTableData()}
                                </tbody>
                            </table>
                    </Fragment>
                }
            </div>
        )
    }
}

export default ResetDashboard;
