import React,{ useEffect ,useContext } from 'react'
import { Redirect } from 'react-router-dom';
import { UserContext } from "../../context";
export default function () {
    const {  setIsUserTokenExpired ,setIsLoggedIn } = useContext(UserContext);

    useEffect(() => {
        localStorage.removeItem("userToken");
        setIsUserTokenExpired(true);
        setIsLoggedIn(false);
    }, [])
    
    return (
        <>
            <Redirect to="/"/>
        </>
    )
}
