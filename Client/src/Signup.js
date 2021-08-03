import React from 'react';
//import './Signup.css';
import {Link} from 'react-router-dom';


//I'm using this for email validation
const validEmailRegex= 
RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);


//function to validate the form
const validateForm=(errors)=>{
    let valid=true;
    Object.values(errors).forEach(
        //If we have an error string entered by the user,set valid to false
        (val)=>val.length>0&&(valid=false)
    );
    return valid;
}





class Signup extends React.Component{



    constructor(props){
        super(props);
        this.state={
            fullname:"",
            email:"",
            password:"",
            error:"",//error message from the server
            message:"",
            k:"",//This will throw an error message if the user submits an empty form
            errors:{//Error from client due to user inputs
             email:"",
             password:"",
             fullname:""
            },
            loading:false
            
        }
    }




    handleinput=(e)=>{
        e.preventDefault();
        let name=e.target.name;
        let value=e.target.value;
        let errors =this.state.errors;
        
        /*I'm using switch 
        statement here because
         I want to avoid multiple
        if else statements*/

        switch(name){
            case "fullname":
                errors.fullname=value.length<6
                ?'Full Name must not be less than 6 characters':'';
                break;
                //Here,I'm testing email pattern
            case 'email': 
                errors.email = 
                  validEmailRegex.test(value)
                    ? ''
                    : 'Email is not valid!';
                break; 
                
            case 'password': 
             errors.password = 
              value.length < 8
               ? 'Password must be at least 8 characters long!'
               : '';
            break;
         default:
         break;
        }

        this.setState({errors, [name]: value}, ()=> {
            //So that I can see the result in the conssole
            console.log(errors)
        })

    }





    signup=(e)=>{
        e.preventDefault();
       
       
        if(validateForm(this.state.errors)){
            console.log("Form is not valid")
           

          this.setState({
              loading:true
          })

          const data=new FormData();
          data.append("name",this.state.fullname)
          data.append("email",this.state.email)
          data.append("password",this.state.password)

        fetch("http://127.0.0.1:5000/signup",
        {
            method:"POST",
            body:data
           
        
        })
        .then(res=>res.json())
        .then(data=>{
            this.setState({
                loading:false
            })
            
            if (data.error==null){
                alert(data.message);
                this.props.history.push("Login")
              
            }
            else{
                this.setState({error:data.error})
            }
        }).catch((err)=>{alert(err)});
        
    }
    else{
        this.setState({
            k:"Invalid Form"
        })

    }

    }







    render(){
        return(
            
            <div className="row">
            <div className="bg">
          
                  <div className="form-container ">
                      <form onSubmit={this.signup} className="form-group">
                      <h3 style={{color:"red",fontSize:15}}>{this.state.k}</h3>
                      <h3 style={{color:"grey",fontSize:20}}>Signup for Merllon</h3>
                          <input type="text" onChange={this.handleinput}
                          className=" forminput"
                          placeholder="Full name"
                          name="fullname"
                          required="true"
                          value={this.state.fullname}
                          />
                          {this.state.errors.fullname.length>0&&
                          <h3 style={{color:"red",fontSize:15}}>{this.state.errors.fullname}</h3>
                                        }

                       <input type="text" onChange={this.handleinput}
                          className=" forminput"
                          placeholder="Email"
                          name="email"
                          required="true"
                          value={this.state.email}
                          />
                            <h3 style={{fontSize:15,color:"red"}}>{this.state.error}</h3>
                            {this.state.errors.email.length>0&&
                          <h3 style={{color:"red",fontSize:15}}>{this.state.errors.email}</h3>
        
                            }
                       
                       <input type="password" onChange={this.handleinput}
                          className=" forminput"
                          placeholder="Password"
                          name="password"
                          required="true"
                          value={this.state.password}
                          />
                            {this.state.errors.password.length>0&&
                          <h3 style={{color:"red",fontSize:15}}>{this.state.errors.password}</h3>
        
                            }

                          {this.state.loading==false?<input type="submit" className="formbutton" value="Signup"/>:<input type="submit" className="formbutton" value="Sending..."/>}

                          <h3 style={{fontSize:15}}>
                              Already have an account?
                          <Link to="/login">
                            <a  style={{fontSize:15,color:"rgb(184, 23, 103)"}}>
                              Login
                              </a> 
                              </Link>
                              </h3>
                      </form>

                     
            </div>
         </div>
         </div>
         
         
         
        )
    }
}

export default Signup;