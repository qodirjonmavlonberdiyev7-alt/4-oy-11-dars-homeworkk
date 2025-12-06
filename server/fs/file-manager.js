const fs = require('fs')

const read_file = (file_name) => {
  return JSON.parse(fs.readFileSync(`./data/${file_name}`, "utf-8"))
}

const write_file = (file_name, data) => {
  return fs.writeFileSync(`./data/${file_name}`, JSON.stringify(data, null, 4))
}

module.exports = {
  read_file,
  write_file
}
