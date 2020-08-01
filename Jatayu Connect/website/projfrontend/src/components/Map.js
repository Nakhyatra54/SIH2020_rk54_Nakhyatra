import React, {Component} from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { getLoc, sendSms } from "../api/criminalapi";
import axios from 'axios'
import '../App.css'


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
      
      return (
        <div>
          <div className="mb-5 display-4 text-white" style={{color: "#aad0d9"}}>
              <b>JATAYU tracks</b>
          </div>
          <div className="row justify-content-center mb-5 ">
                            
                            <button className="mapBtn btn btn-outline-warning btn-lg px-4 ml-3 mb-5 mapBtn"  onClick={this.onTrackButton}>Start tracking</button>
                    </div>
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