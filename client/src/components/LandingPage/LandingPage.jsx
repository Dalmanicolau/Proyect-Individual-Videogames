import React from "react";
import { Link } from "react-router-dom"
import './LandingPage.css'


const LandingPage = () => {
    return(
            <div>
                
                <Link to = '/home'>
                    <button className="button1">PRESS START TO ENTER</button>
                </Link>
                <div className="pacman">
                    <div className="pacman-top"></div>
                    <div className="pacman-bottom"></div>
                    <div className="feed"></div>
                </div>
            </div>
            
            
    )
    
}


export default LandingPage