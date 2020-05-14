import React, { Component } from 'react';
import '../UpdatePopup/UpdatePopup.css';
import {postUpdateMember} from '../../service';

class UpdatePopup extends Component {

    state = {
        dataMember : {
            user_id : "",
            password : "",
            name: ""
        }
    }

    componentDidMount = () => {
        this.setState({
            dataMember : this.props.data
        })
    }
    handlePostUpdateMember = () => {
        const component = this;
        postUpdateMember(this.state.dataMember, this.props.post).then(function(response) {
            window.alert(response.data.error_message);
            component.cancelUpdate();
            
        });
    }

    cancelUpdate=()=>{
        this.props.cancel(false);
        this.props.reset(true);
    }

    handleFormChange = (event) => {
        let tempUser = {...this.state.dataMember};
        tempUser[event.target.name] = event.target.value; 
        this.setState({
            dataMember: tempUser
        }, () => {
            console.log('value', this.state.dataMember);
        })
    }

    render() {
        return(
            <div className="update-popup">
                <label htmlFor="user_id">User ID</label>
                <input type="text" name="user_id"  placeholder="Masukan User ID" onChange={this.handleFormChange} value={this.state.dataMember.user_id}/>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Masukan Password" onChange={this.handleFormChange} value={this.state.dataMember.password}/>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" placeholder="Masukan Nama" onChange={this.handleFormChange} value={this.state.dataMember.name}/>
                {
                    this.props.post ?
                    <div>
                        <button className="btn-submit" onClick={this.handlePostUpdateMember}>Tambah</button>
                        <button className="btn-submit" onClick={this.cancelUpdate}>Batal</button>  
                    </div>
                    :
                    <div>
                        <button className="btn-submit" onClick={this.handlePostUpdateMember}>Perbarui</button>
                        <button className="btn-submit" onClick={this.cancelUpdate}>Batal</button>
                    </div>
                }        
            </div>
        )
    }

}

export default UpdatePopup;