import React, { Component } from 'react';
import pinData from '../../helpers/data/pinData';
import PinsCard from '../Cards/PinsCard';
import Loader from '../Loader';

class HomeComponent extends Component {
    state = {
      pins: [],
      loading: true,
    }

    componentDidMount() {
      this.getAllPins();
    }

       getAllPins = () => {
         pinData.getAllPins().then((response) => {
           this.setState({
             pins: response,
           }, this.setLoading);
         });
       }

       setLoading = () => {
         this.timer = setInterval(() => {
           this.setState({ loading: false });
         }, 1000);
       }

       render() {
         const { pins, loading } = this.state;
         const showPins = () => (
           pins.map((pin) => (pin.private === false) && <PinsCard key={pin.firebaseKey} pin={pin} />)
         );
         return (
          <>
          { loading ? (
              <Loader />
          ) : (
              <>
          <div className='d-flex flex-wrap container'>{showPins()}</div>
          </>
          )}
                  </>
         );
       }
}

export default HomeComponent;
