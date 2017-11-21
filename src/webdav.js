/*
  Fetches employee-supervisor information via WebDEV.

  Usage: set the environment variables before running:

  WEBDAV_USER
  WEBDAV_PASSWORD
  WEBDAV_URL
  WEBDAV_PATH
*/

import { Connection, BasicAuthenticator } from "webdav-client";
import { parseString } from "xml2js";

const connection = new Connection({
  url: process.env.WEBDAV_URL,
  authenticator: new BasicAuthenticator(),
  username: process.env.WEBDAV_USER,
  password: process.env.WEBDAV_PASSWORD
});

connection.get(process.env.WEBDAV_PATH, (error, content) => {
  if (error) {
    console.error(error.toString())
    return
  }
  parseString(content, (error, data) => {
    console.log(JSON.stringify(data))
  })
});
