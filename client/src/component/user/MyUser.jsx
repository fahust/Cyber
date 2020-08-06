
import React from 'react';


export default class GetInformation extends React.Component {
    constructor(props){
      super(props);

      this.state = {
          user:this.props.user,
          information:null,
      }
    }

    componentDidMount(){
    }

      render() {
        
        if(this.state.information !== null){
          var information = this.state.information.name;
        }

        //level job one by one
        //stats one by one
  
        return (
          <div>
            {information}
          </div>
        )
      }


}