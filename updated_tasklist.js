import React, { useState } from "react";
import "./App.css";

function App() {
  const [todoList, setTodoList] = useState([
    {
      id: 1,
      name: "Design",
      priority: "High",
      status: "Todo",
      parentId: null,
    },
    {
      id: 2,
      name: "Project",
      priority: "Low",
      status: "Todo",
      parentId: null,
    },
  ]);
  const [editIndex, setEditIndex] = useState(-1);
  const [formData, setFormData] = useState({
    name: "",
    priority: "",
  });
  const [showPopup, setShowPopup] = useState(false);
  const [selectedParentTask, setSelectedParentTask] = useState(null);

  const formSubmit = (index) => {
    if (!index) {
      setTodoList([
        ...todoList,
        {
          ...formData,
          id: Date.now(),
          status: "Todo",
          parentId: selectedParentTask ? selectedParentTask.id : null,
        },
      ]);
    } else {
      const updatedList = [...todoList];
      updatedList[editIndex] = {
        ...formData,
        parentId: todoList[editIndex].parentId,
      };
      setTodoList(updatedList);
      setEditIndex(-1);
    }
    setFormData({ name: "", priority: "" });
    setShowPopup(false);
    setSelectedParentTask(null);
  };

  const edit = (i) => {
    setEditIndex(i);
    setFormData(todoList[i]);
    // console.log("todoList: ",todoList[i]);
    setShowPopup(true);
  };

  const remove = (i) => {
    const updatedList = [...todoList];
    updatedList.splice(i, 1);
    setTodoList(updatedList);
  };

  const handlePriorityClick = (priority) => {
    setFormData({ ...formData, priority });
  };

  const cancelAddTask = () => {
    setFormData({ name: "", priority: "" });
    setShowPopup(false);
    setSelectedParentTask(null);
  };

  const markTaskAsDone = (taskId) => {
    // const taskList = [...todoList];
      const updatedList = todoList.map((task) => {
        if (task.id === taskId) {
          console.log("Task ID: ", task.id);
          console.log("task", task);
          task.status = "Done";
        }
        return task;
      });
      setTodoList(updatedList);
      // Function to mark all children tasks as done
      const markChildrenAsDone = (task) => {
        const childrenTasks = updatedList.filter((t) => t.parentId === task.id);
        console.log("childrenTask: ", childrenTasks);
        childrenTasks.forEach((childTask) => {
          childTask.status = "Done";
          markChildrenAsDone(childTask); //recursive CALL
        });
      };

      // Function to mark parent task as done
      const markParentAsDone = (task) => {
        if (task.parentId) {
          const parentTask = updatedList.find((t) => t.id === task.parentId);
          console.log("parentTask: ", parentTask);
          const isSiblingsDone = updatedList
            .filter((t) => t.parentId === parentTask.id)
            .every((t) => t.status === "Done");
          if (isSiblingsDone && parentTask.status !== "Done") {
            parentTask.status = "Done";
            markParentAsDone(parentTask); //recursive CALL
          }
        }
      };
      const task = updatedList.find((t) => t.id === taskId);
      console.log("UPDATEDTask :", task);
      if (task.status === "Done") {
        markParentAsDone(task);
        markChildrenAsDone(task);
        console.log("Task marked as Done: ", task);
        console.log("--------------------------------");
      }
      return updatedList;
  };

  const getParentName = (taskId) => {
    const parentTask = todoList.find((task) => task.id === taskId);
    return parentTask ? parentTask.name : "No parent";
  };

  return (
    <div>
      <div>
        <h3>Task List</h3>
        <button className="Add-button" onClick={() => setShowPopup(true)}>
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
              <td>Parent Task</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {todoList.map((task, index) => (
              <tr key={task.id}>
                <td>{index + 1}</td>
                <td>{task.name}</td>
                <td className={`priority-${task.priority.toLowerCase()}`}>
                  {task.priority}
                </td>
                <td>{task.status}</td>
                <td>{getParentName(task.parentId)}</td>
                <td>
                  <button onClick={() => edit(index)} className="todo-button">
                    Edit
                  </button>
                  <button onClick={() => remove(index)} className="todo-button">
                    Remove
                  </button>
                  <button
                    className="todo-button"
                    onClick={() => markTaskAsDone(task.id)}
                  >
                    Done
                  </button>
                  <button
                    className="todo-button"
                    onClick={() => {
                      setSelectedParentTask(task);
                      setShowPopup(true);
                    }}
                  >
                    Add task
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Add popup */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={() => setShowPopup(false)}></span>
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
            <select
              className="select-todo"
              value={formData.parentId ? formData.parentId : " "}
              onChange={(e) => {
                const taskId = parseInt(e.target.value);
                const task = todoList.find((task) => task.id === taskId);
                setSelectedParentTask(task);
              }}
            >
              <option value="">
                Select any Task(This will act as a parent task)
              </option>
              {todoList.map((task, index) => (
                <option key={task.id} value={task.id}>
                  {task.name}(ID: {index + 1})
                </option>
              ))}
            </select>
            <button className="pop-add" onClick={() => formSubmit(formData?.id)}>
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
