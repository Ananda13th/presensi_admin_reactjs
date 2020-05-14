import React, { Component, Fragment } from 'react';
import './OverrideDashboard.css'
import Axios from 'axios';
import URL from '../../string_value'
import {getOverrideList} from '../../service'
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
                window.alert("Please Login First!");
                component.props.history.push("/");
            }   
        })
    }

    getOverrideList = () => {
        if(localStorage.getItem("user") !== null)
        {
            Axios.get(URL.URL_MOCK+'override')
            .then((res) => {
                console.log(res); 
                this.setState({
                    item : res.data.override_req_list
                })
            })
        }
        else{
            window.alert("Please Login First!");
            this.props.history.push("/");
        }
      
    }

    rejectOverride = (overrideid) => {
        Axios.delete(URL.URL_MOCK+`override/${overrideid}`).then((res)=> {
            console.log(res);
            this.getOverrideList();
        })
    }

    acceptOverride = (data) => {
        data.status = "Diterima";
        Axios.put(URL.URL_MOCK+`override/${data.id}`, data).then((res) => {
            console.log(res);
            this.getOverrideList();
        }, (err) => {
            console.log(err);
        })
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
                        <button className="update" onClick={()=> this.acceptOverride(item)}><AiFillCheckCircle color="white" size="0.4cm"/> Terima</button>
                        <button className="remove" onClick={()=> this.rejectOverride(item.id)}><AiFillCloseCircle color="white" size="0.4cm"/> Tolak</button>
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