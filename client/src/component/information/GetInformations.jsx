
import React from 'react';
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:12001');


export default class GetInformations extends React.Component {
    constructor(props){
      super(props);

      this.state = {
          user:this.props.user,
          informations:null,
      }
    }

    componentDidMount(){
      socket.on("getInformations", data => {
          this.state.user = data.data.user;
          this.setState({});
        });
    }

      render() {
        
        if(this.state.informations !== null){
          var informations = Object.keys(this.state.informations).map((information,index) => {
            return <div key={index} className="list-card">
              {this.state.informations[information].title}  {this.state.informations[information].content.substring(0,30)+'...'} {this.state.informations[information].vote} 
              <button>Scan Virus</button>
              <button>Remove Virus</button>
              <button>Scan Information</button>
              </div>
          })
        }
  
        return (
          <div>
            <button>Create Information</button>
            {informations}
          </div>
        )
      }


}