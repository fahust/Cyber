
import React from 'react';
import VoteInformation from './service/VoteInformation';


export default class GetInformation extends React.Component {
  constructor(props){
    super(props);

    this.state = {
        user:this.props.user,
        information:null,
        read:0,
    }
  }

  componentDidMount(){
  }

  read(){
    this.props.socket.emit('readInformation',{data:{
      information:this.props.information,
      user:this.props.user,
    }})
    this.setState({read:1});
  }

  render() {
    
    if(this.state.read === 1){
      var information = <div>
        <h1>{this.props.information.title} : </h1>
        <div>{this.props.information.content}</div>
        <div>{this.props.information.vote} Vote</div>
        <div>Owned by : {this.props.information.owner} </div>
        <VoteInformation information={this.props.information} user={this.props.user} socket={this.props.socket}/>
      </div>
    }

    return (
      <div>
        <button onClick={() => this.read()}>Read Information</button>
        {information}
      </div>
    )
  }


}