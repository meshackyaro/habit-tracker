import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faChartSimple, faGear } from '@fortawesome/free-solid-svg-icons';

const SideNavbar = ({ activeNav }) => (
  <div className="w-[200px] bg-[rgba(20,20,20,0.8)] rounded-2xl h-full p-5">
    <h2 className="text-xl font-semibold text-shadow-[1px_1px_greenyellow]">HabitBuddy</h2>
    <ul className="mt-[100px] list-none">
      {[
        { icon: faHouse, label: "Today", nav: "dashboard" },
        { icon: faChartSimple, label: "Statistics", nav: "stats" },
        { icon: faGear, label: "Settings", nav: "settings" }
      ].map((item) => (
        <li key={item.nav} className={`p-4 mt-2.5 rounded-full ${activeNav === item.nav ? 'bg-[rgb(51,51,51)]' : 'hover:bg-[rgb(51,51,51)]'}`}>
          <Link to='/' className={`flex gap-2.5 items-center ml-2.5 ${activeNav === item.nav ? 'text-greenyellow' : 'text-gray-500 hover:text-greenyellow'}`}>
            <FontAwesomeIcon icon={item.icon} />
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default SideNavbar;