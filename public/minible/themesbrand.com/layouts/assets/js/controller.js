// const socket = io();
// // Initialize our Feathers client application through Socket.io
// // with hooks and authentication.
// const client = feathers();
// client.configure(feathers.socketio(socket));
// // Use localStorage to store our login token
// client.configure(feathers.authentication());
var page = document.getElementsByTagName('page')[0].innerText;
var note = document.getElementById('note');
var togg = false;
var cardnum = '';
var timer, count = '';


// console.log(page)

const getCredentials = () => {
    
    var user = {};
    if(page == 'login'){
        user = {
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
        };
    }
    else if(page == 'signup'){
        user = {
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            name: document.getElementById('username').value,
        };
    }
    else{
        // user = {
        //     email: document.getElementById('email').value,
        //     password: document.getElementById('password').value,
        // };
    }
    
    return user;
};

// Log in either using the given email/password or the token from storage
const login = async credentials => {
    try {
      if(!credentials) {
        // Try to authenticate using an existing token
        await client.reAuthenticate();
      } else {
        // Otherwise log in with the `local` strategy using the credentials we got
        await client.authenticate({
          strategy: 'local',
          ...credentials
        });
        
      }
      user = await client.authenticate();
      console.log(user.user._id);
      clearInterval(timer)
      timer = setInterval(function(){ showProgress('note', 'login') }, 1000);
  
      // If successful, show the chat page
    //   showChat();
    } catch(error) {
      // If we got an error, show the login page
    //   showLogin(error);
        
        switch(error.name){
            case 'NotAuthenticated': {
                if(note !== null){
                    note.innerHTML = error;
                }
                else{
                    window.location.assign("auth-login.html");
                }
                
                
                
                break;
            }
            default:{
                note.innerHTML = error;
                console.log(error)
                
                break;
            }
            
        }
        // console.log(error);
    }
    
};

const addEventListener = (selector, event, handler) => {
    document.addEventListener(event, async ev => {
      if (ev.target.closest(selector)) {
        handler(ev);
      }
    });
};
  
  // "Signup and login" button click handler
addEventListener('#signup', 'click', async () => {
    // For signup, create a new user and then log them in
    const credentials = getCredentials();
    console.log(credentials)
      
    // First create the user
    await client.service('users').create(credentials);
    // If successful log them in
    await login(credentials);
    
    // user = credentials;

});
  
  // "Login" button click handler
addEventListener('#login', 'click', async () => {
    const user = getCredentials();
    console.log(user);
    await login(user);
    
    // timer = setInterval(function(){ showProgress('note', 'login') }, 1000);
    
    
});
  

  // "Logout" button click handler
addEventListener('#logout', 'click', async () => {
  await client.logout();
  window.location.assign('index.html')
});

var showProgress = function(element, type){
    if(type == 'login'){
        evnts = [
            "Fetching Data.....",
            "Data Fetch Complete",
            "Setting up the Dashboard..."
        ];
        if(['signup', 'login', 'lockscreen'].includes(page)){
            document.getElementById(element).innerHTML = evnts[count];
            if(count >= evnts.length){
                clearInterval(timer);
                window.location.assign('home.html')
                
            }
        }
        else{
            console.log(evnts[count])
            clearInterval(timer);
        }
        count++;
        
        
    }
    
}
// login()

/************************************************/
/************* Request table contents ***********/
/************************************************/

var requests = [
  {
    'name': 'Omolara Adebayo Olushola',
    'company': 'Dangote Group',
    'phone': '08156100211',
    'email': 'adesola.adebayo@dangotegroup.com',
    'shrt-name': 'Omolara Adebayo O',
    'date': 'May 14, 2021',
    'time': '1:54',
    'content': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex quo quidem aut sequi tenetur delectus ab maiores voluptas nulla, sint quae architecto ullam officia ipsa laudantium nemo aliquam mollitia est',
  },
  {
    'name': 'Omolara Adebayo Olushola',
    'company': 'Dangote Group',
    'phone': '08156100211',
    'email': 'adesola.adebayo@dangotegroup.com',
    'shrt-name': 'Omolara Adebayo O',
    'date': 'May 14, 2021',
    'time': '1:54',
    'content': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex quo quidem aut sequi tenetur delectus ab maiores voluptas nulla, sint quae architecto ullam officia ipsa laudantium nemo aliquam mollitia est',
  },
  {
    'name': 'Omolara Adebayo Olushola',
    'company': 'Dangote Group',
    'phone': '08156100211',
    'email': 'adesola.adebayo@dangotegroup.com',
    'shrt-name': 'Omolara Adebayo O',
    'date': 'May 14, 2021',
    'time': '1:54',
    'content': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex quo quidem aut sequi tenetur delectus ab maiores voluptas nulla, sint quae architecto ullam officia ipsa laudantium nemo aliquam mollitia est',
  },
  {
    'name': 'Omolara Adebayo Olushola',
    'company': 'Dangote Group',
    'phone': '08156100211',
    'email': 'adesola.adebayo@dangotegroup.com',
    'shrt-name': 'Omolara Adebayo O',
    'date': 'May 14, 2021',
    'time': '1:54',
    'content': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex quo quidem aut sequi tenetur delectus ab maiores voluptas nulla, sint quae architecto ullam officia ipsa laudantium nemo aliquam mollitia est',
  },{
    'name': 'Omolara Adebayo Olushola',
    'company': 'Dangote Group',
    'phone': '08156100211',
    'email': 'adesola.adebayo@dangotegroup.com',
    'shrt-name': 'Omolara Adebayo O',
    'date': 'May 14, 2021',
    'time': '1:54',
    'content': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex quo quidem aut sequi tenetur delectus ab maiores voluptas nulla, sint quae architecto ullam officia ipsa laudantium nemo aliquam mollitia est',
  },
  {
    'name': 'Omolara Adebayo Olushola',
    'company': 'Dangote Group',
    'phone': '08156100211',
    'email': 'adesola.adebayo@dangotegroup.com',
    'shrt-name': 'Omolara Adebayo O',
    'date': 'May 14, 2021',
    'time': '1:54',
    'content': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex quo quidem aut sequi tenetur delectus ab maiores voluptas nulla, sint quae architecto ullam officia ipsa laudantium nemo aliquam mollitia est',
  }

]


