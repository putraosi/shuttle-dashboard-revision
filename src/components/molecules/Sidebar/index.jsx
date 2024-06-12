import React, { useEffect, useRef, useState } from "react";
import {
  FaCarSide,
  FaChevronDown,
  FaClipboardCheck,
  FaClipboardList,
  FaHandHoldingUsd,
  FaMoneyBillWaveAlt,
  FaRoute,
  FaUser,
} from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { HiClipboardList } from "react-icons/hi";
import { IoIosNotifications } from "react-icons/io";
import { RiCoupon3Fill, RiSteering2Line } from "react-icons/ri";
import { NavLink, useLocation } from "react-router-dom";
import { IcLeft, IcLogo } from "../../../assets/icons";
import { VERSION } from "../../../constants";
import { getData, storeData } from "../../../utils";
import SidebarLinkGroup from "./SidebarLinkGroup";


const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = getData("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };

    document.addEventListener("keydown", keyHandler);

    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    storeData("sidebar-expanded", sidebarExpanded.toString());

    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-50 flex h-screen w-72 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-3 px-6 py-5 lg:pt-6">
        <NavLink to="/">
          <img src={IcLogo} alt="Logo" />
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden text-bodydark1"
        >
          <FaArrowLeftLong size={24} className="fill-current"/>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex h-full flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 py-4 px-4 lg:mt-4 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <ul className="mb-6 flex flex-col gap-1">
              {/* <!-- Menu Item User List --> */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === "/" || pathname.includes("user-list")
                }
              >
                {(handleClick, open) => {
                  return (
                    <>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-3 rounded-md px-4 py-2 font-medium  text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          (pathname === "/" ||
                            pathname.includes("user-list")) &&
                          "bg-graydark dark:bg-meta-4"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <FaUser className="fill-current" size={16} />
                        User List
                        <FaChevronDown
                          size={16}
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && "rotate-180"
                          }`}
                        />
                      </NavLink>

                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && "hidden"
                        }`}
                      >
                        <ul className="mt-4 mb-5 flex flex-col gap-3 pl-6">
                          <li>
                            <NavLink
                              to="/user-list"
                              className={({ isActive }) =>
                                "group relative flex items-center gap-3 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-neutral-10 " +
                                (isActive && "!text-neutral-10")
                              }
                            >
                              All User
                            </NavLink>
                          </li>

                          <li>
                            <NavLink
                              to="/user-aspen"
                              className={({ isActive }) =>
                                "group relative flex items-center gap-3 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-neutral-10 " +
                                (isActive && "!text-neutral-10")
                              }
                            >
                              Aspen User
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </>
                  );
                }}
              </SidebarLinkGroup>
              {/* <!-- Menu Item User List --> */}

              {/* <!-- Menu Item Driver List --> */}
              <li>
                <NavLink
                  to="/"
                  className={`group relative flex items-center gap-3 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("calendar") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <RiSteering2Line size={16} />
                  Driver List
                </NavLink>
              </li>
              {/* <!-- Menu Item Driver List --> */}

              {/* <!-- Menu Item Route List --> */}
              <SidebarLinkGroup
                activeCondition={pathname.includes("route-list")}
              >
                {(handleClick, open) => {
                  return (
                    <>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-3 rounded-md px-4 py-2 font-medium  text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          (pathname === "/" ||
                            pathname.includes("route-list")) &&
                          "bg-graydark dark:bg-meta-4"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <FaRoute className="fill-current" size={16} />
                        Route
                        <FaChevronDown
                          size={16}
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && "rotate-180"
                          }`}
                        />
                      </NavLink>

                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && "hidden"
                        }`}
                      >
                        <ul className="mt-4 mb-5 flex flex-col gap-3 pl-6">
                          <li>
                            <NavLink
                              to="/route-list"
                              className={({ isActive }) =>
                                "group relative flex items-center gap-3 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-neutral-10 " +
                                (isActive && "!text-neutral-10")
                              }
                            >
                              Route List
                            </NavLink>
                          </li>

                          <li>
                            <NavLink
                              to="/route-request"
                              className={({ isActive }) =>
                                "group relative flex items-center gap-3 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-neutral-10 " +
                                (isActive && "!text-neutral-10")
                              }
                            >
                              Route Request
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </>
                  );
                }}
              </SidebarLinkGroup>
              {/* <!-- Menu Item Route List --> */}

              {/* <!-- Menu Item Voucher Catalogue --> */}
              <li>
                <NavLink
                  to="/"
                  className={`group relative flex items-center gap-3 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("calendar") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <RiCoupon3Fill size={16} />
                  Voucher Catalogue
                </NavLink>
              </li>
              {/* <!-- Menu Item Voucher Catalogue --> */}

              {/* <!-- Menu Item Survey Management --> */}
              <li>
                <NavLink
                  to="/"
                  className={`group relative flex items-center gap-3 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("calendar") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <FaClipboardCheck size={16} />
                  Survey Management
                </NavLink>
              </li>
              {/* <!-- Menu Item Survey Management --> */}

              {/* <!-- Menu Item Trip List --> */}
              <li>
                <NavLink
                  to="/"
                  className={`group relative flex items-center gap-3 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("calendar") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <FaCarSide size={16} />
                  Trip List
                </NavLink>
              </li>
              {/* <!-- Menu Item Trip List --> */}

              {/* <!-- Menu Item Notification Center --> */}
              <li>
                <NavLink
                  to="/"
                  className={`group relative flex items-center gap-3 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("calendar") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <IoIosNotifications size={16} />
                  Notification Center
                </NavLink>
              </li>
              {/* <!-- Menu Item Notification Center --> */}

              {/* <!-- Menu Item Booking List --> */}
              <li>
                <NavLink
                  to="/"
                  className={`group relative flex items-center gap-3 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("calendar") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <FaClipboardList size={16} />
                  Booking List
                </NavLink>
              </li>
              {/* <!-- Menu Item Booking List --> */}

              {/* <!-- Menu Item Transaction List --> */}
              <li>
                <NavLink
                  to="/"
                  className={`group relative flex items-center gap-3 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("calendar") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <FaMoneyBillWaveAlt size={16} />
                  Transaction List
                </NavLink>
              </li>
              {/* <!-- Menu Item Transaction List --> */}

              {/* <!-- Menu Item Withdraw List --> */}
              <li>
                <NavLink
                  to="/"
                  className={`group relative flex items-center gap-3 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("calendar") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <FaHandHoldingUsd size={16} />
                  Withdraw List
                </NavLink>
              </li>
              {/* <!-- Menu Item Withdraw List --> */}

              {/* <!-- Menu Item Ride List --> */}
              <li>
                <NavLink
                  to="/"
                  className={`group relative flex items-center gap-3 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("calendar") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <HiClipboardList size={16} />
                  Ride List
                </NavLink>
              </li>
              {/* <!-- Menu Item Ride List --> */}
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>

      {/* <!-- SIDEBAR FOOTER --> */}
      <div className="flex py-4 w-full items-center justify-center">
        <p className="text-bodydark1 text-center">{VERSION}</p>
      </div>
      {/* <!-- SIDEBAR FOOTER --> */}
    </aside>
  );
};

export default Sidebar;
