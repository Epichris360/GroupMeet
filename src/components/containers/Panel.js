import React, { Component } from 'react'
import { connect }          from 'react-redux'
import actions              from '../../actions'
import _                    from 'lodash'

class Panel extends Component{
    constructor(props){
        super(props)
        this.state = {
            page: 1, rowsPerPage: 6, chunkArray: []
        }
    }
    componentWillMount(){
        this.chunkArray.bind(this)
        return
    }
    componentWillReceiveProps(props){
        this.chunkArray.bind(this)
        return
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
    chunkArray() {
        const event       = this.props.event
        const rowsPerPage = this.state.rowsPerPage 
        let   myArray     = []
      
        for(var i = 0; i < event.length; i += rowsPerPage) {
          myArray.push(event.slice(i, rowsPerPage))
        }
        console.log('myArray: ',myArray)
        this.setState({chunkArray: myArray})
        return 
    }
    chunk(){
        const newArr = _.chunk(this.props.event, this.state.rowsPerPage)
        console.log('lodash: ',newArr)
        return
    }
    render(){
        const newArr = _.chunk(this.props.event, this.state.rowsPerPage)
        console.log('newArr: ',newArr)
        return(
            <div>
                <h3>Check Out Up Coming Events!</h3>
                <hr />
                <button onClick={ () => console.log('this.state: ',this.state) } >this.state</button>
                <table className="table" >
                    <tr>
                        <th>Event Name</th> 
                        <th>Date</th>
                        <th>Time</th>
                    </tr>
                    {//  this.props.event.
                        newArr[this.state.page].map(ev => {
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