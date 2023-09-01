import React, { firebase } from 'react';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      mobile: '', // Initialize state for mobile input
      otp: '',    // Initialize state for OTP input
    };
  }
  handleMobileChange = (e) => {
    this.setState({ mobile: e.target.value });
    console.log(this.state.mobile)
  };

  // Event handler for OTP input
  handleOTPChange = (e) => {
    this.setState({ otp: e.target.value });
  };
  handleChange =(e)=>{
    const{name,value} = e.target
    this.setState(
      {
        [name]:value
      }
    )
  }
  configureCaptcha =()=>{
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': (response) => {
          // this.onSignInSubmit();
          
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        this.onSignInSubmit();
        console.log("reCAPTCHA verified");
      },
      defaultCountry:"IN"
    });
  }
  onSignInSubmit=(e)=> {
    e.preventDefault()

    const phoneNumber = "+91 "+this.state.mobile;
    console.log(phoneNumber);

    this.configureCaptcha();


  const appVerifier = window.recaptchaVerifier;
  firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
    .then((confirmationResult) => {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      window.confirmationResult = confirmationResult;
    console.log('otp sent')
    }).catch((error) => {
    console.log('otp failed')
    });
    
  }
  onSubmitOTP =(e)=>{
    const code = this.state.otp;
    window.confirmationResult.confirm(code).then((result) => {
  // User signed in successfully.
  const user = result.user;
  console.log(JSON.stringify(user));
  alert("user is verified")  // ...
}).catch((error) => {
  // User couldn't sign in (bad verification code?)
  // ...
});
  }
  render(){
    return (
    <div>
      <h2>Login Form</h2>
      <form onSubmit={this.onSignInSubmit}>
        <div id='sign-in-button'>
        <input type="number" name="Mobile" placeholder='Mobile Number' required onChange={this.handleChange}/>
        <button type='submit'>submit</button>
        </div>
      </form>
      <h2>OTP </h2>
      <form onSubmit={this.onSubmitOTP}>
        <input type="number" name="OTP" placeholder='OTP Number' required onChange={this.handleChange}/>
        <button type='submit'>submit</button>
      </form>
    </div>
    )
  }
}
export default App