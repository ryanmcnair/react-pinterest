import React from 'react';
import pinData from '../../helpers/data/pinData';
import boardData from '../../helpers/data/boardData';
import PinsCard from '../Cards/PinsCard';
import PageHeader from '../PageHeader';
import AppModal from '../Modal';
import BoardForm from '../Forms/BoardForm';

export default class SingleBoard extends React.Component {
  state = {
    board: {},
    pins: [],
  };

  componentDidMount() {
    const boardId = this.props.match.params.id;
    this.getBoardInfo(boardId);
    this.getPins(boardId)
      .then((resp) => (
        this.setState({ pins: resp })
      ));
  }

  getBoardInfo = (boardId) => {
    boardData.getSingleBoard(boardId).then((response) => {
      this.setState({
        board: response,
      });
    });
  }

  getPins = (boardId) => (
    pinData.getBoardPins(boardId).then((response) => {
      const pinArray = [];
      response.forEach((item) => {
        // pushing a function that returns a promise into the pinArray
        pinArray.push(pinData.getPin(item.pinId));
      });
      // returning an array of all the fullfilled promises
      return Promise.all([...pinArray]);
    })
  )

  render() {
    const { pins, board } = this.state;
    const { user } = this.props;
    const renderPins = () => (
      pins.length
        ? pins.map((pin) => (
          <PinsCard key={pin.firebaseKey} pin={pin} />
        )) : (
          <h2>PLACE "ADD PIN BUTTON" HERE</h2>
        )
    );

    // 3. Render the pins on the DOM
    return (
      <div>
        <AppModal buttonLabel={'Update'} title={'Edit Board'} btnColor={'warning'} icon={'fa-pen-nib'} className='align-right'>
          <BoardForm board={board} onUpdate={this.getBoardInfo} />
        </AppModal>
        <PageHeader user={user} />
        <h1>{board.name} Board Pins</h1>
        <h4>{board.description}</h4>
        <div className='d-flex flex-wrap container justify-content-center'>
          {renderPins()}
        </div>
      </div>
    );
  }
}
