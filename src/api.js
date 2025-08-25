export const BASEURL = "http://localhost:8085/JobPortal-0.0.1-SNAPSHOT/";


export function callApi(reqmethod, url, data, responseHandler, errorHandler) {
  let options;
  if (reqmethod === "GET" || reqmethod === "DELETE") {
    options = {
      method: reqmethod,
      headers: {
        'Content-Type': 'application/json'
        // Add any other default headers if needed
      }
    };
  } else {
    options = {
      method: reqmethod,
      headers: {
        'Content-Type': 'application/json'
        // Add any other default headers if needed
      },
      body: data
    };
  }

  fetch(BASEURL + url, options)
    .then(response => {
      if (!response.ok)
        throw new Error(response.status + " " + response.statusText);
      return response.text(); // Assuming your existing callApi expects text
    })
    .then(data => responseHandler(data))
    .catch(error => {
      console.error("API Error:", error); // Log the error
      if (errorHandler) {
        errorHandler(error.message); // Call the error handler with the message
      } else {
        alert("API Error: " + error); // Fallback alert if no handler provided
      }
    });
}

export function setSession(sesname, sesvalue, expday) {
  let D = new Date();
  D.setTime(D.getTime() + expday * 86400000); // 86400000ms = 1 day
  document.cookie = `${sesname}=${sesvalue};expires=${D.toUTCString()};path=/;secure`;
}

export function getSession(sesname) {
  let decodedCookie = decodeURIComponent(document.cookie);
  let cookieData = decodedCookie.split(';');
  for (let x in cookieData) {
    if (cookieData[x].includes(sesname))
      return cookieData[x].substring(cookieData[x].indexOf(sesname) + sesname.length + 1);
  }
  return "";
}