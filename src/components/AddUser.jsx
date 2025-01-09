import React, { useState } from "react";
import Select from "react-select";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/reducers/userSlice";
import { differenceInYears, parse } from "date-fns";
import { Toaster, toast } from 'sonner'
import { useNavigate } from "react-router-dom";

function AddUser() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectStatusOption, setSelectStatusOption] = useState(null);
  const [height, setHeight] = useState("");
  const [selectPositionOption, setSelectPositionOption] = useState(null);
  const navigate = useNavigate()

  const options = [
    { value: "laliga", label: "Laliga" },
    { value: "league1", label: "League 1" },
    { value: "league2", label: "League 2" },
  ];

  const status = [
    { value: "active", label: "Active" },
    { value: "retired", label: "Retired" },
  ];

  const positions = [
    { value: "Forward", label: "Forward" },
    { value: "Backward", label: "Backward" },
    { value: "Midfielder", label: "Midfielder" },
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

  const calculateAge = (dob) => {
    const parsedDob = parse(dob, "dd/MM/yyyy", new Date());
    return differenceInYears(new Date(), parsedDob);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      // Calculate age from DOB
      const age = calculateAge(dob);
      const userData = {
        name,
        dob, // Include the original DOB
        age, // Include calculated age
        leagues: selectedOptions.map((option) => option.value),
        status: selectStatusOption?.value || null,
        height,
        position: selectPositionOption?.value || null,
      };
      
      dispatch(addUser(userData));

      toast.success('user created successfully')

      setName("");
      setDob("");
      setSelectedOptions([]);
      setSelectStatusOption(null);
      setHeight("");
      setSelectPositionOption(null);
      setTimeout(() => {
        navigate('/');
      }, 2000);

    } catch (error) {
      toast.error("Failed to add user. Please check your input.");
    }
  };

  return (
    <div className="flex flex-col">
        <Toaster position="top-right" richColors />
      <div className="w-8/12 p-2">
        <h1 className="text-2xl mt-7 mb-7">User Information Form</h1>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-2 text-gray-700 text-xs">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter the name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border outline-none border-gray-300 rounded-md p-2"
              style={{ fontSize: "0.75rem" }}
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-2 text-gray-700 text-xs">
              Date of Birth
            </label>
            <input
              type="text"
              placeholder="DD/MM/YYYY"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full border outline-none border-gray-300 rounded-md p-2"
              style={{ fontSize: "0.75rem" }}
              pattern="^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/[0-9]{4}$"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-2 text-gray-700 text-xs">
              Leagues Played
            </label>
            <Select
              options={options}
              isMulti
              value={selectedOptions}
              onChange={setSelectedOptions}
              placeholder="Select leagues..."
              styles={customStyles}
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-2 text-gray-700 text-xs">
              Status
            </label>
            <Select
              options={status}
              value={selectStatusOption}
              onChange={setSelectStatusOption}
              placeholder="Select"
              styles={customStyles}
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-2 text-gray-700 text-xs">
              Height
            </label>
            <div className="flex items-center relative">
              <input
                type="text"
                placeholder=""
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full border outline-none border-gray-300 rounded-md p-2 pr-6"
                required
                pattern="^(0\.\d{1,2}|[1-9]\d*(\.\d{1,2})?)$"
              />
              <span className="absolute right-2">m</span>
            </div>
          </div>

          <div>
            <label className="block font-medium mb-2 text-gray-700 text-xs">
              Position
            </label>
            <Select
              options={positions}
              value={selectPositionOption}
              onChange={setSelectPositionOption}
              placeholder="Select"
              styles={customStyles}
              required
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

export default AddUser;
