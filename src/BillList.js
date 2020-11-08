import React, {Component} from 'react';
import Bill from './Bill';

class BillList extends Component {
    state = {
        bills:[
            {
                id:'',
                nokp:'',
                pay:'',
                paid:'',
                content:'aaa',
            }
        ]
    }
    render(){
        return (
            <div className="BillList">
                <h1>Test</h1>
                <Bill bills={this.state.bills}/>
            </div>
        );
    }
}
export default BillList