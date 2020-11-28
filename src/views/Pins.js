import React, { Component } from 'react';
import pinData from '../helpers/data/pinData';
import PinsCard from '../components/Cards/PinsCard';
import Loader from '../components/Loader';
import AppModal from '../components/AppModal';
import PinForm from '../components/Forms/PinForm';

class Pins extends Component {
  state = {
    pins: [],
    loading: true,
  }

  componentDidMount() {
    this.getPins();
  }

   getPins = () => {
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
     const { user } = this.props;
     const showPins = () => (
       pins.length && pins.map((pin) => (pin.userId === user.uid) && <PinsCard key={pin.firebaseKey} pin={pin} removePin={this.removePin} />)
     );
     return (
      <>
      { loading ? (
          <Loader />
      ) : (
          <>
          <AppModal title={'Create Pin'} buttonLabel={'Create Pin'}>
          <PinForm onUpdate={this.getPins} />
            </AppModal>
      <div className='d-flex flex-wrap container'>{showPins()}</div>
      </>
      )}
              </>
     );
   }
}

export default Pins;
