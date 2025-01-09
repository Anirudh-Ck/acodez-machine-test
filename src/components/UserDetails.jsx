import React, { useState } from "react";
import { MdFilterListAlt } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { RiEdit2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../redux/reducers/userSlice";
import ReactPaginate from "react-paginate";
import { toast, Toaster } from "sonner";

const UserDetails = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5; 
  const dispatch = useDispatch();

  const users = useSelector((state) => state?.user);

  const toggleDropdown = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };
  const handleDelete = (id) => {
    try{
        dispatch(deleteUser(id));
        setActiveDropdown(null);
        toast.success('User deleted successfully')
    }catch(error){
        toast.error(error.message)
    }
    
  };

  const filteredUsers = users?.userDetails
    ?.filter((user) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        user.name.toLowerCase().includes(searchLower) ||
        user.age.toString().includes(searchLower)
      );
    })
    .slice()
    .reverse();

  console.log("filteredUsers", filteredUsers);

  const pageCount = Math.ceil(filteredUsers.length / itemsPerPage); 
  const displayedUsers = filteredUsers.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage 
  );
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="p-2">
        <Toaster position="top-right" richColors/>
      <h1 className="text-2xl mt-7 mb-7">User management</h1>

      <div className="pt-4 pb-4 shadow-lg">
        <div className="mb-4 flex items-center justify-between px-4">
          <div className="flex items-center space-x-2 w-1/4">
            <div className="flex-grow border border-gray-300 rounded-md p-2 focus-within:ring-2 focus-within:ring-blue-500">
              <input
                type="text"
                placeholder="Search by name, age"
                className="w-full outline-none text-sm placeholder-gray-400"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(0);
                }}
              />
            </div>
            <MdFilterListAlt className="text-gray-500 w-5 h-5 cursor-pointer" />
          </div>

          <Link
            to="/add-user"
            className="bg-white border border-blue-500 text-blue-500 px-8 py-1 rounded-md hover:bg-blue-50 text-[15px]"
          >
            NEW
          </Link>
        </div>

        <table className="min-w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left text-gray-700 text-xs">
                <input type="checkbox" />
              </th>
              <th className="p-2 text-left text-gray-700 text-xs">User</th>
              <th className="p-2 text-left text-gray-700 text-xs">Age</th>
              <th className="p-2 text-left text-gray-700 text-xs">
                Leagues Played
              </th>
              <th className="p-2 text-left text-gray-700 text-xs">Status</th>
              <th className="p-2 text-left text-gray-700 text-xs">Height</th>
              <th className="p-2 text-left text-gray-700 text-xs">Position</th>
              <th className="p-2 text-left text-gray-700 text-xs"></th>
            </tr>
          </thead>
          <tbody>
            {displayedUsers.map((user, index) => (
              <tr key={index} className="bg-white border-b border-gray-200">
                <td className="p-3 text-gray-700 text-xs">
                  <input type="checkbox" />
                </td>
                <td className="p-2 text-gray-700 text-xs">{user.name}</td>
                <td className="p-2 text-gray-700 text-xs">{user.age}</td>
                <td className="p-2">
                  <div className="flex flex-wrap gap-2">
                    {user.leagues.map((league, i) => (
                      <span
                        key={i}
                        className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs"
                      >
                        {league}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      user.status === "active"
                        ? "bg-green-400 text-white text-xs"
                        : "bg-orange-400 text-white text-xs"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="p-2 text-gray-700 text-xs">{user.height}</td>
                <td className="p-2 text-gray-700 text-xs">{user.position}</td>
                <td className="p-2 text-gray-700 text-xs relative">
                  <button
                    className="focus:outline-none"
                    onClick={() => toggleDropdown(user.id)}
                  >
                    ⋮
                  </button>
                  {activeDropdown === user.id && (
                    <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow-lg z-50">
                      <Link
                        to={`/edit-user/${user.id}`}
                        className="px-4 py-2 text-gray-700 cursor-pointer flex items-center hover:bg-gray-100"
                      >
                        <RiEdit2Fill className="mr-2" />
                        Edit
                      </Link>
                      <div
                        className="px-4 py-2 text-gray-700 cursor-pointer flex items-center hover:bg-gray-100"
                        onClick={() => handleDelete(user.id)}
                      >
                        <RiDeleteBin5Fill className="mr-2" />
                        Delete
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-center space-x-4 mt-2">
          <div className="text-gray-600 text-sm">
            {currentPage * itemsPerPage + 1}-
            {Math.min((currentPage + 1) * itemsPerPage, filteredUsers.length)}{" "}
            of {filteredUsers.length}
          </div>
          <ReactPaginate
            previousLabel={"<"} // Left arrow
            nextLabel={">"} // Right arrow
            pageCount={pageCount}
            onPageChange={handlePageChange}
            containerClassName={"flex items-center justify-center space-x-4"}
            previousClassName={"text-gray-600 cursor-pointer"} // Left arrow styles
            nextClassName={"text-gray-600 cursor-pointer"} // Right arrow styles
            disabledClassName={"text-gray-300 cursor-not-allowed"} // Disabled arrows
            breakLabel={null} // No "..." between pages
            renderOnZeroPageCount={null}
          />
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
