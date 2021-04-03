import React, {useState} from 'react';
import logotrash from '../img/logotrash.svg';

function LoginForm({Login, error}) {
    const [details, setDetails] = useState({name: "", email: "", password: ""});
    
    const submitHandler = e => {
       e.preventDefault();

       Login(details);
    }

    
    return (
        <div className="text-center mt-5">
            <form onSubmit={submitHandler} style={{maxWidth:"300px", margin:"auto"}}> 
                <div className="form-inner">
                    <img
                        src={logotrash}
                        className="mt-4 mb-4"
                        alt="logotrash"
                        height="72"
                    />
                    <h1 className="h3 mb-3 font-weight-normal">Login</h1>
                    {(error != "") ? ( <div className="error">{error}</div> ) : ""}
                    <div className="form-group">
                        <label for="name" className="sr-only">Name:</label>
                        <input 
                            className="form-control"
                            type="text" 
                            name="name" 
                            id="name"                            
                            placeholder="Name"
                            onChange={e => setDetails({...details, name: e.target.value})} 
                            value={details.name}
                        />
                    </div>
                    <div className="form-group">
                        <label for="email" className="sr-only">Email:</label>
                        <input                      
                            className="form-control"
                            type="email" 
                            name="email" 
                            id = "email"                            
                            placeholder="Email"
                            onChange={e => setDetails({...details, email: e.target.value})} 
                            value={details.email}
                        />
                    </div>
                    <div className="form-group">
                        <label for="password" className="sr-only">Password:</label>
                        <input                      
                            className="form-control"
                            type="password" 
                            name="password" 
                            id = "password"
                            placeholder="Password"
                            onChange={e => setDetails({...details, password: e.target.value})} 
                            value={details.password}
                        />
                    </div>
                    <input className="btn btn-lg btn-primary" type="submit" value="LOGIN"/>
                </div>
            </form>
        </div>
    );
}

export default LoginForm;