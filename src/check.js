import React from "react"
import {Timer } from './timer.js'
//
import './check.css'
function Check(obj){
     let skipped =obj.props[0];
     let ids = obj.props[1];
     let user =obj.props[2];
     let j = 0;
     let list=[];
      if(skipped!==undefined){
        for(let [val,value] of  skipped){
          let len = val.length;
          let str = val.substr(1, 4);
           let constestid = parseInt(str, 10)
          
          let subid=ids.get(val)
          let url = "https://codeforces.com/contest/" + str+"/submission/"+subid+"";
          list.push(<li key = {"item"+j}> <a href={url} target="_blank"> recent submission that marked plagiarized codeforces {j}</a> </li>);
          j++;
         }
         if(list.length==0){
           return (
              <>
               <h1> {user}  never caught in cheating , most probably you are not a cheater:) </h1>
              </>
           )
         }else{
          return(
            <>
              <h1> {user} recent submissions which are plagiarized :( </h1>
             <div id ="box1">
              <div id = "main">{list} </div>
             </div>
              
            </>
         )
         }
       
      }else{
        return(
          <>
           
          </>
       )
      }
    
     
}

export default Check;
