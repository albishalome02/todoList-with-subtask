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

  const formSubmit = () => {
    if (editIndex === -1) {
      setUserList([
        ...userList,
        {
          ...formData,
          id: Date.now(),
          status: "Todo",
          parentId: null,
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

  const handleAddSubtask = (parentId) => {
    const mainTask = findTask(userList, parentId);
    const subtaskName = prompt("Enter subtask for main task:");
    if (subtaskName) {
      const subtaskPriority = prompt(
        "Enter priority for subtask (High, Medium, Low):"
      );
      const subtaskStatus = "Todo";
      const subtask = {
        id: Date.now(),
        name: subtaskName,
        priority: subtaskPriority,
        status: subtaskStatus,
        subTasks: [],
      };
      mainTask.subTasks.push(subtask);
      setUserList([...userList]);
    }
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

  const handleAddChildSubtask = (parentId, subtaskId) => {
    const parentTask = findTask(userList, parentId);
    const subtask = findTask(parentTask.subTasks, subtaskId);
    const childSubtaskName = prompt("Enter another task for your subtask:");
    if (childSubtaskName) {
      const childSubtaskPriority = prompt(
        "Enter priority for child subtask (High, Medium, Low):"
      );
      const childSubtaskStatus = "Todo";
      const childSubtask = {
        id: Date.now(),
        name: childSubtaskName,
        priority: childSubtaskPriority,
        status: childSubtaskStatus,
        subTasks: [],
      };
      subtask.subTasks.push(childSubtask);
      setUserList([...userList]);
    }
  };

  const markSubtaskAsDone = (parentId, subtaskId) => {
    const parentTask = findTask(userList, parentId);
    const subtask = findTask(parentTask.subTasks, subtaskId);
    subtask.status = "Done";
  
    // Check if all subtasks of the parent task are done
    const allSubtasksDone = parentTask.subTasks.every((task) => task.status === "Done");
    if (allSubtasksDone) {
      parentTask.status = "Done";
    }
  
    setUserList([...userList]);
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
              onClick={() => handleAddChildSubtask(parentId, subtask.id)}
              className="todo-button"
            >
              Add Child Subtask
            </button>
            <button
              onClick={() => markSubtaskAsDone(parentId, subtask.id)} // Add this line
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

  const remove = (i) => {
    const updatedList = [...userList];
    updatedList.splice(i, 1);
    setUserList(updatedList);
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
          <tr className="task">
            <td>No</td>
            <td>Task</td>
            <td>Priority</td>
            <td>Status</td>
            <th>Parent Task</th>
            <td>Action</td>
          </tr>
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
                  <td></td>
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
                    {/* Add Edit button */}
                    <button
                      onClick={() => remove(index)}
                      className="todo-button"
                    >
                      Remove
                    </button>
                    {/* Add Remove button */}
                  </td>
                </tr>
                {renderSubtasks(task.subTasks, task.id)}
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
