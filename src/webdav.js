/*
  Fetches employee-supervisor information via WebDEV.
*/

import { Connection, BasicAuthenticator } from "webdav-client";
import { parseString } from "xml2js";

const connection = new Connection({
  url: process.env.WEBDAV_URL,
  authenticator: new BasicAuthenticator(),
  username: process.env.WEBDAV_USER,
  password: process.env.WEBDAV_PASSWORD
});

// Returns true given a spreadsheet row that contains an (employee, manager) mapping.
const employeeRow = (row) => {
  return row.Cell
    && row.Cell.length > 1
    && row.Cell[0].$ 
    && row.Cell[0].$['ss:Index'] == '1' 
    && row.Cell[0].Data
    && row.Cell[0].Data.length > 0
    && row.Cell[0].Data[0].$['ss:Type'] == 'String'
    && row.Cell[0].Data[0]._ 
    && row.Cell[0].Data[0]._ != 'Name'
    && row.Cell[1].$ 
    && row.Cell[1].$['ss:Index'] == '10' 
    && row.Cell[1].Data
    && row.Cell[1].Data.length > 0
    && row.Cell[1].Data[0].$['ss:Type'] == 'String'
    && row.Cell[1].Data[0]._ 
  }

connection.get(process.env.WEBDAV_PATH, (error, content) => {
  if (error) {
    console.error(error.toString())
    return
  }
  parseString(content, (error, data) => {
    if (error) {
      console.error(error.toString())
      return
    }
    const rows = data.Workbook.Worksheet[0].Table[0].Row
    const employees = rows.filter(employeeRow)

    // Group rows into an object whose properties map employees to supervisors
    const supervisor = employees.reduce((result, row) => {
      const employee = row.Cell[0].Data[0]._
      const employeeSupervisor = row.Cell[1].Data[0]._
      result[employee] = employeeSupervisor
      return result
    }, {})
    
    console.log(JSON.stringify(supervisor, null, ' '))
  })
});
