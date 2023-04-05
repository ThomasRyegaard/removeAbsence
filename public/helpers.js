// 
// Update html dom with provided string value
//
const updateUI = (text) =>
  (document.querySelectorAll('#info')[0].innerText = text);


function disableButton() {
  let removeWorkTimeBtn = document.querySelector('#removeWorkTimeBtn');

  if (removeWorkTimeBtn) {
      removeWorkTimeBtn.disabled = true;
  }
}

function enableButton() {
    let removeWorkTimeBtn = document.querySelector('#removeWorkTimeBtn');

    if (removeWorkTimeBtn) {
        removeWorkTimeBtn.disabled = false;
    }
}

//
// Loop before a token expire to fetch a new one
//
function initializeRefreshTokenStrategy(shellSdk, auth) {

  shellSdk.on(SHELL_EVENTS.Version1.REQUIRE_AUTHENTICATION, (event) => {
    sessionStorage.setItem('token', event.access_token);
    setTimeout(() => fetchToken(), (event.expires_in * 1000) - 5000);
  });

  function fetchToken() {
    shellSdk.emit(SHELL_EVENTS.Version1.REQUIRE_AUTHENTICATION, {
      response_type: 'token'  // request a user token within the context
    });
  }

  sessionStorage.setItem('token', auth.access_token);
  setTimeout(() => fetchToken(), (auth.expires_in * 1000) - 5000);
}

// 
// Request context with worktime ID to return WorkTime
//
function getWorkTime(cloudHost, account, company, activity_id) {
  
  const headers = {
    'Content-Type': 'application/json',
    'X-Client-ID': 'fsm-extension-sample',
    'X-Client-Version': '1.0.0',
    'Authorization': `bearer ${sessionStorage.getItem('token')}`,
  };

  return new Promise(resolve => {

    // Fetch Worktime object
    fetch(`https://${cloudHost}/api/data/v4/Worktime/${worktime_id}?dtos=Worktime.16&account=${account}&company=${company}`, {
      headers
      })
        .then(response => response.json())
        .then(function(json) {
          resolve(json.data[0].workTime);
        });
  });
}

// 
// Request ERP to remove worktime ID
//
function getWorkTime(cloudHost, account, company, activity_id) {
  
  const headers = {
    'Content-Type': 'application/json',
    'X-Client-ID': 'fsm-extension-sample',
    'X-Client-Version': '1.0.0',
    'Authorization': `bearer ${sessionStorage.getItem('token')}`,
  };

  return new Promise(resolve => {

    // Fetch Worktime object
    fetch(`ERP_CONNECTION_URL`, {
      headers
      })
        .then(response => response.json())
        .then(function(json) {
          resolve(json.data[0].workTime);
        });
  });
}
