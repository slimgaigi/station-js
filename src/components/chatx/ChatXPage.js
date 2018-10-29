import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {createRoom} from '../../actions/chatxActions';
import checkAuth from '../requireAuth';
import TextInput from '../common/TextInput';
import toastr from 'toastr';

export class ChatXPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      newRoomName: '',
      saving: false
    };

    this.updateRoomName = this.updateRoomName.bind(this);
    this.createRoom = this.createRoom.bind(this);
  }

  createRoom(event) {
    event.preventDefault();

    this.setState({saving: true});

    this.props.actions.createRoom(this.state.newRoomName)
      .then((roomId) => {
        toastr.success('Room Created - ' + roomId);
        this.setState({newRoomName: '', saving: false});
      })
      .catch(error => {
        toastr.error(error.message);
        this.setState({saving: false});
      })
    ;
  }

  updateRoomName(event) {
    event.preventDefault();

    return this.setState({newRoomName: event.target.value});
  }

  render() {
    let roomNames = this.props.rooms.map(room => room.name);
    const getErrorsStyles = () => {
      return {visibility: roomNames.indexOf(this.state.newRoomName) !== -1 ? 'visible' : 'hidden'};
    };

    return (
      <div>
        <h1>ChatX Page</h1>
        <ul>
          {
            roomNames.map((name) => {
              return <li key={name}>{name}</li>;
            })
          }
        </ul>
        <form>
          <TextInput name="createRoom" label="Create room" onChange={this.updateRoomName} value={this.state.newRoomName} placeholder="Type the room name" />
          <div className="error" style={getErrorsStyles()}>This room already exists!</div>
          <input type="submit" disabled={this.state.saving || !this.state.newRoomName || roomNames.indexOf(this.state.newRoomName) !== -1} value={this.state.saving ? 'Creating the room...' : 'Create'} className="btn btn-primary" onClick={this.createRoom}/>
        </form>
      </div>
    );
  }
}

ChatXPage.propTypes = {
  actions: React.PropTypes.object.isRequired
};

ChatXPage.contextTypes = {};

export default connect(
  (state) => ({
    rooms: state.chatx.rooms
  }),
  (dispatch) => ({
    actions: bindActionCreators({createRoom}, dispatch)
  })
)(checkAuth(ChatXPage));
