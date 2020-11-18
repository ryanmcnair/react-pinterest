import axios from 'axios';

const baseUrl = 'https://fir-cows-958ae.firebaseio.com/pinterest-webpack';

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

const getAllPins = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins.json`).then((response) => {
    // Need to make sure that the pin either belongs to the user or is not private.
    const filteredArray = Object.values(response.data).filter((r) => r.userId === userId || r.private === false);
    resolve(filteredArray);
  }).catch((error) => reject(error));
});

const searchPins = (userId, term) => new Promise((resolve, reject) => {
  getAllPins(userId).then((response) => {
    const searchResults = response.filter((r) => r.name.toLowerCase().includes(term) || r.description.toLowerCase().includes(term));
    resolve(searchResults);
  }).catch((error) => reject(error));
});

export {
  getBoardPins, getPin, getAllUserPins, searchPins, getAllPins,
};
