import React from 'react';
import boardData from '../helpers/data/boardData';
import BoardsCard from '../components/Cards/BoardsCards';
import Loader from '../components/Loader';
import getUid from '../helpers/data/authData';
import BoardForm from '../components/Forms/BoardForm';
import AppModal from '../components/AppModal';
import pinData from '../helpers/data/pinData';

export default class Boards extends React.Component {
  state = {
    boards: [],
    loading: true,
  }

  componentDidMount() {
    this.getBoards();
  }

  getBoards = () => {
    const currentUserId = getUid.getUid();
    boardData.getAllUserBoards(currentUserId).then((response) => {
      this.setState({
        boards: response,
      }, this.setLoading);
    });
  }

  removeBoard = (e) => {
    const removedBoard = this.state.boards.filter((board) => board.firebaseKey !== e.target.id);

    this.setState({
      boards: removedBoard,
    });
    pinData.getBoardPins(e.target.id)
      .then((response) => {
        response.forEach((boardPin) => {
          pinData.deleteBoardPins(boardPin.firebaseKey);
        });
      });
    boardData.deleteBoard(e.target.id)
      .then(() => {
        this.getBoards();
      });
  }

  setLoading = () => {
    this.timer = setInterval(() => {
      this.setState({ loading: false });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { boards, loading } = this.state;
    const showBoards = () => (
      boards.map((board) => <BoardsCard key={board.firebaseKey} board={board} removeBoard={this.removeBoard} />)
    );
    return (
      <>
        { loading ? (
          <Loader />
        ) : (
          <>
          <AppModal title={'Create Board'} buttonLabel={'Create Board'}>
          <BoardForm onUpdate={this.getBoards} />
            </AppModal>
          <h2>Boards</h2>
          <div className='d-flex flex-wrap container'>{showBoards()}</div>
          </>
        )}
      </>
    );
  }
}
