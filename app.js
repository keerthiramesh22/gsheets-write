var container = document.getElementById('container');
var maindiv = document.getElementById('main');
var CLIENT_ID = '600902417138-4d1ce6ilgt69pkg746heq20jg56on9au';
var API_KEY = 'AIzaSyC5TK_6Tm3MngCCEZMePdNAn1_TeOk4j9Q';
var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
var SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";
var authorizeButton = document.getElementById('authorize_button');
var signoutButton = document.getElementById('signout_button');
//var sheet = SpreadsheetApp.getActiveSheet();


function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}

function initClient() {
  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  }).then(function () {
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    authorizeButton.onclick = handleAuthClick;
    signoutButton.onclick = handleSignoutClick;
  }, function(error) {
    // appendPre(JSON.stringify(error, null, 2));
    console.log(error);
  })
}

function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    authorizeButton.style.display = 'none';
    signoutButton.style.display = 'block';
    listMajors();
  } else {
    authorizeButton.style.display = 'block';
    signoutButton.style.display = 'none';
  }
}


function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}

function listMajors() {
  gapi.client.sheets.spreadsheets.values.get({
   // spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
   spreadsheetId:'196yLp7M1oiuZlCefvKXIguG-XECUrgJ0C5KIO7PPJvs',
    range:'A1:H10',
  }).then(function(response) {

    var range = response.result.values;
    // console.log(range[0][6])
    main.innerHTML = `<h1><strong>
    <table>
    <tr>
    <th>${range[0][0]}</th>
    <th>${range[0][1]}</th>
    <th>${range[0][2]}</th>
    <th>${range[0][3]}</th>
    <th>${range[0][4]}</th>
    <th>${range[0][5]}</th>
    <th>${range[0][6]}</th>
    </tr> </strong></h1>
    </table>
    `

    range.forEach((item,index) => {
      if(index != 0){
        const element = document.createElement('div');
        element.classList.add('Produt');
        element.innerHTML =`<p><strong><table>
        <tr>
        <td>${item[0]}</td>
        <td>${item[1]}</td>
        <td>${item[2]}</td>
        <td>${item[3]}</td>
        <td>${item[4]}</td>
        <td>${item[5]}</td>
        <td>${item[6]}</td>
        </tr>
        </table></strong></p>        `
        maindiv.appendChild(element);
    }
  });

    },function (response) {
     appendPre('Error: ' +response.result.error.message);
    }); 
  } 

// setInterval(()=>{
  // listMajors();
//},5000)
    
