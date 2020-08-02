export const postConfirm = confirm => {
    console.log(JSON.stringify(confirm))
    return fetch("https://us-central1-socialape-b28c2.cloudfunctions.net/api/postconfirmation",{
      method: "POST",
      headers:{
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(confirm)
    })
    .then(response => {
      console.log(response)
      return response
    })
    .catch(err => console.log(err))
  }