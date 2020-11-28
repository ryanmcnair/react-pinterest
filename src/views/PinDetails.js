import React, { Component } from 'react';
import pinData from '../helpers/data/pinData';
import PinForm from '../components/Forms/PinForm';
import AppModal from '../components/AppModal';

class PinDetails extends Component {
    state = {
      pin: {},
    }

    componentDidMount() {
      const pinId = this.props.match.params.id;

      this.getPin(pinId);
    }

     getPin = (pinId) => {
       pinData.getPin(pinId).then((response) => {
         this.setState({
           pin: response,
         });
       });
     }

     removePin = () => {
       if (this.state.pin.boardId !== '') {
         pinData.getAllBoardPins()
           .then((response) => {
             response.forEach((pinBoard) => {
               pinBoard.pinId === this.state.pin.firebaseKey
           && (pinData.deleteBoardPins(pinBoard.firebaseKey));
             });
           });
       }
       pinData.deletePin(this.state.pin.firebaseKey)
         .then(() => {
           this.props.history.goBack();
         });
     }

     render() {
       const { pin } = this.state;
       return (
            <div className="single-pin-view">
                {(this.props.user.uid === pin.userId)
                && <AppModal title={'Update Pin'} buttonLabel={'Update Pin'}>
                    {Object.keys(pin).length && <PinForm pin={pin} onUpdate={this.getPin} />}
                </AppModal>
                }
                <h1 className="pin-details-name">{pin.name}</h1>
                <img className='pin-detail-image' src={pin.imageUrl} alt={pin.name} />
                <p className='m-2 single-pin-description'>
          {pin.description}
        </p>
                {(this.props.user.uid === pin.userId)
                && <>
                <button className='btn btn-danger m-2' id={pin.firebaseKey} onClick={this.removePin}>Delete</button>
                </>
       }
            </div>
       );
     }
}

export default PinDetails;
