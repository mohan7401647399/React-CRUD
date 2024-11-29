import React, { useContext } from "react";
import { userContext } from "./ContextAPI";
import { Link } from "react-router-dom";

const UsersLists = () => {
  const {
    // users,
    error,
    handleEditUser,
    handleDeleteUser,
    currentPosts: users,
  } = useContext(userContext);

  return (
    <div className="p-2 m-1">
      <div className="border-2 p-3 rounded">
        <h2 className="text-2xl font-extrabold">Users List</h2>
        {error && <p className="text-red-500">{error}</p>}
        {users.length ? (
          users.map((user) => (
            <div
              key={user.id}
              className="border-2 rounded-lg sm:p-2 sm:w-96 size-full m-auto mb-1"
            >
              <div className="p-2 m-1">
                <p>
                  <strong></strong>User Id: {user.id}
                </p>
                <p>
                  <strong>Name:</strong> {user.name}
                </p>
                <p>
                  <strong>User Name:</strong> {user.username}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
              </div>
              <div className="flex justify-around">
                <button
                  onClick={() => handleEditUser(user)}
                  className="bg-green-500 px-3 rounded-md text-black hover:cursor-pointer"
                >
                  <Link to="/userView">View</Link>
                </button>
                <button
                  className="bg-yellow-400 px-3 rounded-md text-black hover:cursor-pointer"
                  onClick={() => handleEditUser(user)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 px-3 rounded-md text-black"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No User Available</p>
        )}
      </div>
    </div>
  );
};

export default UsersLists;
