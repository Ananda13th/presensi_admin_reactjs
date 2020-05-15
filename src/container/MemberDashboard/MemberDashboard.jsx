import React, { Component, Fragment } from 'react';
import UpdatePopup from '../../container/UpdatePopup/UpdatePopup'
//CSS
import '../MemberDashboard/MemberDashboard.css'
//Service
import {getMemberList, deleteMember} from '../../service';
//Icon
import { BsFillPersonPlusFill, BsFillTrashFill, BsPencilSquare } from 'react-icons/bs';


class MemberDashboard extends Component {
    state = {
        member:[],
        newMember: {
            user_id: "",
            name: "",
            password: ""
        },
        seen : false,
        isPost : false
    }

    tooglePopup = (value, member, isPost) => {
        this.setState({
            seen : value,
            newMember : member,
            isPost : isPost
        })
    }

    componentDidMount() {
       this.handleGetMember();
    }

    handleGetMember = () => {
        const component = this;
        getMemberList().then( function(response) {
            if(response.data.error_code === "00")
                component.setState({
                    member : response.data.user_list
                })
            else if(response.data.error_code === "401"){
                window.alert("Silahkan Login Dahulu!");
                component.props.history.push("/");
            }
        });
    }

    handleDeleteMember = (userid) => {
        deleteMember(userid).then(function (response) {
            if(response.data.error_code === "00")
                window.alert(response.data.error_message);
        })
    }

    handleCancelUpdate = (value) => {
        this.setState({
            seen : value
        })
    } 

    handleDataToToogle = (data) => {
        this.setState({
            newMember : data
        })
        this.tooglePopup(true);
    }

    renderTableData() {
        return this.state.member.map(member => {
            return (
                <tr key={member.user_id}>
                    <td>{member.user_id}</td>
                    <td>{member.name}</td>
                    <td>
                        <button className="update" onClick={()=>this.tooglePopup(true, member, false)}><BsPencilSquare color="white"/> Edit</button>
                        <button className="remove" onClick={()=>this.handleDeleteMember(member.user_id)}>< BsFillTrashFill color="white"/> Hapus</button>
                    </td>
                </tr>
            )
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

     resetData(value) {
         if(value) {
            this.setState({
                newMember: {
                    user_id: "",
                    name: "",
                    password: ""
                }
             });
         }
       
    }


    render() {
        return (
            <div>
                 {
                    this.state.seen ?
                    <Fragment>
                        <UpdatePopup data={this.state.newMember} post={this.state.isPost} cancel={(value)=>this.handleCancelUpdate(value)} reset={(value)=>this.resetData(value)}/>
                      </Fragment>
                    :
                    <Fragment>
                        <h1 id='title'>Daftar Pengguna</h1>
                        <button className="add" onClick={()=> this.tooglePopup(true, this.state.newMember, true)}>< BsFillPersonPlusFill color="white" size="0.4cm"/> Tambah Pengguna</button>
                        <table id='table_members'>
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

export default MemberDashboard;