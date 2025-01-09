import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { updateUser } from "../redux/reducers/userSlice";
import { toast, Toaster } from "sonner";

function UpdateUser() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const users = useSelector((state) => state?.user?.userDetails);
  const user = users.find((u) => u.id === id); 

  const [formData, setFormData] = useState({
    name: "",
    dob:"",
    age: "",
    height: "",
    position: "",
    status: "",
    leagues: [],
  });

  useEffect(() => {
    if (user) {
      setFormData(user); 
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, 
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try{
        dispatch(updateUser({ id: Number(id), ...formData })); 
        toast.success('User updated successfully')
        setTimeout(()=>{
            navigate("/");
        },2000)
    }catch(error){
        toast.error("Error updating user")
    }
    
  };

  if (!user) {
    return <p>User not found</p>;
  }

  const status = [
    { value: "active", label: "Active" },
    { value: "retired", label: "Retired" },
  ];

  const positions = [
    { value: "Forward", label: "Forward" },
    { value: "Backward", label: "Backward" },
    { value: "Midfielder", label: "Midfielder" },
  ];

  const leagues = [
    { value: "laliga", label: "Laliga" },
    { value: "league1", label: "League 1" },
    { value: "league2", label: "League 2" },
  ];

  const customStyles = {
    control: (base) => ({
      ...base,
      border: "1px solid #ccc",
      borderRadius: "8px",
      padding: "2px",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#aaa",
      },
    }),
    menu: (base) => ({
      ...base,
      borderRadius: "8px",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? "#f0f8ff" : "white",
      color: state.isFocused ? "#017fff" : "black",
      fontSize: "12px",
    }),
    placeholder: (base) => ({
      ...base,
      fontSize: "12px", 
      color: "#999", 
    }),
  };
  return (
    <div className="flex flex-col">
        <Toaster position="top-right" richColors />
      <div className="w-8/12 p-2">
        <h1 className="text-2xl mt-7 mb-7">User Information Form</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-2 text-gray-700 text-xs">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter the name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border outline-none border-gray-300 rounded-md p-2"
              style={{ fontSize: "0.75rem" }}
            />
          </div>

          <div>
            <label className="block font-medium mb-2 text-gray-700 text-xs">
              Date of Birth
            </label>
            <input
              type="text"
              name="dob"
              placeholder="DD/MM/YYYY"
              value={formData.dob}
              onChange={handleChange}
              className="w-full border outline-none border-gray-300 rounded-md p-2"
              style={{ fontSize: "0.75rem" }}
            />
          </div>

          <div>
            <label className="block font-medium mb-2 text-gray-700 text-xs">
              Leagues Played
            </label>
            <Select
            options={leagues}
            isMulti
            value={leagues.filter((option) => formData.leagues.includes(option.value))}
            onChange={(selectedOptions) =>
              setFormData({
                ...formData,
                leagues: selectedOptions.map((option) => option.value),
              })
            }
            placeholder="Select leagues..."
            styles={customStyles}
            />
          </div>

          <div>
            <label className="block font-medium mb-2 text-gray-700 text-xs">
              Status
            </label>
            <Select
              options={status}
              value={status.find((option) => option.value === formData.status)}
              onChange={
                (selectedOption) =>
                  setFormData({ ...formData, status: selectedOption.value }) 
              }
              placeholder="Select"
              className="react-select-container outline-none"
              classNamePrefix="react-select"
              styles={customStyles}
            />
          </div>

          {/* Height */}
          <div>
            <label className="block font-medium mb-2 text-gray-700 text-xs">
              Height
            </label>
            <div>
              <div className="flex items-center relative">
                <input
                  type="text"
                  name="height"
                  placeholder=""
                  value={formData.height}
                  onChange={handleChange}
                  className="w-full border outline-none border-gray-300 rounded-md p-2 pr-6"
                />
                <span className="absolute right-2">m</span>
              </div>
            </div>
          </div>

          {/* Position */}
          <div>
            <label className="block font-medium mb-2 text-gray-700 text-xs">
              Position
            </label>
            <Select
              options={positions}
              value={positions.find((option)=>option.value === formData.position)}
              onChange={(selectedOption)=>
                setFormData({...formData, position: selectedOption.value }) 
              }
              placeholder="Select"
              className="react-select-container outline-none"
              classNamePrefix="react-select"
              styles={customStyles}
            />
          </div>

          <div className="col-span-2 text-right">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateUser;
