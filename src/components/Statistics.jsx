import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire, faTrophy } from "@fortawesome/free-solid-svg-icons";

// Mock data 
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

  // Prepare bar chart data (last 7 days)
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

  // Prepare pie chart data
  const categoryData = habits.reduce((acc, habit) => {
    acc[habit.category] = (acc[habit.category] || 0) + 1;
    return acc;
  }, {});
  const pieData = Object.entries(categoryData).map(([name, value]) => ({
    name,
    value,
  }));

  // Colors for pie chart slices
  const COLORS = ["#84CC16", "#A3E635", "#D4D4D8", "#9CA3AF"]; // Lime shades and grays

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-semibold text-lime-300 mb-4 md:mb-6">Statistics</h1>

      {/* Filter */}
      <div className="mb-4 md:mb-6 w-full md:w-auto">
        <select
          value={timeFrame}
          onChange={(e) => setTimeFrame(e.target.value)}
          className="w-full md:w-auto p-2 text-sm md:text-base bg-gray-900 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-300"
        >
          <option value="week">Last 7 Days</option>
          <option value="month">Last 30 Days</option>
        </select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 mb-4 md:mb-6">
        {[
          { icon: faTrophy, label: "Total Completions", value: totalCompletions },
          { icon: faFire, label: "Longest Streak", value: `${longestStreak} days` },
          { icon: faTrophy, label: "Active Habits", value: habits.length }
        ].map((stat, index) => (
          <div key={index} className="bg-[rgb(51,51,51)] rounded-xl md:rounded-2xl p-3 md:p-5 flex items-center gap-2 md:gap-3">
            <FontAwesomeIcon icon={stat.icon} className="text-lime-300 text-xl md:text-2xl" />
            <div>
              <p className="text-xs md:text-sm text-gray-400">{stat.label}</p>
              <p className="text-lg md:text-xl text-lime-300">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Bar Chart */}
      <div className="bg-[rgb(51,51,51)] rounded-xl md:rounded-2xl p-3 md:p-5 mb-4 md:mb-6">
        <h2 className="text-lg md:text-xl text-gray-300 mb-2 md:mb-3">Completion Trend</h2>
        <div style={{ height: "250px", minHeight: "200px" }} className="w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="date" stroke="#9CA3AF" fontSize={12} />
              <YAxis stroke="#9CA3AF" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#333",
                  border: "none",
                  color: "#D4D4D8",
                  fontSize: 12
                }}
              />
              <Bar dataKey="completions" fill="#84CC16" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="bg-[rgb(51,51,51)] rounded-xl md:rounded-2xl p-3 md:p-5">
        <h2 className="text-lg md:text-xl text-gray-300 mb-2 md:mb-3">Habits by Category</h2>
        <div style={{ height: "200px", minHeight: "150px" }} className="w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={60}
                innerRadius={30}
                label={({ name, percent }) =>
                  `${name} (${(percent * 100).toFixed(0)}%)`
                }
                labelLine={false}
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#333",
                  border: "none",
                  color: "#D4D4D8",
                  fontSize: 12
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
