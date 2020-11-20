import axios from 'axios';

const baseUrl = 'https://pinterest-react-cd8c1.firebaseio.com/';

const getAllUserBoards = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/boards.json?orderBy="userId"&equalTo="${uid}"`).then((response) => {
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

const getSingleBoard = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/boards/${boardId}.json`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

const createBoard = (object) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/boards.json`, object)
    .then((response) => {
      axios.patch(`${baseUrl}/boards/${response.data.name}.json`, { firebaseKey: response.data.name }).then(resolve);
    }).catch((error) => reject(error));
});

const updateBoard = (object) => new Promise((resolve, reject) => {
  axios.patch(`${baseUrl}/boards/${object.firebaseKey}.json`, object)
    .then(resolve).catch((error) => reject(error));
});

const deleteBoard = (boardId) => axios.delete(`${baseUrl}/boards/${boardId}.json`);

const searchBoards = (uid, term) => new Promise((resolve, reject) => {
  getAllUserBoards(uid).then((response) => {
    const searchResults = response.filter((r) => r.name.toLowerCase().includes(term) || r.description.toLowerCase().includes(term));
    resolve(searchResults);
  }).catch((error) => reject(error));
});

export {
  getAllUserBoards,
  getSingleBoard,
  createBoard,
  updateBoard,
  deleteBoard,
  searchBoards,
};
