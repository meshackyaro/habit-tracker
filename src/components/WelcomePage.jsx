import { useState } from "react";
import { useAppState } from "../hooks/useAppState";
import welcomePng from "../assets/images/welcomePng.png";
import { useNavigate } from "react-router";



const WelcomePage = () => {
  const { activeUser } = useAppState();
  const navigate = useNavigate();
  const [userNameBox, setUserNameBox] = useState(false);
  const [userGenderBox, setUserGenderBox] = useState(false);
  const [user, setUser] = useState({ name: "", gender: "" });

  // Validation functions
  const validateName = (e) => {
    if (e.target.value.trim() === "") return;
    setUser(prev => ({ ...prev, name: e.target.value }));
  };

  const validateGender = (e) => {
    if (e.target.value === "") return;
    setUser(prev => ({ ...prev, gender: e.target.value }));
  };

  // Called when clicking "Save" after entering name
  const proceedToGender = () => {
    if (user.name.trim()) {
      setUserNameBox(false);
      setUserGenderBox(true);
    }
  };

  // Called when clicking "Let's Go!" after selecting gender
  const setUsertoLocalHost = () => {
    if (user.name && user.gender) {
      activeUser(user);
      navigate("/dashboard");
    }
  };
  return (
    <div className="h-screen bg-black flex flex-col items-center justify-center">
      <h1 className="text-[70px] text-white">Welcome to Habit Tracker!</h1>
      <img src={welcomePng} alt="" className="h-[300px]" />
      <h3 className="text-white">
        Step into a Better You with our Habit Tracker!
      </h3>
      <button className="w-[200px] cursor-pointer text-center py-3 rounded-lg mt-5 text-lg text-white border border-yellow-300  bg-[rgba(23,23,23,0.781)] transition-all duration-300 hover:bg-yellow-400 hover:text-black hover:shadow-[0_0_100px_1px_green]" onClick={() => setUserNameBox(true)}>
        Let's Begin! 🚀
      </button>

      {userNameBox && (
        <div className="fixed h-full backdrop-blur-md flex justify-center items-center">
          <div className="text-white bg-[rgb(32,32,32)] rounded-2xl p-8 flex flex-col gap-2.5 items-center">
            <h2>Before We Start! How shall we call You...</h2>
            <input
              type="text"
              className="h-10 rounded-lg px-2.5 outline-none text-base bg-[rgba(255,255,255,0.329)] text-white w-full transition-all duration-300 focus:outline-1 focus:outline-[rgb(225,225,179)] placeholder-[rgba(255,255,255,0.616)]"
              placeholder="Please Enter Your Name!"
              onChange={validateName}
            />
            <button className="cursor-pointer text-center py-2.5 px-6 rounded-lg text-base border border-yellow-300 text-white bg-[rgba(23,23,23,0.781)]" onClick={proceedToGender}>
              Save
            </button>
          </div>
        </div>
      )}

      {userGenderBox && (
        <div className="fixed h-full backdrop-blur-md flex justify-center items-center">
          <div className="text-white bg-[rgb(32,32,32)] rounded-2xl p-8 flex flex-col gap-2.5 items-center">
            <h2>Hey {user.name}!</h2>
            <h3 className="text-center">To tailor your experience,
              <br /> could you let us know your gender?
            </h3>
            <select
              className="h-10 rounded-lg px-2.5 outline-none text-base bg-gray-500 w-full transition-all duration-300"
              onChange={validateGender}
              placeholder="Gender"
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>
            <button className="cursor-pointer text-center py-2.5 px-6 rounded-lg text-base border border-yellow-300 text-white bg-[rgba(23,23,23,0.781)]"
              onClick={() => user.gender && setUsertoLocalHost()}
            >
              Let's Go!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WelcomePage