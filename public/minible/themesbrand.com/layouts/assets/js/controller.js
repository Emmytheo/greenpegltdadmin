
const socket = io();
// Initialize our Feathers client application through Socket.io
// with hooks and authentication.
const client = feathers();
client.configure(feathers.socketio(socket));
// Use localStorage to store our login token
client.configure(feathers.authentication());
var page = document.getElementsByTagName('page')[0].innerText;
var note = document.getElementById('note');
var togg = false;
var cardnum = '';
var timer, count = '';
var memory = '';
var prod_id = '';
var prod = '';
const requestsService = client.service('requests');
const productsService = client.service('products');


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
                if(error == "Error: Cannot read property 'find' of undefined"){
                  window.location.reload();
                }
                // console.log(error)
                
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
    window.location.assign("auth-login.html");
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
login()

/************************************************/
/************* Temporary Datasets ***********/
/************************************************/

var requests = [
  {
    'name': 'Omolara Adebayo Olushola',
    'company': 'Dangote Group',
    'phone': '08156100211',
    'email': 'chidi.adebayo@dangotegroup.com',
    'shrt-name': 'Omolara Adebayo O',
    'date': 'May 14, 2021',
    'time': '1:54',
    'subject': 'Request Subject',
    'image': './assets/images/greenpegs/fire-pump-set1 3.png',
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
    'subject': 'Request Subject',
    'image': './assets/images/greenpegs/fire-pump-set1 3.png',
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
    'subject': 'Request Subject',
    'image': './assets/images/greenpegs/fire-pump-set1 3.png',
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
    'subject': 'Request Subject',
    'image': './assets/images/greenpegs/fire-pump-set1 3.png',
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
    'subject': 'Request Subject',
    'image': './assets/images/greenpegs/fire-pump-set1 3.png',
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
    'subject': 'Request Subject',
    'image': './assets/images/greenpegs/fire-pump-set1 3.png',
    'content': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex quo quidem aut sequi tenetur delectus ab maiores voluptas nulla, sint quae architecto ullam officia ipsa laudantium nemo aliquam mollitia est',
  },
  
  

];

var products = [
  {
    'productimg': './assets/images/greenpegs/fire-pump-set1 3.png',
    'productmanulogo': './assets/images/greenpegs/Group 1756.png',
    'productname': 'Busch R5 KB 0010',
    'sku': '000SKU',
    'dateAdded': 'March 28, 2021',
    'product_cat': 'Oil and Gas',
    'part_num' : '91047126TKIWYSVBAG91047126',
    'oem_logo': './assets/images/greenpegs/Group 1749.png',
    'oem_name': 'Endress and Hauser',
    'productdesc': '',
    'productfeat': '',
    'areasofuse': ''
  },
  
]




