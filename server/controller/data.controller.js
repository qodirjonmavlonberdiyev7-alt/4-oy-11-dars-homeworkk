const { read_file, write_file } = require("../fs/file-manager");
const { v4 } = require("uuid");

//get_all_data
const get_all_data = async (req, res) => {
  try {
    const fileData = read_file("todo.json");
    res.status(200).json(fileData);
  } catch (error) {
    console.log(error.message);
  }
};

//add_data
const add_data = async (req, res) => {
  try {
    const { User, Task, Deadline } = req.body;
    const fileData = read_file("todo.json");

    fileData.push({
      id: v4(),
      User,
      Task,
      Deadline,
    });

    write_file("todo.json", fileData);

    res.status(201).json({
      message: `Added new task  ${User} dan`  ,
    });
  } catch (error) {
    console.log(error.message);
  }
};

const get_one_data = async (req, res) => {
  try {
    const { id } = req.params;
    const fileData = read_file("todo.json");

    const foundedData = fileData.find((item) => item.id === id);

    if (!foundedData) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json(foundedData);
  } catch (error) {
    console.log(error.message);
  }
};

const update_data = async (req, res) => {
  try {
    const { User, Task, Deadline } = req.body;
    const { id } = req.params;
    const fileData = read_file("todo.json");

    const foundedData = fileData.find((item) => item.id === id);

    if (!foundedData) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    fileData.forEach((item) => {
      if (item.id === id) {
        item.User = User ? User : item.User;
        item.Task = Task ? Task : item.Task;
        item.Deadline = Deadline ? Deadline : item.Deadline;
      }
    });

    write_file("todo.json", fileData);

    res.status(201).json({
      message: "Task updated",
    });
  } catch (error) {
    console.log(error.message);
  }
};

const delete_data = async (req, res) => {
  try { 
    const { id } = req.params;
    const fileData = read_file("todo.json");

    const foundedData = fileData.find((item) => item.id === id);

    if (!foundedData) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    fileData.forEach((item,idx) => {
      if (item.id === id) {
         fileData.splice(idx,1)
      }
    });

    write_file("todo.json", fileData);

    res.status(201).json({
      message: "Successfully deleted task",
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  get_all_data,
  add_data,
  get_one_data,
  update_data,
  delete_data,
};
