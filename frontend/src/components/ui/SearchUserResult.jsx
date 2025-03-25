import React from "react";

const SearchUserResult = ({ availableUsers, handleAddUser }) => {
  return (
    <ul className="list bg-base-300 rounded-box shadow-md mt-4 max-h-36 overflow-auto">
      {availableUsers.map((user) => (
        <li
          className="list-row hover:bg-primary cursor-pointer"
          key={user._id}
          onClick={() => {
            handleAddUser(user);
          }}
        >
          <div className="pointer-events-none flex items-center space-x-3 p-0">
            <img className="size-10 rounded-full" src={user.profilePic} />
            <div>{user.name}</div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default SearchUserResult;
