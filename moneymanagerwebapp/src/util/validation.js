export const validateEmail=(email)=>{

    if(email.trim()){
        const regix=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return Regex.test(email);
    
}
return false;

}
