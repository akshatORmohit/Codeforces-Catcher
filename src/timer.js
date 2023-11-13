import React , {useEffect, useState} from "react"
import {Link} from "react-router-dom"
import axios from "axios"
import { FaUser } from 'react-icons/fa';
import './timer.css'
import Check from './check';
export  function Timer(){
  const [user,setuser] = useState("");
    const [post,setpost] = useState(null);
    const [clicked , setclicked]=useState(false)
    let val;
    let err = 0
       useEffect(()=>{
        if(user!==""){
        const url = "https://codeforces.com/api/user.status?handle="+user;
         const promise = axios.get(url);

         promise.then((response)=>{
           setpost(response.data);
         }).catch((error)=>{
            console.log(error)
            const input = document.getElementById("box2");
            input.innerHTML = ""
         }) 
        }
        },[user])

    function changed(e){
        val = e.target.value
    }
    function update(){
       
       if(val==undefined){
        val=user;

       }else{
        setclicked(true);
        
       }
        setuser(val);
        const input = document.getElementById("input");
        input.value = ""
        
    }
    let ok = new Map();
    let skipped = new Map();
    let ids = new Map();
    let obj=[];
    if(post){
    
    for(let i=0;i<post.result.length;i++){
        let arr=[post.result[i].author.contestId,post.result[i].problem.index];
        const prtyp=post.result[i].author.participantType;
        let conid= post.result[i].author.contestId;
        let subid = post.result[i].id;
        arr=JSON.stringify(arr);
        if(prtyp=="CONTESTANT"  || prtyp=="OUT_OF_COMPETITION"){
          let verdict = post.result[i].verdict;
          if(verdict!="SKIPPED"){
            if(ok.get(arr)!==undefined){
              ok.set(arr,ok[arr]+1)
             }else{
              ok.set(arr,1)
             }
            
          }else{
              
             if(ok.get(arr)==undefined){
                if(skipped.get(arr)!==undefined){
               }else{
                skipped.set(arr,1)
                ids.set(arr,subid);
               }
             }
          
          }
        }

    
      
    }
  
   
   obj=[skipped,ids,user];
   
 
  }


  function isclick(obj){
    let x;
   if(clicked){
      x = <Check props = {obj}/>
    }
    return x;
}

  return (
    <>
   
     <div id = "container">
         <div id ="dabba">
        < FaUser id ="user" > </FaUser >
       <input type="text"  placeholder="enter your username"  id ="input" onChange={changed}/>
       </div>
       <button onClick={update}  id = "btn">check</button>
        <div id ="box2">
        {isclick(obj)}
        </div>
        
     </div>
   </>
)
  
  
  
}


