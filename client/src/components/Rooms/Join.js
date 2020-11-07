import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "./join.css";
import { getRoomsRequest } from "../../actions/room.actions";
// function Modal({ isVisible = false, title, onClose }) {
//   const [name, setName] = useState("");
//   const [adminID, setAdminID] = useState("");
//   const [description, setDescription] = useState("");

//   // useEffect(() => {
//   //   document.addEventListener("keydown", keydownHandler);
//   //   return () => document.removeEventListener("keydown", keydownHandler);
//   // });

//   useEffect(() => {
//     let localToken = localStorage.getItem("userToken");
//     if (localToken !== null) {
//       let decodedToken = jwt_decode(localToken);
//       setAdminID(decodedToken.userID);
//     }
//   }, []);

//   const CreateRoom = (e) => {
//     e.preventDefault();

//     let localToken = localStorage.getItem("userToken");
//     const headers = {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${localToken}`,
//     };
//     axios
//       .post(
//         "http://localhost:4000/rooms/create",
//         {
//           name,
//           adminID,
//           description,
//         },
//         {
//           headers: headers,
//         }
//       )
//       .then((res) => {
//         if (res.data.message === "room created successfully") {
//           console.log("res.data.message ", res.data.message);
//           onClose();
//           alert(res.data.message);
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   // function keydownHandler({ key }) {
//   //   switch (key) {
//   //     case "Escape":
//   //       onClose();
//   //       break;
//   //     default:
//   //   }
//   // }

//   return !isVisible ? null : (
//     <div className="modal" onClick={onClose}>
//       <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
//         <div className="modal-header">
//           <h3 className="modal-title">{title}</h3>
//           <span className="modal-close" onClick={onClose}>
//             &times;
//           </span>
//         </div>
//         <div className="modal-body">
//           <div className="modal-content">
//             <form onSubmit={CreateRoom}>
//               <div className="form-group">
//                 <label className="col-form-label" htmlFor="name">
//                   room name
//                 </label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="please write Room name"
//                   id="name"
//                   onChange={(e) => setName(e.target.value)}
//                 />
//               </div>
//               <div className="form-group">
//                 <label className="col-form-label" htmlFor="descriptiont">
//                   room descriptiont
//                 </label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="please write desc"
//                   id="descriptiont"
//                   onChange={(e) => setDescription(e.target.value)}
//                 />
//               </div>
//               <input
//                 className="btn btn-primary btn-lg btn-block"
//                 type="submit"
//                 value="create room"
//               />
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

const Join = (props) => {
  const { loginReducer, roomReducer, getRoomsRequest } = props;
  const { user } = loginReducer;
  const { loading, adminID, currentRoom, error, rooms } = roomReducer;

  useEffect(() => {
    console.log(roomReducer);
    getRoomsRequest();
  }, []);
  // const {
  //   userName,
  //   userID,
  //   userEmail,
  //   setUserID,
  //   setUserName,
  //   setUserEmail,
  //   webSocketClient,
  //   rooms,
  //   setRooms,
  //   setCurrentRoom,
  // } = useContext(RoomContext);

  // const [filterRoom, setFilterRoom] = useState([]);
  // const [inputChar, setInputChar] = useState("");

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:4000/rooms")
  //     .then((res) => {
  //       let data = res.data;

  //       setRooms(data.rooms);
  //       setFilterRoom(data.rooms);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });

  //   let localToken = localStorage.getItem("userToken");
  //   if (localToken !== null) {
  //     let decodedToken = jwt_decode(localToken);
  //     setUserID(decodedToken.userID);
  //     if (userName == "") {
  //       setUserName(decodedToken.userName);
  //     } else if (decodedToken.userName !== userName) {
  //       setUserName(userName);
  //     }
  //     setUserEmail(decodedToken.userEmail);
  //   }
  // }, []);

  // useEffect(() => {
  // webSocketClient.onopen = () => {
  //   webSocketClient.send(
  //     JSON.stringify({
  //       type: "rooms",
  //       payload: rooms,
  //     })
  //   );
  // };
  // });

  // useEffect(() => {
  //   const newList =
  //     rooms &&
  //     rooms.filter((d) => inputChar === "" || d.name.includes(inputChar));

  //   setFilterRoom(newList);
  // }, [inputChar]);

  // const onChangeHandlerfilter = (e) => {
  //   setInputChar(e.target.value);
  // };

  return (
    <>
      {/* 
				- profile data (email & name)
				- avaiable rooms.

			*/}
      <div>
        <h3>You profile:</h3>
        <p>logged in as: {user.userName}</p>
        <p>your email: {user.userEmail}</p>
      </div>
      <div>
        <h3>Available rooms:</h3>
        <ul>
          {rooms.length > 1 ? (
            rooms.map((room) => {
              return <li>{room}</li>;
            })
          ) : (
            <li>
              <p>no rooms</p>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => {
  return {
    getRoomsRequest: () => dispatch(getRoomsRequest()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Join);
