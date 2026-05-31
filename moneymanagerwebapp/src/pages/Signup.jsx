import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup=()=>{

    const[fullname,setFullName]=useState("");
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const[error,setError]=useState(null);

    const navigate=useNavigate();




    return(
        <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
            {/*Backgrounf image with blur*/ }
            <img src={assets.login_bg} alt="Background" className="absolute inset-0 w-full object filter blur-sm"></img>
        </div>
    )
}
export default Signup;