import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button, ButtonToolbar} from 'react-bootstrap'
import {AddNewsModal} from './AddNewsModal'

export class News extends Component{
    //Конструктор и его состояния после его подключения через react-bootstrap
    constructor(props){
        super(props);
        this.state = {deps:[], addModalShow: false}// deps сотсояния для постоения таблицы
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

    render(){

        //объект снова из состояния, как только у нас есть объект, который мы реализовали в таблице
        const {deps} = this.state;
        let addModalClose = () => this.setState({addModalShow:false})
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