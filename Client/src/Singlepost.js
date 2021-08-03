import React from 'react';
import jwt_decode from 'jwt-decode';
import {Link} from 'react-router-dom';
import Login from './Login';



class Singlepost extends React.Component{


    constructor(props){
        super(props);
        this.state={
            singlepost:[],
            post_comments:[],
            comment:"",
            loading:false,
            comment_loading:true
            
        }
    }


       componentDidMount(){
  
  fetch(`http://127.0.0.1:5000/post_comments/${this.props.match.params.post_id}`,

  {
    method:"GET",

   
}
)
.then(res=>res.json())
.then(data=>{
    this.setState({
        singlepost:data.post,
        post_comments:data.comments,
        comment_loading:false
    })

   
})


    


    }
     


       commenthandler=(e)=>{
           this.setState({
               comment:e.target.value
           })
       }

       submitcomment(id){
           this.setState({
               loading:true
           })
           const data=new FormData();
           data.append("comment",this.state.comment)

           fetch(`http://127.0.0.1:5000/post_comments/${id}`,
           {
               method:"POST",
               body:data,
               headers:{
                Authorization: `${localStorage.getItem("token")}`
            },
           }

           )
           .then(res=>res.json())
           .then(data=>{
               this.setState({
                   loading:false
               })
               alert(data.message)
            })
           .catch(err=>{
               console.log(err)
           })
       }





       deletecomment=(id)=>{
        
        fetch(`http://127.0.0.1:5000/post_comment_delete/${id}`,
       
    
        {
            method:"DELETE"
        }
        )
        .then(res=>res.json())
        .then(data=>{
            console.log(data.message)
            let postlist=this.state.post_comments
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
    
    
    







    render(){
        return(
            <div style={{paddingTop:100}}>
       
            {  this.state.comment_loading==false?
               this.state.post_comments.map(c=>{
                   const id={c}
                   return(
                       <div>
                        <div className="comment-container">
                        <div className="postheader">
              <Link to={`/singleprofile/${c.user_id}`}> <img src={`http://127.0.0.1:5000${c.user_img}`} className="postavatar "/></Link>
                   <Link style={{textDecoration:"none"}} to={`/singleprofile/${c.user_id}`}> <h3 className="comment-name">{c.name}</h3></Link>        
              </div>
              <h5 className="comment-content">{c.body}</h5>
                        </div>
                      <div style={{display:"flex",justifyContent:"flex-end"}}>  {localStorage.getItem("token")&&jwt_decode(localStorage.getItem("token")).user_id==c.user_id?<button  onClick={()=>this.deletecomment(c._id)} className="comment-delete-button">Delete</button>:null}</div>
                       </div>
                   )
               }
               )
                      
             :<div  className="col text-center"><h3>Loading....</h3></div>} 



             {  
                this.state.singlepost.map(t=>{
                    const id={t}
                    return(
                <div style={{justifyContent:"center",alignItems:"center"}}>
                    
                <h6 style={{color:"white"}}>{t._id}</h6>
                  

           {localStorage.getItem("token")?<div style={{flexDirection:"row",width:"100%"}} className="col text-center comment-input">
          
         <input  placeholder="Write comment"value={this.state.comment} required="true" onChange={this.commenthandler} type="text" name="comment" className="nameinput"/>
          {this.state.loading==false?<button onClick={()=>this.submitcomment(t._id)} className="namebutton">Submit</button>:<button onClick={()=>this.submitcomment(t._id)} className="namebutton">Sending...</button>}
                    </div> :<div style={{marginBottom:100}} className=" col text-center"><Link to={`/login`}><button  class="logoutbutn">Login to comment</button></Link></div>}     
          </div>
                  )  
                 })      
                 }    

      </div>     

      
        )
    }
}

export default Singlepost;