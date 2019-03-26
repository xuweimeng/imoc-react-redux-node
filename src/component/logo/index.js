import React from 'react'
import LogoUrl from './logo.png'
import './index.css'

class Logo extends React.Component {
    render() {
        return (
            <div className="logo" >
                <img  src={LogoUrl} alt=".." />
            </div>
        )
    }
}

export default Logo