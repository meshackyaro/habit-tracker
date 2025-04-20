import { useState } from "react";
import { useAppState } from "../hooks/useAppState";
import welcomePng from "../assets/images/welcomePng.png";
import { useNavigate } from "react-router"; // ✅ Make sure this is react-router-dom

const WelcomePage = () => {
  const { activeUser } = useAppState();
  const navigate = useNavigate();
  const [userNameBox, setUserNameBox] = useState(false);
  const [userGenderBox, setUserGenderBox] = useState(false);
  const [user, setUser] = useState({ name: "", gender: "" });

  const validateName = (e) => {
    if (e.target.value.trim() === "") return;
    setUser((prev) => ({ ...prev, name: e.target.value }));
  };

  const validateGender = (e) => {
    if (e.target.value === "") return;
    setUser((prev) => ({ ...prev, gender: e.target.value }));
  };

  const proceedToGender = () => {
    if (user.name.trim()) {
      setUserNameBox(false);
      setUserGenderBox(true);
    }
  };

  const setUsertoLocalHost = () => {
    if (user.name && user.gender) {
      activeUser(user);
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-bold mb-6">
        Welcome to Habit Tracker!
      </h1>

      <img
        src={welcomePng}
        alt="Welcome"
        className="h-40 sm:h-56 md:h-72 lg:h-80 mb-6 object-contain"
      />

      <h3 className="text-white text-lg sm:text-xl mb-4">
        Step into a Better You with our Habit Tracker!
      </h3>

      <button
        className="w-52 cursor-pointer py-3 rounded-lg text-lg text-white border border-yellow-300 bg-[rgba(23,23,23,0.781)] transition-all duration-300 hover:bg-yellow-400 hover:text-black hover:shadow-[0_0_100px_1px_green]"
        onClick={() => setUserNameBox(true)}
      >
        Let's Begin! 🚀
      </button>

      {/* Username Modal */}
      {userNameBox && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex justify-center items-center px-4">
          <div className="text-white bg-[rgb(32,32,32)] rounded-2xl p-6 sm:p-8 w-full max-w-md flex flex-col gap-4 items-center shadow-lg">
            <h2 className="text-xl sm:text-2xl font-semibold">
              Before We Start!
            </h2>
            <p className="text-sm sm:text-base">How shall we call you?</p>
            <input
              type="text"
              className="h-10 rounded-lg px-3 outline-none text-base bg-[rgba(255,255,255,0.329)] text-white w-full placeholder-[rgba(255,255,255,0.616)] focus:outline-yellow-200"
              placeholder="Please Enter Your Name!"
              onChange={validateName}
            />
            <button
              className="mt-2 py-2 px-6 rounded-lg border border-yellow-300 text-white bg-[rgba(23,23,23,0.781)] hover:bg-yellow-400 hover:text-black transition"
              onClick={proceedToGender}
            >
              Save
            </button>
          </div>
        </div>
      )}

      {/* Gender Modal */}
      {userGenderBox && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex justify-center items-center px-4">
          <div className="text-white bg-[rgb(32,32,32)] rounded-2xl p-6 sm:p-8 w-full max-w-md flex flex-col gap-4 items-center shadow-lg">
            <h2 className="text-xl sm:text-2xl font-semibold">
              Hey {user.name}!
            </h2>
            <h3 className="text-sm sm:text-base text-center">
              To tailor your experience,
              <br /> could you let us know your gender?
            </h3>
            <select
              className="h-10 rounded-lg px-3 outline-none text-base bg-gray-500 w-full"
              onChange={validateGender}
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>
            <button
              className="mt-2 py-2 px-6 rounded-lg border border-yellow-300 text-white bg-[rgba(23,23,23,0.781)] hover:bg-yellow-400 hover:text-black transition"
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

export default WelcomePage;
