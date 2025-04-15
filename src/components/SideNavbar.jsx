import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faChartSimple,
  faGear,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

const SideNavbar = ({ activeNav }) => {
  return (
    <div className=" h-auto w-[200px] bg-[rgba(20,20,20,0.8)] rounded-2xl p-5 hidden md:flex  flex-col space-between">
      <div>
        <h2 className="text-xl font-semibold text-shadow-[1px_1px_green-200]">
          HabitBuddy
        </h2>

        <ul className="mt-[100px] list-none">
          <li
            className={`p-4 mt-2.5 text-start rounded-full cursor-pointer transition-all duration-300 ${
              activeNav === "dashboard"
                ? "bg-[rgb(51,51,51)]"
                : "hover:bg-[rgb(51,51,51)] hover:text-yellow-200"
            }`}
          >
            <Link
              to="/"
              className={`text-gray-500 no-underline transition-all duration-300 flex gap-2.5 items-center ml-2.5 ${
                activeNav === "dashboard"
                  ? "text-lime-300"
                  : "hover:text-lime-300"
              }`}
            >
              <FontAwesomeIcon icon={faHouse} />
              Today
            </Link>
          </li>

          <li
            className={`p-4 mt-2.5 text-start rounded-full cursor-pointer transition-all duration-300 ${
              activeNav === "stats"
                ? "bg-[rgb(51,51,51)]"
                : "hover:bg-[rgb(51,51,51)] hover:text-lime-300"
            }`}
          >
            <Link
              to="/statistics"
              className={`text-gray-500 no-underline transition-all duration-300 flex gap-2.5 items-center ml-2.5 ${
                activeNav === "stats" ? "text-lime-300" : "hover:text-lime-300"
              }`}
            >
              <FontAwesomeIcon icon={faChartSimple} />
              Statistics
            </Link>
          </li>

          <li
            className={`p-4 mt-2.5 text-start rounded-full cursor-pointer transition-all duration-300 ${
              activeNav === "settings"
                ? "bg-[rgb(51,51,51)]"
                : "hover:bg-[rgb(51,51,51)] hover:text-lime-300"
            }`}
          >
            <Link
              to="/settings"
              className={`text-gray-500 no-underline transition-all duration-300 flex gap-2.5 items-center ml-2.5 ${
                activeNav === "settings"
                  ? "text-lime-300"
                  : "hover:text-lime-300"
              }`}
            >
              <FontAwesomeIcon icon={faGear} />
              Settings
            </Link>
          </li>
        </ul>
      </div>

      {/* Logout Button */}
      <Link to="/">
        <div className="mt-40 flex items-center justify-center">
          <button
            className="flex gap-2.5 p-3 ml-2.5 items-center text-gray-500 rounded-lg bg-gray-900 hover:bg-gray-600 transition-all duration-300 cursor-pointer  w-full hover:text-red-400"
            onClick={() => {
              localStorage.removeItem("habitTrackerState"); // Clear user data from localStorage
              window.location.href = "/"; // Navigate to the home page
            }}
          >
            <FontAwesomeIcon icon={faRightFromBracket} flip="horizontal" />
            <span>Logout</span>
          </button>
        </div>
      </Link>
    </div>
  );
};

export default SideNavbar;
