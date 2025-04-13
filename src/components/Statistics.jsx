import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire, faTrophy } from "@fortawesome/free-solid-svg-icons";

// Mock data (replace with your localStorage data)
const mockHabits = [
  {
    id: 1,
    name: "Drink water",
    completedDates: ["2025-04-10", "2025-04-11", "2025-04-12"],
    category: "Health",
  },
  {
    id: 2,
    name: "Exercise",
    completedDates: ["2025-04-10", "2025-04-12"],
    category: "Fitness",
  },
];

function Statistics() {
  const [habits, setHabits] = useState(mockHabits);
  const [timeFrame, setTimeFrame] = useState("week");

  // Load habits from localStorage (uncomment when ready)
  /*
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("habitTrackerState") || "[]");
    setHabits(stored);
  }, []);
  */

  // Calculate stats
  const totalCompletions = habits.reduce(
    (sum, habit) => sum + habit.completedDates.length,
    0
  );
  const longestStreak = Math.max(
    ...habits.map((habit) => {
      let maxStreak = 0;
      let currentStreak = 0;
      let lastDate = null;
      habit.completedDates.sort().forEach((date) => {
        const current = new Date(date);
        if (lastDate) {
          const diffDays = (current - lastDate) / (1000 * 60 * 60 * 24);
          if (diffDays === 1) {
            currentStreak++;
            maxStreak = Math.max(maxStreak, currentStreak);
          } else {
            currentStreak = 1;
          }
        } else {
          currentStreak = 1;
        }
        lastDate = current;
      });
      return maxStreak;
    }),
    0
  );

  // Prepare chart data (last 7 days)
  const today = new Date();
  const chartData = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() - 6 + i);
    const dateStr = date.toISOString().split("T")[0];
    const completions = habits.reduce(
      (sum, habit) => sum + (habit.completedDates.includes(dateStr) ? 1 : 0),
      0
    );
    return { date: dateStr.slice(5, 10), completions };
  });

  return (
    <div className="p-5 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-lime-300 mb-5">Statistics</h1>

      {/* Filter */}
      <div className="mb-5">
        <select
          value={timeFrame}
          onChange={(e) => setTimeFrame(e.target.value)}
          className="p-2 bg-gray-900 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-300"
        >
          <option value="week">Last 7 Days</option>
          <option value="month">Last 30 Days</option>
        </select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
        <div className="bg-[rgb(51,51,51)] rounded-2xl p-5 flex items-center gap-3">
          <FontAwesomeIcon icon={faTrophy} className="text-lime-300 text-2xl" />
          <div>
            <p className="text-gray-400">Total Completions</p>
            <p className="text-xl text-lime-300">{totalCompletions}</p>
          </div>
        </div>
        <div className="bg-[rgb(51,51,51)] rounded-2xl p-5 flex items-center gap-3">
          <FontAwesomeIcon icon={faFire} className="text-lime-300 text-2xl" />
          <div>
            <p className="text-gray-400">Longest Streak</p>
            <p className="text-xl text-lime-300">{longestStreak} days</p>
          </div>
        </div>
        <div className="bg-[rgb(51,51,51)] rounded-2xl p-5 flex items-center gap-3">
          <FontAwesomeIcon icon={faTrophy} className="text-lime-300 text-2xl" />
          <div>
            <p className="text-gray-400">Active Habits</p>
            <p className="text-xl text-lime-300">{habits.length}</p>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-[rgb(51,51,51)] rounded-2xl p-5">
        <h2 className="text-xl text-gray-300 mb-3">Completion Trend</h2>
        <div style={{ height: "300px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="date" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#333",
                  border: "none",
                  color: "#D4D4D8",
                }}
              />
              <Bar dataKey="completions" fill="#84CC16" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
