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

const createBoard = (data) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/boards.json`, data)
    .then((response) => {
      const update = { firebaseKey: response.data.name };
      axios.patch(`${baseUrl}/boards/${response.data.name}.json`, update)
        .then(() => {
          resolve(response);
        });
    }).catch((error) => reject(error));
});

const updateBoard = (data) => new Promise((resolve, reject) => {
  axios.patch(`${baseUrl}/boards/${data.firebaseKey}.json`, data)
    .then(resolve)
    .catch((error) => reject(error));
});

const searchBoards = (userId, searchTerm) => new Promise((resolve, reject) => {
  getAllUserBoards(userId)
    .then((response) => {
      const searched = response.filter((board) => board.name.toLowerCase().includes(searchTerm));
      resolve(searched);
    }).catch((error) => reject(error));
});

const deleteBoard = (boardId) => axios.delete(`${baseUrl}/boards/${boardId}.json`);

const deletePinBoard = (firebaseKey) => axios.delete(`${baseUrl}/pin-boards/${firebaseKey}.json`);

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAllUserBoards, getSingleBoard, createBoard, updateBoard, deleteBoard, deletePinBoard, searchBoards,
};
