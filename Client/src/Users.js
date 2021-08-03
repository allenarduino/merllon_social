import React from 'react';
import {Link} from 'react-router-dom';



class Users extends React.Component{

    constructor(props){
        super(props);
        this.state={
            users:[],
            loading:true,
        }
    }

    
componentDidMount(){

    fetch("http://127.0.0.1:5000/userlist",
    {
        method:"GET",
        "Content-Type":"application/json"
    }
    )
    .then(res=>res.json())
    .then(data=>{
        this.setState({
            users:data,
            loading:false
        })
    })
    .catch(err=>{
        console.log(err);
    })

    
}

render(){
    return(
        <div style={{padding:20}}>
             {
              this.state.loading==false?
              this.state.users.map(t=><div style={{justifyContent:"center",alignItems:"center",marginTop:30}}>
                <div  className="row">< img src={`http://127.0.0.1:5000${t.coverphoto}`} className="coverphoto2"/></div>
               <div className="col text-center"><Link to={`/singleprofile/${t.id}`}><img src={`http://127.0.0.1:5000${t.user_img}`} className="avatar2"/></Link></div>

                  <h3 className="name">{t.name}</h3>
                  <h5 className="info">{t.bio}</h5>
                  <div className="buttoncontainer col text-center">
                    
                  </div>
                  </div>
              )
          :<div style={{marginTop:100}} className="col text-center"><h3>Loading....</h3></div>}
 
         </div>
    )
}


}

export default Users;