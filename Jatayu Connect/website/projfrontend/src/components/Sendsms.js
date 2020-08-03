import React, { useState } from "react";
import Menu from "./Menu";
import { createCriminal, getCriminal, sendSms, sendEmail, createNumbers } from "../api/criminalapi";

const Sendsms = () => {

    const [values, setValues] = useState({
        number: "",
        to: "",
        message: "",
        subject: "",
        cc: "",
        success: false,
        successMessage: "",
        asp:"",
        dsp:"",
        pi:""
    })

    const { number, to, message, subject, cc, success, successMessage, asp, dsp, pi } = values

    const [alertFlag, setAlertFlag] = useState({
        smsFlag: false,
        emailFlag: false
    })

    const { smsFlag, emailFlag } = alertFlag

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    const sendSubmit = (e) => {
        e.preventDefault();
        console.log(values)
        console.log(number)
        sendSms({number, message})
        .then(data => {
            // if(data.error){
            //     return console.log(`Sms not sent, ${data.error}`)
            // }
            console.log("successfully sent")
            console.log(data)
            setValues({number: "", message: "", success: true, successMessage: "Sms is sent successfully"})
        })
    }

    const submitEmail = (e) =>{
        e.preventDefault();
        sendEmail({to, subject, cc, message})
        .then(data => {
            // if(data.error){
            //     return console.log(`Sms not sent, ${data.error}`)
            // }
            console.log("successfully sent")
            console.log(data)
            setValues({
                to: "",
                message: "",
                subject: "",
                cc: "",
                success: true,
                successMessage: "Email is sent successfully"})
        })
    }

    const submitNumbers = (e) => {
        e.preventDefault();
        createNumbers({dsp, asp, pi})
        .then(data=>{
            console.log(data)
            setValues({
                asp:"",
                dsp:"",
                pi:""
        })
    })
    }

    const smsAlert = () => {
        return(
            <div style={{backgroundColor: "#037e8c"}} class="jumbotron container mt-5">
                <h1 class="display-4 mb-5" style={{color: "#f4f4f2"}}>SEND ALERT SMS</h1>

                <form>

                <h4 class="display-4 mb-5" style={{color: "#f4f4f2"}}>Automatic sending SMS</h4>
                    <label className="my-4" style={{color: "#f4f4f2", fontSize: "22px"}}>Additional Superintendent of Police (ASP):</label>
                    <input 
                        onChange={handleChange("asp")} 
                        value={asp}
                        class="form-control" 
                        name="asp"/>
                    <label className="my-4" style={{color: "#f4f4f2", fontSize: "22px"}}>Deputy Superintendent of Police (DSP):</label>
                    <input 
                        onChange={handleChange("dsp")} 
                        value={dsp}
                        class="form-control" 
                        name="dsp"/>
                    <label className="mb-4" style={{color: "#f4f4f2", fontSize: "22px"}}>Police Inspectors (PI):</label>
                    <input 
                        onChange={handleChange("pi")} 
                        value={pi}
                        class="form-control" 
                        name="pi"/>
                    
                <p class="lead mt-5">
                    <a class="btn  btn-lg" style={{backgroundColor: "#ffac0e", color:"#2f2b32"}} onClick={submitNumbers} role="button" type="submit">Submit</a>
                </p>
                </form>

                <form>

                <h4 class="display-4 mb-5 mt-5" style={{color: "#f4f4f2"}}>Manually sending SMS</h4>
                    <label className="mb-4" style={{color: "#f4f4f2", fontSize: "22px"}}>Enter contact numbers :</label>
                    <input 
                        onChange={handleChange("number")} 
                        value={number}
                        class="form-control" 
                        name="number"/>
                    <label className="my-4" style={{color: "#f4f4f2", fontSize: "22px"}}>Message :</label>
                        <textarea 
                        onChange={handleChange("message")} 
                        value={message}
                        class="form-control" 
                        name="message"
                        rows="5"/>
                <p class="lead mt-5">
                    <a class="btn  btn-lg" style={{backgroundColor: "#ffac0e", color:"#2f2b32"}} onClick={sendSubmit} role="button" type="submit">Send</a>
                </p>
                </form>
                
            </div>
        )
    }

    const emailAlert = () => {
        return(
            <div style={{backgroundColor: "#037e8c"}} class="jumbotron container mt-5">
                <h1 class="display-4 mb-5" style={{color: "#f4f4f2"}}>SEND ALERT Email</h1>
                <form>
                <label className="mt-3 mb-3" style={{color: "#f4f4f2", fontSize: "22px"}}>To :</label>
                    <input 
                        onChange={handleChange("to")} 
                        value={to}
                        class="form-control" 
                        name="to"/>
                <label className="mt-3 mb-3" style={{color: "#f4f4f2", fontSize: "22px"}}>Subject :</label>
                    <input 
                        onChange={handleChange("subject")} 
                        value={subject}
                        class="form-control" 
                        name="subject"/>
                    <label className="mt-3 mb-3" style={{color: "#f4f4f2", fontSize: "22px"}}>cc :</label>
                    <input 
                        onChange={handleChange("cc")} 
                        value={cc}
                        class="form-control" 
                        name="cc"/>
                    <label className="mt-3 mb-3" style={{color: "#f4f4f2", fontSize: "22px"}}>Message :</label>
                    <textarea 
                        onChange={handleChange("message")} 
                        value={message}
                        class="form-control" 
                        name="message"
                        rows="5"/>
                    
                <p class="lead mt-5">
                    <a class="btn  btn-lg" style={{backgroundColor: "#ffac0e", color:"#2f2b32"}} onClick={submitEmail} role="button" type="submit">Send</a>
                </p>
                </form>
                
            </div>

        )
    }

    const smsActivate = () => {
        setAlertFlag({...alertFlag, smsFlag: true, emailFlag: false})
        setValues({
            number: "",
            to: "",
            message: "",
            subject: "",
            cc: "",
            success: false,
            successMessage: ""
        })
    }

    const emailActivate = () => {
        setAlertFlag({...alertFlag, smsFlag: false, emailFlag: true})
        setValues({
            number: "",
            to: "",
            message: "",
            subject: "",
            cc: "",
            success: false,
            successMessage: ""
        })
    }

    const switchButtons = () => {
        return(
                <div class="text-center mt-5">
                    <button class="btn  mx-3 px-4" style={{backgroundColor: "#d3dde6"}} onClick={smsActivate}>Alert through sms</button>
                    
                    <button class="btn  mx-3 px-3" style={{backgroundColor: "#d3dde6"}} onClick={emailActivate}>Alert through email</button>
                
                </div>
        )
    }

    const successAlert = () => {
        return (
          <div className="row mt-4">
            <div className="col-8 offset-2 text-center">
              <div
                className="alert alert-success"
                style={{ display: success ? "" : "none" }}
              >
                {successMessage}
                {/* <Link to="">Login Here</Link> */}
              </div>
            </div>
          </div>
        );
      };

    return(
        <div className="" style={{backgroundColor: "#043353", height:"150pc"}}>
            <Menu/>
            {switchButtons()}
            {successAlert()}
            {smsFlag && smsAlert()}
            {emailFlag && emailAlert()}
        </div>
    )
}

export default Sendsms;