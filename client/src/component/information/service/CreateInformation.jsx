
import React from 'react';


export default class GetInformation extends React.Component {
    constructor(props){
      super(props);

      this.state = {
          user:this.props.user,
          information:null,
          title:'',
          content:'',
      }
    }
  
    handleChange = event => {
      var name = event.target.name;
      if(this.state[name] !== event.target.value){
        this.state[name] = event.target.value;
        this.setState({});
      }
    }
  
    handleSubmit = event => {
      event.preventDefault();
      this.state.confirmPassword = this.state.password;
        var information = {
          report : {},
          title: this.state.title,
          content: this.state.content,
          vote:0,
          owner:this.state.user.username,
          virus : {
            type:0,
            level:0,
          },
        };

        this.props.socket.emit("createInformation",{data:information})
    };

    componentDidMount(){
    }

      //DANS UNE MODAL CA FAIS PLUS DYNAMIQUE
      render() {
        
        var modal = <form onSubmit={this.handleSubmit}>
          <div>Create an information:</div>
          <input
              placeholder="Information name"
              aria-label="Information name"
              aria-describedby="basic-addon2"
              name="title"
              type="text"
              id="information-title"
              onChange={this.handleChange}
            />
            <input
              placeholder="Information content"
              aria-label="Information content"
              aria-describedby="basic-addon2"
              name="content"
              type="text"
              id="information-content"
              onChange={this.handleChange}
            />
            
              <button variant="dark" type="submit">Créer</button>
        </form>
  
        return (
          <div>
            {modal}
          </div>
        )
      }


}