// this file is ran to ensure that the correct project structure is maintained
// it ensures that necessary folders and files are moved into the correct locations
// or created when not present
// TODO: Complete this
import { readdir, mkdir } from "fs";

/**
 * Checks if an array of given folder names are present in a directory
 * @param {*} err
 * @param {string[]} foundFiles
 * @param {string[]} folders
 */
function areFoldersPresent(err, foundFiles, folders) {
  const presences = [];
  // iterate through all the desired folders
  // and check if they were in the directory
  folders.forEach((item) => {
    presences.push(foundFiles.includes(item));
    if (!foundFiles.includes(item)) return;
  });

  return presences;
}
() => {
  readdir("./");
};
