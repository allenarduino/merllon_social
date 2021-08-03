import React from 'react';
import {Link} from 'react-router-dom';
import jwt_decode from 'jwt-decode';


class Profile extends React.Component{

constructor(props){
    super(props);
    this.state={
        myprofile:[],
        myposts:[],
        myfile:null,
        loading:true
    }
}


componentDidMount(){
    fetch("http://127.0.0.1:5000/myprofile/",{

        method:"GET",
        "Content-Type":"application/json",

        headers:{
            Authorization:`${localStorage.getItem("token")}`
        }
    },
  
    )
    .then(res=>res.json())
    .then(data=>{
        this.setState({
            myprofile:data.profile,
            myposts:data.user_posts,
            loading:false
        })
    })
    .catch(err=>{
        console.log(err);
    })


}


filechangehandler=(event)=>{
    this.setState({user_img:event.target.files[0]})
  }

  uploadhandler=(e)=>{
   e.preventDefault();
   
   const formData=new FormData();
   formData.append("user_img",this.state.user_img)
   
   fetch("http://127.0.0.1:5000/update_profile_img",
   {
     method:"POST",
     body:formData,
     headers:{
         Authorization:`${localStorage.getItem("token")}`
     }

   }
   ).then(res=>{alert("profile photo updated")}).catch(err=>{alert(err)})
  }
 



  deletepost=(id)=>{
     if( window.confirm("Delete Post?")) {

       
    fetch(`http://127.0.0.1:5000/post_delete/${id}`,
   

    {
        method:"DELETE"
    }
    )
    .then(res=>res.json())
    .then(data=>{
        console.log(data.message)
        let postlist=this.state.myposts
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










    render(){
        return(
            
      <div>
       
          {   this.state.loading==false?
              this.state.myprofile.map(t=><div style={{justifyContent:"center",alignItems:"center"}}>
                <div className="row"> < img src={`http://127.0.0.1:5000${t.coverphoto}`} className="coverphoto"/></div>
               <div className="col text-center"><img src={`http://127.0.0.1:5000${t.user_img}`} className="avatar"/></div>

                  <h3 className="name">{t.name}</h3>
                  <h5 className="info">{t.bio}</h5>
                  <div className="buttoncontainer col text-center">
                      <button className="profilebutton1" onClick={()=>{this.props.history.push("Createpost")}}>Createpost</button>
                   <button className="profilebutton2" onClick={()=>{this.props.history.push("Editprofile")}}>Edit profile</button>
                   
                  </div>
                  </div>
              )
          :<div  className="col text-center"><h3>Loading....</h3></div>}


         
<div  style={{margin:0,paddingTop:20}} className=" feed-background">
             
             <div className="row feed-background">
         {   this.state.loading==false?
             this.state.myposts.map(p=>{
                
                const id={p}     
                 return(
                     
                <div key={id} className="mainpost col-xs-12 col-sm-12 col-md-12  col-lg-6 col-xl-6"> 
                
            <div className="postheader">
           <Link to={`/singleprofile/${p.user_id}`}> <img src={`http://127.0.0.1:5000${p.user_img}`} className="postavatar "/></Link>
                <Link style={{textDecoration:"none"}} to={`/singleprofile/${p.user_id}`}> <h3 className="postname">{p.name}</h3></Link>
                     
           </div>
                     <h3 style={{fontSize:15,marginTop:20}} className="col text-center">{p.title}</h3>
           <img src={`http://127.0.0.1:5000${p.post_media}`} className="postmedia"/>
           <div className="postfooter">
               
                   <div style={{display:"flex",justifyContent:"space-between"}}>
               <Link style={{textDecoration:"none"}} to={`singlepost/${p._id}`}> <h3  className="postname">{p.totalcomments} comments</h3></Link>
                 {localStorage.getItem("token")&&jwt_decode(localStorage.getItem("token")).user_id==p.user_id?<button onClick={()=>this.deletepost(p._id)} className="delbutton">Delete</button>:null}
                 </div>
                <Link to={`singlepost/${p._id}`}><input style={{marginLeft:8,marginTop:10,borderRadius:20}} placeholder="Write comment"value={this.state.comment} onChange={this.commenthandler} type="text" name="comment" className="nameinput"/></Link>
                
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

export default Profile;