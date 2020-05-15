import React, { Component, Fragment } from 'react';
//CSS
import './OverrideDashboard.css'
//Service
import {getOverrideList, rejectOverride, acceptOverride} from '../../service'
//Icon
import { AiFillCloseCircle, AiFillCheckCircle} from 'react-icons/ai';

class OverrideDashboard extends Component {
    state = {
        item   : [],
        action : null,
        dataOverrideNew : {
            id : "",
            user_id : "",
            action : "",
            dates : "",
            times : "",
            status : ""
        }
    }

    componentDidMount() {
        this.handleOverridelist();
    }

    convertAction(action) {
        if(action === "I") {
            return "Masuk";
        }
        else {
            return "Keluar";
        }
    }

    handleOverridelist = () => {
        const component = this;
        getOverrideList().then(function(res) {
            if(res.data.error_code === "00") {
                component.setState ({
                    item: res.data.override_req_list
                })
            }
            else if(res.data.error_code === "401") {
                window.alert("Silahkan Login Dahulu!");
                component.props.history.push("/");
            }   
        })
    }

    handleRejectOverride = (overrideid) => {
        let component = this;
        rejectOverride(overrideid).then(function(response) {
            if(response.data.error_code === "00") {
                window.alert(response.data.error_message);
                component.handleOverridelist();
            }
        });
    }

    handleAcceptOverride = (override) => {
        let component = this;
        acceptOverride(override).then(function(response) {
            if(response.data.error_code === "00") {
                window.alert(response.data.error_message);
                component.handleOverridelist();
            }
        });
    }

    renderTableHeader() {
        return (
            <tr>
                <th>USER ID</th>
                <th>KEGIATAN</th>
                <th>TANGGAL</th>
                <th>JAM</th>
                <th>AKSI</th>
            </tr>
        )
     }

    renderTableData() {
        return this.state.item.map(item => {
            return (
                <tr key={item.id}>
                    <td>{item.user_id}</td>
                    <td>{this.convertAction(item.action)}</td>
                    <td>{item.dates}</td>
                    <td>{item.times}</td>
                    <td>
                        <button className="update" onClick={()=> this.handleAcceptOverride(item)}><AiFillCheckCircle color="white" size="0.4cm"/> Terima</button>
                        <button className="remove" onClick={()=> this.handleRejectOverride(item.id)}><AiFillCloseCircle color="white" size="0.4cm"/> Tolak</button>
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
             <div>
                <Fragment>
                    <h1 id='title'>Daftar Permintaan Override</h1>
                    <table id='table_overrides'>
                        <tbody>
                            {this.renderTableHeader()}
                            {this.renderTableData()}
                        </tbody>
                    </table>
                </Fragment>  
        </div>
        )
    }
}

export default OverrideDashboard;