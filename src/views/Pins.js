import React from 'react';
import getUid from '../helpers/data/authData';
import { getAllUserPins } from '../helpers/data/pinData';
import PinsCard from '../components/Cards/PinsCard';
import Loader from '../components/Loader';

export default class Pins extends React.Component {
  state = {
    pins: [],
  }

  componentDidMount() {
    const userId = getUid();
    getAllUserPins(userId).then((pins) => this.setState({ pins }));
  }

  render() {
    const { pins } = this.state;
    const renderPins = () => (
      pins.length
        ? pins.map((pin) => (
          <PinsCard key={pin.firebaseKey} pin={pin} />
        )) : (
          <Loader />
        )
    );
    return (
      <div>
        <h1 className='mt-5'>My Pins</h1>
        <div className='d-flex flex-wrap container justify-content-center'>
          {renderPins()}
        </div>
      </div>
    );
  }
}
