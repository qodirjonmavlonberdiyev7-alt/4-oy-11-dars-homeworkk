import { useState, useEffect } from "react";
import "./index.css";
  import { ToastContainer, toast } from 'react-toastify';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function App() {
  const [data, setData] = useState([]);
  const [User, setUser] = useState("");
  const [Task, setTask] = useState("");
  const [Deadline, setDeadline] = useState("");
  const [editId, setEditId] = useState(null);

  const reset = () => {
    setEditId(null);
    setUser("");
    setTask("");
    setDeadline("");
  };

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
        toast.error(info.message);
        getData();
      })
      .catch((error) => console.log(error.message));
  };

  //add
  const addData = (event) => {
    event.preventDefault();
    if (editId) {
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
          toast.success(info.message);
          getData();
          reset();
        })
        .catch((error) => console.log(error.message));
    } else {
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
          toast.info(info.message);
          getData();
          reset();
        })
        .catch((error) => console.log(error.message));
    }
  };

  useEffect(() => {
    getData();
  }, []);

  //update or edit
  const updateData = (event) => {
    setEditId(event.id);
    setUser(event.User);
    setTask(event.Task);
    setDeadline(event.Deadline);
  };

  return (
    <div className="container">
      <ToastContainer
        position="top-left"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light "
      />

      <h1 className="mt-5 mb-5">Todo task</h1>

      <form className="mt-5 py-5" onSubmit={addData}>
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
          {editId ? "Update" : "Send"}
        </button>
        <button
          className="btn btn-success ms-3"
          type="button"
          onClick={() => reset()}
        >
          Reset
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
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr scope="row" key={index} className="tr">
                <th>{index + 1}</th>
                <td>User: {item.User}</td>
                <td>Task: {item.Task}</td>
                <td>Deadline: {item.Deadline}</td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => updateData(item)}
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
            ))
          ) : (
            <Box sx={{ display: 'flex', justifyContent: "center", marginTop: "50px", marginLeft: "400px"}}>
             <CircularProgress className="progress"/>
            </Box>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
