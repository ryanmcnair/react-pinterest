import React, { Component } from 'react';
import getUid from '../../helpers/data/authData';
import boardData from '../../helpers/data/boardData';

class BoardSelect extends Component {
    state= {
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
        });
      });
    }

    render() {
      const { boards } = this.state;
      const { onChange } = this.props;
      const mapBoards = () => (
        boards.map((board) => <option value={board.firebaseKey}>{board.name}</option>)
      );
      return (
            <div className="board-select-container m-2">
                <select className="form-control pin-to-board" name='boardId' onChange={onChange} id="pinToBoard">
                <option value="">Pin to a Board</option>
                {mapBoards()}
              </select>
              </div>
      );
    }
}

export default BoardSelect;
