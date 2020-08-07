
import React from 'react';


export default class DebugInformation extends React.Component {
  constructor(props){
    super(props);

    this.state = {
        user:this.props.user,
        information:null,
        progress:0,
        interval:null,
        debug:null,
    }
  }

  componentDidMount(){
    this.props.socket.on("debugInformation", data => {
      if(data.value === false){
        this.setState({debug : 'No virus debugged'});
      }else{
        this.setState({debug : 'Virus debugged !'});
      }
    });
  }

  startDebug = () => {
    this.state.interval=setInterval(() => {
      if(this.state.progress < 100){
        this.setState({progress:this.state.progress+1});
      }else{
        clearInterval(this.state.interval);
        //this.scanInformation();
        this.setState({progress:0});
      }
    }, 100/this.props.user.data.stats.bandwidth);
    this.props.socket.emit('debugInformation',{data:{
      information:this.props.information,
      user:this.props.user,
    }})
  }

  render() {
    if(this.state.progress >= 100){
      var progress = <div className="Modal">{this.state.debug}</div>
    }else{
      var progress = <div className="Modal">Progress {this.state.progress} %</div>
    }

    return (
      <div>
        <button onClick={this.startDebug()}>Debug information</button>
        {progress}
      </div>
    )
  }


}