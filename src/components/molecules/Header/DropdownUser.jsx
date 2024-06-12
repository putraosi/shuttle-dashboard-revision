import React, { useEffect, useRef, useState } from "react";
import { IoIosLogOut } from "react-icons/io";
import { FaChevronDown } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ILNullPhoto } from "../../../assets";
import { USER_LS } from "../../../constants";
import { getData, storeData } from "../../../utils";

const DropdownUser = () => {
  const navigate = useNavigate();

  const user = getData(USER_LS);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef(null);
  const dropdown = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };

    document.addEventListener("click", clickHandler);

    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };

    document.addEventListener("keydown", keyHandler);

    return () => document.removeEventListener("keydown", keyHandler);
  });

  const onLogout = () => {
    storeData(USER_LS, "");
    navigate("/login", { replace: true });
  };

  return (
    <div className="relative">
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        to="#"
      >
        <span className="text-right lg:block">
          <span className="block text-sm font-medium text-neutral-100 dark:text-white capitalize">
            {`${user?.administrator?.firstName} ${user?.administrator?.lastName}`}
          </span>
          <span className="block text-xs text-neutral-80 dark:text-neutral-40 capitalize">
            {user?.administrator?.role}
          </span>
        </span>

        <span className="h-9 w-9 rounded-full">
          <img src={ILNullPhoto} alt="User" />
        </span>

        <FaChevronDown size={16} className="hidden fill-current sm:block text-neutral-100 dark:text-white" />
      </Link>

      {/* <!-- Dropdown Start --> */}
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute right-0 mt-4 flex w-62 flex-col rounded-md border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${
          dropdownOpen === true ? "block" : "hidden"
        }`}
      >
        <button
          className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-neutral-100 dark:text-white duration-300 ease-in-out hover:text-primary-main lg:text-base"
          onClick={(e) => {
            e.stopPropagation();
            onLogout();
          }}
        >
          <IoIosLogOut className="fill-current" size={24} />
          Log Out
        </button>
      </div>
      {/* <!-- Dropdown End --> */}
    </div>
  );
};

export default DropdownUser;
