import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button, ButtonToolbar} from 'react-bootstrap';
import {AddEventsModal} from './AddEventsModal';

import {EditEventsModal} from './EditEventsModal';

export class Events extends Component{
    constructor(props){
        super(props);
        this.state = {evps:[], addModalShow: false, editModalShow : false}// deps сотсояния для постоения таблицы
    }

    componentDidMount(){
        this.refreshList();
    }

    refreshList(){
        fetch('https://localhost:44367/events/readallevents')
        .then(response => response.json())
        .then(data =>{
            this.setState({evps:data});
        });
    }

    componentDidUpdate(){
        //this.refreshList();
    }

    deleteEvents(guidEventsId) {
        if(window.confirm('Are you sure?')){
        fetch('https://localhost:44367/events/deleteevents', {
          method :'DELETE',
          headers : {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
          },
          body :JSON.stringify({
              GuidEventsId : guidEventsId
          })
        })
        .then(res => res.json())
      }
    }

    render(){    
        const {evps, evid, eveventtitle,  evdescriptionoftheevent, evplannedstartdate, evplannedenddate, evimageevents} = this.state;
        let addModalClose = () => this.setState({addModalShow:false});
        let editModalClose = () => this.setState({editModalShow:false});

        return(
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>GuidEventsId</th>
                            <th>EventTitle</th>
                            <th>DescriptionOfTheEvent</th>
                            <th>PlannedStartDate</th>
                            <th>PlannedEndDate</th>
                            <th>ImageEvents</th>                            
                            <th>Option</th>
                        </tr>
                    </thead>
                    <tbody>
                        {evps.map(ev=>
                            <tr key={ev.guidEventsId}>
                                <td>{ev.guidEventsId}</td>
                                <td>{ev.eventTitle}</td>
                                <td>{ev.descriptionOfTheEvent}</td>
                                <td>{ev.plannedStartDate}</td>
                                <td>{ev.plannedEndDate}</td>
                                <td>{ev.imageEvents}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button
                                            className = "mr-2"
                                            variant = "info"
                                            onClick = { () => this.setState({
                                                editModalShow : true,
                                                evid : ev.guidEventsId,
                                                eveventtitle : ev.eventTitle,
                                                evdescriptionoftheevent : ev.descriptionOfTheEvent,
                                                evplannedstartdate : ev.plannedStartDate,
                                                evplannedenddate : ev.plannedEndDate,
                                                evimageevents : ev.imageEvents
                                            })}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            className = "mr-2"
                                            onClick = { () => this.deleteEvents(ev.guidEventsId)}
                                            variant = "danger"
                                        >
                                            Delete                                            
                                        </Button>
                                        <EditEventsModal
                                            show = {this.state.editModalShow}
                                            onHide = {editModalClose}
                                            evid = {evid}
                                            eveventtitle = {eveventtitle}
                                            evdescriptionoftheevent = {evdescriptionoftheevent}
                                            evplannedstartdate = {evplannedstartdate}
                                            evplannedenddate = {evplannedenddate}
                                            evimageevents = {evimageevents}
                                        />
                                    </ButtonToolbar>
                                </td>
                            </tr>
                            )}
                    </tbody>
                </Table>
                
                <ButtonToolbar>
                    <Button variant='primary' onClick={()=>this.setState({addModalShow:true})}>
                        Add Events
                    </Button>
                    <AddEventsModal show={this.state.addModalShow} onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}