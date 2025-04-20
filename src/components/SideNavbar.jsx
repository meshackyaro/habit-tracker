import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faChartSimple,
  faGear,
  faRightFromBracket,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const SideNavbar = ({ activeNav }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Mobile Nav Toggle */}
      <button
        className="md:hidden fixed top-6 right-5 z-50 p-2 bg-gray-800 text-white rounded-full shadow-md"
        onClick={toggleSidebar}
      >
        <FontAwesomeIcon icon={isOpen ? faXmark : faBars} size="lg" />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-[240px] bg-[rgba(20,20,20,0.95)] rounded-r-2xl p-5 z-40 transition-transform duration-300 md:relative md:rounded-2xl md:flex md:h-auto md:w-[200px] md:bg-[rgba(20,20,20,0.8)] ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 flex flex-col justify-between`}
      >
        <div>
          <h2 className="text-xl font-semibold">Habit Buddy</h2>

          <ul className="mt-24 list-none">
            {[
              { path: "/", label: "Today", icon: faHouse, id: "dashboard" },
              {
                path: "/statistics",
                label: "Statistics",
                icon: faChartSimple,
                id: "stats",
              },
              {
                path: "/settings",
                label: "Settings",
                icon: faGear,
                id: "settings",
              },
            ].map((nav) => (
              <li
                key={nav.id}
                className={`p-4 mt-2.5 text-start rounded-full cursor-pointer transition-all duration-300 ${
                  activeNav === nav.id
                    ? "bg-[rgb(51,51,51)]"
                    : "hover:bg-[rgb(51,51,51)] hover:text-yellow-200"
                }`}
              >
                <Link
                  to={nav.path}
                  className={`text-gray-500 no-underline transition-all duration-300 flex gap-2.5 items-center ml-2.5 ${
                    activeNav === nav.id
                      ? "text-lime-300"
                      : "hover:text-lime-300"
                  }`}
                  onClick={closeSidebar}
                >
                  <FontAwesomeIcon icon={nav.icon} />
                  {nav.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Logout */}
        <Link to="/">
          <div className="my-8 flex items-center justify-center md:mt-40">
            <button
              className="flex gap-2.5 p-3 ml-2.5 items-center text-gray-500 rounded-lg bg-gray-900 hover:bg-gray-600 transition-all duration-300 cursor-pointer w-full hover:text-red-400"
              onClick={() => {
                localStorage.removeItem("habitTrackerState");
                window.location.href = "/";
              }}
            >
              <FontAwesomeIcon icon={faRightFromBracket} flip="horizontal" />
              <span>Logout</span>
            </button>
          </div>
        </Link>
      </div>
    </>
  );
};

export default SideNavbar;
