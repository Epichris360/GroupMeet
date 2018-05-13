import React, { Component } from 'react'
import { connect }          from 'react-redux'
import actions              from '../../actions'

class Panel extends Component{
    constructor(props){
        super(props)
        this.state = {
            
        }
    }
    rowClicked(ev){
        // 
        let events   = this.props.event

        for( let x = 0; x < events.length; x++ ){
            if( ev.id == events[x].id ){
                events[x].eventSelected = true
            }else{
                events[x].eventSelected = false
            }
        }
        this.props.fetchEvents(events)
        return
        
    }
    render(){
        const events = this.props.event
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
                        events.map(ev => {
                            return(
                                <tr style={ ev.eventSelected ? style.trSelected : {} } 
                                    onClick={ this.rowClicked.bind(this, ev) } 
                                >
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
    return{
        fetchEvents: events => dispatch( actions.fetchEvents(events) )
    }
}

const style = {
    trSelected: {
        backgroundColor:"#f2f2f2"
    }
}



export default connect(stateToProps,dispatchToProps)(Panel) 