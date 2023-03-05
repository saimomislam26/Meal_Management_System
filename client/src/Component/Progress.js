import React from 'react'

const Progress = ({value}) => {
    // console.log(value);
    return (
        <div className="progress">
            <div className="progress-bar" role="progressbar" style={{width:"10%"}} aria-valuenow={{value}} aria-valuemin="0" aria-valuemax="100">{value}</div>
        </div>
    )
}

export default Progress