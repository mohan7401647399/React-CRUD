import React from "react";
import UserForm from "./UserForm";
import UsersLists from "./UsersLists";

const Home = () => {
  return (
    <div className="bg-black text-white p-2 text-center">
      <h2 className="font-serif font-extrabold text-3xl text-purple-600">
        React CRUD APP with JSONPlaceholder
      </h2>
      <UserForm />
      <UsersLists />
    </div>
  );
};

export default Home;
