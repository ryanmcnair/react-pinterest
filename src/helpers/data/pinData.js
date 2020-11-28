import axios from 'axios';

const baseUrl = 'https://pinterest-react-cd8c1.firebaseio.com/';

const getBoardPins = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pin-boards.json?orderBy="boardId"&equalTo="${boardId}"`).then((response) => {
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

const getAllBoardPins = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pin-boards.json`).then((response) => {
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

const getPin = (pinId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins/${pinId}.json`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

const getAllPins = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins.json`).then((response) => {
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

const createPin = (data) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/pins.json`, data)
    .then((response) => {
      const update = { firebaseKey: response.data.name };
      axios.patch(`${baseUrl}/pins/${response.data.name}.json`, update)
        .then(() => {
          resolve(response);
        });
    }).catch((error) => reject(error));
});

const updatePin = (data) => new Promise((resolve, reject) => {
  axios.patch(`${baseUrl}/pins/${data.firebaseKey}.json`, data)
    .then(resolve)
    .catch((error) => reject(error));
});

const createBoardPin = (data) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/pin-boards.json`, data)
    .then((response) => {
      axios.patch(`${baseUrl}/pin-boards/${response.data.name}.json`, { firebaseKey: response.data.name })
        .then(() => {
          resolve(response);
        });
    }).catch((error) => reject(error));
});

const searchPins = (searchTerm) => new Promise((resolve, reject) => {
  getAllPins()
    .then((response) => {
      const searched = response.filter((pin) => pin.name.toLowerCase().includes(searchTerm));
      resolve(searched);
    }).catch((error) => reject(error));
});

const deletePin = (pinId) => axios.delete(`${baseUrl}/pins/${pinId}.json`);

const deleteBoardPins = (fbKey) => axios.delete(`${baseUrl}/pin-boards/${fbKey}.json`);

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getPin, getBoardPins, getAllPins, createPin, deletePin, updatePin, createBoardPin, deleteBoardPins, getAllBoardPins, searchPins,
};
