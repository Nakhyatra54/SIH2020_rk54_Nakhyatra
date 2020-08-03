import React, {Component, useState } from "react";
import Menu from "./Menu";
import { createCriminal, getCriminal } from "../api/criminalapi";
import { isAutheticated } from "../api/authapi";
import MapContainer from './Map'
import '../App.css'


const Database = () =>{
    
    const { user, token } = isAutheticated();

    const [formFlag, setFormFlag] = useState({
        searchFormFlag: false,
        storeFormFlag: false,
        showDataFlag: false,
        trackFlag: false,
        
    })
    const {searchFormFlag,  storeFormFlag, showDataFlag, trackFlag} = formFlag;

    const [values, setValues] = useState({
        firstName:"",
        lastName:"",
        email:"",
        address:"",
        motherName:"",
        fatherName:"",
        spouseName: "",
        school: "",
        college:"",
        criminalRecord: "",
        birthDatePlace: "",
        nickName: "none",
        contact: "none",
        criminalImage: "",
        fingerprintImage:"",
        ratinaImage: "",
        motherImage:"",
        fatherImage: "",
        spouseImage: "",
        id: "",
        success: false
    })
    const {firstName, lastName, email, address, motherName, fatherName, spouseName, school, college, criminalRecord, birthDatePlace, nickName, contact, criminalImage, fingerprintImage, ratinaImage, motherImage, fatherImage, spouseImage, id, success} = values
    let formData = new FormData()

    const handleChange = name => event => {
        const value = ((name === "criminalImage") || (name === "fingerprintImage") || (name === "ratinaImage") || (name === "motherImage") || (name === "fatherImage") || (name === "spouseImage")) ? event.target.files[0] : event.target.value;
        setValues({ ...values, [name]: value });
        console.log(value)
    };

    const storeSubmit = event => {
        event.preventDefault();
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("email", email);
        formData.append("address", address);
        formData.append("motherName", motherName);
        formData.append("fatherName", fatherName);
        formData.append("spouseName", spouseName);
        formData.append("school", school);
        formData.append("college", college);
        formData.append("criminalRecord", criminalRecord);
        formData.append("birthDatePlace", birthDatePlace);
        formData.append("nickName", nickName);
        formData.append("contact", contact);
        formData.append("criminalImage", criminalImage);
        formData.append("fingerprintImage", fingerprintImage);
        formData.append("ratinaImage", ratinaImage);
        formData.append("motherImage", motherImage);
        formData.append("fatherImage", fatherImage);
        formData.append("spouseImage", spouseImage);

        createCriminal(user._id, token, formData)
        .then(data => {
            if(data.error){
                return console.log(`Saving in database error ${data.error}`)
            }
            console.log("success saving")
            console.log(data)
            setValues({
                firstName:"",
                lastName:"",
                email:"",
                address:"",
                motherName: "",
                fatherName:"",
                spouseName: "",
                school: "",
                college:"",
                criminalRecord:"",
                birthDatePlace: "",
                nickName: "",
                contact:"",
                criminalImage: "",
                fingerprintImage: "",
                ratinaImage: "",
                motherImage: "",
                fatherImage: "",
                spouseImage: "",
                success: true
            })
        })
    }

    const storeForm = () => {
        return(
            <div class="mb-5 mt-2">
                <div class="row">
                    <div class="col"></div>
                    <div class="col-6 text-success">
                        <h3 class="text-center my-5">Upload criminal data</h3>
                        <form >
                        <h5><label  class="form-group pt-3">First name:</label></h5>
                        <input 
                        onChange={handleChange("firstName")} 
                        value={firstName}
                        class="form-control" 
                        name="firstName"/>

                        <h5><label  class="form-group pt-3">Last name:</label></h5>
                        <input type="text" 
                        onChange={handleChange("lastName")} 
                        value={lastName}
                        class="form-control" 
                        name="lastName"/>

                        <h5><label  class='form-group pt-3'>Address:</label></h5>
                        <input type="text" 
                        onChange={handleChange("address")}
                        value={address}
                        class="form-control" 
                        name="address"/>

                        <h5><label  class="form-group pt-3">Email address:</label></h5>
                        <input type="text" 
                        onChange={handleChange("email")}
                        value={email}
                        class="form-control" 
                        name="email"/>

                        {/* <h5><label  class="form-group pt-3">Other contacts:</label></h5>
                        <input type="text" 
                        onChange={handleChange("contact")}
                        value={contact}
                        class="form-control" 
                        name="contact"/> */}

                        <h5><label  class="form-group pt-3">Date of birth and place:</label></h5>
                        <input 
                        onChange={handleChange("birthDatePlace")} 
                        value={birthDatePlace}
                        class="form-control" 
                        name="birthDatePlace"/>

                        {/* <h5><label  class="form-group pt-3">Also known as:</label></h5>
                        <input 
                        onChange={handleChange("nickName")} 
                        value={nickName}
                        class="form-control" 
                        name="nickName"/> */}
                        
                        <h5><label  class="form-group pt-3">Mother name:</label></h5>
                        <input 
                        onChange={handleChange("motherName")} 
                        value={motherName}
                        class="form-control" 
                        name="motherName"/>

                        <h5><label  class="form-group pt-3">Father name:</label></h5>
                        <input 
                        onChange={handleChange("fatherName")} 
                        value={fatherName}
                        class="form-control" 
                        name="fatherName"/>

                        <h5><label  class="form-group pt-3">Spouse name:</label></h5>
                        <input 
                        onChange={handleChange("spouseName")} 
                        value={spouseName}
                        class="form-control" 
                        name="spouseName"/>

                        <h5><label  class="form-group pt-3">School:</label></h5>
                        <input 
                        onChange={handleChange("school")} 
                        value={school}
                        class="form-control" 
                        name="school"/>

                        <h5><label  class="form-group pt-3">College:</label></h5>
                        <input 
                        onChange={handleChange("college")} 
                        value={college}
                        class="form-control" 
                        name="college"/>

                        <h5><label  class="form-group pt-3">Criminal record:</label></h5>
                        <textarea 
                        onChange={handleChange("criminalRecord")} 
                        value={criminalRecord}
                        class="form-control" 
                        name="criminalRecord"
                        rows="6"/>


                        <h5><label  class="form-group pt-3">Criminal Image :</label></h5>
                        <input type="file"  
                        accept="image"
                        onChange={handleChange("criminalImage")}
                        name="criminalImage"/>

                        <h5><label  class="form-group pt-3">Fingerprint Image :</label></h5>
                        <input type="file"  
                        accept="image"
                        onChange={handleChange("fingerprintImage")}
                        name="fingerprintImage"/>

                        <h5><label  class="form-group pt-3">Ratina Image :</label></h5>
                        <input type="file"  
                        accept="image"
                        onChange={handleChange("ratinaImage")}
                        name="ratinaImage"/>

                        {/* <h5><label  class="form-group pt-3">Mother Image :</label></h5>
                        <input type="file"  
                        accept="image"
                        onChange={handleChange("motherImage")}
                        name="motherImage"/>

                        <h5><label  class="form-group pt-3">Father Image :</label></h5>
                        <input type="file"  
                        accept="image"
                        onChange={handleChange("fatherImage")}
                        name="fatherImage"/>

                        <h5><label  class="form-group pt-3">Spouse Image :</label></h5>
                        <input type="file"  
                        accept="image"
                        onChange={handleChange("spouseImage")}
                        name="spouseImage"/> */}
                        
                        <br/><br/>
                        <button type="submit" onClick={storeSubmit} class="d-flex mx-auto btn btn-lg btn-outline-success">Submit</button>
                        </form>
                    </div>
                    <div class="col"></div>
                </div>
            </div>
            
        )
    }

    const searchSubmit = event => {
        event.preventDefault();
        getCriminal({firstName, id} , token, user._id).then(data => {
            console.log("success")
            data.forEach(element => {
                if((!(firstName === "") && (element.firstName === firstName)) 
                || (!(id === "") && (element._id === id))
                || (!(lastName === "") && (element.lastName === lastName))
                || (!(email === "") && (element.email === email))
                || (!(address === "") && (element.address === address))
                || (!(motherName === "") && (element.motherName === motherName))
                || (!(fatherName === "") && (element.fatherName === fatherName))
                || (!(spouseName === "") && (element.spouseName === spouseName))
                || (!(school === "") && (element.school === school))
                || (!(college === "") && (element.college === college))
                || (!(nickName === "") && (element.nickName === nickName))
                || (!(college === "") && (element.college === college))
                || (!(birthDatePlace === "") && (element.birthDatePlace === birthDatePlace))
                ){
                    console.log(element);
                    setValues({
                        firstName:element.firstName,
                        email:element.email,
                        address:element.address,
                        id:element._id,
                        lastName: element.lastName,
                        motherName: element.motherName,
                        fatherName: element.fatherName,
                        spouseName: element.spouseName,
                        school: element.school,
                        college: element.college,
                        criminalRecord: element.criminalRecord,
                        nickName: element.nickName,
                        contact: element.contact,
                        birthDatePlace: element.birthDatePlace,
                        criminalImage: element.criminalImage,
                        fingerprintImage: element.fingerprintImage,
                        ratinaImage: element.ratinaImage,
                        motherImage: element.motherImage,
                        fatherImage: element.fatherImage,
                        spouseImage: element.spouseImage,
                    })
                    setFormFlag({...formFlag, showDataFlag: true, searchFormFlag: false, storeFormFlag: false, trackFlag: false})
                    
                }
            });
            
        })
    }

    const searchForm = () => {
        return(
            <div  class="container-fluid mb-5 mt-5 pt-2">
                <div class="row my-5">
                    <div class="col"></div>
                    <div class="col-6 text-danger">
                        <h2 class="text-center mb-4">Search for criminal data</h2>
                        <form >
                            <h5><label for="Id" class="form-group pt-4">ID:</label></h5>
                            <input type="text"
                             class="form-control" 
                             onChange={handleChange("id")}
                             value={id}
                             name="id"/>

                            <h5><label  class="form-group pt-3">First name:</label></h5>
                            <input 
                            onChange={handleChange("firstName")} 
                            value={firstName}
                            class="form-control" 
                            name="firstName"/>

                            <h5><label  class="form-group pt-3">Last name:</label></h5>
                            <input type="text" 
                            onChange={handleChange("lastName")} 
                            value={lastName}
                            class="form-control" 
                            name="lastName"/>
        
                            <h5><label  class='form-group pt-3'>Address:</label></h5>
                            <input type="text" 
                            onChange={handleChange("address")}
                            value={address}
                            class="form-control" 
                            name="address"/>

                            {/* <h5><label  class="form-group pt-3">Email address:</label></h5>
                            <input type="text" 
                            onChange={handleChange("email")}
                            value={email}
                            class="form-control" 
                            name="email"/> */}

                            <h5><label  class="form-group pt-3">Mother name:</label></h5>
                            <input type="text" 
                            onChange={handleChange("motherName")}
                            value={motherName}
                            class="form-control" 
                            name="motherName"/>

                            <h5><label  class="form-group pt-3">Father name:</label></h5>
                            <input type="text" 
                            onChange={handleChange("fatherName")}
                            value={fatherName}
                            class="form-control" 
                            name="fatherName"/>

                            {/* <h5><label  class="form-group pt-3">Spouse name:</label></h5>
                            <input type="text" 
                            onChange={handleChange("spouseName")}
                            value={spouseName}
                            class="form-control" 
                            name="spouseName"/> */}

                            <h5><label  class="form-group pt-3">School:</label></h5>
                            <input type="text" 
                            onChange={handleChange("school")}
                            value={school}
                            class="form-control" 
                            name="school"/>

                            <h5><label  class="form-group pt-3">College:</label></h5>
                            <input type="text" 
                            onChange={handleChange("college")}
                            value={college}
                            class="form-control" 
                            name="college"/>
                            
                            <br/><br/>
                            <button type="submit" onClick={searchSubmit} class="d-flex mx-auto btn btn-lg btn-outline-danger mb-5">Search</button>
                        </form>
                    </div>
                    <div class="col"></div>
                </div> 
            </div>
        )
    }

    const showData = () => {
        return(
            <div  class="container-fluid mb-5 mt-5 pt-2">
                <h1 class="text-center mb-4 text-primary">Criminal data</h1>
                <div class="row my-5">
                    <div className="col-6 offset-2">
                                
                                <form className="">
                                    <h4 className="text-warning mb-4">CRIMINAL PROFILE</h4>
                                    <h3><pre><label  class="text-info pt-5 ">ID                      : {id} </label></pre></h3>
                                    <h3><pre><label  class="text-info pt-5 ">First name              : {firstName}</label></pre></h3>
                                    <h3><pre><label  class="text-info pt-5 ">Last name               : {lastName}</label></pre></h3>
                                    <h3><pre><label  class="text-info pt-5 ">Address                 : {address}</label></pre></h3>
                                    <h3><pre><label  class="text-info pt-5 ">Email                   : {email}</label></pre></h3>
                                    <h3><pre><label  class="text-info pt-5 ">Date of birth and place : {birthDatePlace}</label></pre></h3>
                                    <h3><pre><label  class="text-info pt-5 ">Also known as           : {nickName}</label></pre></h3>
                                    <h3><pre><label  class="text-info pt-5 ">Other contacts          : {contact}</label></pre></h3>
                                    <h3><pre><label  class="text-info pt-5 ">Mother name             : {motherName}</label></pre></h3>
                                    <h3><pre><label  class="text-info pt-5 ">Father name             : {fatherName}</label></pre></h3>
                                    <h3><pre><label  class="text-info pt-5 ">Spouse name             : {spouseName}</label></pre></h3>
                                    <h4 className="text-warning my-4">EDUCATION QUALIFICATION</h4>
                                    <h3><pre><label  class="text-info pt-5 ">School                  : {school}</label></pre></h3>
                                    <h3><pre><label  class="text-info pt-5 ">College                 : {college}</label></pre></h3>
                                    <h3><pre><label  class="text-info pt-5 ">Criminal Record         : {criminalRecord}</label></pre></h3>
                                    {/* <h3><pre><label  class="text-info pt-5 ">Criminal Record         : <br/><div className="mt-5 offset-11 text-white">{criminalRecord}</div></label></pre></h3>     */}
                                </form> 
                    </div>
                    <div className="container-fluid row my-5 ml-5 pl-5">
                                        <div className="col-4 mt-3 px-auto">
                                            <h4 className="my-5 text-info">Criminal Image:</h4>
                                           
                                                <img src={"data:image;base64," + criminalImage} className="img-fluid w-75 mx-auto"/>
                                            
                                        </div>
                                        <div className="col-4 mt-3">
                                            <h4 className="my-5 text-info">Fingerprint Image:</h4>
                                            <img src={"data:image;base64," + fingerprintImage} className="img-fluid w-75"/>
                                        </div>
                                        <div className="col-4 mt-3">
                                            <h4 className="my-5 text-info">Ratina Image:</h4>
                                            <img src={"data:image;base64," + ratinaImage} className="img-fluid w-75" />
                                        </div>
                                    </div> 

                                    {/* <div className="container-fluid row my-5 ml-5 pl-5">
                                        <div className="col-4 mt-3 px-auto">
                                            <h4 className="my-5 text-info">Mother Image:</h4>
                                           
                                                <img src={"data:image;base64," + motherImage} className="img-fluid w-75 mx-auto"/>
                                            
                                        </div>
                                        <div className="col-4 mt-3">
                                            <h4 className="my-5 text-info">Father Image:</h4>
                                            <img src={"data:image;base64," + fatherImage} className="img-fluid w-75"/>
                                        </div>
                                        <div className="col-4 mt-3">
                                            <h4 className="my-5 text-info">Spouse Image:</h4>
                                            <img src={"data:image;base64," + spouseImage} className="img-fluid w-75" />
                                        </div>
                                    </div>    */}
                </div>
            </div>
        )
    }

    const searchButton = () => {
        setFormFlag({...formFlag, searchFormFlag: true, storeFormFlag: false, showDataFlag: false, trackFlag: false})
        setValues({
                firstName:"",
                lastName:"",
                email:"",
                address:"",
                motherName: "",
                fatherName:"",
                spouseName: "",
                school: "",
                college:"",
                criminalRecord:"",
                birthDatePlace: "",
                nickName: "",
                contact:"",
                criminalImage: "",
                fingerprintImage: "",
                ratinaImage: "",
                motherImage: "",
                fatherImage: "",
                spouseImage: "",
                success: false
        })
    }

    const storeButton = () => {
        setFormFlag({...formFlag, searchFormFlag: false, storeFormFlag: true, showDataFlag: false, trackFlag: false})
        setValues({
                firstName:"",
                lastName:"",
                email:"",
                address:"",
                motherName: "",
                fatherName:"",
                spouseName: "",
                school: "",
                college:"",
                criminalRecord:"",
                birthDatePlace: "",
                nickName: "",
                contact:"",
                criminalImage: "",
                fingerprintImage: "",
                ratinaImage: "",
                motherImage: "",
                fatherImage: "",
                spouseImage: "",
                success: false
        })
    }

    const trackButton = () => {
        setFormFlag({...formFlag, searchFormFlag: false, storeFormFlag: false, showDataFlag: false, trackFlag: true})
        setValues({
            firstName:"",
                lastName:"",
                email:"",
                address:"",
                motherName: "",
                fatherName:"",
                spouseName: "",
                school: "",
                college:"",
                criminalRecord:"",
                birthDatePlace: "",
                nickName: "",
                contact:"",
                criminalImage: "",
                fingerprintImage: "",
                ratinaImage: "",
                motherImage: "",
                fatherImage: "",
                spouseImage: "",
                success: false
        })
    }

    const searchStoreButtons = () => {
        return(
                <div class="text-center mt-5">
                    <button class="btn  btn-md mx-3" style={{backgroundColor: "#70cee4", color: "#2d2d44"}} onClick={searchButton}>Search for criminal data</button>
                    
                    <button class="btn  mx-3 btn-md px-4" style={{backgroundColor: "#70cee4", color: "#2d2d44"}} onClick={storeButton}>Store criminal data</button>
                
                    <button className="btn  btn-md mx-3" style={{backgroundColor: "#70cee4", color: "#2d2d44"}} onClick={trackButton}>Track criminal movement</button>
                </div>
        )
    }

    const trackCriminal = () => {
        
        return(
            <div className="row mt-5">
                <div className="col-8 offset-2">
                    
                    <div style={{width:"100%", height:"900px"}} className="mt-5">
                       <MapContainer/>

                    </div>
                </div>
            </div>
        )
    }

    const successAlert = () => {
        return (
          <div className="row mt-5">
            <div className="col-8 offset-2 text-center">
              <div
                className="alert alert-success"
                style={{ display: success ? "" : "none" }}
              >
                <h3>Criminal data saved successfully</h3>
              </div>
            </div>
          </div>
        );
      };

    return(
        <div style={{backgroundColor: "black", height:"250pc"}}>
            <Menu/>
            {searchStoreButtons()}
            {success && successAlert()}
            {searchFormFlag && searchForm()}
            {storeFormFlag &&storeForm()}
            {showDataFlag && showData()}
            {trackFlag && trackCriminal()}
        </div>
    )

}

export default Database;
