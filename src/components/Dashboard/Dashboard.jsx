import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import SideNavbar from "../SideNavBar";
import Habit from "./Habit";
import CreateHabit from "./CreateHabit";
import PrevRecord from "./Habit/PrevRecord";
import { useDashboard } from "../../hooks/useDashboard";
export default function Dashboard() {
  const navigate = useNavigate();
  const {
    userData,
    setUserData,
    createBoxStatus,
    setCreateBoxStatus,
    showPrevRecord,
    setShowPrevRecord,
    activeHabitData,
    setActiveHabitData,
    settingsBox,
    setSettingsBox,
    statsBox,
    setStatsBox,
  } = useDashboard();

  useEffect(() => {
    if (!userData) {
      navigate("/");
    }
  }, [userData, navigate]);

  // Date functions remain the same
  function getFormattedDate(date) {
    const dayOfWeek = date.toLocaleString("en-US", { weekday: "short" });
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();
    const ordinalIndicator = getOrdinalIndicator(day);

    return {
      dayOfWeek: dayOfWeek,
      day: day,
      month: month,
      year: year,
      formatted: `${dayOfWeek}, ${day}${ordinalIndicator} ${month}, ${year}`,
    };
  }

  function getOrdinalIndicator(day) {
    if (day >= 11 && day <= 13) {
      return "th";
    }
    const lastDigit = day % 10;
    switch (lastDigit) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  function getPreviousAndNextDates(todayDate) {
    // ... (keep existing date calculation code)
    const today = new Date();

    // Get the next 20 days
    const nextDates = [];
    for (let i = 1; i <= 20; i++) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i);
      nextDates.push(getFormattedDate(nextDate));
    }

    let datesList = [todayDate, ...nextDates];

    return datesList;
  }

  const today = new Date();
  const todayDate = getFormattedDate(today);
  const datesList = getPreviousAndNextDates(todayDate);
  const activeNav = statsBox ? "stats" : settingsBox ? "settings" : "dashboard";

  // Reset Button Logic
  const resetHabits = () => {
    const updatedHabits = userData?.habitData?.map((habit) => ({
      ...habit,
      done: false, // Reset the "done" status for all habits
    }));
    setUserData({ ...userData, habitData: updatedHabits }); // Update the user data with reset habits
  };

  return (
    <div className="flex h-screen p-5 bg-[#010101] text-white gap-5">
      <SideNavbar activeNav={activeNav} />

      <div className="rounded-2xl p-5 w-[calc(100%-220px)] text-start bg-[rgba(20,20,20,0.8)]">
        <h1 className="greeting-user">
          Welcome {userData ? userData.name : "Fetching..."}!
        </h1>

        <div className="w-full overflow-scroll flex gap-2.5 my-2.5">
          {datesList.map((date, index) => (
            <div
              key={index}
              className={`h-20 min-w-[70px] rounded-lg bg-[rgb(27,27,27)] flex flex-col items-center justify-center ${
                date.formatted === todayDate.formatted
                  ? "bg-green-300 text-black"
                  : ""
              }`}
            >
              <span className="font-bold">{date.dayOfWeek}</span>
              <span className="font-bold">{date.day}</span>
              <span className="font-bold">{date.month}</span>
            </div>
          ))}
        </div>

        <h2 className="mt-7">Today's Habits</h2>
        <div className="flex gap-5 mt-2.5 w-full overflow-auto">
          {userData?.habitData?.map((habit, index) => (
            <Habit
              key={index}
              habit={habit}
              index={index}
              setShowPrevRecord={setShowPrevRecord}
              setActiveHabitData={setActiveHabitData}
            />
          ))}
        </div>
      </div>

      {createBoxStatus && (
        <CreateHabit setCreateBoxStatus={setCreateBoxStatus} />
      )}
      {showPrevRecord && (
        <PrevRecord
          setShowPrevRecord={setShowPrevRecord}
          activeHabitData={activeHabitData}
        />
      )}

      <button
        className="fixed bg-green-400 text-lg py-3 px-5 rounded-full bottom-10 right-10 cursor-pointer transition-all duration-300 z-10 hover:shadow-[0_0_50px_0px_rgb(170,255,0)]"
        onClick={() => setCreateBoxStatus(true)}
      >
        Add Habit +
      </button>

      {/* Reset Button */}
      <button
        className="fixed bg-blue-500 text-lg py-3 px-5 rounded-full bottom-10 right-[150px] cursor-pointer transition-all duration-300 z-10 hover:shadow-[0_0_50px_0px_rgb(0,0,255)]"
        onClick={resetHabits}
      >
        Reset Habits
      </button>
    </div>
  );
}
