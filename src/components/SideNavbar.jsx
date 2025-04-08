import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faChartSimple,
  faGear,
} from "@fortawesome/free-solid-svg-icons";

const SideNavbar = ({ activeNav }) => {
  return (
    <div className="w-[200px] bg-[rgba(20,20,20,0.8)] rounded-2xl h-full p-5 hidden md:block">
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
                ? "text-greenyellow"
                : "hover:text-yellow-200"
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
              : "hover:bg-[rgb(51,51,51)] hover:text-greenyellow"
          }`}
        >
          <Link
            to="/"
            className={`text-gray-500 no-underline transition-all duration-300 flex gap-2.5 items-center ml-2.5 ${
              activeNav === "stats"
                ? "text-greenyellow"
                : "hover:text-greenyellow"
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
              : "hover:bg-[rgb(51,51,51)] hover:text-greenyellow"
          }`}
        >
          <Link
            to="/"
            className={`text-gray-500 no-underline transition-all duration-300 flex gap-2.5 items-center ml-2.5 ${
              activeNav === "settings"
                ? "text-greenyellow"
                : "hover:text-greenyellow"
            }`}
          >
            <FontAwesomeIcon icon={faGear} />
            Settings
          </Link>
        </li>
      </ul>

      {/* Logout Button */}
      <div className="mt-auto">
        <button
          className="flex items-center gap-2 p-3 rounded-lg bg-red-500 hover:bg-red-600 transition-all text-white w-full"
          onClick={() => {
            localStorage.removeItem("habitTrackerState"); // Clear user data from localStorage
            window.location.href = "/"; // Navigate to the home page
          }}
        >
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default SideNavbar;
