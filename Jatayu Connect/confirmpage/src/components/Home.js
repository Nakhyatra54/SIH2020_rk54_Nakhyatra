import React, {useState} from "react";
import { postConfirm } from "./api";

const Home = () => {

    const [values, setValues] = useState({
       confirmYes: true,
       confirmNo: false,
       redirect: false
      });
    
    const {confirmYes, confirmNo, redirect} = values;

    const onSubmitYes = event => {
        event.preventDefault();
        setValues({...values, redirect: true})
        postConfirm({confirm: confirmYes})
        .then(data => {
            console.log("confirm true is sent")
            console.log(data)
        })
        .catch((error) => console.log(`error sending to database ${error}`));
    }

    const onSubmitNo = event => {
        event.preventDefault();
        setValues({...values, redirect: true})
        postConfirm({confirm: confirmNo})
        .then(data => {
            console.log("confirm false is sent")
            console.log(data)
        })
        .catch((error) => console.log(`error sending to database ${error}`));
    }

    return(
        <div className="bg-dark row jumbotron text-light text-center" style={{height:"100vh"}}>
            {!redirect && <div className="mx-auto ">
                <h4 className="text-center col-12">Did get alert message from the authority ?</h4>

                <button className="btn btn-success mr-4 px-4 mt-5" onClick={onSubmitYes}>Yes</button>
                <button className="btn btn-danger px-4 mt-5" onClick={onSubmitNo}>No</button>
            </div>}

            {redirect && 
                <div className="mx-auto mt-5">
                    <h4 className="text-success text-center">Thank you for your response</h4>
                </div>
            }

            
        </div>
    )
}

export default Home;