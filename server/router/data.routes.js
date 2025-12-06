

const {Router} = require("express")
const { get_all_data, get_one_data, add_data, update_data, delete_data } = require("../controller/data.controller")

const dataRouter = Router()

dataRouter.get("/get_all_data",get_all_data)
dataRouter.get("/get_one_data/:id", get_one_data)
dataRouter.post("/add_data",add_data)
dataRouter.put("/update_data/:id",update_data)
dataRouter.delete("/delete_data/:id",delete_data)


module.exports = dataRouter