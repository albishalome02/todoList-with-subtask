import React, { useState } from "react";
import "./App.css";

function App() {
  const [userList, setUserList] = useState([
    {
      id: 1,
      name: "Design",
      priority: "High",
      status: "Todo",
      parentId: null,
      subTasks: [],
      showSubtasks: false,
    },
    {
      id: 2,
      name: "Project",
      priority: "Low",
      status: "Todo",
      parentId: null,
      subTasks: [],
      showSubtasks: false,
    },
  ]);
  const [editIndex, setEditIndex] = useState(-1);
  const [formData, setFormData] = useState({
    name: "",
    priority: "",
  });
  const [showPopup, setShowPopup] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const formSubmit = () => {
    if (editIndex === -1) {
      setUserList([
        ...userList,
        {
          ...formData,
          id: Date.now(),
          status: "Todo",
          parentId: selectedTaskId,
          subTasks: [],
          showSubtasks: false,
        },
      ]);
    } else {
      const updatedList = [...userList];
      updatedList[editIndex] = {
        ...formData,
        status: "Todo",
        parentId: null,
        subTasks: [],
        showSubtasks: false,
      };
      setUserList(updatedList);
      setEditIndex(-1);
    }
    setFormData({ name: "", priority: "" });
    setShowPopup(false);
  };

  const handleAddSubtask = (taskId) => {
    setSelectedTaskId(taskId);
    setShowPopup(true);
  };

  const findTask = (tasks, taskId) => {
    for (const task of tasks) {
      if (task.id === taskId) return task;
      if (task.subTasks.length > 0) {
        const found = findTask(task.subTasks, taskId);
        if (found) return found;
      }
    }
    return null;
  };

  const checkAndUpdateParentStatus = (taskId) => {
    const task = findTask(userList, taskId);
    if (!task || !task.parentId) return;

    const parentTask = findTask(userList, task.parentId);
    if (!parentTask) return;

    const allSubtasksDone = parentTask.subTasks.every(
      (subtask) => subtask.status === "Done"
    );
    if (allSubtasksDone) {
      parentTask.status = "Done";
      setUserList([...userList]);
      checkAndUpdateParentStatus(parentTask.id); // Recursively check parent tasks
    }
  };

  const markSubtaskAsDone = (parentId, subtaskId) => {
    const parentTask = findTask(userList, parentId);
    const subtask = findTask(parentTask.subTasks, subtaskId);
    console.log("Parent ID:", parentId);
  console.log("Subtask ID:", subtaskId);
    subtask.status = "Done";
    setUserList([...userList]);
    checkAndUpdateParentStatus(parentId);
  };

  const renderSubtasks = (subTasks, parentId) => {
    return subTasks.map((subtask, index) => (
      <React.Fragment key={subtask.id}>
        <tr>
          <td>{index + 1}</td>
          <td>{subtask.name}</td>
          <td className={`priority-${subtask.priority.toLowerCase()}`}>
            {subtask.priority}
          </td>
          <td>{subtask.status}</td>
          <td>{parentId ? findTask(userList, parentId).name : ""}</td>
          <td>
  <button
    onClick={() => handleAddSubtask(subtask.id)}
    className="todo-button"
  >
    Add Subtask
  </button>
  <button
    onClick={() => markSubtaskAsDone(parentId, subtask.id)}
    className="todo-button"
  >
    Mark as Done
  </button>
</td>

        </tr>
        {subtask.subTasks.length > 0 &&
          renderSubtasks(subtask.subTasks, subtask.id)}
      </React.Fragment>
    ));
  };

  const edit = (i) => {
    setEditIndex(i);
    setFormData(userList[i]);
    setShowPopup(true);
  };

  const handleAlert = () => {
    setShowPopup(true);
  };

  const handlePriorityClick = (priority) => {
    setFormData({ ...formData, priority });
  };

  const cancelAddTask = () => {
    setFormData({ name: "", priority: "" });
    setShowPopup(false);
  };

  return (
    <div>
      <div>
        <h3>Task List</h3>
        <button className="Add-button" onClick={handleAlert}>
          Add More
        </button>
      </div>
      <div>
        <table>
          <thead>
            <tr className="task">
              <td>No</td>
              <td>Task</td>
              <td>Priority</td>
              <td>Status</td>
              <th>Parent Task</th>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {userList.map((task, index) => (
              <React.Fragment key={task.id}>
                <tr>
                  <td>{index + 1}</td>
                  <td>{task.name}</td>
                  <td className={`priority-${task.priority.toLowerCase()}`}>
                    {task.priority}
                  </td>
                  <td>{task.status}</td>
                  <td>{task.parentId ? findTask(userList, task.parentId).name : ""}</td>
                  <td>
  <button
    onClick={() => handleAddSubtask(task.id)}
    className="todo-button"
  >
    Add Subtask
  </button>
  <button onClick={() => edit(index)} className="todo-button">
    Edit
  </button>
  <button
    onClick={() => markSubtaskAsDone(null, task.id)}
    className="todo-button"
  >
    Mark as Done
  </button>
</td>

                </tr>
                {task.subTasks.length > 0 &&
                  renderSubtasks(task.subTasks, task.id)}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={() => setShowPopup(false)}>
              &times;
            </span>
            <button className="cancel-button" onClick={cancelAddTask}>
              Cancel
            </button>
            <h2>Task</h2>
            <input
              type="text"
              className="form-control"
              placeholder="Task"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <h4>Priority</h4>
            <div className="priority-buttons">
              <button
                className="priority-high"
                onClick={() => handlePriorityClick("High")}
              >
                High
              </button>
              <button
                className="priority-medium"
                onClick={() => handlePriorityClick("Medium")}
              >
                Medium
              </button>
              <button
                className="priority-low"
                onClick={() => handlePriorityClick("Low")}
              >
                Low
              </button>
            </div>
            <button className="pop-add" onClick={formSubmit}>
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
