import React from 'react'
import './Classcard.css'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

const Classcard = (props) => {
    return (

        <div class="class-card">
            <div class="class_info">
                <p>{props.title}</p>
            </div>
            <div class="class_crinfo">
                <p>Start Time: 08.00</p>
                <p>End Time: 08.50</p>
                <Link to='/user/video'>
                    <button class="join-btn">Join</button>
                </Link>
            </div>

        </div>
    )
}






export default Classcard;