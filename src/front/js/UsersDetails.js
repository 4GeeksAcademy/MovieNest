// import React, { useContext, useEffect, useMemo, useState } from "react";
// import TodoRectangle from "./TodoRectangle";
// import { useParams } from "react-router-dom";
// import {
//   addNewTodo,
//   fetchTodos,
//   removeTodo,
//   updateTodo,
// } from "./store/actions";
// import { AppContext } from "./store/AppProvider";
// import { selectUserDetails } from "./store/selectors";

// function UsersDetails() {
//   const [newTodo, setNewTodo] = useState("");
//   const { userId } = useParams();

//   const { state, dispatch } = useContext(AppContext);

//   const user = selectUserDetails(state, userId);

//   useEffect(() => {
//     fetchTodos(dispatch, userId);
//   }, []);

//   const switchTodoCompletedStatus = async (todoId, todoCompletedStatus) => {
//     await updateTodo(dispatch, todoId, { completed: !todoCompletedStatus });
//   };

//   const handleOnNewTodoInputChange = (event) => {
//     setNewTodo(event.target.value);
//   };

//   const onAddTodoButtonClick = async () => {
//     await addNewTodo(dispatch, { content: newTodo, userId });
//   };

//   const onTodoDelete = async (todoId) => {
//     await removeTodo(dispatch, todoId);
//   };

//   return (
//     <div>
//       <h2>{`You are currently reading ${user?.name} Todos`}</h2>
//       <input
//         type="text"
//         value={newTodo}
//         onChange={handleOnNewTodoInputChange}
//       />
//       <button onClick={onAddTodoButtonClick}>Add Todo</button>
//       {state.todos.map((todo) => (
//         <TodoRectangle
//           onTodoClick={async () => {
//             await switchTodoCompletedStatus(todo.id, todo.completed);
//           }}
//           content={todo.content}
//           isCompleted={todo.completed}
//           onTodoDelete={async () => {
//             await onTodoDelete(todo.id);
//           }}
//         />
//       ))}
//     </div>
//   );
// }

// export default UsersDetails;
