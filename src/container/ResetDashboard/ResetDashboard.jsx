import React, { Fragment, Component } from 'react'
import UpdatePopup from '../UpdatePopup/UpdatePopup'
//CSS
import './ResetDashboard.css'
//Service
import {getResetList} from '../../service';
//Icon
import { BsPencilSquare } from 'react-icons/bs';


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
        this.handleResetList();
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

    handleResetList = () => {
        const component = this;
        getResetList().then(function(response) {
            if(response.data.error_code === "00") {
                component.setState({
                    item : response.data.reset_pass_list
                })
            }
            else if(response.data.error_code === "401") {
                window.alert("Silahkan Login Dahulu!");
                component.props.history.push("/");
            }
        })

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
