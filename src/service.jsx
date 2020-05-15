import Axios from 'axios';
import URL from './string_value';

//User

export async function loginUser(dataUser) {
    let res = await  Axios.post(URL.URL_MOCK+'interns/login', dataUser);
    return await res.data;
}


export async function getMemberList() {
    if(localStorage.getItem("user") !== null)
    {
        let response = await Axios.get(URL.URL_MOCK+"interns");
        return response;

    }
    else {
        let response = await Axios.get(URL.URL_MOCK+"interns");
        response.data.error_code = "401"
        response.data.error_message = "Unauthorized"
        response.data.user_list = null
        return response;
    }
}

export async function deleteMember(userid) {
    let res = await Axios.delete(URL.URL_MOCK+`interns/${userid}`);
    console.log("Value : ", res);
    return res;
}

export async function postUpdateMember (user, isPost) {
    if(isPost === false)
    {
        let response = await Axios.put(URL.URL_MOCK+`interns/${user.user_id}`, user);
        console.log("Value : ", response);
        return response;
    }
    else {
        let response = await Axios.post(URL.URL_MOCK+`interns`, user);
        return response;
    }  
}

//Override

export async function getOverrideList() {
    if(localStorage.getItem("user") !== null)
    {
        let res = await Axios.get(URL.URL_MOCK+'override');
        return res;
    }
    else{
        let res = await Axios.get(URL.URL_MOCK+'override');
        res.data.error_code = "401";
        res.data.error_message = "Unauthorized";
        res.data.override_req_list = null;
        return res;
    }
}

export async function rejectOverride(overrideid) {
    let res = await Axios.delete(URL.URL_MOCK+`override/${overrideid}`);
    console.log("VALUE : ", res);
    return res;
} 

export async function acceptOverride(data) {
    let override = data;
    override.status = "Diterima";
    let response =  await Axios.put(URL.URL_MOCK+`override/${override.id}`, override);
    console.log(response);
    return response;

}

//Reset Password

export async function getResetList() {
    if(localStorage.getItem("user") !== null)
    {
        let response = await Axios.get(URL.URL_MOCK+'pass-req');
        return response;
    }
    else {
        let res = await Axios.get(URL.URL_MOCK+'pass-req');
        res.data.error_code = "401";
        res.data.error_message = "Unauthorized";
        res.data.reset_pass_list = null;
        return res;
    }
}
