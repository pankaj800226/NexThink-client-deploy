import { Add } from "@mui/icons-material";
import { useState } from "react";

type Day = { checked: boolean; date: string };
type Week = { weekNo: number; days: Day[] };
type Task = { id: number; title: string; weeks: Week[] };


export default function HabitTracker() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [input, setInput] = useState("");

    const createWeek = (startDate: Date, weekNo: number): Week => {
        const daysArray: Day[] = Array.from({ length: 7 }).map((_, i) => {
            const d = new Date(startDate);
            d.setDate(d.getDate() + i);
            return { checked: false, date: d.toDateString() };
        });
        return { weekNo, days: daysArray };
    };

    const handleAddTask = () => {
        if (!input.trim()) return;
        const newTask: Task = {
            id: Date.now(),
            title: input.trim(),
            weeks: [createWeek(new Date(), 1)]
        };
        setTasks([...tasks, newTask]);
        setInput("");
        console.log(newTask);

    };

    const toggleCheck = (taskId: number, wIndex: number, dIndex: number) => {
        const updated = tasks.map(task => {
            if (task.id === taskId) {
                const newTask = { ...task };
                newTask.weeks[wIndex].days[dIndex].checked =
                    !newTask.weeks[wIndex].days[dIndex].checked;

                const allDone = newTask.weeks[wIndex].days.every(d => d.checked);
                if (allDone && newTask.weeks.length === wIndex + 1) {
                    const lastDate = new Date(newTask.weeks[wIndex].days[6].date);
                    lastDate.setDate(lastDate.getDate() + 1);
                    newTask.weeks.push(createWeek(lastDate, newTask.weeks.length + 1));
                }

                return newTask;
            }
            return task;
        });
        setTasks(updated);
    };


    return (
        <div className="habit-wrapper">
            <div className="habit-input">
                <input
                    placeholder="Enter Daily Task"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                />
                <button onClick={handleAddTask}><Add /></button>
            </div>

            {tasks.map(task => (
                <div className="task-box" key={task.id}>
                    <h2>{task.title}</h2>
                    <table className="habit-table">
                        <thead>
                            <tr>
                                <th>Week / Month</th>
                                {/* {days.map(day => <th key={day}>{day}</th>)} */}
                            </tr>
                        </thead>
                        <tbody>
                            {task.weeks.map((week, wIndex) => {
                                const month = new Date(week.days[0].date).toLocaleString("default", { month: "long" });
                                return (
                                    <tr key={wIndex}>
                                        <td>
                                            Week {week.weekNo} <br />
                                            <span>{month}</span>
                                        </td>
                                        {week.days.map((day, dIndex) => (
                                            <td key={dIndex}>
                                                <label className={`check-label ${day.checked ? "checked" : ""}`}>
                                                    <input
                                                        type="checkbox"
                                                        checked={day.checked}
                                                        onChange={() => toggleCheck(task.id, wIndex, dIndex)}

                                                    />
                                                    <span></span>
                                                </label>
                                                <div className="date-label">
                                                    {new Date(day.date).getDate()}
                                                </div>
                                            </td>
                                        ))}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
}
