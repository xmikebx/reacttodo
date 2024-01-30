import { useState } from 'react';
import './App.css';
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import { MdPostAdd } from "react-icons/md";


const App = () => {
  const [input, setInput] = useState('');
  const [list, setList] = useState([]);
  const style = { color: "white", fontSize: "1.8em" };
  const styleL = { color: "white", fontSize: "2em" };

  const addTask = (e) => {
    e.preventDefault();
    setList([...list, {text: input, done: false, editing: false}]);
    setInput('')
  }

  const deleteItem = (index) => {
    let arr = [...list];
    arr.splice(index, 1)
    setList(arr);
  }

  const checkTask = (index, e) => {
    if(e.target === e.currentTarget){
      let arr = [...list];
      arr[index].done = !arr[index].done;
      setList(arr);
    }    
  }

  const editTask = (index) => {
    let arr = [...list];
    arr[index].editing = !arr[index].editing;
    setList(arr);
  }

  const updateText = (index, e) => {
    let arr = [...list];
    arr[index].text = e.target.value;
    setList(arr);
  }

  return (
      <div className="todoList">
        <h1 className="varela-round white">SIMP2DO</h1>
        <form onSubmit={addTask}>
          <input className="myInput" type="text" value={input} required onChange={(e) => setInput(e.target.value)} placeholder="add task" maxLength="25"/>
          <button type="submit"><MdPostAdd style={styleL}/></button>
        </form>


        <div className="taskWrap">
          {list.map((task, index) => {
            return(
              <div key={index} className={task.done ? 'task done' : 'task'}>
                {(task.editing) ? (
                  <input className="myInput" type="text" value={task.text} onChange={(e) => updateText(index, e)} maxLength="25"/>
                ) : (
                  <p className="varela-round-light" onClick={(e) => checkTask(index, e)}>{task.text}</p>
                )}
                <button onClick={() => editTask(index)}><FaRegEdit style={style}/></button>
                <button onClick={() => deleteItem(index)}><MdOutlineDeleteForever style={styleL}/></button>
              </div>
            )
          })}
        </div>
      </div>
  );
}

export default App;