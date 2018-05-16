import React, { Component } from 'react'
import { connect }          from 'react-redux'
import actions              from '../../actions'
import _                    from 'lodash'

class Panel extends Component{
    constructor(props){
        super(props)
        this.state = {
            page: 1, rowsPerPage: 3, numPgs: 0,
            nextPage:false , lastPage: false
        }
        // false deactivates the corresponding button, true does other wise
    }
    componentWillReceiveProps(props){
        const numPgs   = this.chunk(props).length
        const nextPage = numPgs > 1 // will return true if numPgs is larger then 1 else it will return false
        this.setState({ numPgs, nextPage})
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
    chunk(props = this.props){
        const newArr = _.chunk(props.event, this.state.rowsPerPage)
        return newArr
    }
    lastPage(){
        const { page, numPgs, nextPage, lastPage } = this.state
        // lets say im on page 3
        if( page > 1 && ( page - 1 == 1 ) ){
            this.setState({ page: this.state.page - 1, lastPage: false, nextPage: true  })
        }else if( page > 1 && ( page - 1 > 1 ) ){
            this.setState({ page: this.state.page - 1, lastPage: true, nextPage: true  })
        }
        return
    }
    nextPage(){
        const { page, numPgs, nextPage, lastPage } = this.state

        if( ( page < numPgs ) && ( page + 1 != numPgs ) ){
            this.setState({ page: this.state.page + 1, nextPage: true, lastPage: true })
        }else if( ( page < numPgs ) && ( page + 1 == numPgs ) ){
            this.setState({ page: this.state.page + 1, nextPage: false, lastPage: true })
        }
        return
    }
    render(){
        const paginationArray = this.chunk().length == 0 ? [] : this.chunk()[this.state.page - 1]
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
                        paginationArray.map(ev => {
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
                <div>
                    <button className="btn btn-info" 
                        style={ this.state.lastPage ? {} : style.cursor } 
                        onClick={ this.lastPage.bind(this) } 
                    > { '< Last' } </button>
                    <button className="btn btn-info"
                        style={ this.state.nextPage ? {float: 'right'} : style.cursorNext }
                        onClick={ this.nextPage.bind(this) }
                    > { 'Next >' } </button>
                </div>
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
        backgroundColor: "#f2f2f2"
    },
    cursor: {
        cursor:          'not-allowed',
        pointerEvents:   'none',
        backgroundColor: '#9be0ff',
        borderColor:     '#9be0ff'
    },
    cursorNext: {
        cursor:          'not-allowed',
        pointerEvents:   'none',
        backgroundColor: '#9be0ff',
        borderColor:     '#9be0ff',
        float:           'right'
    }
}



export default connect(stateToProps,dispatchToProps)(Panel) 