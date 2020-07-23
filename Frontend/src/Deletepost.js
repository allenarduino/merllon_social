import React from 'react';

class Deletepost extends React.Component{


  deletepost=(id)=>{
        
    fetch(`http://127.0.0.1:5000/post_delete/`+id,
   

    {
        method:"DELETE"
    }
    )
    .then(res=>res.json())
    .then(data=>{console.log(data.message)})
    .catch(err=>{console.log(err)})
    


}
}

export default Deletepost;