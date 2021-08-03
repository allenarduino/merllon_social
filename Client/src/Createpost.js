import React, { useState,useRef } from 'react';






class Createpost extends React.Component{







constructor(props){
    super(props);
    this.state={
        post_media:null,
        title:"",
        loading:false
      
    }

    this.submitpost.bind(this);
   // this.titlehandler.bind(this);
    this.postmediahandler.bind(this);

   
}














titlehandler=(e)=>{
    this.setState({
       title:e.target.value
    })
}


postmediahandler=(e)=>{
    this.setState({post_media:e.target.files[0]})
  }




  

  submitpost=(e)=>{
    e.preventDefault();

      this.setState({
          loading:true
      })



    const data=new FormData();
    data.append('post_media',this.state.post_media)
    data.append('title',this.state.title)
    fetch('http://127.0.0.1:5000/make_post',

{
    method:"POST",
    body:data,
    headers:{
        Authorization: `${localStorage.getItem("token")}`
    },
    
}
)
.then(res=>res.json())
.then(res=>{
    this.setState({
        loading:false
    })
    alert("Post sucessfully created")
    this.props.history.push("/")
})
.catch(err=>{console.log(err)})

  }











render(){
    return(

        
        <div>

         
          

        <div style={{flexDirection:"row"}} className="col text-center ">
        <h3 style={{marginTop:200,textAlign:"center",fontSize:20}}>Upload Image</h3>
        <input ref={(ref)=>{this.post_media=ref;}}   style={{width:200}} onChange={this.postmediahandler} type="file" name="post_media" className="inputfile1"/>
        </div>
       <div className="col text-center">
       <h3 style={{marginTop:20,textAlign:"center",fontSize:20}}>Caption</h3>
           <textarea value={this.state.title} style={{width:200,borderRadius:7}} onChange={this.titlehandler} type="text" name="title" className="bioinput kk"/>
       </div>
                 
                 <div className="col text-center">
              {this.state.loading==false?<input type="submit" value='Post' onClick={this.submitpost} style={{width:250}} className="formbutton"/>:<input type="submit" value='Posting......' onClick={this.submitpost} style={{width:250}} className="formbutton"/>}
                 </div>
             

  { /*< CKEditor
   editor={ClassicEditor}
  />*/}
     

       </div>
       
       
    )
}




}
export default Createpost

