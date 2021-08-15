import axios from "axios";
import React, {useContext} from "react";

const instance = axios.create({
  baseURL: "http://localhost:3000",
  // baseURL: "http://54.252.143.107:3000",
  timeout: 10000,
});

// export default instance;

const GET=(url,params,statusCode,dataCode,onThen,onStatusError,onDataError)=>{
    axios.get(url,{
      params,
      headers:{Authorization: `Bearer ${localStorage.getItem("token")}`}
    })
    .then((res) => {
        // status error
        if (res.status !== statusCode) {
          onStatusError()
        }else if(res.data.code != dataCode){
          onDataError()
        }else{
          onThen(res.data)
        }
    })
    .catch((error)=>onStatusError(error))
}
const POST=(url,body,statusCode,dataCode,onThen,onStatusError,onDataError)=>{
  instance.post(
    url,
    body,
    {headers:{Authorization: `Bearer ${localStorage.getItem("token")}`}}
  )
  .then((res) => {
      // status error
      if (res.status !== statusCode) {
        onStatusError && onStatusError()
      }else if(dataCode && res.data.code != dataCode){
        onDataError && onDataError()
      }else{
        onThen(res.data)
      }
  })
  // .catch((error)=>onStatusError(error))
  .catch(error=>alert(error))

}
const PUT=(url,body,statusCode,dataCode,onThen,onStatusError,onDataError)=>{
  axios.put(
    url,
    body,
    {headers:{Authorization: `Bearer ${localStorage.getItem("token")}`}}
  )
  .then((res) => {
      // status error
      if (res.status !== statusCode) {
        onStatusError()
      }else if(res.data.code != dataCode){
        onDataError()
      }else{
        onThen(res.data)
      }
  })
  // .catch((error)=>onStatusError(error))
  .catch(error=>alert(error))
}
export {instance,GET,POST,PUT}
