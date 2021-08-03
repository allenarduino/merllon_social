import React from 'react';
import Createpost from './Createpost';
import  jwt_decode from 'jwt-decode';
import {Link} from 'react-router-dom';
import Axios from 'axios';
import moment from 'moment';






class Home extends React.Component{

 
constructor(props){
    super(props);
    this.state={
        post:[],
        comment:"",
        user:"",
        result:[],
        loading:true
    }
    
    
}




componentDidMount(){

    fetch("http://127.0.0.1:5000",
    {
        method:"GET",
        "Content-Type":"application/json"
    }
    )
    .then(res=>res.json())
    .then(data=>{
        this.setState({
            post:data,
            loading:false
        })

    })
    .catch(err=>{
        console.log(err);
    })

    
}




deletepost=(id)=>{
    
    if(window.confirm("Delete Post?")){

    
    
    fetch(`http://127.0.0.1:5000/post_delete/${id}`,
   

    {
        method:"DELETE"
    }
    )
    .then(res=>res.json())
    .then(data=>{
        alert(data.message)
        let postlist=this.state.post
        for(let i=0;i<postlist.length;i++){
            let p=postlist[i]
            if(p._id===id){
                postlist.splice(i,1)
                break
            }
        }
        this.setState({post:postlist})
    })
    .catch(err=>{console.log(err)})
    
    }

}




searchandler=(e)=>{
this.setState({
    user:e.target.value
})
}


search=(e)=>{
    
     
    const data=new FormData()
    data.append("user",this.state.user)

    fetch("http://127.0.0.1:5000/post_delete/users",
    {
        method:"POST",
        body:data
    }

    )
    .then(res=>{
        res.json();
    })
    .then(data=>{
       this.setState({
           result:data
       })
    })
    .catch(err=>{
        console.log(err)
    })
}






    render(){
        return(
            <div>
                
               {
                    this.state.result.map(r=><div className="col text-center">
                          {r.name}
                             </div>
                        )
                }
            <div style={{flexDirection:"row",width:"100%",marginTop:100}} className="col text-center search-input">
            
            
            </div>
        
            <div  style={{margin:0}} className=" feed-background">
             
                <div className="row feed-background">
            {
                this.state.loading==false?
                this.state.post.map(t=>{
                   
                   const id={t}     
                    return(
                        
                   <div key={id} className="mainpost col-xs-12 col-sm-12 col-md-12  col-lg-6 col-xl-6"> 
                   
               <div className="postheader">
              <Link to={`/singleprofile/${t.user_id}`}> <img src={`http://127.0.0.1:5000${t.user_img}`} className="postavatar "/></Link>
                   <Link style={{textDecoration:"none"}} to={`/singleprofile/${t.user_id}`}> <h3 className="postname">{t.name}</h3></Link>   
              </div>
             {/*<h3 style={{fontSize:9,marginTop:0}}>{moment(t.created_at).fromNow()}</h3>*/} 
                        <h3 style={{fontSize:18,marginTop:20}} className="col text-center">{t.title}</h3>
              <img src={`http://127.0.0.1:5000${t.post_media}`} className="postmedia"/>
              <div className="postfooter">
                  
                      <div style={{display:"flex",justifyContent:"space-between"}}>
                  <Link style={{textDecoration:"none"}} to={`singlepost/${t._id}`}> <h3  className="postname">{t.totalcomments} comments</h3></Link>
                    {localStorage.getItem("token")&&jwt_decode(localStorage.getItem("token")).user_id==t.user_id?<button onClick={()=>this.deletepost(t._id)} className="delbutton">Delete</button>:null}
                    </div>
                   <Link to={`singlepost/${t._id}`}><input style={{marginLeft:8,marginTop:10,borderRadius:20}} placeholder="Write comment"value={this.state.comment} onChange={this.commenthandler} type="text" name="comment" className="nameinput"/></Link>
                   
              </div>
               </div>
              )
                 } )
            :<div  className="col text-center"><h3>Loading....</h3></div>}
            </div>
        </div>
           
           </div>
        )
    }
}

export default Home;