import React from "react";
import axios from "./axios";
import { Link, Redirect } from "react-router-dom";

/// any place to link

export default class Reset extends React.Component {
                   constructor(props) {
                       super(props);

                       this.state = {
                           step: "resetform",
                       };
                   }

                   /// make various posts
    
    componentDidMount() { console.log("reset pw mounted");}

                    sendMail() {
                       console.log("im in the submit reset pw");
                       console.log("props", this.props);
                       axios
                           .post("/reset/password/start", {
                               email: this.state.email
                           })
                           .then(({ data }) => {
                               if (data.success) {
                                   
                                   this.setState({
                                       step: "codenewpw",
                                   });
                               } else {
                                   this.setState({
                                       error: true,
                                   });
                               }
                           });
                   }

                   checkCode() {
                       axios
                           .post("/reset/password/code", {
                               email: this.state.email,
                               code: this.state.code,
                               newpass: this.state.newpass,
                           })
                           .then(({ data }) => {
                               if (data.success) {
                                   // redirect to the page that shows the input field for the password
                                   this.setState({
                                       step: "yeah",
                                   });
                               } else {
                                   this.setState({
                                       error: true,
                                   });
                               }
                           });
                   }

                   handleChange({ target }) {
                       this.setState({
                           [target.name]: target.value,
                       });
                   }

                   getCurrentDisplay() {
                       const step = this.state.step;
                       if (step == "resetform") {
                           return (
                               <div>
                                   {this.state.error && (
                                       <div className="error">
                                           SORRY SOMETHING WENT WRONG! TRY AGAIN
                                           <Link to="/reset/password/start">
                                               RESET
                                           </Link>
                                       </div>
                                   )}
                                   <h2>RESET PASSWORD</h2>
                                   <p>
                                       Please enter the email address with which
                                       you registered
                                   </p>
                                   <br></br>
                                   Your Email<br></br>
                                   <input
                                       name="email"
                                       onChange={(e) => this.handleChange(e)}
                                   />
                                   <br></br>
                                   <br></br>
                                   <button onClick={() => this.sendMail()}>
                                       submit
                                   </button>
                               </div>
                           );
                       } // step two: user clicks reset button
                       // step three: user clicks send reset code
                       else if (step == "codenewpw") {
                           return (
                               <div>
                                   {this.state.error && (
                                       <div className="error">
                                           SORRY SOMETHING WENT WRONG! TRY AGAIN
                                           <Link to="/reset/password/code">
                                               RESET
                                           </Link>
                                       </div>
                                   )}
                                   <h2>PLS ENTER UR CODE AND NEW PASSWORD</h2>
                                   <p>
                                       Please enter the code you received via
                                       email you used for registration
                                   </p>
                                   <br></br>
                                   <input
                                       name="code"
                                       type="password"
                                       onChange={(e) => this.handleChange(e)}
                                   />
                                   <br></br>
                                   <p>And your new Password:</p>
                                   <input
                                       name="newpass"
                                       type="password"
                                       onChange={(e) => this.handleChange(e)}
                                   />
                                   <br></br>
                                   <br></br>

                                   <button onClick={() => this.checkCode()}>
                                       submit
                                   </button>
                               </div>
                           );
                       } else if (step == "yeah") {
                           return (
                               <div>
                                   {this.state.error && (
                                       <div className="error">
                                           SORRY SOMETHING WENT WRONG! TRY AGAIN
                                           <a to="/reset/password/start">
                                               RESET
                                           </a>
                                       </div>
                                   )}
                                   <h2>YEEEEEEEEAAAAAHHHHH</h2>
                                   <p>Your Password was reset</p>
                               </div>
                           );
                       } else {
                           console.log("something gone wrong somewhere");
                       }
                   }

                   render() {
                       return (
                           <div>
                               {this.getCurrentDisplay()}
                           </div>
                       );
                   }
               }

                   