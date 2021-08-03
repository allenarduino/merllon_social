import React, { Component } from 'react';
import Nav from './Nav';
import {BrowserRouter as Router,Route,Switch } from 'react-router-dom';
import ScrollMemory from 'react-router-scroll-memory';
import Signup from './Signup';
import Login from './Login';
import Profile from './Profile';
import Home from './Home';
import Createpost from './Createpost';
import Editprofile from './Editprofile';
import Specificprofile from './Specificprofile';
import Singlepost from './Singlepost';
import createHistory from 'history/createBrowserHistory';
import Users from './Users';






export const history=createHistory();

history.listen((location,action)=>{
window.scrollTo(0,0)
});


export default class App extends React.Component {
 

 render(){

 
  
 
    return (
    
  <Router history={history}>

    <div>
    
 <Nav/>
 <div className=" container-fluid">
 
   <Switch>
   
 <Route exact path="/" component={Home} />
 <Route  path="/signup" component={Signup}/>
 <Route  path="/login" component={Login}/>
 <Route  path="/profile" component={Profile}/>
 <Route path="/Createpost" component={Createpost}/>
 <Route path="/Editprofile" component={Editprofile}/>
 <Route path="/singleprofile/Editprofile" component={Editprofile} />
 <Route path="/singleprofile/Createpost" component={Createpost} />
 <Route path="/singleprofile/:user_id" component={Specificprofile} />
 <Route path="/singlepost/:post_id" component={Singlepost} />
 <Route path="/singlepost/singlepost/:post_id" component={Singlepost} />
 <Route  path="/users" component={Users}/>
 
 
 

 </Switch>
 
 </div>
 
 </div>
 
</Router>

    )

   

  }

}



