// localStorageService.js (for Node.js)

const fs = require('fs');
const path = require('path');

const USERS_FILE = path.join(__dirname, 'users.json'); // Store users.json in the same directory as this script

function saveUser(user) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fs.readFile(USERS_FILE, 'utf8', (err, data) => {
        let users = [];
        if (!err && data) {
          try {
            users = JSON.parse(data);
          } catch (parseErr) {
            reject(parseErr);
            return;
          }
        }
        users.push(user);
        fs.writeFile(USERS_FILE, JSON.stringify(users), (writeErr) => {
          if (writeErr) {
            reject(writeErr);
          } else {
            resolve();
          }
        });
      });
    }, 500);
  });
}

function getUsers() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fs.readFile(USERS_FILE, 'utf8', (err, data) => {
        if (err) {
          if (err.code === 'ENOENT') { // File doesn't exist, return empty array
            resolve([]);
          } else {
            reject(err);
          }
          return;
        }
        try {
          const users = JSON.parse(data);
          resolve(users);
        } catch (parseErr) {
          reject(parseErr);
        }
      });
    }, 500);
  });
}

// Example Usage (in another script or console):
const newUser = {
  name: 'Jane Smith',
  username: 'janesmith',
  email: 'janesmith@example.com',
  password: 'anothersecurepassword'
};

saveUser(newUser)
  .then(() => {
    console.log('User saved successfully!');
    return getUsers();
  })
  .then((users) => {
    console.log('Retrieved users:', users);
  })
  .catch((error) => {
    console.error('An error occurred:', error);
  });