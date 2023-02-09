import './Login.css';
import { useEffect, useState } from 'react';
import { AuthenticateController } from '../../Controllers/Utilities/Login';
import web3 from '../../web3';

export default function Login() {
    const [result, setResult] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)
    const [name, setName] = useState('');
    const [pass, setPass] = useState('');

    async function setAddress() {
        const accounts = await web3.eth.getAccounts();
        setName(accounts[0]);
    }

    useEffect(() => {
        result ? setLoggedIn(true) : setLoggedIn(false);
    }, [result])

    useEffect(() => {
        localStorage.removeItem('currentUser');
        setAddress();
    }, [])

    async function onSubmit(event) {
        event.preventDefault();
        try {
            let res = await AuthenticateController(pass);
            if (res.result) {
                setResult(res.result);
                localStorage.setItem("isAuthenticated", true);
                localStorage.setItem("currentUser", name);
                loggedIn ? window.location.pathname = "/login" : window.location.pathname = "/dashboard";
            }
        } catch {
        }
    }

    return (
        <main id="main">
            <section className="login-section">
                <div className="container-fluid">
                    <div className="row justify-content-center pt-5">
                        <div className="login-block bg-white m-5 p-lg-5 p-3 col-lg-5 col-md-5 col-sm-6 col-8">
                            <h3 className="text-center mb-4 fw-bold">AstraZeneca Pharma Supply Chain</h3>
                            <form className="login-form" onSubmit={(e) => onSubmit(e)}>
                                <div className="mb-4">
                                    <label htmlFor="username" className="form-label">User Name</label>
                                    <input type="text" className="form-control" id="username" value={name} onChange={(e) => setName(e.target.value)} required />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="password" value={pass} onChange={(e) => setPass(e.target.value)} required />
                                </div>
                                <div className=" mb-4 d-flex justify-content-between align-items-center">
                                    <div className="form-check mb-0">
                                        <input className="form-check-input me-2" type="checkbox" value="" id="remember-me" />
                                        <label className="form-check-label" htmlFor="remember-me">Remember me</label>
                                    </div>
                                    <a href="/" className="text-body">Forgot password?</a>
                                </div>
                                <div className="mb-2 d-flex justify-content-end ">
                                    <button type="submit" className="btn btn-primary">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
} 