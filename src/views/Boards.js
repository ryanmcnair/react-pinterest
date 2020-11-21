import React from 'react';
import boardData from '../helpers/data/boardData';
import BoardsCard from '../components/Cards/BoardsCards';
import Loader from '../components/Loader';
import getUid from '../helpers/data/authData';
import AppModal from '../components/Modal';
import BoardForm from '../components/Forms/BoardForm';

export default class Boards extends React.Component {
  state = {
    boards: [],
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
    const removedBoard = this.state.boards.filter((board) => board.id !== e.target.id);
    this.setState({
      boards: removedBoard,
    });
    boardData.deleteBoard(e.target.id).then(() => this.getBoards());
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
          <div className='d-flex flex-wrap justify-content-center container'>
          <AppModal buttonLabel={'Add Board'}title={'Add Board'} btnColor={'danger'} icon={'fa-plus-circle'} className='align-right'>
            <BoardForm onUpdate={this.getBoards} />
          </AppModal>
          <h1>Boards</h1>
          <div className='d-flex flex-wrap justify-content-center container'>{showBoards()}</div>
          </div>
        )}
      </>
    );
  }
}
