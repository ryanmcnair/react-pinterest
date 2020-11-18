import React from 'react';
import { getAllUserBoards } from '../helpers/data/boardData';
import BoardsCard from '../components/Cards/BoardsCards';
import Loader from '../components/Loader';
import getUid from '../helpers/data/authData';
import AppModal from '../components/Modal';
import BoardForm from '../components/Forms/BoardForm';
import PageHeader from '../components/PageHeader';

export default class Boards extends React.Component {
  state = {
    boards: [],
    loading: true,
  }

  componentDidMount() {
    this.getBoards();
  }

  getBoards = () => {
    const currentUserId = getUid();
    getAllUserBoards(currentUserId).then((response) => {
      this.setState({
        boards: response,
      }, this.setLoading);
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
    const { user } = this.props;
    const showBoards = () => (
      boards.map((board) => <BoardsCard key={board.firebaseKey} board={board} />)
    );
    return (
      <>
        { loading ? (
          <Loader />
        ) : (
          <>
          <AppModal title={'Add Board'} btnColor={'danger'} icon={'fa-plus-circle'} className='align-right'>
            <BoardForm onUpdate={this.getBoards} />
          </AppModal>
          <PageHeader user={user} />
          <h1>Boards</h1>
          <div className='d-flex flex-wrap justify-content-center container'>{showBoards()}</div>
          </>
        )}
      </>
    );
  }
}
