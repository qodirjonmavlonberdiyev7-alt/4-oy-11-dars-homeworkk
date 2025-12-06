import { useState, useEffect } from "react";
import "./index.css";

function App() {
  const [data, setData] = useState([]);
  const [User, setUser] = useState("");
  const [Task, setTask] = useState("");
  const [Deadline, setDeadline] = useState("");
  const [editId, setEditId] = useState(null);

  //get
  const getData = () => {
    fetch("http://localhost:3000/get_all_data")
      .then((res) => res.json())
      .then((info) => setData(info))
      .catch((error) => console.log(error.message));
  };

  //delete

  const deleteData = (id) => {
    fetch("http://localhost:3000/delete_data/" + id, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((info) => {
        alert(info.message);
        getData();
      })
      .catch((error) => console.log(error.message));
  };

  //add
  const addData = (event) => {
    event.preventDefault();
    fetch("http://localhost:3000/add_data", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        User,
        Task,
        Deadline,
      }),
    })
      .then((res) => res.json())
      .then((info) => {
        alert(info.message);
        getData();
      })
      .catch((error) => console.log(error.message));
  };

  const editData = (item) => {
    setEditId(item.id)
    setUser(item.User);
    setTask(item.Task);
    setDeadline(item.Deadline);
  }

  const updateData = (event) => {
    event.preventDefault();
    fetch("http://localhost:3000/update_data/" + editId, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        User,
        Task,
        Deadline,
      }),
    })
      .then((res) => res.json())
      .then((info) => {
        alert(info.message);
        setEditId(null);
        setUser("");
        setTask(0);
        setDeadline(0);
        getData();
      })
      .catch((error) => console.log(error.message));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container">
      
      <h1 className="mt-5 mb-5">Todo task</h1>

      <form className="mt-5 py-5" onSubmit={editId ? updateData : addData}>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="username..."
          value={User}
          onChange={(e) => setUser(e.target.value)}
        ></input>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="enter task here"
          value={Task}
          onChange={(e) => setTask(e.target.value)}
        ></input>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="deadline time..."
          value={Deadline}
          onChange={(e) => setDeadline(e.target.value)}
        ></input>
        <button className="btn btn-primary" type="submit">
          {editId ? 'edit' : 'Send'}
        </button>
      </form>
      <h1>Task Lists</h1>
      <table className="table mb-5 pb-5">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">User</th>
            <th scope="col">Task</th>
            <th scope="col">Deadline </th>
            <th scope="col">Update</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr scope="row" key={index} className="tr">
              <th>{index + 1}</th>
              <td>User: {item.User}</td>
              <td>Task: {item.Task}</td>
              <td>Deadline: {item.Deadline}</td>
              <td>
                <button
                  className="btn btn-warning"
                  onClick={() => editData(item)}
                >
                  edit
                </button>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteData(item.id)}
                >
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