/************************************************/
/************* Temporary Datasets end ***********/
/************************************************/


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
            html += `<tr class="accordion" role="row" onclick="toge(this, '`;
            html += data[t]._id;
            html += `')"><td class="sorting_1 dtr-control">`;
            html += data[t].name;
            html += `<div class="card-body opt"><h5>`
            html += data[t]['shrt-name'];
            html += `</h5><span class="req-datetime"><p>`
            html += data[t].date;
            html += `</p><p> `
            html += data[t].time;
            html += `</p></span></div></td><td class="max">`
            html += data[t].company;
            html += `<div class="card-body opt"><div class="row"><div class="col-md-8"><h5>`;
            html += data[t].subject;
            html += `</h5><p>`;
            html += data[t].content;
            html += `</p><center><div class="mb-3"><a href="javascript:void(0);" class="btn gp-green replynow-btn waves-effect waves-light" data-bs-toggle="modal" onclick="replynw('`;
            html += data[t]._id;
            html += `')" data-bs-target=".bs-example-modal-center">Reply Now</a></div></center></div><div class="col-md-4"><div class="card card-body"><img src="`
            html += data[t].image;
            html += `" alt="" srcset=""></div></div></div></div></td><td class="min">`
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
    case 'product': {
      switch(component){
        case 'product-table': {
          var index = 0;
          html = '';
          for(var t = 0; t < data.length; t++){
            html += `<tr class="pt"><td><div class="card-body pt-product"><div class="row"><img src="`;
            html += data[t].productimg;
            html += `"  alt=""></div></div></td><td><div class="card-body pt-name"><div class="row mb-0"><p>`;
            html += data[t].productname;
            html += `</p></div><div class="row mb-0"><p data-bs-toggle="modal" data-bs-target=".product-details" onclick="showprod('`
            html += data[t]._id;
            html += `')">Edit</p><p data-bs-toggle="modal" data-bs-target=".product-details" onclick="showprod('`
            html += data[t]._id;
            html += `')">View</p><p onclick="delprod('`
            html += data[t]._id;
            html += `')">Delete</p></div></div></td><td><div class="card-body pt-category"><center><img src="`
            html += data[t].oem_logo;
            html += `"  alt=""></center></div></td><td><div class="card-body pt-sku"><p>`;
            html += data[t].sku;
            html += `</p></div></td><td><div class="card-body pt-date_added"><p>`;
            html += data[t].dateAdded;
            html += `</p></div></td></tr>`
          }
          parent.innerHTML = html;
          // $("#datatable").DataTable();
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
      var reqflx = document.getElementById('reqflx');
      for(var l = 0; l < reqflx.children.length; l++){
        reqflx.children[l].addEventListener('click', function(ev, th = this ){
          for(var k = 0; k < reqflx.children.length; k++){
            reqflx.children[k].classList.value = [''];
          }
          th.classList.value = ['req-active'];
        });
      };

      ClassicEditor
        .create( document.querySelector( '#classic-editor' ) )
        .catch( error => {
            console.error( error );
        } );

      requestsService.find().then( req => {
        memory = req;
        render('request', 'request-table', req, 'request_table');
        $("#datatable").DataTable();
      });

      


      
      break;
        
    }

    case 'products': {
      productPageInit();
      // $("#datatable").DataTable();
      productsService.find().then( req => {
        memory = req;
        render('product', 'product-table', req, 'product_table');
        $("#datatable").DataTable();
        
        
        // console.log(memory[0]._id);
      });
      
      


      


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



async function replynw(ele){
  var replyto = document.getElementsByClassName('replyto');
  var replyfrom = document.getElementById('replyfrom');
  var reply_sub = document.getElementById('reply_sub');
  var request = await requestsService.get(ele);
  for(var h = 0; h < replyto.length; h++){
    console.log(request.email);
    replyto[h].innerText = request.email;
  }
  replyfrom.innerText = 'olomije.ezekiel@greenpegltd.com';
  reply_sub.value = 'Request Subject';
}
async function showprod(ele){
  prod_id = ele;
  var productname = document.getElementById('productname');
  var part_num = document.getElementById('part_num');
  var product_cat = document.getElementById('product_cat');
  var sku = document.getElementById('sku');
  var product = await productsService.get(ele);
  productname.innerText = product.productname;
  part_num.innerText = product.part_num;
  product_cat.innerText = product.product_cat;
  sku.innerText = product.sku;
}
async function editprod(){
  if(prod_id.length > 23){
    var product = await productsService.get(prod_id);
    if(product){
      toggleScreen('.editprod');
        var editproductname = document.getElementById('editproductname');
        var editpartnumber = document.getElementById('editpartnumber');
        var editSKU = document.getElementById('editSKU');
        var editproductdesc = document.getElementById('editproductdesc');
        var editproductfeat = document.getElementById('editproductfeat');
        var editareasofuse = document.getElementById('editareasofuse');
        var editproductcat = document.getElementById('editproductcat');
        var editproducttags = document.getElementById('editproducttags');
        editproductname.value = product.productname;
        editpartnumber.value = product.part_num;
        editSKU.value = product.sku;
        editproductdesc.value = product.productdesc;
        editproductfeat.value = product.productfeat;
        editareasofuse.value = product.areasofuse;
        editproductcat.value = product.product_cat + ' / ' + product.oem_name;
        editproducttags.value = product.editproducttags;
      
    }
  }
  else{

  }
}
async function delprod(id){
  var r = confirm("Are you sure you want to delete this product!");
  if (r == true) {
    productsService.remove(id).then(res => {
      productsService.find().then( req => {
        productPageInit();
        memory = req;
        render('product', 'product-table', req, 'product_table');
        $("#datatable").DataTable();
      });
    });
  } else {
  }

}



function validateFileType(){
  var fileName = document.getElementById("fileName").value;
  var idxDot = fileName.lastIndexOf(".") + 1;
  var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
  if (extFile=="jpg" || extFile=="jpeg" || extFile=="png"){
      //TO DO
  }else{
      alert("Only jpg/jpeg and png files are allowed!");
  }   
}


var // Define maximum number of files.
      max_file_number = 3,
      // Define your form id or class or just tag.
      $form = $('#uplimg'), 
      // Define your upload field class or id or tag.
      $file_upload = $('#fileName', $form), 
      // Define your submit class or id or tag.
      $button = $('.complete-btn', $form); 

  // Disable submit button on page ready.
  $button.prop('disabled', 'disabled');

  $file_upload.on('change', function () {
    var number_of_images = $(this)[0].files.length;
    if (number_of_images > max_file_number) {
      alert(`You can upload maximum ${max_file_number} files.`);
      $(this).val('');
      $button.prop('disabled', 'disabled');
    } else {
      $button.prop('disabled', false);
    }
  });




function productPageInit(){
  console.log(page);
  var crd = [];
  var lst = [ '.product-table', '.noprod', '.addnewprod', '.editprod'];
  var cnt = 0;
  lst.forEach( card => {
    if(cnt < lst.length){
      console.log(cnt);
      if(card.split('.')[0] == ''){
        var crde = document.getElementsByClassName(card.split('.')[1]);
        // console.log(crde[0]);
        crd.push(crde[0]);
        crde[0].style.display = 'none';
      }
      
      else{
        console.log(card);
      }
    }
    
    cnt++
    
    
    
  })
  productsService.find().then(prdss => {
    if(prdss.length < 1 && typeof(prdss) !== 'array'){
      crd[1].style.display = 'block';
    }
    else{
      crd[0].style.display = 'block';
    }
  });
  
  
  
  
  
}

function toggleScreen(screen){
  var crd = [];
  var lst = [ '.product-table', '.noprod', '.addnewprod', '.editprod'];
  var cnt = 0;
  lst.forEach( card => {
    if(cnt < lst.length){
      console.log(cnt);
      if(card.split('.')[0] == ''){
        var crde = document.getElementsByClassName(card.split('.')[1]);
        // console.log(crde[0]);
        crd.push(crde[0]);
        crde[0].style.display = 'none';
      }
      
      else{
        console.log(card);
      }
    }
    cnt++
  })
  if(lst.includes(screen)){
    var scrn = document.getElementsByClassName(screen.split('.')[1]);
    scrn[0].style.display = 'block';
  }
  else{
    crd[1].style.display = 'block';
  }
}

async function prodUpdate(){
  if(prod_id.length > 23){
    var editproductname = document.getElementById('editproductname');
    var editpartnumber = document.getElementById('editpartnumber');
    var editSKU = document.getElementById('editSKU');
    var editproductdesc = document.getElementById('editproductdesc');
    var editproductfeat = document.getElementById('editproductfeat');
    var editareasofuse = document.getElementById('editareasofuse');
    var editproductcat = document.getElementById('editproductcat');
    var editproducttags = document.getElementById('editproducttags');
    var data = {
      // "productimg" : ,
      // "productmanulogo" : ,
      "productname" : editproductname.value,
      "sku" : editSKU.value,
      // "dateAdded" : ,
      "product_cat" : editproductcat.value.split('/')[0],
      "part_num" : editpartnumber.value,
      // "oem_logo" : ,
      "oem_name" : editproductcat.value.split('/')[1],
      "productdesc" : editproductdesc.value,
      "productfeat" : editproductfeat.value,
      "areasofuse" : editareasofuse.value,
      "tags" : editproducttags.value

    };
    productsService.patch(prod_id, data).then(y => {
      productsService.find().then( req => {
        productPageInit();
        memory = req;
        render('product', 'product-table', req, 'product_table');
        $("#datatable").DataTable();
        window.location.reload();
      });
    });
    
    
    
    
    
    
  }
  else{

  }

}


async function addprod(){
  var productname = document.getElementById('productname');
  var partnumber = document.getElementById('partnumber');
  var prod_SKU = document.getElementById('SKU');
  var productdesc = document.getElementById('productdesc');
  var productfeat = document.getElementById('productfeat');
  var areasofuse = document.getElementById('areasofuse');
  var productcat = document.getElementById('productcat');
  var producttags = document.getElementById('producttags');
  var data = {
      // "productimg" : ,
      // "productmanulogo" : ,
      "productname" : productname.value,
      "sku" : prod_SKU.value,
      // "dateAdded" : ,
      "product_cat" : productcat.value.split('/')[0],
      "part_num" : partnumber.value,
      // "oem_logo" : ,
      "oem_name" : productcat.value.split('/')[1],
      "productdesc" : productdesc.value,
      "productfeat" : productfeat.value,
      "areasofuse" : areasofuse.value,
      "tags" : producttags.value

  };
  productsService.create(data).then(y => {
      productsService.find().then( req => {
        productPageInit();
        memory = req;
        render('product', 'product-table', req, 'product_table');
        $("#datatable").DataTable();
        window.location.reload();
      });
    });


}




function dtInit(){
  $("#datatable").DataTable()
  
}
