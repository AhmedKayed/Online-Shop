var express = require('express');
var path = require('path');
var fs = require('fs');
var app = express();
var mainuser = null;

var {MongoClient } = require('mongodb');
const { Console } = require('console');
var uri ="mongodb+srv://admin:admin@cluster0.a4lel.mongodb.net/Hefnydb?retryWrites=true&w=majority"
var client = new MongoClient(uri,{useNewUrlParser: true, useUnifiedTopology: true});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',function(req,res){
  res.render('login');
});

app.post('/', async function(req,res){
  await client.connect();
var user = {username: req.body.username, password: req.body.password};
var x = req.body.username != "" & req.body.password!= "" & !req.body.username.includes(' ')
& !req.body.password.includes(' ');

var y = await client.db('Hefnydb').collection('HefnyCol').find().toArray();
var z = true;
for(let i =0; i<y.length;i++){
  if(y[i].username.toLowerCase().localeCompare(req.body.username.toLowerCase())==0){
    z = false;
    break;
  }
}

if(x & z){
await client.db('Hefnydb').collection('HefnyCol').insertOne(user);
res.render('login');
}
else{
  if(!z){
    console.log("This Username is already taken");
  }
  else{
  
  console.log("Please Check Your Feilds For Spaces");
  }
}
client.close();

});



app.get('/registration',function(req,res){
  res.render('registration');
});



app.post('/home',async function(req,res){
  await client.connect();
  var user = {username: req.body.username, password: req.body.password};
  var x = req.body.username != "" & req.body.password!= "" & !req.body.username.includes(' ')
  & !req.body.password.includes(' ');
  var y = await client.db('Hefnydb').collection('HefnyCol').find().toArray();
  var z = false;
  for(let i =0; i<y.length;i++){
    if(y[i].username.toLowerCase().localeCompare(req.body.username.toLowerCase())==0 && 
        y[i].password.localeCompare( req.body.password)==0){
      z = true;
      break;
    }
  }

  if(!x){
    console.log("Please Check Your Feilds For Spaces");
  }
  else{
  if(!z){
    console.log("Incorrect Password");
  }
  else{
    
  mainuser=req.body.username;
    res.render('home');
  }
  }
  client.close();
});

app.get('/phones',function(req,res){
  res.render('phones');
});

app.get('/books',function(req,res){
  res.render('books');
});

app.get('/sports',function(req,res){
  res.render('sports');
});

app.get('/galaxy',function(req,res){
  res.render('galaxy');
});

app.post('/galaxy', async function(req,res){
  await client.connect();
  var xyz = {user: mainuser, product:'Galaxy S21 Ultra'};
  await client.db('Hefnydb').collection('Cart').insertOne(xyz);
  await client.close();
  res.render('galaxy');

  });

app.get('/iphone',function(req,res){
  res.render('iphone');
});



app.post('/iphone', async function(req,res){
  await client.connect();
  var xyz = {user: mainuser, product:'iPhone 13 Pro'};
  await client.db('Hefnydb').collection('Cart').insertOne(xyz);
  await client.close();
  res.render('iphone');

  });

app.get('/leaves',function(req,res){
  res.render('leaves');
});

app.post('/leaves', async function(req,res){
  await client.connect();
  var xyz = {user: mainuser, product:'Leaves of Grass'};
  await client.db('Hefnydb').collection('Cart').insertOne(xyz);
  await client.close();
  res.render('leaves');

  });


app.get('/sun',function(req,res){
  res.render('sun');
});

app.post('/sun', async function(req,res){
  await client.connect();
  var xyz = {user: mainuser, product:'The Sun and Her Flowers'};
  await client.db('Hefnydb').collection('Cart').insertOne(xyz);
  await client.close();
  res.render('sun');

  });

app.get('/boxing',function(req,res){
  res.render('boxing');
});

app.post('/boxing', async function(req,res){
  await client.connect();
  var xyz = {user: mainuser, product:'Boxing Bag'};
  await client.db('Hefnydb').collection('Cart').insertOne(xyz);
  await client.close();
  res.render('boxing');

  });

app.get('/tennis',function(req,res){
  res.render('tennis');
});

app.post('/tennis', async function(req,res){
await client.connect();
var xyz = {user: mainuser, product:'Tennis Racket'};
await client.db('Hefnydb').collection('Cart').insertOne(xyz);
await client.close();
res.render('tennis');
});


app.get('/cart', async function(req,res){
  
await client.connect();
var Cart = await client.db('Hefnydb').collection('Cart').find().toArray();
var CartofUser= new Array ();
for(let i =0; i<Cart.length;i++){
  if(Cart[i].user===mainuser){
  CartofUser.push(Cart[i].product);
  }
  }
res.render('cart',{CartofUser:CartofUser});
client.close();

});


app.post('/cart', async function(req,res){
  await client.connect();
if(req.body.action==='galaxy'){
  var dlt = {user:mainuser,product:"Galaxy S21 Ultra"};
  await client.db('Hefnydb').collection('Cart').deleteMany(dlt);
}
if(req.body.action==='iphone'){
  var dlt = {user:mainuser,product:"iPhone 13 Pro"};
  await client.db('Hefnydb').collection('Cart').deleteMany(dlt);
}
if(req.body.action==='leaves'){
  var dlt = {user:mainuser,product:"Leaves of Grass"};
  await client.db('Hefnydb').collection('Cart').deleteMany(dlt);
}
if(req.body.action==='sun'){
  var dlt = {user:mainuser,product:"The Sun and Her Flowers"};
  await client.db('Hefnydb').collection('Cart').deleteMany(dlt);
}
if(req.body.action==='boxing'){
  var dlt = {user:mainuser,product:"Boxing Bag"};
  await client.db('Hefnydb').collection('Cart').deleteMany(dlt);
}
if(req.body.action==='tennis'){
  var dlt = {user:mainuser,product:"Tennis Racket"};
  await client.db('Hefnydb').collection('Cart').deleteMany(dlt);
}


var Cart = await client.db('Hefnydb').collection('Cart').find().toArray();
var CartofUser= new Array ();
for(let i =0; i<Cart.length;i++){
  if(Cart[i].user===mainuser){
  CartofUser.push(Cart[i].product);
  }
  }
res.render('cart',{CartofUser:CartofUser});
client.close();

  
});



arr = new Array("Pizzzzzzzza","3aseeeer","Hefnyyyyyy","TATES")
app.get('/searchresults',function(req,res){
  res.render('searchresults',{arr:arr});
});

app.post('/searchresults',function(req,res){
  res.render('searchresults');
});


app.post('/searchresults',function(req,res){
  res.render('searchresults');
});

async function main(){
  var {MongoClient } = require('mongodb');
  var uri ="mongodb+srv://admin:admin@cluster0.a4lel.mongodb.net/Hefnydb?retryWrites=true&w=majority"
  var client = new MongoClient(uri,{useNewUrlParser: true, useUnifiedTopology: true});
}

async function ins(){
  await client.connect();
  var Cart2 = await client.db('Hefnydb').collection('Cart').find().toArray();
  console.log(Cart2[0]);
  client.close();

  /*
  await client.connect();
  var user = {user:"ahmed",product:"Boxing Bag"};
  await client.db('Hefnydb').collection('Cart').insertOne(user);
  client.close();
  */
}


















/*
var x = {name: "Ahmed", age:20 , username: "AhmedKayed"};
console.log(x.name);
var y= JSON.stringify(x);
console.log(y);
*/

app.listen(3000);

main();