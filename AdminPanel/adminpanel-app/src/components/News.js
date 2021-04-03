import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button, ButtonToolbar} from 'react-bootstrap';
import {AddNewsModal} from './AddNewsModal';

import {EditNewsModal} from './EditNewsModal';

export class News extends Component{
    //Конструктор и его состояния после его подключения через react-bootstrap
    constructor(props){
        super(props);
        this.state = {deps:[], addModalShow: false, editModalShow : false}// deps сотсояния для постоения таблицы
    }

    componentDidMount(){
        this.refreshList();
    }
    
    //метод в котором собираемя передать некоторые фиктивные данные для deps
    refreshList(){
        fetch('https://localhost:44367/news/readallnews')
        .then(response => response.json())
        .then(data =>{
            this.setState({deps:data});
        });
    }

    componentDidUpdate(){
        //this.refreshList();
    }

    deleteNews(guidNewsId) {
        if(window.confirm('Are you sure?')){
        fetch('https://localhost:44367/news/deletenews', {
          method :'DELETE',
          headers : {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
          },
          body :JSON.stringify({
              GuidNewsId : guidNewsId
          })
        })
        .then(res => res.json())
        // .then((result) =>
        // {        
        //   //alert(result);
        //   this.setState({snackbaropen : true, snackbarmsg : result});
        // },
        // (error) => {
        //   //alert('Failed')
        //   this.setState({snackbaropen : true, snackbarmsg : 'failed'});
        // })
      }
    }

    // deleteDepNews(guidNewsId){
    //     if(window.confirm('Are you sure?')){
    //         fetch('https://localhost:44367/news/deletenews',{
    //             method : 'DELETE',
    //             header : {'Accept' : 'application/json',
    //             'Content-Type' : 'application/json'
    //         },
    //         body : JSON.stringify({
    //             GuidNewsId : guidNewsId
    //         })
    //     })
    //     }
    // }

    render(){

        //объект снова из состояния, как только у нас есть объект, который мы реализовали в таблице
        const {deps, depid, depnewtitle,  depnewdescription, depdatanew, depimagenew} = this.state;
        let addModalClose = () => this.setState({addModalShow:false});
        let editModalClose = () => this.setState({editModalShow:false});
        return(
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>GuidNewsId</th>
                            <th>newTitle</th>
                            <th>newDescription</th>
                            <th>dataNew</th>
                            <th>imageNew</th>
                            <th>Option</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deps.map(dep=>
                            <tr key={dep.guidNewsId}>
                                <td>{dep.guidNewsId}</td>
                                <td>{dep.newTitle}</td>
                                <td>{dep.newDescription}</td>
                                <td>{dep.dataNew}</td>
                                <td>{dep.imageNew}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button
                                            className = "mr-2"
                                            variant = "info"
                                            onClick = { () => this.setState({
                                                editModalShow : true,
                                                depid : dep.guidNewsId,
                                                depnewtitle : dep.newTitle,
                                                depnewdescription : dep.newDescription,
                                                depdatanew : dep.dataNew,
                                                depimagenew : dep.imageNew

                                            })}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            className = "mr-2"
                                            onClick = { () => this.deleteNews(dep.guidNewsId)}
                                            variant = "danger"
                                        >
                                            Delete                                            
                                        </Button>
                                        <EditNewsModal
                                            show = {this.state.editModalShow}
                                            onHide = {editModalClose}
                                            depid = {depid}
                                            depnewtitle = {depnewtitle}
                                            depnewdescription = {depnewdescription}
                                            depdatanew = {depdatanew}
                                            depimagenew = {depimagenew}
                                        />
                                    </ButtonToolbar>
                                </td>
                            </tr>
                            )}
                    </tbody>
                </Table>
                
                <ButtonToolbar>
                    <Button variant='primary' onClick={()=>this.setState({addModalShow:true})}>
                        Add News
                    </Button>
                    <AddNewsModal show={this.state.addModalShow} onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}