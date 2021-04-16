import {News} from '../ConntentInfo/News';
import {Events} from '../ConntentInfo/Events';
import {Navigation} from './Navigation';
import{Browser, BrowserRouter, Route, Switch} from 'react-router-dom';
import { Users } from '../ConntentInfo/Users';
import { Servies } from '../ConntentInfo/Servies';
import { ListServices } from '../ConntentInfo/ListServices'
import { ConsultationRequests } from '../ConntentInfo/ConsultationRequests'
import { ContactUs } from '../ConntentInfo/ContactUs'

function Conntent() {
    return (
      <div className="App">
        <BrowserRouter>
            <Navigation/>
            <Switch>
              <Route path='/news' component={News} exact/>
              <Route path='/events' component={Events} exact/>
              <Route path='/users' component={Users} exact/>
              <Route path='/servies' component={Servies} exact/>
              <Route path='/listservices' component={ListServices} exact/>
              <Route path='/consultationrequests' component={ConsultationRequests} exact/>
              <Route path='/contactus' component={ContactUs} exact/>
            </Switch>
        </BrowserRouter>
      </div>
    );
  }
  
  export default Conntent;