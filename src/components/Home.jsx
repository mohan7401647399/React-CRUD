import React, { useContext } from "react";
import UserForm from "./UserForm";
import UsersLists from "./UsersLists";
import Pagination from "./Pagination";
import { userContext } from "./ContextAPI";

const Home = () => {
  const { totalPosts, paginate, postsPerPage } = useContext(userContext);

  return (
    <div className="bg-black text-white p-2 text-center">
      <h2 className="font-serif font-extrabold text-3xl text-purple-600">
        React CRUD APP with JSONPlaceholder
      </h2>
      <UserForm />
      <UsersLists />
      <Pagination
        totalPosts={totalPosts}
        postsPerPage={postsPerPage}
        paginate={paginate}
      />
    </div>
  );
};

export default Home;
