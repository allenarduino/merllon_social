import React from 'react';
import jwt_decode from 'jwt-decode';
import Createpost from './Createpost';
import Editprofile from './Editprofile';
import {Link} from 'react-router-dom';

class Specificprofile extends React.Component{


    constructor(props){
        super(props);
        this.state={
            profile:[],
            user_posts:[],
            loading:true
        }
    }


       componentDidMount(){
        fetch(`http://127.0.0.1:5000/profile/${this.props.match.params.user_id}`,

        {
            "Content-Type":"application/json",
             method:"GET",

           
        }
        )
        .then(res=>res.json())
        .then(data=>{
            this.setState({
                profile:data.info,
                user_posts:data.user_posts,
                loading:false
            })
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
            let postlist=this.state.user_posts
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
       
     

       {      this.state.loading==false?
              this.state.profile.map(t=><div style={{justifyContent:"center",alignItems:"center"}}>
                <div className="row"> < img src={`http://127.0.0.1:5000${t.coverphoto}`} className="coverphoto"/></div>
               <div className="col text-center"><img src={`http://127.0.0.1:5000${t.user_img}`} className="avatar"/></div>

                  <h3 className="name">{t.name}</h3>
                  <h5 className="info">{t.bio}</h5>
                  {localStorage.getItem("token")&&jwt_decode(localStorage.getItem("token")).user_id==t.id?
                  <div className="buttoncontainer col text-center">
                  <Link to='/singleprofile/Createpost'><button className="profilebutton1" >Createpost </button></Link>
                  <Link to='/singleprofile/Editprofile'><button className="profilebutton2" >Edit profile</button></Link>
                      
                  </div>:null}
                  </div>
                  
              )
          :<div style={{marginTop:200}}  className="col text-center"><h3>Loading....</h3></div>}












                 
<div  style={{margin:0,paddingTop:20}} className=" feed-background">
             
             <div className="row feed-background">
         {   
             this.state.user_posts.map(t=>{
                
                const id={t}     
                 return(
                     
                <div key={id} className="mainpost col-xs-12 col-sm-12 col-md-12  col-lg-6 col-xl-6"> 
                
            <div className="postheader">
           <Link to={`/singleprofile/${t.user_id}`}> <img src={`http://127.0.0.1:5000${t.user_img}`} className="postavatar "/></Link>
                <Link style={{textDecoration:"none"}} to={`/singleprofile/${t.user_id}`}> <h3 className="postname">{t.name}</h3></Link>
                     
           </div>
                     <h3 style={{fontSize:15,marginTop:20}} className="col text-center">{t.title}</h3>
           <img src={`http://127.0.0.1:5000${t.post_media}`} className="postmedia"/>
           <div className="postfooter">
               
                   <div style={{display:"flex",justifyContent:"space-between"}}>
               <Link style={{textDecoration:"none"}} to={`/singlepost/${t.id}`}> <h3  className="postname">{t.totalcomments} comments</h3></Link>
                 {localStorage.getItem("token")&&jwt_decode(localStorage.getItem("token")).user_id==t.user_id?<button onClick={()=>this.deletepost(t.id)} className="delbutton">Delete</button>:null}
                 </div>
                <Link to={`/singlepost/${t.id}`}><input style={{marginLeft:8,marginTop:10,borderRadius:20}} placeholder="Write comment"value={this.state.comment} onChange={this.commenthandler} type="text" name="comment" className="nameinput"/></Link>
                
           </div>
            </div>
           )
              } )
            }
         </div>
     </div>  





         
        </div>
        )
    }
}

export default Specificprofile;