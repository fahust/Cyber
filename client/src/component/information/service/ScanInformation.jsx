
import React from 'react';


export default class ScanInformation extends React.Component {
  constructor(props){
    super(props);

    this.state = {
        user:this.props.user,
        information:null,
        progress:0,
        interval:null,
        scan:null,
    }
  }

  componentDidMount(){
    this.props.socket.on("scanInformation", data => {
      if(data.value === false){
        this.setState({scan : 'No virus detected'});
      }else{
        this.setState({scan : 'Virus detected !'});
      }
    });
  }

  startScan = () => {
    this.state.interval=setInterval(() => {
      if(this.state.progress < 100){
        this.setState({progress:this.state.progress+1});
      }else{
        clearInterval(this.state.interval);
        //this.scanInformation();
        this.setState({progress:0});
      }
    }, 100/this.props.user.data.stats.bandwidth);
    this.props.socket.emit('scanInformation',{data:{
      information:this.props.information,
      user:this.props.user,
    }})
  }

  scanInformation = () => {

  }

  render() {
    if(this.state.progress >= 100){
      var progress = <div className="Modal">{this.state.scan}</div>
    }else{
      var progress = <div className="Modal">Progress {this.state.progress} %</div>
    }

    return (
      <div>
        <button onClick={this.startScan()}>Scan information</button>
        {progress}
      </div>
    )
  }


}