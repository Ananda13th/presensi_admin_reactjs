import React from 'react'

const Override = (props) => {
    return (
        <div className="cardview">
            <div className="content">
                <p className="title">{props.data.user_id}</p>
                <p className="desc">Kegiatan : {props.action}</p>
                <p className="desc">Tanggal : {props.data.dates}</p>
                <p className="desc">Waktu : {props.data.times}</p>
                <button className="update" onClick={null}>Terima</button>
                <button className="remove" onClick={null}>Tolak</button>
            </div>
        </div>
    )
}

export default Override;