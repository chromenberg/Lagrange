import { createWriteStream } from "fs";

const logfileName = (): string => {
  return "log-"+Date.now()+".log"
}

export const logStream = createWriteStream("./logs/"+logfileName(), {
  encoding: "utf-8",
})

