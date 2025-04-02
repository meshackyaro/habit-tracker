import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Habit from "./Habit";
import CreateHabit from "./CreateHabit";
import PrevRecord from "./Habit/PrevRecord";
import { useDashboard } from "../../hooks/useDashboard";
import SideNavbar from "../Sidenavbar";

export default function Dashboard() {
    const navigate = useNavigate();
    const {
        userData,
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
    }, [userData]);

    // Date functions
    function getFormattedDate(date) {
        // ... (keep existing date formatting code)
    }

    function getPreviousAndNextDates() {
        // ... (keep existing date calculation code)
    }

    const today = new Date();
    const todayDate = getFormattedDate(today);
    const datesList = getPreviousAndNextDates();
    const activeNav = statsBox ? "stats" : settingsBox ? "settings" : "dashboard";

    return (
        <div className="flex h-screen p-5 bg-[#010101] text-white gap-5">
            {/* Sidebar */}
            <SideNavbar activeNav={activeNav} />

            {/* Main Content */}
            <div className="rounded-2xl p-5 w-[calc(100%-220px)] text-start bg-[rgba(20,20,20,0.8)]">
                <h1 className="greeting-user">
                    Welcome {userData ? userData.name : "Fetching..."}!
                </h1>

                {/* Dates List */}
                <div className="w-full overflow-scroll flex gap-2.5 my-2.5">
                    {datesList.map((date, index) => (
                        <div
                            key={index}
                            className={`h-20 min-w-[70px] rounded-lg bg-[rgb(27,27,27)] flex flex-col items-center justify-center ${
                                date.formatted === todayDate.formatted
                                    ? "bg-greenyellow text-black"
                                    : ""
                            }`}
                        >
                            <span className="font-bold">{date.dayOfWeek}</span>
                            <span className="font-bold">{date.day}</span>
                            <span className="font-bold">{date.month}</span>
                        </div>
                    ))}
                </div>

                {/* Today's Habits */}
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

            {/* Modals */}
            {createBoxStatus && (
                <CreateHabit setCreateBoxStatus={setCreateBoxStatus} />
            )}
            {showPrevRecord && (
                <PrevRecord
                    setShowPrevRecord={setShowPrevRecord}
                    activeHabitData={activeHabitData}
                />
            )}

            {/* Add Habit Button */}
            <button
                className="fixed bg-greenyellow text-lg py-3 px-5 rounded-full bottom-10 right-10 cursor-pointer transition-all duration-300 z-10 hover:shadow-[0_0_50px_0px_rgb(170,255,0)]"
                onClick={() => setCreateBoxStatus(true)}
            >
                Add Habit +
            </button>
        </div>
    );
}