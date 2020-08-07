
import React from 'react';
import openSocket from 'socket.io-client';
import Connect from './user/UserConnect';
import Register from './user/UserCreate';
//import Test from './Test';
import Menu from './menu/Menu';
import Informations from './information/GetInformations';
//import Notif from './menu/notif';
const socket = openSocket('http://localhost:12001');


export default class Cyber extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            user:null,
            page:'connect',
        }
    }

    componentDidMount(){
      socket.on("connected", data => {
        this.setState({
          user:data.data.user,
          page:'menu',
        });
      });
    }

    changePage = page => {
        if(this.state.party && page === 'menu'){
          //socket.emit("disconnectParty",{})
        }
        this.setState({page:page})
      }

      render() {
        var menu = <Menu socket={socket} user={this.state.user} changePage={this.changePage} page={this.state.page}/>;
        if(this.state.user === null && this.state.page === 'connect'){
          var connect = <div><Connect socket={socket} user={this.state.user} socket={socket} changePage={this.changePage}/></div>
        }else if(this.state.user === null && this.state.page ==='register'){
          var register = <div><Register socket={socket} user={this.state.user} socket={socket} changePage={this.changePage}/></div>;
        }/*else if(this.state.user !== null && this.state.page ==='make card'){
          var makeCard = <div><MakeCard socket={socket} user={this.state.user} changePage={this.changePage}/></div>;
        }*/
        
  
        return (
          <div>
            {menu}
            {connect}
            {register}
            <Informations  socket={socket}/>
          </div>
        )
      }


}