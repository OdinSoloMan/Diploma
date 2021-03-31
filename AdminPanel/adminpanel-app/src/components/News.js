import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

export class News extends Component{
    //Конструктор и его состояния после его подключения через react-bootstrap
    constructor(props){
        super(props);
        this.state = {deps:[]}//сотсояния для постоения таблицы
    }

    componentDidMount(){
        this.refreshList();
    }
    
    //метод в котором собираемя передать некоторые фиктивные данные для deps
    refreshList(){
        this.setState({
            deps:[{"GuidNewsId":"121314124","NewTitle":"OdinSolo"},
            {"GuidNewsId":"Adbv5641","NewTitle":"TestIfoGrid"},
            {"GuidNewsId":"123141245","NewTitle":"ПGG"}
        ]
        })
    }

    render(){
        //объект снова из состояния, как только у нас есть объект, который мы реализовали в таблице
        const {deps} = this.state;
        return(
            <Table className="mt-4" striped bordered hover size="sm">
                <thead>
                    <th>GuidNewsId</th>
                    <th>NewTitle</th>
                </thead>
                <tbody>
                    {deps.map(dep=>
                        <tr key={dep.GuidNewsId}>
                            <td>{dep.GuidNewsId}</td>
                            <td>{dep.NewTitle}</td>
                        </tr>
                        )}
                </tbody>
            </Table>
        )
    }
}