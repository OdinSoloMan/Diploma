
import {useEffect, useState} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios'

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
    maxWidth: 1920
  },
});

function UseTable() {
  const classes = useStyles();
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState("");

  const getInfo = async () => {
    try{
      const data = await axios('https://localhost:44367/news/readallnews');
      console.warn(data.data);
      setProduct(data.data)
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    getInfo()
  }, [])
  return (
    <div className="App">
        <h1>Тестовая таблицы</h1>
        <input
          type="text"
          placeholder="Search here"
          onChange = {e =>{
            setSearch(e.target.value)
          } }
        />
        <TableContainer component={Paper} >
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>guidNewsId</StyledTableCell>
                <StyledTableCell align="right">newTitle</StyledTableCell>
                <StyledTableCell align="right">NewDescription</StyledTableCell>
                <StyledTableCell align="right">DataNew</StyledTableCell>
                <StyledTableCell align="right">ImageNew</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                      {product.filter(item => {
          if(search == ""){
            return item;
          }
          else if (item.guidNewsId.toLowerCase().includes(search.toLocaleLowerCase()) || item.newTitle.toLowerCase().includes(search.toLocaleLowerCase())){
            return item
          }
        }).
        map((item) => {
          return (                 
          <StyledTableRow key={item.guidNewsId}>
          <StyledTableCell component="th" scope="row">
           {item.guidNewsId}
          </StyledTableCell>
          <StyledTableCell align="right">{item.newTitle}</StyledTableCell>
          <StyledTableCell align="right">{item.newDescription}</StyledTableCell>
          <StyledTableCell align="right">{item.dataNew}</StyledTableCell>
          <StyledTableCell align="right">{item.imageNew}</StyledTableCell>
        </StyledTableRow>
        );
        })}


            </TableBody>
          </Table>
        </TableContainer>

    </div>
  );
}

export default UseTable;

/*
    const state = {snackbaropen : false, snackbarmsg : ''};
    const submitHandler = e => {
       e.preventDefault();
       fetch('https://localhost:44367/login', {
        method :'GET',
        headers : {
          'Accept' : 'application/json',
          'Content-Type' : 'application/json'
        },
        body :JSON.stringify({
          Username : e.target.name.value,
          password : e.target.password.value
        })
      })
      .then(res => res.json())
      .then((result) =>
      {        
        //alert(result);
        //this.setState({snackbaropen : true, snackbarmsg : result});
      },
      (error) => {
        //alert('Failed')
        //this.setState({snackbaropen : true, snackbarmsg : 'failed'});
      })
*/

/**
 *   return (
    <BrowserRouter>
      <div className="container">

        <h3 className="m-3 d-flex justify-content-center">
          React JS with Web api Demo
        </h3>

        <h5 className="m-3 d-flex justify-content-center">
          News Management Portal
        </h5>

        <Navigation/>

        <Switch>
          <Route path='/' component={Home} exact/>
          <Route path='/news' component={News} exact/>
          <Route path='/events' component={Events} exact/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}
*/