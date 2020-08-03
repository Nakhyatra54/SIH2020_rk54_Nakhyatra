import React, {Component, useState, useEffect} from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { getLoc, sendSms, getNumbers, getConfirmation } from "../api/criminalapi";
import axios from 'axios'
import '../App.css'
// import { checkout } from '../../../projbackend/routes/criminal';


const AlertAutomate =() => {

  const [values, setFormValues] = useState({
      message: "",   
      asp:"",
      dsp:"",
      pi:"",
      trueFlag: false,
      flag: true,
      secondFlag: false,
      dataConfirm: true,
      smsSend2Flag: true,
      check: 0   
})
const {message,pi, asp, dsp, trueFlag, flag, secondFlag, dataConfirm, smsSend2Flag, check} = values;

  const timeLapse = () => {
        getNumbers()
        .then(data => {
          console.log(data)
          setFormValues({...values,  asp: data[0].asp, dsp: data[0].dsp, pi: data[0].pi})
        })
  }

  useEffect(() => {
    timeLapse();
  }, []);

  const smsSend =()=>{
    // if(dataConfirm && flag && pi !== ""){
    if(flag && pi !== ""){

      sendSms({number: pi, message})
        .then(data => {
            console.log("successfully sent to PI's")
            console.log(data)
            setFormValues({ message: "Sms is sent successfully to PI's"})
        })
        if(pi !== ""){
          setFormValues({...values, flag: false, secondFlag: true})
        }
    }
  }

  // const afterFirstSend = () => {
  //     if(secondFlag){
  //       console.log("Im am running")
  //       getConfirmation()
  //       .then(data => {
  //         for(let i = 0; i< data.length; i++){
  //           if(!data[i].confirm){
  //             console.log(data[i].confirm)
  //             // setFormValues({...values, secondFlag: false, dataConfirm: true}) 
  //           }else{
  //             setFormValues({...values, secondFlag: false, dataConfirm: false})
  //           }
  //         }
  //       })
  //     }
  // }

  const afterFirstSend = () => {
    if(secondFlag){
      console.log("Im am running")
      getConfirmation()
      .then(data => {
        let dummy = false
        for(let i = 0; i< data.length; i++){
          if(data[i].confirm){
            console.log(data[i].confirm)
            dummy = true
            //  setFormValues({...values, secondFlag: false, dataConfirm: false}) 
          }
          // else if(!data[data.length - 1].confirm){
          //   console.log(data[data.length - 1].confirm)
          //   setFormValues({...values, secondFlag: false, dataConfirm: false})
            
          // } 
        }
        if(!dummy){
          setFormValues({...values, secondFlag: false, dataConfirm: false})
        }
      })
    }
  }

  const smsSend2 =()=>{
    console.log(dataConfirm)
    // if(smsSend2Flag && trueFlag ){
    if(smsSend2Flag && !dataConfirm ){
      if(check === 0){
        sendSms({number: asp, message})
                .then(data => {
                    console.log("successfully sent to ASP's")
                    console.log(data)
                    // setFormValues({...values, check: 1})
                    if(check === 0){
                     setFormValues({...values, message: "Sms is sent successfully to ASP's", check: 1, dataConfirm: true, smsSend2Flag: false})
                    }
                })
      }
        
    }
     
    }

    return(
      <div>
        {smsSend()}
        {window.setInterval(afterFirstSend, 10000)}
        { window.setTimeout(smsSend2,5000) }
      

        <div className="text-center bg-success mt-5">
          
          <h3 className="text-white">{message}</h3>
          {/* <button className="btn btn-dark" onClick={smsSend}>df</button> */}
        </div>
      </div>
      
  )
}

export class MapContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      resData: [],
      latitude:"",
      longitude: "",
      timestamp:"",
      isOpen: false,
      markerFlag: false
    }
  }

  displayMarkers = () => {
    let animate = this.props.google.maps.Animation.BOUNCE
    return this.state.resData.map((data, index) => {
      if(data.state === true){
        return <Marker animation={animate} key={index} id={index} position={{
                        lat: data._latitude,
                        lng: data._longitude
                      }}
                      onClick={() => 
                        this.setState({timestamp: JSON.stringify(data.timestamp), latitude: data._latitude, longitude: data._longitude , isOpen: true})
                        } />
      }
    })
  }

   componentDidMount(){
    getLoc().then(resData => {
      console.log(resData)
      console.log(JSON.stringify(resData))
      this.setState({resData: resData}) 
    })
    
  };

  onInfoWindowClose = () => {
    return this.setState({isOpen: false})
  }

  onTrackButton = () => {

    return this.setState({markerFlag: true})
  }
    
  
    render() {
      console.log(this.state.resData)
      console.log(this.state.selectedPlace)
      console.log(this.state.markerFlag)
      if(this.state.markerFlag){
        // getNumbers()
        // .then(data => {
        //   console.log(data)
        //   // this.setState({numbers: data[0]})
        // })
        // getConfirmation()
        // .then(data=>{
        //   console.log(data)
        // })
      //   setInterval(function() { 
      //       console.log("hello")
      //       sendSms({number , message})
      //       .then(data => {
      //           // if(data.error){
      //           //     return console.log(`Sms not sent, ${data.error}`)
      //           // }
      //           console.log("successfully sent")
      //           console.log(data)
      //           setValues({number: "", message: "", success: true, successMessage: "Sms is sent successfully"})
      //       })

      // }, 2000);
      }
      
      return (
        <div>
          <div className="mb-5 display-4 text-white" style={{color: "#aad0d9"}}>
              <b>JATAYU tracks</b>
          </div>
          <div className="row justify-content-center mb-5 ">
                            
                            <button className="mapBtn btn btn-outline-warning btn-lg px-4 ml-3 mb-5 mapBtn"  onClick={this.onTrackButton}>Start tracking</button>
                    </div>
            {this.state.markerFlag && <AlertAutomate/> }

          <Map google={this.props.google} zoom={5} initialCenter={{
            lat: 28.6706,
            lng: 94.9104
          }}>
            {this.state.markerFlag && this.displayMarkers()}


            {this.state.isOpen && <InfoWindow position={{ lat: this.state.latitude, lng: this.state.longitude}} visible={true} onClose={this.onInfoWindowClose}>
              <div>
                <h1>Time : {this.state.timestamp}</h1>
              </div>
            </InfoWindow>}
   
            
        </Map>
        </div>
        
      );
    }
  }
   
  export default GoogleApiWrapper({
    apiKey: ("AIzaSyA3IsaZeZB_Dax8mE0HdrgYP_9kWvV_VRo")
  })(MapContainer)