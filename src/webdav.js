import { Connection } from "webdav-client";
import { parseString } from "xml2js";

const connection = new Connection({
  url: "",
  username: "",
  password: ""
});

connection.get("/some/path", (error, content) => {
  const goodLookingContent = parseString(content);
});
