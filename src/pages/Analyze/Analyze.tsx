import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/SideBar";
import Loading from "../../components/Loading";
import ApiError from "../../components/ApiError";
import { api } from "../../api/api";
import CoverImg from "./CoverImg";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

type Task = {
  _id: string;
  title: string;
  status: string;
};

const ManageTodo = () => {
  const [allTask, setAllTask] = useState<Task[]>([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");

  const fetchTask = async () => {
    const token = localStorage.getItem("TOKEN");
    if (!token) return;

    try {
      setLoader(true);
      const res = await axios.get(`${api}/api/todo/getTask`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setAllTask(res.data.findTask);
    } catch (err) {
      console.log(err);
      setError("Api Fetching Error");
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchTask();
  }, []);

  const completedCount = allTask.filter(
    task => task.status === "completed"
  ).length;

  const pendingCount = allTask.length - completedCount;

  const progressPercent =
    allTask.length === 0
      ? 0
      : Math.round((completedCount / allTask.length) * 100);

  const chartData = [
    { name: "Total", value: allTask.length },
    { name: "Completed", value: completedCount },
    { name: "Pending", value: pendingCount }
  ];

  if (loader) return <Loading />;
  if (error) return <ApiError error={error} />;

  return (
    <div className="dashboard_container">
      <Sidebar />

      <main>
        <CoverImg />

        <div className="analyze_container">

          {/* STAT CARDS */}
          <div className="stats_card">
            <h2>Total Tasks</h2>
            <p>{allTask.length}</p>
          </div>

          <div className="stats_card completed">
            <h2>Completed</h2>
            <p>{completedCount}</p>
          </div>

          <div className="stats_card pending">
            <h2>Pending</h2>
            <p>{pendingCount}</p>
          </div>

          {/* PROGRESS BAR */}
          <div className="progress_card">
            <div className="progress_header">
              <h3>Task Progress</h3>
              <span>{progressPercent}%</span>
            </div>

            <div className="progress_bar">
              <div
                className="progress_fill"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* LINE CHART */}
          <div className="chart_card">
            <h3>Task Status Trend</h3>

            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={chartData}>
                <CartesianGrid stroke="#1f242b" strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#aaa" />
                <YAxis stroke="#aaa" />
                <Tooltip
                  contentStyle={{
                    background: "#15191d",
                    border: "1px solid #2a2f36",
                    color: "#fff"
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#6a5af9"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

        </div>
      </main>
    </div>
  );
};

export default ManageTodo;
