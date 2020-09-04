import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Navbar from "../Navbar";
import './style.css';
import { RoomContext } from "../../context";

const Profile = () => {
  const [edit, setEdit] = useState(true);
  const [newName, setNewName] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const {  userEmail, setUserName } = useContext(RoomContext);

  useEffect(() => {
    // clearing state after user is done editing
    return () => {
      setNewName("");
      setOldPassword("");
      setNewPassword("");
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
    if(edit){
      if ( newName === "") {
        setFeedbackMsg("Please Check your username");
        return;
      }
    } else {
      if ( oldPassword === "" || newPassword === "") {
        setFeedbackMsg("Please Check your password");
        return;
      }
    }
    /* 
		request body should contain this object:
		{
			email of user, 
			type of data to change: 'name/password', 
			data: {old data, new data}
		} 
    */
    // console.log(userEmail,newName,oldPassword,newPassword)
    let postbody = {}
    if( edit ){
      postbody = {
        email : userEmail,
        type : 'name',
        name: newName,
      }
    } else {
      postbody = {
        email : userEmail,
        type : 'password',
        name:'',
        oldPassword : oldPassword,
        newPassword : newPassword
      }
    }
    let localToken = localStorage.getItem("userToken");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localToken}`,
    };
    console.log("postbody",postbody)
    axios
      .post(
        "http://localhost:4000/users/edit",
        postbody, {
          headers: headers,
        }
      )
      .then((res) => {
        console.log("res.data.message>>>>",res.data.message)
        if (res.data.message === "success") {
          if(edit){
            setUserName(newName)
          }
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log("error>>",err);
      });
  };

  return (
    <>
      <Navbar edit />
      <div className="col-md-4 offset-md-4 col mt-5 edit-profile">
        <h3 className="edit-title text-capitalize">edit profile</h3>
        <div className="form-group">
        <div class="switch">
          <span>
            edit user name
          </span>
          <div class="toggle-switch">
            <input type="checkbox" id="toggle" class="button" onChange={ ()=> setEdit(!edit) } />
            <label for="toggle" class="border">toggle button</label>
          </div>
          <span>
           edit password
          </span>
        </div>

        </div>
        <form className="form-group" onSubmit={handleSubmit}>
          
          { edit ? (
            <>
              {/* change name */}
              <div className="form-group">
                <label htmlFor="NewemailInput">New Name</label>
                <input
                  className="form-control"
                  id="NewemailInput"
                  type="text"
                  placeholder="john doo"
                  onChange={(e) => setNewName(e.target.value)}
                />
              </div>
            </>
          ) : (
            <>
            {/* change password */}
            <div className="form-group">
              <label htmlFor="passwordInput">Old Password</label>
              <input
                className="form-control"
                id="passwordInput"
                type="password"
                placeholder="..."
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
            <label htmlFor="NewpasswordInput">New Password</label>
            <input
              className="form-control"
              id="NewpasswordInput"
              type="password"
              placeholder="..."
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
            </>
          )
          }
          <input
            className="btn btn-primary btn-lg btn-block"
            type="submit"
            value="Save"
          />
        </form>

        <div>{feedbackMsg}</div>
      </div>
    </>
  );
};

export default Profile;
