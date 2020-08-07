
import React from 'react';
import GetInformation from './service/GetInformation';


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



        //level job one by one
        //stats one by one
  
        return (
          <div>
            <Jobs user={user}/>
            {information}
          </div>
        )
      }


}