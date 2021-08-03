import React,{Component} from 'react';
import './Topnav.css';
import logo from './mylogo.png';
import Signup from './Signup';
import {Route,BrowseRouter as Router,Link,NavLink} from 'react-router-dom';
import Home from './Home';






export default class Nav extends React.Component {
 

 render(){

  return (
   
  <div className=" mynav">
  <Link to="/"> <img src={logo}  className="float-left logo" /></Link>
 {!localStorage.getItem("token")?<NavLink to ="/signup"><button  className="join float-right">Join</button></NavLink>:
 
 
 <ul className="nav-closer float-right ">
     <li className= "nav-items"><NavLink className="nav-links" to="/">Home</NavLink></li>
     <li className= "nav-items"><NavLink className="nav-links" to="/profile">Profile</NavLink></li>
     <li className= "nav-items"><NavLink className="nav-links" to="/users">Users</NavLink></li>
 </ul>}
 </div>
  
  
    )

  }

}



