import React, { useContext } from "react";
import { userContext } from "./ContextAPI";

const Pagination = () => {
  const { totalPosts, paginate, postsPerPage } = useContext(userContext);

  let pages = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }

  return (
    <span className="flex justify-center bg-black mx-auto pt-20 space-x-7">
      {pages.map((page, index) => {
        return (
          <button
            className="size-7 border-2 border-yellow-50 rounded-md hover:bg-white hover:text-black"
            key={index}
            onClick={() => paginate(page)}
          >
            {page}
          </button>
        );
      })}
    </span>
  );
};

export default Pagination;
