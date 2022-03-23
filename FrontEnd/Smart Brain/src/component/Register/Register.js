import React, {Component} from "react";

class Register extends Component{
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password : '',
            name : '',

        }
    }
    onEmail = (event) => {
        this.setState({email : event.target.value});
    }
    onPassword = (event) => {
        this.setState({password : event.target.value});
    }
    onName = (event) => {
        this.setState({name : event.target.value});
    }

    onSubmit = () => {
        // console.log(this.state);
        fetch('http://localhost:3000/register',{
            method : 'post',
            headers : {'Content-type': 'application/json'},
            body:JSON.stringify({
                    name : this.state.name,
                    email : this.state.email,
                    password : this.state.password
                }
            )
        })
            .then(response => response.json())
            .then(user => {
                if(user.id){
                    this.props.loadUser(user);
                    this.props.onRouteChange('home');
                }
            } )

    }

    render() {
        // const {onRouteChange} = this.props.onRouteChange;
        return (
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure ">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                       type="text" name="name" id="name" onChange={this.onName}/>
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                       type="email" name="email-address" id="email-address" onChange={this.onEmail}/>
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                       type="password" name="password" id="password" onChange={this.onPassword}/>
                            </div>
                            {/*<label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox"/> Remember me</label>*/}
                        </fieldset>
                        <div className="">
                            <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                   type="submit" onClick={this.onSubmit} value="Register"/>
                        </div>
                        {/*<div className="lh-copy mt3">*/}
                        {/*    <a href="#0" className="f6 link dim black db">Register</a>*/}
                        {/*    /!*<a href="#0" className="f6 link dim black db">Forgot your password?</a>*!/*/}
                        {/*</div>*/}
                    </div>
                </main>
            </article>
        );
    }
}
export default Register;