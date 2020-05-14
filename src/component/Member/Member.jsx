import React from 'react'

const Member = (props) => {
    return (
        <div className="cardview">
            <div className="content">
                <p className="title" onClick={null}>{props.data.name}</p>
                <p className="desc">{props.data.user_id}</p>
                <button className="update" onClick={()=>props.toogle(props.data)}>Edit</button>
                <button className="remove" onClick={()=>props.delete(props.data.user_id)}>Hapus</button>
            </div>
        </div>
    )
}

export default Member;