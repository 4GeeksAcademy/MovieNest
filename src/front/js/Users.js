// import React, { useContext, useEffect, useState } from "react";
// import UserRectangle from "./UserRectangle";
// import "../styles/home.css";
// import { useNavigate } from "react-router-dom";
// import { addNewUser, fetchUsers, removeUser } from "./store/actions";
// import { AppContext } from "./store/AppProvider";

// function Users() {
//   const [newUser, setNewUser] = useState({ name: "", quote: "" });
//   const navigate = useNavigate();

//   const { state, dispatch } = useContext(AppContext);
//   console.log(state);

//   useEffect(() => {
//     fetchUsers(dispatch);
//   }, []);

//   const goToUserDetails = (userId) => {
//     navigate(`users/${userId}`);
//   };

//   const onNewUserInputChange = (event, field) => {
//     setNewUser({ ...newUser, [field]: event.target.value });
//   };

//   const onAddTodoButtonClick = async () => {
//     await addNewUser(dispatch, newUser);
//   };

//   const onUserDelete = async (userId) => {
//     await removeUser(dispatch, userId);
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         value={newUser.name}
//         placeholder="Insert your name..."
//         onChange={(event) => {
//           onNewUserInputChange(event, "name");
//         }}
//       />
//       <input
//         type="text"
//         value={newUser.quote}
//         placeholder="Insert your quote..."
//         onChange={(event) => {
//           onNewUserInputChange(event, "quote");
//         }}
//       />
//       <button onClick={onAddTodoButtonClick}>Add User</button>
//       <div className="rectangle-wrapper">
//         {state.users.map((user) => (
//           <UserRectangle
//             name={user.name}
//             quote={user.quote}
//             todosAmount={{
//               completed: user.completed_todos,
//               total: user.total_todos,
//             }}
//             onUserClick={() => {
//               goToUserDetails(user.id);
//             }}
//             onUserDelete={async () => {
//               await onUserDelete(user.id);
//             }}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Users;
