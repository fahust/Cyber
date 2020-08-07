
import React from 'react';


export default class VoteInformation extends React.Component {
  constructor(props){
    super(props);

    this.state = {
        vote:this.props.information.votedByMe,
    }
  }

  componentDidMount(){
    this.props.socket.on("voteInformation", data => {
      if(data.value === false){
        this.setState({vote:'Unvoted'});
      }else{
        this.setState({vote:'Voted'});
      }
    });
  }

  vote = () => {
    this.props.socket.emit('voteInformation',{data:{
      information:this.props.information,
      user:this.props.user,
    }})
  }

  render() {

    return (
      <div>
        <button onClick={this.startScan()}>Vote information</button>
        {voted}
      </div>
    )
  }


}