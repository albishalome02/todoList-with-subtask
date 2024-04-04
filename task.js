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

  // const formSubtaskSubmit = (parentId) => {
  //   const subtaskName = prompt("Enter subtask for main task:");
  //   if (subtaskName) {
  //     const subtaskPriority = prompt(
  //       "Enter priority for subtask (High, Medium, Low):"
  //     );
  //     const subtaskStatus = "Todo";
  //     const updatedList = [...userList];
  //     updatedList[parentId].subTasks.push({
  //       // id: Date.now(),
  //       subtask_name: subtaskName,
  //       priority: subtaskPriority,
  //       status: subtaskStatus,
  //       parentId: parentId,
  //       childSubtasks: [],
  //       showSubtasks: false,
  //     });
  //     setUserList(updatedList);
  //   }
  // };


  const handleAddSubtask = (parentId) => {
    const subtaskName = prompt("Enter subtask for main task:");
    if (subtaskName) {
      const subtaskPriority = prompt(
        "Enter priority for subtask (High, Medium, Low):"
      );
      const subtaskStatus = "Todo";
      const updatedList = [...userList];
      updatedList[parentId].subTasks.push({
        // id: Date.now(),
        subtask_name: subtaskName,
        priority: subtaskPriority,
        status: subtaskStatus,
        parentId: parentId,
        childSubtasks: [],
        showSubtasks: false,
      });
      setUserList(updatedList);
    }
  };

  const handleAddChildSubtask = (parentId, subtaskIndex) => {
    const childSubtaskName = prompt("Enter another for your subtask:");
    if (childSubtaskName) {
      const childSubtaskPriority = prompt(
        "Enter priority for child subtask (High, Medium, Low):"
      );
      const childSubtaskStatus = "Todo";
      const updatedList = [...userList];
      updatedList[parentId].subTasks[subtaskIndex].childSubtasks.push({
        // id: Date.now(),
        name: childSubtaskName,
        priority: childSubtaskPriority,
        status: childSubtaskStatus,
        parentId: parentId,
        subTasks: [],
        showSubtasks: false,
      });
      setUserList(updatedList);
    }
  };

  const handleSubtaskCompletion = (mainTaskIndex, subtaskIndex) => {
    const updatedList = [...userList];
    updatedList[mainTaskIndex].subTasks[subtaskIndex].status =
      updatedList[mainTaskIndex].subTasks[subtaskIndex].status === "Todo"
        ? "done"
        : "Todo";
    setUserList(updatedList);
    checkMainTaskCompletion(mainTaskIndex);
  };

  const handleChildSubtaskCompletion = (
    mainTaskIndex,
    subtaskIndex,
    childIndex
  ) => {
    const updatedList = [...userList];
    updatedList[mainTaskIndex].subTasks[subtaskIndex].childSubtasks[
      childIndex
    ].status =
      updatedList[mainTaskIndex].subTasks[subtaskIndex].childSubtasks[
        childIndex
      ].status === "Todo"
        ? "done"
        : "Todo";
    setUserList(updatedList);
    checkMainTaskCompletion(mainTaskIndex);
  };

  const checkMainTaskCompletion = (mainTaskIndex) => {
    const mainTask = userList[mainTaskIndex];
    const allSubtasksDone = mainTask.subTasks.every(
      (subtask) => subtask.status === "done"
    );
    if (allSubtasksDone) {
      const allChildSubtasksDone = mainTask.subTasks.every((subtask) =>
        subtask.childSubtasks.every(
          (childSubtask) => childSubtask.status === "done"
        )
      );
      if (allChildSubtasksDone) {
        const updatedList = [...userList];
        updatedList[mainTaskIndex].status = "done";
        setUserList(updatedList);
      }
    }
  };

  const renderUi = (list) => {
    return list.map((data, i) => (
      <React.Fragment key={i}>
        <tr className="collapsible justify-evenly flex">
          <td>{i + 1}</td>
          <td>{data.name}</td>
          <td className={`priority-${data.priority.toLowerCase()}`}>
            {data.priority}
          </td>
          <td>{data.status}</td>
          <td>
            <img
              src="https://png.pngtree.com/element_our/20190601/ourmid/pngtree-white-edit-icon-image_1338673.jpg"
              alt="edit"
              height={25}
              width={25}
              style={{ marginLeft: 20, marginTop: 1 }}
              onClick={() => edit(i)}
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/3405/3405244.png"
              alt="del"
              height={25}
              width={25}
              style={{ marginLeft: 20, marginTop: 1 }}
              onClick={() => remove(i)}
            />
            <button className="todo-button" onClick={() => handleAddSubtask(i)}>
              Add subtask
            </button>
          </td>
        </tr>
        {data.subTasks.map((subtask, subtaskIndex) => (
          <tr key={`${i}-${subtaskIndex}`}>
            <td></td>
            <td colSpan={3}>
              <div className="subtask">
                <p className="word">Ancillary</p>
                <p>{subtask.subtask_name}</p>
                <p className={`priority-${subtask.priority.toLowerCase()}`}>
                  {subtask.priority}
                </p>
                <p>{subtask.status}</p>
                <button
                  className="todo-button"
                  onClick={() => handleAddChildSubtask(i, subtaskIndex)}
                >
                  Add another task
                </button>
                <button
                  className="todo-button"
                  onClick={() => handleSubtaskCompletion(i, subtaskIndex)}
                >
                  {subtask.status === "Todo"
                    ? "Mark as Completed"
                    : "Mark as Todo"}
                </button>
              </div>
              {subtask.childSubtasks && subtask.childSubtasks.length > 0 && (
                <div>
                  {subtask.childSubtasks.map((childSubtask, childIndex) => (
                    <div key={childIndex} className="child-subtask">
                      <p className="word">Offshoot</p>
                      <p>{childSubtask.name}</p>
                      <p
                        className={`priority-${childSubtask.priority.toLowerCase()}`}
                      >
                        {childSubtask.priority}
                      </p>
                      <p>{childSubtask.status}</p>
                      <button
                        className="todo-button"
                        onClick={() =>
                          handleChildSubtaskCompletion(
                            i,
                            subtaskIndex,
                            childIndex
                          )
                        }
                      >
                        {childSubtask.status === "Todo"
                          ? "Mark as Completed"
                          : "Mark as Todo"}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </td>
            <td></td>
          </tr>
        ))}
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
            <td>Action</td>
          </tr>
          <tbody>{renderUi(userList)}</tbody>
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
            {/* <button className="todo-button" onClick={formSubtaskSubmit}> */}
              {/* Add subtask */}
            {/* </button> */}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
