
import React from 'react';


export default class PiracyInformation extends React.Component {
  constructor(props){
    super(props);

    this.state = {
        user:this.props.user,
        information:null,
        progress:0,
        interval:null,
        hack:null,
    }
  }

  componentDidMount(){
    this.props.socket.on("hackInformation", data => {
      if(data.value === false){
        this.setState({piracy : 'Piracy failure'});
      }else{
        this.setState({piracy : 'Information hacked !'});
      }
    });
  }

  startHack = () => {
    this.state.interval=setInterval(() => {
      if(this.state.progress < 100){
        this.setState({progress:this.state.progress+1});
      }else{
        clearInterval(this.state.interval);
        this.setState({progress:0});
      }
    }, 100/this.props.user.data.stats.bandwidth);
    this.props.socket.emit('hackInformation',{data:{
      information:this.props.information,
      user:this.props.user,
    }})
  }

  render() {
    if(this.state.progress >= 100){
      var progress = <div className="Modal">{this.state.hack}</div>
    }else{
      var progress = <div className="Modal">Progress {this.state.progress} %</div>
    }

    return (
      <div>
        <button onClick={this.startDebug()}>Hack information</button>
        {progress}
      </div>
    )
  }


}