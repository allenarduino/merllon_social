/*e.preventDefault() function in any line will prevent
the the form from submitting automatically
*/


import React from 'react';
import {Link} from 'react-router-dom';


















class Editprofile extends React.Component{

   
constructor(props){
    super(props);
    this.state={
        user_img:null,
        coverphoto:null,
        cover_photo_err:"",
        name:"",
        nameerr:"",
        bioerr:"",
        user_imgerr:"",
        bio:"",
        user_img_loading:false,
        cover_photo_loading:false,
        name_loading:false,
        bio_loading:false,
        
    }
}











filechangehandler=(event)=>{
    this.setState({user_img:event.target.files[0]})
  }

  uploadhandler=(e)=>{

    

   e.preventDefault();
     /*I'm checking to see wether the img is empty or not
    If it's  empty, we throw error message*/
   if(this.state.user_img==null){
    this.setState({
        user_imgerr:"Photo Required"
    })
}
   else{
   //Otherwise we send the image to the server
    
   this.setState({
    user_img_loading:true
})


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
   )
   .then(res=>{
       alert("Profile photo updated");
       this.setState({
           user_img_loading:false
       })
    })
   .catch(err=>{alert("Network Error")})
}
  }




//Handling coverphoto.................

coverphotohandler=(event)=>{
    this.setState({coverphoto:event.target.files[0]})
  }

  upload_coverphoto=(e)=>{

    

   e.preventDefault();
     /*I'm checking to see wether the img is empty or not
    If it's  empty, we throw error message*/
   if(this.state.coverphoto==null){
    this.setState({
        cover_photo_err:"Photo Required"
    })
}
   else{
   //Otherwise we send the image to the server
    
   this.setState({
    cover_photo_loading:true
})


   const formData=new FormData();
   formData.append("coverphoto",this.state.coverphoto)
   
   fetch("http://127.0.0.1:5000/update_coverphoto",
   {
     method:"POST",
     body:formData,
     headers:{
         Authorization:`${localStorage.getItem("token")}`
     }

   }
   )
   .then(res=>{
       alert("Coverphoto photo updated");
       this.setState({
           cover_photo_loading:false
       })
    })
   .catch(err=>{alert("Network Error")})
}
  }





















  

biohandler=(e)=>{
    
this.setState({
    [e.target.name]:e.target.value
})

      /*I'm checking to see wether the name is empty or not
    If it's  empty, we throw error message*/
    if (this.state.bio.trim()===""){
        this.setState({
            bioerr:"Bio Required"
         })
    }

 
    }
 
   
   




submitbio=(e)=>{
    e.preventDefault();
    /*I'm checking to see wether the bio is empty or not
    If it's  empty, we throw error message*/
    if (this.state.bio.trim()===""){
        this.setState({
            bioerr:"Bio Required"
         })
    }


     else if(this.state.bio.length<50){
          this.setState({
              bioerr:"Bio must be atleast 50 characters long"
          })
     }

    else{
        //Otherwise,we send data to the server
        this.setState({
         bio_loading:true
        })

    fetch("http://127.0.0.1:5000/update_bio",{
        method:"POST",
         body:JSON.stringify(this.state.bio),
         "Content-type":"application/json",

    
    
    headers:{
        
        Authorization:`${localStorage.getItem("token")}`,
       
    }
}
    )
    .then(res=>res.json())
    .then(data=>{
        alert(data.message);
        this.setState({bio_loading:false})
    })
    .catch(err=>{alert("No Network")})
}
    
}



namehandler=(e)=>{
 
this.setState({
    [e.target.name]:e.target.value
})

      /*I'm checking to see wether the name is empty or not
    If it's  empty, we throw error message*/
    if (this.state.name.trim()===""){
        this.setState({
            nameerr:"Name Required"
         })
    }

    else if(this.state.name.length<6){
        this.setState({
            nameerr:"Name must be atleast 6 characters long"
        })
    }
    else{
        this.setState({
            nameerr:""
        })
    }
   
}




submitname=(e)=>{
    e.preventDefault();
        /*I'm checking to see wether the name is empty or not
    If it's  empty, we throw error message*/
    if (this.state.name.trim()===""){
        this.setState({
            nameerr:"Name Required"
         })
    }

    else if(this.state.name.length<6){
        this.setState({
            nameerr:"Name must be atleast 6 characters long"
        })
    }
    

    else{

    
      //Otherwise we send data to the server for processing

      this.setState({
        name_loading:true
    })

    fetch("http://127.0.0.1:5000/update_name",{
        method:"POST",
        "Content-Type":"Application/json",
         body:JSON.stringify(this.state.name),
    
    
    headers:{
        Authorization:`${localStorage.getItem("token")}`
    }
}
    )
    .then(res=>res.json())
    .then(data=>{
        alert(data.message);
        this.setState({
            name_loading:false
        })
    }).catch(err=>{console.log("No Network")})
} 
}







 

  render(){
      return(
          <div>
          <div style={{flexDirection:"row"}} className="col text-center">
          <h3 style={{marginTop:100,textAlign:"center",fontSize:20}}>Update profile picture</h3>
          <input onChange={this.filechangehandler} type="file" name="user_img" className="inputfile1"/>
          {this.state.user_img_loading==false?<button onClick={this.uploadhandler} className="upload-button">Upload</button>:
          <button onClick={this.uploadhandler} className="upload-button">Uploading....</button>
        }
          <h3 style={{color:"red",fontSize:18}}>{this.state.user_imgerr}</h3>
          </div>

        
         
          
          <div style={{flexDirection:"row"}} className="col text-center">
          <h3 style={{marginTop:50,textAlign:"center",fontSize:20}}>Update Coverphoto</h3>
          <input onChange={this.coverphotohandler} type="file" name="coverphoto" className="inputfile1"/>
          {this.state.cover_photo_loading==false?<button onClick={this.upload_coverphoto} className="upload-button">Upload</button>:
          <button onClick={this.upload_coverphoto} className="upload-button">Uploading....</button>
        }
          <h3 style={{color:"red",fontSize:18}}>{this.state.cover_photo_err}</h3>
          </div>







        
         
         

          <div style={{flexDirection:"row"}} className="col text-center">
          <h3 style={{marginTop:30,textAlign:"center",fontSize:20}}>Update name</h3>
          <input  placeholder="Name"value={this.state.name} onChange={this.namehandler} type="text" name="name" className="nameinput"/>
          {this.state.name_loading==false?<button onClick={this.submitname} className="namebutton">Update</button>:
          <button onClick={this.submitname} className="namebutton">Updating....</button>
          }
          <h3 style={{color:"red",fontSize:16}}>{this.state.nameerr}</h3>
          </div>


          <div style={{flexDirection:"row"}} className="col text-center">
          <h3 style={{marginTop:30,textAlign:"center",fontSize:20}}>Update Bio</h3>
          <textarea required="true" placeholder="My Bio"value={this.state.bio} onChange={this.biohandler} type="text" name="bio" className="bioinput"/>
          {this.state.bio_loading==false?<button onClick={this.submitbio} className="namebutton">Update</button>:
          <button onClick={this.submitbio} className="namebutton">Updating....</button>
          }
                    <h3 style={{color:"red",fontSize:16}}>{this.state.bioerr}</h3>
          </div>
       
          
        

          <div style={{flexDirection:"row"}} className="col text-center">
         <Link to="/login"><button className="logoutbutn" onClick={()=>{localStorage.removeItem("token");}}>Logout Account</button></Link>
          </div>

        





          </div>
      )
  }

}

export default Editprofile;