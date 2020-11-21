import axios from 'axios';

const baseUrl = 'https://pinterest-react-cd8c1.firebaseio.com';

const getBoardPins = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins-boards.json?orderBy="boardId"&equalTo="${boardId}"`).then((response) => {
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

const getPin = (pinId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins/${pinId}.json`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

const getAllUserPins = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins.json?orderBy="userId"&equalTo="${userId}"`).then((response) => {
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

const getAllPins = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins.json`).then((response) => {
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

const searchPins = (userId, term) => new Promise((resolve, reject) => {
  getAllPins(userId).then((response) => {
    const searchResults = response.filter((r) => r.name.toLowerCase().includes(term) || r.description.toLowerCase().includes(term));
    resolve(searchResults);
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

const deletePin = (pinId) => axios.delete(`${baseUrl}/pins/${pinId}.json`);

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getBoardPins, getPin, getAllUserPins, searchPins, getAllPins, createPin, deletePin,
};
