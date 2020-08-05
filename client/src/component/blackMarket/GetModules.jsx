
import React from 'react';
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:12001');


export default class GetInformation extends React.Component {
    constructor(props){
      super(props);

      this.state = {
          user:this.props.user,
          information:null,
      }
    }

    componentDidMount(){
      socket.on("getInformation", data => {
          this.state.user = data.data.user;
          this.setState({});
        });
    }

      render() {
        
        if(this.state.information !== null){
          var information = this.state.information.name;
        }
  
        return (
          <div>
            {information}
          </div>
        )
      }


}