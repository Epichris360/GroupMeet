import React, { Component } from 'react'
import { connect }          from 'react-redux'

class Panel extends Component{
    constructor(props){
        super(props)
        this.state = {
            
        }
    }
    render(){
        return(
            <div>
                <h3>Check Out Up Coming Events!</h3>
                <hr />
                <table className="table" >
                    <tr>
                        <th>Event Name</th> 
                        <th>Date</th>
                        <th>Time</th>
                    </tr>
                    {
                        this.props.event.map(ev => {
                            return(
                                <tr>
                                    <td>{ev.name}</td>
                                    <td>{ev.date}</td>
                                    <td>{`${ev.startTime} - ${ev.endTime}`}</td>
                                </tr>
                            )
                        })
                    }

                </table>
            </div>
        )
    }
}

const stateToProps = state => {
    const { event } = state
    return{
        event
    }
}

const dispatchToProps = dispatch => {

}

export default connect(stateToProps,dispatchToProps)(Panel)