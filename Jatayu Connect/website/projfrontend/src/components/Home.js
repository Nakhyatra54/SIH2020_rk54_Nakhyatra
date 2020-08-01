import React from "react";
import Menu from "./Menu";
import "../App.css";
import img1 from "../assets/1.jfif"
import img2 from "../assets/2.jfif"
import img3 from "../assets/3.jfif"
import img4 from "../assets/subrat.jpg"
import img5 from "../assets/chailex.jpg"
import img6 from "../assets/chinu.jpg"
import img7 from "../assets/zafar.jpg"
import img8 from "../assets/agni.jpg"
import img9 from "../assets/sudarshan.jpg"
import img10 from "../assets/amartya.png"
import img11 from "../assets/vishal.png"
import img12 from "../assets/anjishnu.png"




const Home = () => {
    return(
        <div className="bg-dark">
            <Menu/>

            <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
              <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            </ol>
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img class="d-block w-100" src={img1} alt="First slide" height="700px"/>
              </div>
              <div class="carousel-item">
                <img class="d-block w-100" src={img2} alt="Second slide" height="700px"/>
              </div>
              <div class="carousel-item">
                <img class="d-block w-100" src={img3} alt="Third slide" />
              </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </a>
          </div>

          <div class="container-fluid pt-5" >
            <div class="jumbotron container githubCustom" >
              <h1 class="text-center">Codes and Works</h1>
              <h4 class="mt-5">Our codes and updates are regularly taken care of in our Github handle</h4>
              <h6 class="mt-5">To go through our project details and codes kindly refer the github link below</h6>
              <p>https://github.com/NAKHYATRA</p>
            </div> 
            
            <h1 class="text-center mb-5 mt-5 customColor" id="team">Team Members</h1>
            <div class="row mt-5 mb-5">
              
              <div class="col-4 mt-5" >
                  <div class="card mx-5 mh-25 bg-info" >
                    <img height="330px" src={img4} class="img card-img-top teamImg w-75"/>
                    <div class="card-body bg-dark text-white">
                     
                      <p class="card-text text-center">Subrat Kishore Dutta</p>
                      
                    </div>
                  </div>
              </div>
              <div class="col-4 mt-5">
                <div class="card mx-5 bg-info" >
                  <img height="330px" src={img5} class="img card-img-top teamImg w-75"/>
                  <div class="card-body bg-dark text-white">
                   
                    <p class="card-text text-center">Chailex Sarma</p>
                  
                  </div>
                </div>
              </div>
              <div class="col-4 mt-5">
                <div class="card mx-5 bg-info" >
                  <img height="330px" src={img6} class="img card-img-top teamImg w-75"/>
                  <div class="card-body bg-dark text-white">
                    
                    <p class="card-text text-center">Chinmoyee Deka</p>
                    
                  </div>
                </div>
              </div>
            </div>

            <div class="row mt-5 mb-5" >
              
              <div class="col-4 mb-5">
                  <div class="card mx-5 bg-info" >
                    <img height="330px" src={img7} class="img card-img-top teamImg w-75"/>
                    <div class="card-body bg-dark text-white">
                     
                      <p class="card-text text-center">Zafar Shah</p>
                      
                    </div>
                  </div>
              </div>
              <div class="col-4 mb-5">
                <div class="card mx-5 bg-info">
                  <img height="330px" src={img8} class="img card-img-top teamImg w-75 "/>
                  <div class="card-body bg-dark text-white" >
              
                    <p class="card-text text-center">Agnideep Sengupta</p>
                   
                  </div>
                </div>
              </div>
              <div class="col-4 mb-5 ">
                <div class="card mx-5 bg-info" >
                  <img height="330px" src={img9} class="img card-img-top teamImg w-75 "/>
                  <div class="card-body bg-dark text-white">
                    
                    <p class="card-text text-center">Sudarshan Saikia</p>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="container">
            <h2 class="text-center text-light mb-5 mt-5">Advisory Team</h2>
            <div class="row mt-5 mb-5">
              <div class="col-4 mt-4 mb-5 text-center">
                <img src={img10} alt="" height="248px"/>
                <p class="card-text text-light text-center mt-3">Amartya Ranjan Saikia</p>
              </div>
              <div class="col-4 mt-4 mb-5 text-center">
                <img src={img11} alt="" height="248px"/>
                <p class="card-text text-light text-center mt-3">Vishal Vivek Saikia</p>
              </div>
              <div class="col-4 mt-4 mb-5 text-center">
                <img src={img12} alt="" height="248px"/>
                <p class="card-text text-light text-center mt-3">Anjishnu Mahanta</p>
              </div>
            </div>
          </div>

          <div class="text-center text-light mt-5
          pb-5">
            <p>&copy; Nakhyatra 2020</p>
          </div>
        </div>
        

    )
}

export default Home;