var render = function(page, component, data, parent){
  var parent = document.getElementById(parent);
  var html = '';
  switch(page){
    case 'request': {
      switch(component){
        case 'request-table': {
          var index = 0;
          html = '';
          for(var t = 0; t < data.length; t++){
            html += `<tr class="accordion" onclick="toge(this, `;
            html += t;
            html += `)"><td>`;
            html += data[t].name;
            html += `<div class="card-body opt"><h5>`
            html += data[t]['shrt-name'];
            html += `</h5><span class="req-datetime"><p>`
            html += data[t].date;
            html += `</p><p> `
            html += data[t].time;
            html += `</p></span></div></td><td class="max">`
            html += data[t].company;
            html += `<div class="card-body opt"><p>`;
            html += data[t].content;
            html += `</p><center><div class="mb-3"><a href="javascript:void(0);" class="btn gp-green replynow-btn waves-effect waves-light">Reply Now</a></div></center></div></td><td class="min">`;
            html += data[t].phone;
            html += `<div class="card-body opt"></div></td><td class="min">`;
            html += data[t].email;
            html += `<div class="card-body opt"></div></td></tr>`
          }
          parent.innerHTML = html;
          break;
        }
        default: {
          break;
        }
      }

      break;
    }
    default: {
      break
    }
  }
};

switch(page){
    case 'requests': {
      ClassicEditor
        .create( document.querySelector( '#classic-editor' ) )
        .catch( error => {
            console.error( error );
        } );
      // render('request', 'request-table', requests, 'request_table');
      break;
        
    }
    
    
    
    default : {
      console.log(cardnum, togg);

      break;
    }
    
}

// $(window).resize(function() {
//   location.reload();
//   console.log(window.innerWidth);
// });

function toge(row, num){
  var accc = document.getElementsByClassName('accordion');
  accc.forEach(rowe => {
    togglerow(rowe, false);
  });
  
  if(num == cardnum){
    togg = !togg;
    togglerow(row, togg);
    cardnum = num;
    
  }
  else{
    togglerow(row, true);
    cardnum = num;
    togg = true;
    
  }
  
  
  
  

}

function togglerow(row, state){
  var pan = row.getElementsByClassName("opt");
  var max = row.getElementsByClassName("max");
  var min = row.getElementsByClassName("min");
  if(state){
    if(window.innerWidth <= 645){
      //toggle true, screen small

    }
    else{
      pan.forEach(panel => {
        if (panel.style.display === "block" || panel.style.display == '') {
          panel.style.display = "block";
        } 
        else {
          panel.style.display = "block";
        }
      });
      min.forEach(minn => {
        if (minn.style.display === "none" || minn.style.display == '') {
          minn.style.display = "none";
        } 
        else {
          minn.style.display = "none";
          
        }
        
      });
      max.forEach(maxx => {

        if (maxx.colSpan === "3") {
          
        } 
        else {
          maxx.colSpan = "3";
        }
      });

    }
  }
  else{
    if(window.innerWidth <= 645){
      //toggle true, screen small

    }
    else{
      pan.forEach(panel => {
        if (panel.style.display === "none" || panel.style.display == '') {
          // console.log(panel.style);
        } 
        else {
          panel.style.display = "none";
        }
      });
      min.forEach(minn => {
        if (minn.style.display === "table-cell" || minn.style.display == '') {
          minn.style.display = "table-cell";
        } 
        else {
          minn.style.display = "table-cell";
        }
      });
      max.forEach(maxx => {
        if (maxx.colSpan === "1") {
          
        } 
        else {
          maxx.colSpan = "1";
        }
      });

    }

  }
}

var reqflx = document.getElementById('reqflx');
for(var l = 0; l < reqflx.children.length; l++){
  reqflx.children[l].addEventListener('click', function(ev, th = this ){
    for(var k = 0; k < reqflx.children.length; k++){
      reqflx.children[k].classList.value = [''];
    }
    th.classList.value = ['req-active'];
  });
}







