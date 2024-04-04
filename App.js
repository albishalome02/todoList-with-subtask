.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
@tailwind base;
@tailwind components;
@tailwind utilities;


.popup-content {
  background-color: white;
  padding: 20px;
  border-radius: 10%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

.form-control {
  margin-bottom: 10px;
}

.priority-high {
  color: red;
  font-family: cursive;
  font-size: larger;
}

  .priority-medium {
    color: rgb(150, 150, 3);
    font-family: cursive;
  font-size: larger;
  }
  
  .priority-low {
    color: green;
    font-family: cursive;
  font-size: larger;
  }
  h3{
    font-size: 250%;
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    margin-left: 40%;
   }

  h2{
    font-size: 250%;
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
   }
  
   .cancel-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: #ff5722;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 5px;
    cursor: pointer;
  }
   .cancel-button:hover {
     background-color: #f44336;
   }

   .priority-buttons button.priority-high {
    /* background-color: #f44336; */
    /* border: 1px solid #f44336; */
    color: white;
  }
 
  .priority-buttons button.priority-medium {
    background-color: #ff9800;
    color: white;
  }
 
  .priority-buttons button.priority-low {
    background-color: #0ac711;
    color: white;
  }
 
  .priority-buttons button:hover {
    opacity: 0.8;
  }
 
   .Add-button{
    background-color: rgb(172, 132, 231);
    border: none;
    border-radius: 5px;
    box-shadow: 3px 3px rgb(190, 157, 233);
    padding: 1%;
    width: 7%;
    font-size: larger;
    margin-top: -10%;
    margin-left: 60%;
    color: black; 
   }

   .Add-button:hover {
    background-color: rgb(141, 75, 240);
  }
   
    .todo-button{
      background-color: rgb(172, 132, 231);
      display: inline-block;
      border: none;
      border-radius: 8px;
      padding: 2%;
      margin-top: 2%;
      margin-left: 2%;
      color: black;
   }

   .todo-button:hover {
    background-color: rgb(141, 75, 240);
  }

  .input-box{
        margin: 0%;
        border-radius: 1px;
  }
  .App{
      font-size: larger;
      font-style: italic;
      margin-left: 40%;
  }
  
  table {
    width: 60%;
    border-collapse: collapse;
    margin-left: 20%;
    margin-top: 10%;
  }
 
  td {
    font-size: medium;
    font-style: italic;
    font-weight: lighter;
  }
 

.pop-add{
    top: 10px;
    right: 10px;
    background-color: rgb(172, 132, 231);
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 5px;
    cursor: pointer;
}

 .popup-content {
   position: relative;
   background-color: white;
   padding: 20px;
   border-radius: 5px;
   box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
   max-width: 50%;
   width: 100%;
 }

 .close {
   position: absolute;
   top: 10px;
   right: 10px;
   cursor: pointer;
 }

 .cancel-button {
   position: absolute;
   top: 10px;
   right: 10px;
   background-color: rgb(172, 132, 231);
   color: white;
   border: none;
   padding: 8px 16px;
   border-radius: 5px;
   cursor: pointer;
 }

 .cancel-button:hover {
   background-color: #f44336;
 }

 .popup-content h2 {
   margin-top: 0;
 }

 .popup-content input {
   width: 90%;
   margin-bottom: 10px;
   padding: 8px;
   border: 1px solid #ccc;
   border-radius: 4px;
 }

 .priority-buttons {
   display: flex;
   gap: 10px;
   margin-bottom: 10px;
 }

 .priority-buttons button {
   padding: 8px 16px;
   border: none;
   border-radius: 5px;
   cursor: pointer;
 }

 .priority-buttons button.priority-high {
   background-color: #f44336;
   color: white;
 }

 .priority-buttons button.priority-medium {
   background-color: #ff9800;
   color: white;
 }

 .priority-buttons button.priority-low {
   background-color: #4caf50;
   color: white;
 }

 .priority-buttons button:hover {
   opacity: 0.8;
 }

 button.add-button {
   margin-top: 10px;
   padding: 8px 16px;
   background-color: #4caf50;
   color: white;
   border: none;
   border-radius: 5px;
   cursor: pointer;
 }

 button.add-button:hover {
   background-color: #45a049;
 }
 h4{
  font-weight: lighter;
  font-size: large;
 }
 
 .ListItem{
  font-weight: lighter;
  font-size:small;
 }


.subtask-container {
  margin-bottom: 20px;
  
}

.subtask {
  justify-content: space-evenly;
  padding: 10px;
  margin-bottom: 10px;
  font-weight:lighter ;
  padding: 0 18px;
  display: flex;
  overflow: hidden; 
}

.child-subtasks {
  margin-left: 20px;
}

.child-subtask {
  justify-content: space-evenly;
  padding: 10px;
  margin-bottom: 10px;
  font-weight:lighter ;
  padding: 0 18px;
  display: flex;
  overflow: hidden;
}

.collapsible {
  padding: 18px;
  width: 100%;
  border: none;
  text-align: left;
  outline: none;
  font-size: 15px;
}
.task{
  font-weight: bold;
}
.word{
  font-family: monospace;
  font-weight: bold;
  font-size: larger;
}

.app-container {
  margin:  auto ;
  max-width: 800px;
  padding: 20px;
}

.todo-item {
  display: flex;
  align-items: center;
  text-align: justify;
}

.todo-card {
  border: 1px solid #ccc;
  box-shadow: 5px 5px rgb(199, 196, 196);
  border-radius: 20px;
  padding: 10px;
  width: 140%;
  margin-bottom: 10px;
  background-color: #f9f9f9;
}
