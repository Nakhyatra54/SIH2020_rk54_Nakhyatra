import { API } from "../backend";
import axios from 'axios'

export const createCriminal = (userId, token, criminal) => {
    for(var pair of criminal.entries()) {
      console.log(pair[0]+ ', '+ pair[1]); 
   }
   for (var value of criminal.values()) {
      console.log(value); 
   }
      return fetch(`${API}/criminal/create/${userId}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`
        },
        body: criminal
      })
        .then(response => {
          console.log(response)
          return response.json();
        })
        .catch(err => console.log(err));
};


export const getCriminal = (criminalData, token, userId) => {
    return fetch(`${API}/criminal/${userId}/${criminalData}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      },
      credentials: "same-origin"
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };

  export const sendSms = number => {
    return fetch(`${API}/sendsms`, {
      method: "POST",
      headers : {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(number)
    })
    .then(response => {
      console.log(response)
      return response;
    })
    .catch(err => console.log(err));
  }

  export const sendEmail = to => {
    return fetch(`${API}/sendemail`, {
      method: "POST",
      headers : {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(to)
    })
    .then(response => {
      console.log(response)
      return response;
    })
    .catch(err => console.log(err));
  }

  // export const sendSms = (number) => {
  //   console.log(JSON.stringify(number) )
  //   return fetch(`${API}/sendsms`, {
  //     method: "POST",
  //     headers:{
  //       Accept: "application/json"
  //     },
  //     body: JSON.stringify(7002725767)
      
  //   })
  //     .then(response => {
  //       return response;
  //     })
  //     .catch(err => console.log(err));
  // };

  export const getLoc = () => {
    return fetch("https://us-central1-socialape-b28c2.cloudfunctions.net/api/geo",{
      method: "GET"
    })
    .then(response => {
      console.log(response)
      return response.json()
    })
    .catch(err => console.log(err))
  }

//   let settings = {
//     "async": true,
//     "crossDomain": true,
//     "url": "https://www.fast2sms.com/dev/bulk",
//     "method": "POST",
//     "headers": {
//       "authorization": "AtXj8qR6YVDf3vrU2oksn1HGIb0dO9EWcCuLFhJxNgaPwmeKTzTHSdYPhCxZfpluW8NLXvIO7w6qRsFt",
//     },
//     "data": {
//       "sender_id": "FSTSMS",
//       "message": "Ami eku eku ta Nakhyatra",
//       "language": "english",
//       "route": "p",
//       "numbers": "9577028898, 7002725767",
//     }
//   }

// export const sendSms = () => {
//   return fetch("https://www.fast2sms.com/dev/bulk", settings)
//     .then(data => {
//     console.log(data)
//   }).catch(err => {
//     console.log(err)
//   })
// }
