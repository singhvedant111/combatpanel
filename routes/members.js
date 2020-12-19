const express=require('express');
const router=express.Router();
const members = require('../Members');
const fs = require('fs');
const uuid = require('uuid-v4');
const e = require('express');
const firebase = require('firebase');
const csrf = require("csurf");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
var dialog = require('dialog');
const admin=require('firebase-admin');
const fileUpload = require('../lib/index');
const csrfMiddleware = csrf({ cookie: true });
router.use(bodyParser.json());
router.use(cookieParser());
router.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/tmp/'
}));
var serviceAccount = require('../combatpugilist-01-firebase-adminsdk-8g96h-2588438175.json');
var firebaseConfig = {
  apiKey: "AIzaSyAFqqHgK1BCualtGBwvXMnqFYeXnCcmZcY",
  authDomain: "combatpugilist-01.firebaseapp.com",
  databaseURL: "https://combatpugilist-01.firebaseio.com",
  projectId: "combatpugilist-01",
  storageBucket: "combatpugilist-01.appspot.com",
  messagingSenderId: "67045727386",
  appId: "1:67045727386:web:b19419660cf6ed88885323"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://combatpugilist-01.firebaseio.com",
  storageBucket: "combatpugilist-01.appspot.com"
});
const firebasestorage = require('firebase/firebase-storage');
router.get('/',(req,res)=>{ 
 
  // var state_name= new Array();
  // var db=firebase.database();
  // var userRef=db.ref("masters");
  // userRef.once('value',function(snap){
  //   admin
  //   .auth()
  //   .verifySessionCookie(req.cookies.session || "", true /** checkRevoked */)
  //   .then(() => {
  //     if(!req.cookies.master){
  //       res.clearCookie("uid");
  //       res.redirect("/login"); 
      
  //     }
  //     else{
  //     res.render('index',{data1: JSON.stringify(snap.val()),data2: snap.val()});
  //     }
  //   })
  //   .catch((error) => {
  //     res.redirect("/login");
  //   });
    
  // });
  admin
      .auth()
      .verifySessionCookie(req.cookies.session || "", true /** checkRevoked */)
      .then(() => {
        res.render('index');
      })
      .catch((error) => {
        res.redirect("/login");
      });
  
});
router.get('/login', function (req, res) {
  res.render('login', {layout: false});
});
router.get('/changepassword', function (req, res) {
  res.render('changepass', {layout: false});
});
router.post('/changepassword', function (req, res) {
  var auth=firebase.auth();
  var emailaddress=req.body.email;
  auth.sendPasswordResetEmail(emailaddress).then(function(){
    res.redirect('changepassresp');
  }).catch(function(error){
  });
});
router.get('/changepassresp', function (req, res) {
  res.render('chpassresponse', {layout: false});
});
router.get('/video', function (req, res) {
  var db=firebase.database();
  var userRef=db.ref("videos/");
  userRef.once('value',function(snap){
      res.render('video',{videolist:snap.val()});
      
  });
});
router.get('/events', function (req, res) {
  var cntr=0;

  var db=firebase.database();
  var userRef=db.ref("featuredno");
  var userRef2=db.ref("events");
  userRef.once('value',function(snap){
    var cntr1="";
    var cntr2="";
      cntr1=snap.child(1).val().toString();
      cntr2=snap.child(2).val().toString();
      console.log(cntr1);
      console.log(cntr2);
      userRef2.once('value',function(snap2){
        admin
        .auth()
        .verifySessionCookie(req.cookies.session || "", true /** checkRevoked */)
        .then(() => {
          res.render('events',{cntr1:cntr1,cntr2:cntr2,event1:snap2.child("event1").child("title").val(),event2:snap2.child("event2").child("title").val(),event3:snap2.child("event3").child("title").val(),event4:snap2.child("event4").child("title").val(),event5:snap2.child("event5").child("title").val(),event6:snap2.child("event6").child("title").val()});
        })
        .catch((error) => {
          res.redirect("/login");
        });
        
      });
      

  });
  
  
});
router.get('/event1', function (req, res) {
  var db=firebase.database();
  var userRef=db.ref("events");
  var title="";
  var fighter1="";
  var fighter2="";
  var fighter1pic="";
  var fighter2pic="";
  var date="";
  var link="";
  userRef.once('value',function(snap){
    if(snap.hasChild('event1')){
      title=snap.child('event1').child('title').val();
      fighter1=snap.child('event1').child('fighter1').val();
      fighter2=snap.child('event1').child('fighter2').val();
      fighter1pic=snap.child('event1').child('fighter1pic').val();
      fighter2pic=snap.child('event1').child('fighter2pic').val();
      date=snap.child('event1').child('date').val();
      link=snap.child('event1').child('banner').val();
      admin
      .auth()
      .verifySessionCookie(req.cookies.session || "", true /** checkRevoked */)
      .then(() => {
        res.render('event1',{title:title,fighter1:fighter1,fighter2:fighter2,date:date,link:link,f1p:fighter1pic,f2p:fighter2pic});
      })
      .catch((error) => {
        res.redirect("/login");
      });
      
    }
    else{
      admin
      .auth()
      .verifySessionCookie(req.cookies.session || "", true /** checkRevoked */)
      .then(() => {
        res.render('event1',{title:title,fighter1:fighter1,fighter2:fighter2,date:date,link:link,f1p:fighter1pic,f2p:fighter2pic});
      })
      .catch((error) => {
        res.redirect("/login");
      });
      
    }
  });
  
});
router.get('/event2', function (req, res) {
  var db=firebase.database();
  var userRef=db.ref("events");
  var title="";
  var fighter1="";
  var fighter1pic="";
  var fighter2pic="";
  var fighter2="";
  var date="";
  var link="";
  userRef.once('value',function(snap){
    if(snap.hasChild('event2')){
      title=snap.child('event2').child('title').val();
      fighter1=snap.child('event2').child('fighter1').val();
      fighter2=snap.child('event2').child('fighter2').val();
      fighter1pic=snap.child('event2').child('fighter1pic').val();
      fighter2pic=snap.child('event2').child('fighter2pic').val();
      date=snap.child('event2').child('date').val();
      link=snap.child('event2').child('banner').val();
        admin
      .auth()
      .verifySessionCookie(req.cookies.session || "", true /** checkRevoked */)
      .then(() => {
        res.render('event2',{title:title,fighter1:fighter1,fighter2:fighter2,date:date,link:link,f1p:fighter1pic,f2p:fighter2pic});
      })
      .catch((error) => {
        res.redirect("/login");
      });
      
    }
    else{
      admin
      .auth()
      .verifySessionCookie(req.cookies.session || "", true /** checkRevoked */)
      .then(() => {
        res.render('event2',{title:title,fighter1:fighter1,fighter2:fighter2,date:date,link:link});
      })
      .catch((error) => {
        res.redirect("/login");
      });
      
    }
  });
});
router.get('/event3', function (req, res) {
  var db=firebase.database();
  var userRef=db.ref("events");
  var title="";
  var fighter1="";
  var fighter1pic="";
  var fighter2pic="";
  var fighter2="";
  var date="";
  var link="";
  userRef.once('value',function(snap){
    if(snap.hasChild('event3')){
      title=snap.child('event3').child('title').val();
      fighter1=snap.child('event3').child('fighter1').val();
      fighter2=snap.child('event3').child('fighter2').val();
      fighter1pic=snap.child('event3').child('fighter1pic').val();
      fighter2pic=snap.child('event3').child('fighter2pic').val();
      date=snap.child('event3').child('date').val();
      link=snap.child('event3').child('banner').val();
      admin
      .auth()
      .verifySessionCookie(req.cookies.session || "", true /** checkRevoked */)
      .then(() => {
        res.render('event3',{title:title,fighter1:fighter1,fighter2:fighter2,date:date,link:link,f1p:fighter1pic,f2p:fighter2pic});
      })
      .catch((error) => {
        res.redirect("/login");
      });
      
    }
    else{
      admin
      .auth()
      .verifySessionCookie(req.cookies.session || "", true /** checkRevoked */)
      .then(() => {
        res.render('event3',{title:title,fighter1:fighter1,fighter2:fighter2,date:date,link:link});
      })
      .catch((error) => {
        res.redirect("/login");
      });
      
    }
  });
});
router.get('/event4', function (req, res) {
  var db=firebase.database();
  var userRef=db.ref("events");
  var title="";
  var fighter1="";
  var fighter2="";
  var fighter1pic="";
  var fighter2pic="";
  var date="";
  var link="";
  userRef.once('value',function(snap){
    if(snap.hasChild('event4')){
      title=snap.child('event4').child('title').val();
      fighter1=snap.child('event4').child('fighter1').val();
      fighter2=snap.child('event4').child('fighter2').val();
      fighter1pic=snap.child('event4').child('fighter1pic').val();
      fighter2pic=snap.child('event4').child('fighter2pic').val();
      date=snap.child('event4').child('date').val();
      link=snap.child('event4').child('banner').val();
      admin
      .auth()
      .verifySessionCookie(req.cookies.session || "", true /** checkRevoked */)
      .then(() => {
        res.render('event4',{title:title,fighter1:fighter1,fighter2:fighter2,date:date,link:link,f1p:fighter1pic,f2p:fighter2pic});
      })
      .catch((error) => {
        res.redirect("/login");
      });
      
    }
    else{
      admin
      .auth()
      .verifySessionCookie(req.cookies.session || "", true /** checkRevoked */)
      .then(() => {
        res.render('event4',{title:title,fighter1:fighter1,fighter2:fighter2,date:date,link:link});
      })
      .catch((error) => {
        res.redirect("/login");
      });
      
    }
  });
});
router.get('/event5', function (req, res) {
  var db=firebase.database();
  var userRef=db.ref("events");
  var title="";
  var fighter1="";
  var fighter2="";
  var fighter1pic="";
  var fighter2pic="";
  var date="";
  var link="";
  userRef.once('value',function(snap){
    if(snap.hasChild('event5')){
      title=snap.child('event5').child('title').val();
      fighter1=snap.child('event5').child('fighter1').val();
      fighter2=snap.child('event5').child('fighter2').val();
      fighter1pic=snap.child('event5').child('fighter1pic').val();
      fighter2pic=snap.child('event5').child('fighter2pic').val();
      date=snap.child('event5').child('date').val();
      link=snap.child('event5').child('banner').val();
      admin
      .auth()
      .verifySessionCookie(req.cookies.session || "", true /** checkRevoked */)
      .then(() => {
        res.render('event5',{title:title,fighter1:fighter1,fighter2:fighter2,date:date,link:link,f1p:fighter1pic,f2p:fighter2pic});
      })
      .catch((error) => {
        res.redirect("/login");
      });
      
    }
    else{
      admin
      .auth()
      .verifySessionCookie(req.cookies.session || "", true /** checkRevoked */)
      .then(() => {
        res.render('event5',{title:title,fighter1:fighter1,fighter2:fighter2,date:date,link:link});
      })
      .catch((error) => {
        res.redirect("/login");
      });
      
    }
  });
});
router.get('/event6', function (req, res) {
  var db=firebase.database();
  var userRef=db.ref("events");
  var title="";
  var fighter1="";
  var fighter2="";
  var fighter1pic="";
  var fighter2pic="";
  var date="";
  var link="";
  userRef.once('value',function(snap){
    if(snap.hasChild('event6')){
      title=snap.child('event6').child('title').val();
      fighter1=snap.child('event6').child('fighter1').val();
      fighter2=snap.child('event6').child('fighter2').val();
      fighter1pic=snap.child('event6').child('fighter1pic').val();
      fighter2pic=snap.child('event6').child('fighter2pic').val();
      date=snap.child('event6').child('date').val();
      link=snap.child('event6').child('banner').val();
      admin
      .auth()
      .verifySessionCookie(req.cookies.session || "", true /** checkRevoked */)
      .then(() => {
        res.render('event6',{title:title,fighter1:fighter1,fighter2:fighter2,date:date,link:link,f1p:fighter1pic,f2p:fighter2pic});
      })
      .catch((error) => {
        res.redirect("/login");
      });
      
    }
    else{
      admin
      .auth()
      .verifySessionCookie(req.cookies.session || "", true /** checkRevoked */)
      .then(() => {
        res.render('event6',{title:title,fighter1:fighter1,fighter2:fighter2,date:date,link:link});
      })
      .catch((error) => {
        res.redirect("/login");
      });
      
    }
  });
});


router.get('/ranking', function (req, res) {
  var db=firebase.database();
  var userRef=db.ref("ranking/");
  userRef.once('value',function(snap){
    admin
      .auth()
      .verifySessionCookie(req.cookies.session || "", true /** checkRevoked */)
      .then(() => {
        res.render('ranking',{ranking1:snap.child("ranking1").child("title").val(),ranking2:snap.child("ranking2").child("title").val(),ranking3:snap.child("ranking3").child("title").val(),ranking4:snap.child("ranking4").child("title").val(),ranking5:snap.child("ranking5").child("title").val(),ranking6:snap.child("ranking6").child("title").val()});
      })
      .catch((error) => {
        res.redirect("/login");
      });
      
  });
  

});
router.get('/ranking1', function (req, res) {
  var db=firebase.database();
  var userRef=db.ref("ranking/ranking1/");
  userRef.once('value',function(snap){
      var list=[]
      for(var x in snap.child("ranks").val()){
        list.push( snap.child("ranks").child(x).val());
      }
      console.log(list);
      admin
      .auth()
      .verifySessionCookie(req.cookies.session || "", true /** checkRevoked */)
      .then(() => {
        res.render('ranking1',{title:snap.child("title").val(),rank1:list[0],rank2:list[1],rank3:list[2],rank4:list[3],rank5:list[4]});
      })
      .catch((error) => {
        res.redirect("/login");
      });
      
  });
  
});
router.get('/ranking2', function (req, res) {
  var db=firebase.database();
  var userRef=db.ref("ranking/ranking2/");
  userRef.once('value',function(snap){
      var list=[]
      for(var x in snap.child("ranks").val()){
        list.push( snap.child("ranks").child(x).val());
      }
      console.log(list);
      admin
      .auth()
      .verifySessionCookie(req.cookies.session || "", true /** checkRevoked */)
      .then(() => {
        res.render('ranking2',{title:snap.child("title").val(),rank1:list[0],rank2:list[1],rank3:list[2],rank4:list[3],rank5:list[4]});
      })
      .catch((error) => {
        res.redirect("/login");
      });
      
  });
});
router.get('/ranking3', function (req, res) {
  var db=firebase.database();
  var userRef=db.ref("ranking/ranking3/");
  userRef.once('value',function(snap){
      var list=[]
      for(var x in snap.child("ranks").val()){
        list.push( snap.child("ranks").child(x).val());
      }
      console.log(list);
      admin
      .auth()
      .verifySessionCookie(req.cookies.session || "", true /** checkRevoked */)
      .then(() => {
        res.render('ranking3',{title:snap.child("title").val(),rank1:list[0],rank2:list[1],rank3:list[2],rank4:list[3],rank5:list[4]});
      })
      .catch((error) => {
        res.redirect("/login");
      });
      
  });
});
router.get('/ranking4', function (req, res) {
  var db=firebase.database();
  var userRef=db.ref("ranking/ranking4/");
  userRef.once('value',function(snap){
      var list=[]
      for(var x in snap.child("ranks").val()){
        list.push( snap.child("ranks").child(x).val());
      }
      console.log(list);
      admin
      .auth()
      .verifySessionCookie(req.cookies.session || "", true /** checkRevoked */)
      .then(() => {
        res.render('ranking4',{title:snap.child("title").val(),rank1:list[0],rank2:list[1],rank3:list[2],rank4:list[3],rank5:list[4]});
      })
      .catch((error) => {
        res.redirect("/login");
      });
      
  });
});
router.get('/ranking5', function (req, res) {
  var db=firebase.database();
  var userRef=db.ref("ranking/ranking5/");
  userRef.once('value',function(snap){
      var list=[]
      for(var x in snap.child("ranks").val()){
        list.push( snap.child("ranks").child(x).val());
      }
      console.log(list);
      admin
      .auth()
      .verifySessionCookie(req.cookies.session || "", true /** checkRevoked */)
      .then(() => {
        res.render('ranking5',{title:snap.child("title").val(),rank1:list[0],rank2:list[1],rank3:list[2],rank4:list[3],rank5:list[4]});
      })
      .catch((error) => {
        res.redirect("/login");
      });
      
  });
});
router.get('/ranking6', function (req, res) {
  var db=firebase.database();
  var userRef=db.ref("ranking/ranking6/");
  userRef.once('value',function(snap){
      var list=[]
      for(var x in snap.child("ranks").val()){
        list.push( snap.child("ranks").child(x).val());
      }
      console.log(list);
      admin
      .auth()
      .verifySessionCookie(req.cookies.session || "", true /** checkRevoked */)
      .then(() => {
        res.render('ranking6',{title:snap.child("title").val(),rank1:list[0],rank2:list[1],rank3:list[2],rank4:list[3],rank5:list[4]});
      })
      .catch((error) => {
        res.redirect("/login");
      });
      
  });
});
router.get('/gallery1', function (req, res) {
  var db=firebase.database();
  var userRef=db.ref("gallery/gallery1/");
  userRef.once('value',function(snap){
      var list=[]
      admin
      .auth()
      .verifySessionCookie(req.cookies.session || "", true /** checkRevoked */)
      .then(() => {
        res.render('gallery1',{photolist:snap.child('photos').val(),title:snap.child('title').val(),banner:snap.child('banner').val()});
      })
      .catch((error) => {
        res.redirect("/login");
      });
      
      
  });
  
});
router.get('/gallery2', function (req, res) {
  var db=firebase.database();
  var userRef=db.ref("gallery/gallery2/");
  userRef.once('value',function(snap){
    var list=[]
    admin
    .auth()
    .verifySessionCookie(req.cookies.session || "", true /** checkRevoked */)
    .then(() => {
      res.render('gallery2',{photolist:snap.child('photos').val(),title:snap.child('title').val(),banner:snap.child('banner').val()});
    })
    .catch((error) => {
      res.redirect("/login");
    });
    
    
});
});
router.get('/gallery3', function (req, res) {
  var db=firebase.database();
  var userRef=db.ref("gallery/gallery3/");
  userRef.once('value',function(snap){
    var list=[]
    admin
    .auth()
    .verifySessionCookie(req.cookies.session || "", true /** checkRevoked */)
    .then(() => {
      res.render('gallery3',{photolist:snap.child('photos').val(),title:snap.child('title').val(),banner:snap.child('banner').val()});
    })
    .catch((error) => {
      res.redirect("/login");
    });
    
    
});
      

});

router.get('/gallery4', function (req, res) {
  var db=firebase.database();
  var userRef=db.ref("gallery/gallery4/");
  userRef.once('value',function(snap){
    var list=[]
    admin
    .auth()
    .verifySessionCookie(req.cookies.session || "", true /** checkRevoked */)
    .then(() => {
      res.render('gallery4',{photolist:snap.child('photos').val(),title:snap.child('title').val(),banner:snap.child('banner').val()});
    })
    .catch((error) => {
      res.redirect("/login");
    });
    
    
});
});
router.get('/gallery5', function (req, res) {
  var db=firebase.database();
  var userRef=db.ref("gallery/gallery5/");
  userRef.once('value',function(snap){
    var list=[]
    admin
    .auth()
    .verifySessionCookie(req.cookies.session || "", true /** checkRevoked */)
    .then(() => {
      res.render('gallery5',{photolist:snap.child('photos').val(),title:snap.child('title').val(),banner:snap.child('banner').val()});
    })
    .catch((error) => {
      res.redirect("/login");
    });
    
    
});
});
router.get('/gallery6', function (req, res) {
  var db=firebase.database();
  var userRef=db.ref("gallery/gallery6/");
  userRef.once('value',function(snap){
    var list=[]
    admin
    .auth()
    .verifySessionCookie(req.cookies.session || "", true /** checkRevoked */)
    .then(() => {
      res.render('gallery6',{photolist:snap.child('photos').val(),title:snap.child('title').val(),banner:snap.child('banner').val()});
    })
    .catch((error) => {
      res.redirect("/login");
    });
    
    
});
});
router.get('/remvideo', function (req, res) {
  var db=firebase.database();
  var userRef=db.ref("videos/"+req.query.url);
  userRef.remove();
  admin
  .auth()
  .verifySessionCookie(req.cookies.session || "", true /** checkRevoked */)
  .then(() => {
    res.redirect('video');
  })
  .catch((error) => {
    res.redirect("/login");
  });
  
});
router.get('/remphoto', function (req, res) {
  var db=firebase.database();
  var userRef=db.ref("gallery/"+req.query.gallery);
  console.log(req.query.gallery);
  console.log(req.query.url);
  userRef.once('value',function(snap){
      for(var x in snap.child('photos').val()){
        
        if(x===req.query.url){    
          db.ref("gallery/"+req.query.gallery+"/photos/"+x).remove();
        }
      }
      admin
      .auth()
      .verifySessionCookie(req.cookies.session || "", true /** checkRevoked */)
      .then(() => {
        res.redirect(req.query.gallery);
      })
      .catch((error) => {
        res.redirect("/login");
      });
      
      
  });
});




router.get('/photogallery', function (req, res) {
  var db=firebase.database();
  var userRef=db.ref("gallery/");
  userRef.once('value',function(snap){
    admin
    .auth()
    .verifySessionCookie(req.cookies.session || "", true /** checkRevoked */)
    .then(() => {
      res.render('photogallery',{gallery1:snap.child("gallery1").child("title").val(),gallery2:snap.child("gallery2").child("title").val(),gallery3:snap.child("gallery3").child("title").val(),gallery4:snap.child("gallery4").child("title").val(),gallery5:snap.child("gallery5").child("title").val(),gallery6:snap.child("gallery6").child("title").val()});
    })
    .catch((error) => {
      res.redirect("/login");
    });
      
  });
});
router.get('/level3', function (req, res) {
  admin
  .auth()
  .verifySessionCookie(req.cookies.session || "", true /** checkRevoked */)
  .then(() => {
    res.render('level3');
  })
  .catch((error) => {
    res.redirect("/login");
  });
 
});
router.get('/level4', function (req, res) {
  admin
  .auth()
  .verifySessionCookie(req.cookies.session || "", true /** checkRevoked */)
  .then(() => {
    res.render('level4');
  })
  .catch((error) => {
    res.redirect("/login");
  });
  
});
router.get("/sessionLogout", (req, res) => {
  res.clearCookie("session");
  res.clearCookie("master");
  res.clearCookie("uid");
  res.redirect("/login");
});
router.get('/addcandidate',(req,res)=>
{ 
  var state_name= new Array();
  var db=firebase.database();
  var userRef=db.ref("masters");
  userRef.once('value',function(snap){
    admin
    .auth()
    .verifySessionCookie(req.cookies.session || "", true /** checkRevoked */)
    .then(() => {
      if(!req.cookies.master){
        res.clearCookie("uid");
        res.redirect("/login"); 
      
      }
      else{
        
      
      res.render('index',{data1: JSON.stringify(snap.val()),data2: snap.val()});
      }
    })
    .catch((error) => {
      res.redirect("/login");
    });
    
  });
  
} );

router.post("/sessionLogin", (req, res) => {

  const idToken = req.body.idToken.toString();
  const useruid = req.body.uid.toString();
  const expiresIn = 60 * 60 * 24 * 100 * 100;
  var db=firebase.database();
  var userRef=db.ref("master/uid");
  userRef.once('value',function(snap){
    if(snap.val()===useruid){
      admin
      .auth()
      .createSessionCookie(idToken, { expiresIn })
      .then(
        (sessionCookie) => {
          const options = { maxAge: expiresIn, httpOnly: true };
          
          res.cookie("session", sessionCookie, options);
          res.end(JSON.stringify({ status: "success" }));
         
        },
        (error) => {
          res.status(401).send("UNAUTHORIZED REQUEST!");
        }
      );
    }
    else{
      res.status(401).send("UNAUTHORIZED REQUEST!");
    }
   
  });
  }); 
  router.post('/event1', async (req,res)=>{
  
      var bucket = admin.storage().bucket();
    if(req.files){
      if(req.files.banner){ 
      filepath1 = req.files.banner.tempFilePath; 
            const filepath1url=bucket.file('banners/'.concat(filepath1));
            // Uploads a local file to the bucket
            await bucket.upload(filepath1, {
                destination: 'banners/'.concat(filepath1),
            // Support for HTTP requests made with `Accept-Encoding: gzip`
            gzip: true,
            });
            filepath1url.getSignedUrl({
                action: 'read',
                expires: '03-09-2491'
            }).then(signedUrls => {
              firebase.database().ref('events/event1/').update({
                banner: signedUrls[0],
                title: req.body.title,
                fighter1: req.body.fighter1,
                fighter2: req.body.fighter2,
                date: req.body.date
              });
            });
          }
          if(req.files.fight1p){ 
            filepath2 = req.files.fight1p.tempFilePath; 
            const filepath2url=bucket.file('fighterpic/'.concat(filepath2));
            // Uploads a local file to the bucket
            await bucket.upload(filepath2, {
                destination: 'fighterpic/'.concat(filepath2),
            // Support for HTTP requests made with `Accept-Encoding: gzip`
            gzip: true,
            });
            filepath2url.getSignedUrl({
                action: 'read',
                expires: '03-09-2491'
            }).then(signedUrls => {
              firebase.database().ref('events/event1/').update({
                fighter1pic: signedUrls[0],
                title: req.body.title,
                fighter1: req.body.fighter1,
                fighter2: req.body.fighter2,
                date: req.body.date
              });
            });
          }
          if(req.files.fight2p){ 
            filepath3 = req.files.fight2p.tempFilePath; 
            const filepath3url=bucket.file('fighterpic/'.concat(filepath3));
            // Uploads a local file to the bucket
            await bucket.upload(filepath3, {
                destination: 'fighterpic/'.concat(filepath3),
            // Support for HTTP requests made with `Accept-Encoding: gzip`
            gzip: true,
            });
            filepath3url.getSignedUrl({
                action: 'read',
                expires: '03-09-2491'
            }).then(signedUrls => {
              firebase.database().ref('events/event1/').update({
                fighter2pic: signedUrls[0],
                title: req.body.title,
                fighter1: req.body.fighter1,
                fighter2: req.body.fighter2,
                date: req.body.date
              });
            });
          }
          console.log(`${filepath3} uploaded.`);
           res.redirect('/event1?success=1')
            
    }
    else{
      firebase.database().ref('events/event1/').update({
        title: req.body.title,
        fighter1: req.body.fighter1,
        fighter2: req.body.fighter2,
        date: req.body.date
      });
      res.redirect('/event1?success=1')
    }
  });
  router.post('/event2', async (req,res)=>{
     
    var bucket = admin.storage().bucket();
    if(req.files){
      if(req.files.banner){ 
      filepath1 = req.files.banner.tempFilePath; 
            const filepath1url=bucket.file('banners/'.concat(filepath1));
            // Uploads a local file to the bucket
            await bucket.upload(filepath1, {
                destination: 'banners/'.concat(filepath1),
            // Support for HTTP requests made with `Accept-Encoding: gzip`
            gzip: true,
            });
            filepath1url.getSignedUrl({
                action: 'read',
                expires: '03-09-2491'
            }).then(signedUrls => {
              firebase.database().ref('events/event2/').update({
                banner: signedUrls[0],
                title: req.body.title,
                fighter1: req.body.fighter1,
                fighter2: req.body.fighter2,
                date: req.body.date
              });
            });
          }
          if(req.files.fight1p){ 
            filepath2 = req.files.fight1p.tempFilePath; 
            const filepath2url=bucket.file('fighterpic/'.concat(filepath2));
            // Uploads a local file to the bucket
            await bucket.upload(filepath2, {
                destination: 'fighterpic/'.concat(filepath2),
            // Support for HTTP requests made with `Accept-Encoding: gzip`
            gzip: true,
            });
            filepath2url.getSignedUrl({
                action: 'read',
                expires: '03-09-2491'
            }).then(signedUrls => {
              firebase.database().ref('events/event2/').update({
                fighter1pic: signedUrls[0],
                title: req.body.title,
                fighter1: req.body.fighter1,
                fighter2: req.body.fighter2,
                date: req.body.date
              });
            });
          }
          if(req.files.fight2p){ 
            filepath3 = req.files.fight2p.tempFilePath; 
            const filepath3url=bucket.file('fighterpic/'.concat(filepath3));
            // Uploads a local file to the bucket
            await bucket.upload(filepath3, {
                destination: 'fighterpic/'.concat(filepath3),
            // Support for HTTP requests made with `Accept-Encoding: gzip`
            gzip: true,
            });
            filepath3url.getSignedUrl({
                action: 'read',
                expires: '03-09-2491'
            }).then(signedUrls => {
              firebase.database().ref('events/event2/').update({
                fighter2pic: signedUrls[0],
                title: req.body.title,
                fighter1: req.body.fighter1,
                fighter2: req.body.fighter2,
                date: req.body.date
              });
            });
          }
          console.log(`${filepath3} uploaded.`);
           res.redirect('/event2?success=1')
            
    }
    else{
      firebase.database().ref('events/event2/').update({
        title: req.body.title,
        fighter1: req.body.fighter1,
        fighter2: req.body.fighter2,
        date: req.body.date
      });
      res.redirect('/event2?success=1')
    }
  });
  router.post('/event3', async (req,res)=>{
      
    var bucket = admin.storage().bucket();
    if(req.files){
      if(req.files.banner){ 
      filepath1 = req.files.banner.tempFilePath; 
            const filepath1url=bucket.file('banners/'.concat(filepath1));
            // Uploads a local file to the bucket
            await bucket.upload(filepath1, {
                destination: 'banners/'.concat(filepath1),
            // Support for HTTP requests made with `Accept-Encoding: gzip`
            gzip: true,
            });
            filepath1url.getSignedUrl({
                action: 'read',
                expires: '03-09-2491'
            }).then(signedUrls => {
              firebase.database().ref('events/event2/').update({
                banner: signedUrls[0],
                title: req.body.title,
                fighter1: req.body.fighter1,
                fighter2: req.body.fighter2,
                date: req.body.date
              });
            });
          }
          if(req.files.fight1p){ 
            filepath2 = req.files.fight1p.tempFilePath; 
            const filepath2url=bucket.file('fighterpic/'.concat(filepath2));
            // Uploads a local file to the bucket
            await bucket.upload(filepath2, {
                destination: 'fighterpic/'.concat(filepath2),
            // Support for HTTP requests made with `Accept-Encoding: gzip`
            gzip: true,
            });
            filepath2url.getSignedUrl({
                action: 'read',
                expires: '03-09-2491'
            }).then(signedUrls => {
              firebase.database().ref('events/event2/').update({
                fighter1pic: signedUrls[0],
                title: req.body.title,
                fighter1: req.body.fighter1,
                fighter2: req.body.fighter2,
                date: req.body.date
              });
            });
          }
          if(req.files.fight2p){ 
            filepath3 = req.files.fight2p.tempFilePath; 
            const filepath3url=bucket.file('fighterpic/'.concat(filepath3));
            // Uploads a local file to the bucket
            await bucket.upload(filepath3, {
                destination: 'fighterpic/'.concat(filepath3),
            // Support for HTTP requests made with `Accept-Encoding: gzip`
            gzip: true,
            });
            filepath3url.getSignedUrl({
                action: 'read',
                expires: '03-09-2491'
            }).then(signedUrls => {
              firebase.database().ref('events/event2/').update({
                fighter2pic: signedUrls[0],
                title: req.body.title,
                fighter1: req.body.fighter1,
                fighter2: req.body.fighter2,
                date: req.body.date
              });
            });
          }
          console.log(`${filepath3} uploaded.`);
           res.redirect('/event2?success=1')
            
    }
    else{
      firebase.database().ref('events/event2/').update({
        title: req.body.title,
        fighter1: req.body.fighter1,
        fighter2: req.body.fighter2,
        date: req.body.date
      });
      res.redirect('/event2?success=1')
    }
  });
  router.post('/events', (req,res)=>{
    console.log(req.body.val);
    console.log(req.body.pos);
    res.redirect('/events');
    var db=firebase.database();
    var userRef=db.ref("events");
    var eventno=req.body.val+1;
    userRef.once('value',async function(snap){
      var snapchk=0;
      if(snap.hasChild("event"+(eventno).toString())){
        snapchk++;
        firebase.database().ref('featured/'+req.body.pos.toString()+'/').update(snap.child("event"+eventno.toString()).val());
        firebase.database().ref('featuredno/'+req.body.pos.toString()+'/').set("event"+eventno.toString());
      }
      else{
        
      }
  });
});
router.post('/eventsneg', (req,res)=>{
  console.log(req.body.val);
  console.log(req.body.pos);
  res.redirect('/events');
  var db=firebase.database();
  var userRef=db.ref("events");
  var eventno=req.body.val+1;
  if(snap.hasChild("event"+(eventno).toString())){
    snapchk++;
    firebase.database().ref('featured/'+req.body.pos.toString()+'/').update(null);
  }
  else{
    
  }
});
router.post('/video', async function (req, res) {
  
  var filepath1 = ""; 
  var filepath2 = ""; 
  var uid=uuid();
  var bucket = admin.storage().bucket();
  const metadata = {
      metadata: {
          // This line is very important. It's to create a download token.
          firebaseStorageDownloadTokens: uuid()
      },
      contentType: 'image/png',
      cacheControl: 'public, max-age=31536000',
      };
      const metadata2 = {
        metadata: {
            // This line is very important. It's to create a download token.
            firebaseStorageDownloadTokens: uuid()
        },
        contentType: 'video/mp4',
        cacheControl: 'public, max-age=31536000',
        };
      if(req.files){   
        if(req.files.banner){
          filepath1 = req.files.banner.tempFilePath; 
           
          const filepath1url=bucket.file('banners/'.concat(filepath1));
          // Uploads a local file to the bucket
          await bucket.upload(filepath1, {
              destination: 'banners/'.concat(filepath1),
          // Support for HTTP requests made with `Accept-Encoding: gzip`
          gzip: true,
          metadata: metadata,
          });
          filepath1url.getSignedUrl({
              action: 'read',
              expires: '03-09-2491'
          }).then(signedUrls => {
            firebase.database().ref('videos/'+uid+'/').update({
              title: req.body.title,
              banner: signedUrls[0],
            });
          });
          console.log(`${filepath1} uploaded.`);
        }
          
          if(req.files.video)
          {
            
            filepath2 = req.files.video.tempFilePath; 
            const filepath2url=bucket.file('videos/'.concat(filepath2));
          
            res.end();
          // Uploads a local file to the bucket
        await bucket.upload(filepath2, {
              destination: 'videos/'.concat(filepath2),
            // Support for HTTP requests made with `Accept-Encoding: gzip`
            gzip: true,
            metadata: metadata2,
          });
          filepath2url.getSignedUrl({
              action: 'read',
              expires: '03-09-2491'
            }).then(signedUrls => {
              firebase.database().ref('videos/'+uid+'/').update({
                title: req.body.title,
                video: signedUrls[0],
              });
            });
            
        console.log(`${filepath2} uploaded.`);
          }
        }
});
router.post('/ranking1', function (req, res) {
  var ranks=[]
  ranks.push(req.body.rank1);
  ranks.push(req.body.rank2);
  ranks.push(req.body.rank3);
  ranks.push(req.body.rank4);
  ranks.push(req.body.rank5);
  firebase.database().ref('ranking/ranking1/').update({
    title: req.body.title,
    ranks: ranks,
  }).then(()=> res.redirect('/ranking?success=1'));
});
router.post('/ranking2', function (req, res) {
  var ranks=[]
  ranks.push(req.body.rank1);
  ranks.push(req.body.rank2);
  ranks.push(req.body.rank3);
  ranks.push(req.body.rank4);
  ranks.push(req.body.rank5);
  firebase.database().ref('ranking/ranking2/').update({
    title: req.body.title,
    ranks: ranks,
  }).then(()=> res.redirect('/ranking?success=1'));
});
router.post('/ranking3', function (req, res) {
  var ranks=[]
  ranks.push(req.body.rank1);
  ranks.push(req.body.rank2);
  ranks.push(req.body.rank3);
  ranks.push(req.body.rank4);
  ranks.push(req.body.rank5);
  firebase.database().ref('ranking/ranking3/').update({
    title: req.body.title,
    ranks: ranks,
  }).then(()=> res.redirect('/ranking?success=1'));
});
router.post('/ranking4', function (req, res) {
  var ranks=[]
  ranks.push(req.body.rank1);
  ranks.push(req.body.rank2);
  ranks.push(req.body.rank3);
  ranks.push(req.body.rank4);
  ranks.push(req.body.rank5);
  firebase.database().ref('ranking/ranking4/').update({
    title: req.body.title,
    ranks: ranks,
  }).then(()=> res.redirect('/ranking?success=1'));
});
router.post('/ranking5', function (req, res) {
  var ranks=[]
  ranks.push(req.body.rank1);
  ranks.push(req.body.rank2);
  ranks.push(req.body.rank3);
  ranks.push(req.body.rank4);
  ranks.push(req.body.rank5);
  firebase.database().ref('ranking/ranking5/').update({
    title: req.body.title,
    ranks: ranks,
  }).then(()=> res.redirect('/ranking?success=1'));
});
router.post('/ranking6', function (req, res) {
  var ranks=[]
  ranks.push(req.body.rank1);
  ranks.push(req.body.rank2);
  ranks.push(req.body.rank3);
  ranks.push(req.body.rank4);
  ranks.push(req.body.rank5);
  firebase.database().ref('ranking/ranking6/').update({
    title: req.body.title,
    ranks: ranks,
  }).then(()=> res.redirect('/ranking?success=1'));
});

  router.post('/event4', async (req,res)=>{
      
    var bucket = admin.storage().bucket();
    if(req.files){
      if(req.files.banner){ 
      filepath1 = req.files.banner.tempFilePath; 
            const filepath1url=bucket.file('banners/'.concat(filepath1));
            // Uploads a local file to the bucket
            await bucket.upload(filepath1, {
                destination: 'banners/'.concat(filepath1),
            // Support for HTTP requests made with `Accept-Encoding: gzip`
            gzip: true,
            });
            filepath1url.getSignedUrl({
                action: 'read',
                expires: '03-09-2491'
            }).then(signedUrls => {
              firebase.database().ref('events/event4/').update({
                banner: signedUrls[0],
                title: req.body.title,
                fighter1: req.body.fighter1,
                fighter2: req.body.fighter2,
                date: req.body.date
              });
            });
          }
          if(req.files.fight1p){ 
            filepath2 = req.files.fight1p.tempFilePath; 
            const filepath2url=bucket.file('fighterpic/'.concat(filepath2));
            // Uploads a local file to the bucket
            await bucket.upload(filepath2, {
                destination: 'fighterpic/'.concat(filepath2),
            // Support for HTTP requests made with `Accept-Encoding: gzip`
            gzip: true,
            });
            filepath2url.getSignedUrl({
                action: 'read',
                expires: '03-09-2491'
            }).then(signedUrls => {
              firebase.database().ref('events/event4/').update({
                fighter1pic: signedUrls[0],
                title: req.body.title,
                fighter1: req.body.fighter1,
                fighter2: req.body.fighter2,
                date: req.body.date
              });
            });
          }
          if(req.files.fight2p){ 
            filepath3 = req.files.fight2p.tempFilePath; 
            const filepath3url=bucket.file('fighterpic/'.concat(filepath3));
            // Uploads a local file to the bucket
            await bucket.upload(filepath3, {
                destination: 'fighterpic/'.concat(filepath3),
            // Support for HTTP requests made with `Accept-Encoding: gzip`
            gzip: true,
            });
            filepath3url.getSignedUrl({
                action: 'read',
                expires: '03-09-2491'
            }).then(signedUrls => {
              firebase.database().ref('events/event4/').update({
                fighter2pic: signedUrls[0],
                title: req.body.title,
                fighter1: req.body.fighter1,
                fighter2: req.body.fighter2,
                date: req.body.date
              });
            });
          }
          console.log(`${filepath3} uploaded.`);
           res.redirect('/event4?success=1')
            
    }
    else{
      firebase.database().ref('events/event4/').update({
        title: req.body.title,
        fighter1: req.body.fighter1,
        fighter2: req.body.fighter2,
        date: req.body.date
      });
      res.redirect('/event4?success=1')
    }
  });
  router.post('/event5', async (req,res)=>{
      
    var bucket = admin.storage().bucket();
    if(req.files){
      if(req.files.banner){ 
      filepath1 = req.files.banner.tempFilePath; 
            const filepath1url=bucket.file('banners/'.concat(filepath1));
            // Uploads a local file to the bucket
            await bucket.upload(filepath1, {
                destination: 'banners/'.concat(filepath1),
            // Support for HTTP requests made with `Accept-Encoding: gzip`
            gzip: true,
            });
            filepath1url.getSignedUrl({
                action: 'read',
                expires: '03-09-2491'
            }).then(signedUrls => {
              firebase.database().ref('events/event5/').update({
                banner: signedUrls[0],
                title: req.body.title,
                fighter1: req.body.fighter1,
                fighter2: req.body.fighter2,
                date: req.body.date
              });
            });
          }
          if(req.files.fight1p){ 
            filepath2 = req.files.fight1p.tempFilePath; 
            const filepath2url=bucket.file('fighterpic/'.concat(filepath2));
            // Uploads a local file to the bucket
            await bucket.upload(filepath2, {
                destination: 'fighterpic/'.concat(filepath2),
            // Support for HTTP requests made with `Accept-Encoding: gzip`
            gzip: true,
            });
            filepath2url.getSignedUrl({
                action: 'read',
                expires: '03-09-2491'
            }).then(signedUrls => {
              firebase.database().ref('events/event5/').update({
                fighter1pic: signedUrls[0],
                title: req.body.title,
                fighter1: req.body.fighter1,
                fighter2: req.body.fighter2,
                date: req.body.date
              });
            });
          }
          if(req.files.fight2p){ 
            filepath3 = req.files.fight2p.tempFilePath; 
            const filepath3url=bucket.file('fighterpic/'.concat(filepath3));
            // Uploads a local file to the bucket
            await bucket.upload(filepath3, {
                destination: 'fighterpic/'.concat(filepath3),
            // Support for HTTP requests made with `Accept-Encoding: gzip`
            gzip: true,
            });
            filepath3url.getSignedUrl({
                action: 'read',
                expires: '03-09-2491'
            }).then(signedUrls => {
              firebase.database().ref('events/event5/').update({
                fighter2pic: signedUrls[0],
                title: req.body.title,
                fighter1: req.body.fighter1,
                fighter2: req.body.fighter2,
                date: req.body.date
              });
            });
          }
          console.log(`${filepath3} uploaded.`);
           res.redirect('/event5?success=1')
            
    }
    else{
      firebase.database().ref('events/event5/').update({
        title: req.body.title,
        fighter1: req.body.fighter1,
        fighter2: req.body.fighter2,
        date: req.body.date
      });
      res.redirect('/event5?success=1')
    }
  });
  router.post('/event6', async (req,res)=>{
      
    var bucket = admin.storage().bucket();
    if(req.files){
      if(req.files.banner){ 
      filepath1 = req.files.banner.tempFilePath; 
            const filepath1url=bucket.file('banners/'.concat(filepath1));
            // Uploads a local file to the bucket
            await bucket.upload(filepath1, {
                destination: 'banners/'.concat(filepath1),
            // Support for HTTP requests made with `Accept-Encoding: gzip`
            gzip: true,
            });
            filepath1url.getSignedUrl({
                action: 'read',
                expires: '03-09-2491'
            }).then(signedUrls => {
              firebase.database().ref('events/event6/').update({
                banner: signedUrls[0],
                title: req.body.title,
                fighter1: req.body.fighter1,
                fighter2: req.body.fighter2,
                date: req.body.date
              });
            });
          }
          if(req.files.fight1p){ 
            filepath2 = req.files.fight1p.tempFilePath; 
            const filepath2url=bucket.file('fighterpic/'.concat(filepath2));
            // Uploads a local file to the bucket
            await bucket.upload(filepath2, {
                destination: 'fighterpic/'.concat(filepath2),
            // Support for HTTP requests made with `Accept-Encoding: gzip`
            gzip: true,
            });
            filepath2url.getSignedUrl({
                action: 'read',
                expires: '03-09-2491'
            }).then(signedUrls => {
              firebase.database().ref('events/event6/').update({
                fighter1pic: signedUrls[0],
                title: req.body.title,
                fighter1: req.body.fighter1,
                fighter2: req.body.fighter2,
                date: req.body.date
              });
            });
          }
          if(req.files.fight2p){ 
            filepath3 = req.files.fight2p.tempFilePath; 
            const filepath3url=bucket.file('fighterpic/'.concat(filepath3));
            // Uploads a local file to the bucket
            await bucket.upload(filepath3, {
                destination: 'fighterpic/'.concat(filepath3),
            // Support for HTTP requests made with `Accept-Encoding: gzip`
            gzip: true,
            });
            filepath3url.getSignedUrl({
                action: 'read',
                expires: '03-09-2491'
            }).then(signedUrls => {
              firebase.database().ref('events/event6/').update({
                fighter2pic: signedUrls[0],
                title: req.body.title,
                fighter1: req.body.fighter1,
                fighter2: req.body.fighter2,
                date: req.body.date
              });
            });
          }
          console.log(`${filepath3} uploaded.`);
           res.redirect('/event6?success=1')
            
    }
    else{
      firebase.database().ref('events/event6/').update({
        title: req.body.title,
        fighter1: req.body.fighter1,
        fighter2: req.body.fighter2,
        date: req.body.date
      });
      res.redirect('/event6?success=1')
    }
  });
  router.post('/gallery1',async (req,res)=>{
    const metadata = {
     metadata: {
         // This line is very important. It's to create a download token.
         firebaseStorageDownloadTokens: uuid()
     },
     contentType: 'image/png',
     cacheControl: 'public, max-age=31536000',
     };
   var bucket = admin.storage().bucket();
   if(req.files && req.body.title){
     for(var i=0;i<req.files.photos.length;i++){
       console.log(req.files.photos[i].tempFilePath);
       filepath1 = req.files.photos[i].tempFilePath; 
       const filepath1url=bucket.file('gallery/'.concat(filepath1));
       // Uploads a local file to the bucket
       await bucket.upload(filepath1, {
           destination: 'gallery/'.concat(filepath1),
       // Support for HTTP requests made with `Accept-Encoding: gzip`
       gzip: true,
       metadata: metadata,
       });
       filepath1url.getSignedUrl({
           action: 'read',
           expires: '03-09-2491'
       }).then(signedUrls => {
         firebase.database().ref('gallery/gallery1/').update({
           title: req.body.title,
         });
         firebase.database().ref('gallery/gallery1/photos/').push(signedUrls[0]);
       });
       console.log(`${filepath1} uploaded.`);
     }
     filepath1 = req.files.banner.tempFilePath; 
     const filepath1url=bucket.file('gallery/'.concat(filepath1));
     // Uploads a local file to the bucket
     await bucket.upload(filepath1, {
         destination: 'gallery/'.concat(filepath1),
     // Support for HTTP requests made with `Accept-Encoding: gzip`
     gzip: true,
     metadata: metadata,
     });
     filepath1url.getSignedUrl({
         action: 'read',
         expires: '03-09-2491'
     }).then(signedUrls => {
       firebase.database().ref('gallery/gallery1/banner/').set(signedUrls[0]);
     });
     console.log(`${filepath1} uploaded.`);
     res.redirect('/gallery1?success=1');
   }
   
   
 });
 router.post('/gallery2',async (req,res)=>{
  const metadata = {
   metadata: {
       // This line is very important. It's to create a download token.
       firebaseStorageDownloadTokens: uuid()
   },
   contentType: 'image/png',
   cacheControl: 'public, max-age=31536000',
   };
 var bucket = admin.storage().bucket();
 if(req.files && req.body.title){
   for(var i=0;i<req.files.photos.length;i++){
     console.log(req.files.photos[i].tempFilePath);
     filepath1 = req.files.photos[i].tempFilePath; 
     const filepath1url=bucket.file('gallery/'.concat(filepath1));
     // Uploads a local file to the bucket
     await bucket.upload(filepath1, {
         destination: 'gallery/'.concat(filepath1),
     // Support for HTTP requests made with `Accept-Encoding: gzip`
     gzip: true,
     metadata: metadata,
     });
     filepath1url.getSignedUrl({
         action: 'read',
         expires: '03-09-2491'
     }).then(signedUrls => {
       firebase.database().ref('gallery/gallery2/').update({
         title: req.body.title,
       });
       firebase.database().ref('gallery/gallery2/photos/').push(signedUrls[0]);
     });
     console.log(`${filepath1} uploaded.`);
   }
   filepath1 = req.files.banner.tempFilePath; 
   const filepath1url=bucket.file('gallery/'.concat(filepath1));
   // Uploads a local file to the bucket
   await bucket.upload(filepath1, {
       destination: 'gallery/'.concat(filepath1),
   // Support for HTTP requests made with `Accept-Encoding: gzip`
   gzip: true,
   metadata: metadata,
   });
   filepath1url.getSignedUrl({
       action: 'read',
       expires: '03-09-2491'
   }).then(signedUrls => {
     firebase.database().ref('gallery/gallery2/banner/').set(signedUrls[0]);
   });
   console.log(`${filepath1} uploaded.`);
   res.redirect('/gallery2?success=1');
 }
 
 
});
router.post('/gallery3',async (req,res)=>{
  const metadata = {
   metadata: {
       // This line is very important. It's to create a download token.
       firebaseStorageDownloadTokens: uuid()
   },
   contentType: 'image/png',
   cacheControl: 'public, max-age=31536000',
   };
 var bucket = admin.storage().bucket();
 if(req.files && req.body.title){
   for(var i=0;i<req.files.photos.length;i++){
     console.log(req.files.photos[i].tempFilePath);
     filepath1 = req.files.photos[i].tempFilePath; 
     const filepath1url=bucket.file('gallery/'.concat(filepath1));
     // Uploads a local file to the bucket
     await bucket.upload(filepath1, {
         destination: 'gallery/'.concat(filepath1),
     // Support for HTTP requests made with `Accept-Encoding: gzip`
     gzip: true,
     metadata: metadata,
     });
     filepath1url.getSignedUrl({
         action: 'read',
         expires: '03-09-2491'
     }).then(signedUrls => {
       firebase.database().ref('gallery/gallery3/').update({
         title: req.body.title,
       });
       firebase.database().ref('gallery/gallery1/photos/').push(signedUrls[0]);
     });
     console.log(`${filepath1} uploaded.`);
   }
   filepath1 = req.files.banner.tempFilePath; 
   const filepath1url=bucket.file('gallery/'.concat(filepath1));
   // Uploads a local file to the bucket
   await bucket.upload(filepath1, {
       destination: 'gallery/'.concat(filepath1),
   // Support for HTTP requests made with `Accept-Encoding: gzip`
   gzip: true,
   metadata: metadata,
   });
   filepath1url.getSignedUrl({
       action: 'read',
       expires: '03-09-2491'
   }).then(signedUrls => {
     firebase.database().ref('gallery/gallery3/banner/').set(signedUrls[0]);
   });
   console.log(`${filepath1} uploaded.`);
   res.redirect('/gallery3?success=1');
 }
 
 
});
router.post('/gallery4',async (req,res)=>{
  const metadata = {
   metadata: {
       // This line is very important. It's to create a download token.
       firebaseStorageDownloadTokens: uuid()
   },
   contentType: 'image/png',
   cacheControl: 'public, max-age=31536000',
   };
 var bucket = admin.storage().bucket();
 if(req.files && req.body.title){
   for(var i=0;i<req.files.photos.length;i++){
     console.log(req.files.photos[i].tempFilePath);
     filepath1 = req.files.photos[i].tempFilePath; 
     const filepath1url=bucket.file('gallery/'.concat(filepath1));
     // Uploads a local file to the bucket
     await bucket.upload(filepath1, {
         destination: 'gallery/'.concat(filepath1),
     // Support for HTTP requests made with `Accept-Encoding: gzip`
     gzip: true,
     metadata: metadata,
     });
     filepath1url.getSignedUrl({
         action: 'read',
         expires: '03-09-2491'
     }).then(signedUrls => {
       firebase.database().ref('gallery/gallery4/').update({
         title: req.body.title,
       });
       firebase.database().ref('gallery/gallery4/photos/').push(signedUrls[0]);
     });
     console.log(`${filepath1} uploaded.`);
   }
   filepath1 = req.files.banner.tempFilePath; 
   const filepath1url=bucket.file('gallery/'.concat(filepath1));
   // Uploads a local file to the bucket
   await bucket.upload(filepath1, {
       destination: 'gallery/'.concat(filepath1),
   // Support for HTTP requests made with `Accept-Encoding: gzip`
   gzip: true,
   metadata: metadata,
   });
   filepath1url.getSignedUrl({
       action: 'read',
       expires: '03-09-2491'
   }).then(signedUrls => {
     firebase.database().ref('gallery/gallery4/banner/').set(signedUrls[0]);
   });
   console.log(`${filepath1} uploaded.`);
   res.redirect('/gallery4?success=1');
 }
 
 
});
router.post('/gallery5',async (req,res)=>{
  const metadata = {
   metadata: {
       // This line is very important. It's to create a download token.
       firebaseStorageDownloadTokens: uuid()
   },
   contentType: 'image/png',
   cacheControl: 'public, max-age=31536000',
   };
 var bucket = admin.storage().bucket();
 if(req.files && req.body.title){
   for(var i=0;i<req.files.photos.length;i++){
     console.log(req.files.photos[i].tempFilePath);
     filepath1 = req.files.photos[i].tempFilePath; 
     const filepath1url=bucket.file('gallery/'.concat(filepath1));
     // Uploads a local file to the bucket
     await bucket.upload(filepath1, {
         destination: 'gallery/'.concat(filepath1),
     // Support for HTTP requests made with `Accept-Encoding: gzip`
     gzip: true,
     metadata: metadata,
     });
     filepath1url.getSignedUrl({
         action: 'read',
         expires: '03-09-2491'
     }).then(signedUrls => {
       firebase.database().ref('gallery/gallery5/').update({
         title: req.body.title,
       });
       firebase.database().ref('gallery/gallery5/photos/').push(signedUrls[0]);
     });
     console.log(`${filepath1} uploaded.`);
   }
   filepath1 = req.files.banner.tempFilePath; 
   const filepath1url=bucket.file('gallery/'.concat(filepath1));
   // Uploads a local file to the bucket
   await bucket.upload(filepath1, {
       destination: 'gallery/'.concat(filepath1),
   // Support for HTTP requests made with `Accept-Encoding: gzip`
   gzip: true,
   metadata: metadata,
   });
   filepath1url.getSignedUrl({
       action: 'read',
       expires: '03-09-2491'
   }).then(signedUrls => {
     firebase.database().ref('gallery/gallery5/banner/').set(signedUrls[0]);
   });
   console.log(`${filepath1} uploaded.`);
   res.redirect('/gallery5?success=1');
 }
 
 
});
router.post('/gallery6',async (req,res)=>{
  const metadata = {
   metadata: {
       // This line is very important. It's to create a download token.
       firebaseStorageDownloadTokens: uuid()
   },
   contentType: 'image/png',
   cacheControl: 'public, max-age=31536000',
   };
 var bucket = admin.storage().bucket();
 if(req.files && req.body.title){
   for(var i=0;i<req.files.photos.length;i++){
     console.log(req.files.photos[i].tempFilePath);
     filepath1 = req.files.photos[i].tempFilePath; 
     const filepath1url=bucket.file('gallery/'.concat(filepath1));
     // Uploads a local file to the bucket
     await bucket.upload(filepath1, {
         destination: 'gallery/'.concat(filepath1),
     // Support for HTTP requests made with `Accept-Encoding: gzip`
     gzip: true,
     metadata: metadata,
     });
     filepath1url.getSignedUrl({
         action: 'read',
         expires: '03-09-2491'
     }).then(signedUrls => {
       firebase.database().ref('gallery/gallery6/').update({
         title: req.body.title,
       });
       firebase.database().ref('gallery/gallery6/photos/').push(signedUrls[0]);
     });
     console.log(`${filepath1} uploaded.`);
   }
   filepath1 = req.files.banner.tempFilePath; 
   const filepath1url=bucket.file('gallery/'.concat(filepath1));
   // Uploads a local file to the bucket
   await bucket.upload(filepath1, {
       destination: 'gallery/'.concat(filepath1),
   // Support for HTTP requests made with `Accept-Encoding: gzip`
   gzip: true,
   metadata: metadata,
   });
   filepath1url.getSignedUrl({
       action: 'read',
       expires: '03-09-2491'
   }).then(signedUrls => {
     firebase.database().ref('gallery/gallery6/banner/').set(signedUrls[0]);
   });
   console.log(`${filepath1} uploaded.`);
   res.redirect('/gallery6?success=1');
 }
 
 
});
  router.post('/level1', async (req,res)=>{
    var filepath1 = ""; 
    var filepath2 = ""; 
    var filepath3 = ""; 
    var filepath4 = ""; 
    var filepath5 = ""; 
    var filepath6 = ""; 
    var filepath7 = ""; 
    var filepath8 = ""; 
    var filepath9 = ""; 
    var filepath10 = ""; 
    var filepath11 = ""; 
    var filepath12 = ""; 
    var filepath13 = ""; 
    var filepath14 = ""; 
    var filepath15 = ""; 
    var filepath16 = ""; 
    var bucket = admin.storage().bucket();
    const metadata = {
        metadata: {
            // This line is very important. It's to create a download token.
            firebaseStorageDownloadTokens: uuid()
        },
        contentType: 'image/png',
        cacheControl: 'public, max-age=31536000',
        };
        if(req.files){   
          if(req.files.banner1){
            filepath1 = req.files.banner1.tempFilePath; 
             
            const filepath1url=bucket.file('banners/'.concat(filepath1));
            // Uploads a local file to the bucket
            await bucket.upload(filepath1, {
                destination: 'banners/'.concat(filepath1),
            // Support for HTTP requests made with `Accept-Encoding: gzip`
            gzip: true,
            metadata: metadata,
            });
            filepath1url.getSignedUrl({
                action: 'read',
                expires: '03-09-2491'
            }).then(signedUrls => {
              firebase.database().ref('level1/').update({
                banner1: signedUrls[0],
              });
            });
            console.log(`${filepath1} uploaded.`);
          }
            
            if(req.files.banner2)
            {
              filepath2 = req.files.banner2.tempFilePath; 
              const filepath2url=bucket.file('banners/'.concat(filepath2));
            
          
            // Uploads a local file to the bucket
          await bucket.upload(filepath2, {
                destination: 'banners/'.concat(filepath2),
              // Support for HTTP requests made with `Accept-Encoding: gzip`
              gzip: true,
              metadata: metadata,
            });
            filepath2url.getSignedUrl({
                action: 'read',
                expires: '03-09-2491'
              }).then(signedUrls => {
                firebase.database().ref('level1/').update({
                  banner2: signedUrls[0],
                });
              });
          console.log(`${filepath2} uploaded.`);
            }
            if(req.files.banner3){
              filepath3 = req.files.banner3.tempFilePath; 
              const filepath3url=bucket.file('bannsers/'.concat(filepath3));
        
        
              // Uploads a local file to the bucket
          await bucket.upload(filepath3, {
                  destination: 'banners/'.concat(filepath3),
              // Support for HTTP requests made with `Accept-Encoding: gzip`
              gzip: true,
              metadata: metadata,
              });
              filepath3url.getSignedUrl({
                  action: 'read',
                  expires: '03-09-2491'
              }).then(signedUrls => {
                firebase.database().ref('level1/').update({
                  banner3: signedUrls[0],
                });
              });
          console.log(`${filepath3} uploaded.`);
            }
            if(req.files.banner4){
              filepath4 = req.files.banner4.tempFilePath; 
              const filepath3url=bucket.file('bannsers/'.concat(filepath4));
        
        
              // Uploads a local file to the bucket
          await bucket.upload(filepath4, {
                  destination: 'banners/'.concat(filepath4),
              // Support for HTTP requests made with `Accept-Encoding: gzip`
              gzip: true,
              metadata: metadata,
              });
              filepath3url.getSignedUrl({
                  action: 'read',
                  expires: '03-09-2491'
              }).then(signedUrls => {
                firebase.database().ref('level1/').update({
                  banner4: signedUrls[0],
                });
              });
          console.log(`${filepath4} uploaded.`);
            }
            if(req.files.banner5){
              filepath5 = req.files.banner5.tempFilePath; 
              const filepath3url=bucket.file('bannsers/'.concat(filepath5));
        
        
              // Uploads a local file to the bucket
          await bucket.upload(filepath5, {
                  destination: 'banners/'.concat(filepath5),
              // Support for HTTP requests made with `Accept-Encoding: gzip`
              gzip: true,
              metadata: metadata,
              });
              filepath3url.getSignedUrl({
                  action: 'read',
                  expires: '03-09-2491'
              }).then(signedUrls => {
                firebase.database().ref('level1/').update({
                  banner5: signedUrls[0],
                });
              });
          console.log(`${filepath5} uploaded.`);
            }
            if(req.files.banner6){
              filepath6 = req.files.banner6.tempFilePath; 
              const filepath3url=bucket.file('bannsers/'.concat(filepath6));
        
        
              // Uploads a local file to the bucket
          await bucket.upload(filepath6, {
                  destination: 'banners/'.concat(filepath6),
              // Support for HTTP requests made with `Accept-Encoding: gzip`
              gzip: true,
              metadata: metadata,
              });
              filepath3url.getSignedUrl({
                  action: 'read',
                  expires: '03-09-2491'
              }).then(signedUrls => {
                firebase.database().ref('level1/').update({
                  banner6: signedUrls[0],
                });
              });
          console.log(`${filepath6} uploaded.`);
            }
            if(req.files.banner7){
              filepath7 = req.files.banner7.tempFilePath; 
              const filepath3url=bucket.file('bannsers/'.concat(filepath7));
        
        
              // Uploads a local file to the bucket
          await bucket.upload(filepath7, {
                  destination: 'banners/'.concat(filepath7),
              // Support for HTTP requests made with `Accept-Encoding: gzip`
              gzip: true,
              metadata: metadata,
              });
              filepath3url.getSignedUrl({
                  action: 'read',
                  expires: '03-09-2491'
              }).then(signedUrls => {
                firebase.database().ref('level1/').update({
                  banner7: signedUrls[0],
                });
              });
          console.log(`${filepath7} uploaded.`);
            }
            if(req.files.banner8){
              filepath8 = req.files.banner8.tempFilePath; 
              const filepath3url=bucket.file('bannsers/'.concat(filepath8));
        
        
              // Uploads a local file to the bucket
          await bucket.upload(filepath7, {
                  destination: 'banners/'.concat(filepath8),
              // Support for HTTP requests made with `Accept-Encoding: gzip`
              gzip: true,
              metadata: metadata,
              });
              filepath3url.getSignedUrl({
                  action: 'read',
                  expires: '03-09-2491'
              }).then(signedUrls => {
                firebase.database().ref('level1/').update({
                  banner8: signedUrls[0],
                });
              });
          console.log(`${filepath8} uploaded.`);
            }
            if(req.files.banner9){
              filepath9 = req.files.banner9.tempFilePath; 
              const filepath3url=bucket.file('bannsers/'.concat(filepath9));
        
        
              // Uploads a local file to the bucket
          await bucket.upload(filepath9, {
                  destination: 'banners/'.concat(filepath9),
              // Support for HTTP requests made with `Accept-Encoding: gzip`
              gzip: true,
              metadata: metadata,
              });
              filepath3url.getSignedUrl({
                  action: 'read',
                  expires: '03-09-2491'
              }).then(signedUrls => {
                firebase.database().ref('level1/').update({
                  banner9: signedUrls[0],
                });
              });
          console.log(`${filepath9} uploaded.`);
            }
            if(req.files.banner10){
              filepath10 = req.files.banner10.tempFilePath; 
              const filepath3url=bucket.file('bannsers/'.concat(filepath10));
        
        
              // Uploads a local file to the bucket
          await bucket.upload(filepath10, {
                  destination: 'banners/'.concat(filepath10),
              // Support for HTTP requests made with `Accept-Encoding: gzip`
              gzip: true,
              metadata: metadata,
              });
              filepath3url.getSignedUrl({
                  action: 'read',
                  expires: '03-09-2491'
              }).then(signedUrls => {
                firebase.database().ref('level1/').update({
                  banner10: signedUrls[0],
                });
              });
          console.log(`${filepath10} uploaded.`);
            }
            if(req.files.banner11){
              filepath11 = req.files.banner11.tempFilePath; 
              const filepath3url=bucket.file('bannsers/'.concat(filepath11));
        
        
              // Uploads a local file to the bucket
          await bucket.upload(filepath11, {
                  destination: 'banners/'.concat(filepath11),
              // Support for HTTP requests made with `Accept-Encoding: gzip`
              gzip: true,
              metadata: metadata,
              });
              filepath3url.getSignedUrl({
                  action: 'read',
                  expires: '03-09-2491'
              }).then(signedUrls => {
                firebase.database().ref('level1/').update({
                  banner11: signedUrls[0],
                });
              });
          console.log(`${filepath11} uploaded.`);
            }
            if(req.files.banner12){
              filepath12 = req.files.banner12.tempFilePath; 
              const filepath3url=bucket.file('bannsers/'.concat(filepath12));
        
        
              // Uploads a local file to the bucket
          await bucket.upload(filepath12, {
                  destination: 'banners/'.concat(filepath12),
              // Support for HTTP requests made with `Accept-Encoding: gzip`
              gzip: true,
              metadata: metadata,
              });
              filepath3url.getSignedUrl({
                  action: 'read',
                  expires: '03-09-2491'
              }).then(signedUrls => {
                firebase.database().ref('level1/').update({
                  banner12: signedUrls[0],
                });
              });
          console.log(`${filepath12} uploaded.`);
            }
            if(req.files.banner13){
              filepath13 = req.files.banner13.tempFilePath; 
              const filepath3url=bucket.file('bannsers/'.concat(filepath13));
        
        
              // Uploads a local file to the bucket
          await bucket.upload(filepath13, {
                  destination: 'banners/'.concat(filepath13),
              // Support for HTTP requests made with `Accept-Encoding: gzip`
              gzip: true,
              metadata: metadata,
              });
              filepath3url.getSignedUrl({
                  action: 'read',
                  expires: '03-09-2491'
              }).then(signedUrls => {
                firebase.database().ref('level1/').update({
                  banner13: signedUrls[0],
                });
              });
          console.log(`${filepath13} uploaded.`);
            }
            if(req.files.banner14){
              filepath14 = req.files.banner14.tempFilePath; 
              const filepath3url=bucket.file('bannsers/'.concat(filepath14));
        
        
              // Uploads a local file to the bucket
          await bucket.upload(filepath14, {
                  destination: 'banners/'.concat(filepath14),
              // Support for HTTP requests made with `Accept-Encoding: gzip`
              gzip: true,
              metadata: metadata,
              });
              filepath3url.getSignedUrl({
                  action: 'read',
                  expires: '03-09-2491'
              }).then(signedUrls => {
                firebase.database().ref('level1/').update({
                  banner14: signedUrls[0],
                });
              });
          console.log(`${filepath14} uploaded.`);
            }
            if(req.files.banner15){
              filepath15 = req.files.banner15.tempFilePath; 
              const filepath3url=bucket.file('bannsers/'.concat(filepath15));
        
        
              // Uploads a local file to the bucket
          await bucket.upload(filepath15, {
                  destination: 'banners/'.concat(filepath15),
              // Support for HTTP requests made with `Accept-Encoding: gzip`
              gzip: true,
              metadata: metadata,
              });
              filepath3url.getSignedUrl({
                  action: 'read',
                  expires: '03-09-2491'
              }).then(signedUrls => {
                firebase.database().ref('level1/').update({
                  banner15: signedUrls[0],
                });
              });
          console.log(`${filepath15} uploaded.`);
            }
            if(req.files.banner16){
              filepath16 = req.files.banner16.tempFilePath; 
              const filepath3url=bucket.file('bannsers/'.concat(filepath16));
        
        
              // Uploads a local file to the bucket
          await bucket.upload(filepath16, {
                  destination: 'banners/'.concat(filepath16),
              // Support for HTTP requests made with `Accept-Encoding: gzip`
              gzip: true,
              metadata: metadata,
              });
              filepath3url.getSignedUrl({
                  action: 'read',
                  expires: '03-09-2491'
              }).then(signedUrls => {
                firebase.database().ref('level1/').update({
                  banner16: signedUrls[0],
                });
              });
          console.log(`${filepath16} uploaded.`);
            }
          }
          res.redirect('/?success=1')
  });
  
  router.post('/level2', async (req,res)=>{
    var filepath1 = ""; 
    var filepath2 = ""; 
    var filepath3 = ""; 
    var filepath4 = ""; 
    var filepath5 = ""; 
    var filepath6 = ""; 
    var filepath7 = ""; 
    var filepath8 = ""; 
    var filepath9 = ""; 
    var filepath10 = ""; 
    var filepath11 = ""; 
    var filepath12 = ""; 
    var filepath13 = ""; 
    var filepath14 = ""; 
    var filepath15 = ""; 
    var filepath16 = ""; 
    var bucket = admin.storage().bucket();
    const metadata = {
        metadata: {
            // This line is very important. It's to create a download token.
            firebaseStorageDownloadTokens: uuid()
        },
        contentType: 'image/png',
        cacheControl: 'public, max-age=31536000',
        };
        if(req.files){   
          if(req.files.banner1){
            filepath1 = req.files.banner1.tempFilePath; 
             
            const filepath1url=bucket.file('banners/'.concat(filepath1));
            // Uploads a local file to the bucket
            await bucket.upload(filepath1, {
                destination: 'banners/'.concat(filepath1),
            // Support for HTTP requests made with `Accept-Encoding: gzip`
            gzip: true,
            metadata: metadata,
            });
            filepath1url.getSignedUrl({
                action: 'read',
                expires: '03-09-2491'
            }).then(signedUrls => {
              firebase.database().ref('level2/').update({
                banner1: signedUrls[0],
              });
            });
            console.log(`${filepath1} uploaded.`);
          }
            
            if(req.files.banner2)
            {
              filepath2 = req.files.banner2.tempFilePath; 
              const filepath2url=bucket.file('banners/'.concat(filepath2));
            
          
            // Uploads a local file to the bucket
          await bucket.upload(filepath2, {
                destination: 'banners/'.concat(filepath2),
              // Support for HTTP requests made with `Accept-Encoding: gzip`
              gzip: true,
              metadata: metadata,
            });
            filepath2url.getSignedUrl({
                action: 'read',
                expires: '03-09-2491'
              }).then(signedUrls => {
                firebase.database().ref('level2/').update({
                  banner2: signedUrls[0],
                });
              });
          console.log(`${filepath2} uploaded.`);
            }
            if(req.files.banner3){
              filepath3 = req.files.banner3.tempFilePath; 
              const filepath3url=bucket.file('bannsers/'.concat(filepath3));
        
        
              // Uploads a local file to the bucket
          await bucket.upload(filepath3, {
                  destination: 'banners/'.concat(filepath3),
              // Support for HTTP requests made with `Accept-Encoding: gzip`
              gzip: true,
              metadata: metadata,
              });
              filepath3url.getSignedUrl({
                  action: 'read',
                  expires: '03-09-2491'
              }).then(signedUrls => {
                firebase.database().ref('level2/').update({
                  banner3: signedUrls[0],
                });
              });
          console.log(`${filepath3} uploaded.`);
            }
            if(req.files.banner4){
              filepath4 = req.files.banner4.tempFilePath; 
              const filepath3url=bucket.file('bannsers/'.concat(filepath4));
        
        
              // Uploads a local file to the bucket
          await bucket.upload(filepath4, {
                  destination: 'banners/'.concat(filepath4),
              // Support for HTTP requests made with `Accept-Encoding: gzip`
              gzip: true,
              metadata: metadata,
              });
              filepath3url.getSignedUrl({
                  action: 'read',
                  expires: '03-09-2491'
              }).then(signedUrls => {
                firebase.database().ref('level2/').update({
                  banner4: signedUrls[0],
                });
              });
          console.log(`${filepath4} uploaded.`);
            }
            if(req.files.banner5){
              filepath5 = req.files.banner5.tempFilePath; 
              const filepath3url=bucket.file('bannsers/'.concat(filepath5));
        
        
              // Uploads a local file to the bucket
          await bucket.upload(filepath5, {
                  destination: 'banners/'.concat(filepath5),
              // Support for HTTP requests made with `Accept-Encoding: gzip`
              gzip: true,
              metadata: metadata,
              });
              filepath3url.getSignedUrl({
                  action: 'read',
                  expires: '03-09-2491'
              }).then(signedUrls => {
                firebase.database().ref('level2/').update({
                  banner5: signedUrls[0],
                });
              });
          console.log(`${filepath5} uploaded.`);
            }
            if(req.files.banner6){
              filepath6 = req.files.banner6.tempFilePath; 
              const filepath3url=bucket.file('bannsers/'.concat(filepath6));
        
        
              // Uploads a local file to the bucket
          await bucket.upload(filepath6, {
                  destination: 'banners/'.concat(filepath6),
              // Support for HTTP requests made with `Accept-Encoding: gzip`
              gzip: true,
              metadata: metadata,
              });
              filepath3url.getSignedUrl({
                  action: 'read',
                  expires: '03-09-2491'
              }).then(signedUrls => {
                firebase.database().ref('level2/').update({
                  banner6: signedUrls[0],
                });
              });
          console.log(`${filepath6} uploaded.`);
            }
            if(req.files.banner7){
              filepath7 = req.files.banner7.tempFilePath; 
              const filepath3url=bucket.file('bannsers/'.concat(filepath7));
        
        
              // Uploads a local file to the bucket
          await bucket.upload(filepath7, {
                  destination: 'banners/'.concat(filepath7),
              // Support for HTTP requests made with `Accept-Encoding: gzip`
              gzip: true,
              metadata: metadata,
              });
              filepath3url.getSignedUrl({
                  action: 'read',
                  expires: '03-09-2491'
              }).then(signedUrls => {
                firebase.database().ref('level2/').update({
                  banner7: signedUrls[0],
                });
              });
          console.log(`${filepath7} uploaded.`);
            }
            if(req.files.banner8){
              filepath8 = req.files.banner8.tempFilePath; 
              const filepath3url=bucket.file('bannsers/'.concat(filepath8));
        
        
              // Uploads a local file to the bucket
          await bucket.upload(filepath7, {
                  destination: 'banners/'.concat(filepath8),
              // Support for HTTP requests made with `Accept-Encoding: gzip`
              gzip: true,
              metadata: metadata,
              });
              filepath3url.getSignedUrl({
                  action: 'read',
                  expires: '03-09-2491'
              }).then(signedUrls => {
                firebase.database().ref('level2/').update({
                  banner8: signedUrls[0],
                });
              });
          console.log(`${filepath8} uploaded.`);
            }
            if(req.files.banner9){
              filepath9 = req.files.banner9.tempFilePath; 
              const filepath3url=bucket.file('bannsers/'.concat(filepath9));
        
        
              // Uploads a local file to the bucket
          await bucket.upload(filepath9, {
                  destination: 'banners/'.concat(filepath9),
              // Support for HTTP requests made with `Accept-Encoding: gzip`
              gzip: true,
              metadata: metadata,
              });
              filepath3url.getSignedUrl({
                  action: 'read',
                  expires: '03-09-2491'
              }).then(signedUrls => {
                firebase.database().ref('level2/').update({
                  banner9: signedUrls[0],
                });
              });
          console.log(`${filepath9} uploaded.`);
            }
            if(req.files.banner10){
              filepath10 = req.files.banner10.tempFilePath; 
              const filepath3url=bucket.file('bannsers/'.concat(filepath10));
        
        
              // Uploads a local file to the bucket
          await bucket.upload(filepath10, {
                  destination: 'banners/'.concat(filepath10),
              // Support for HTTP requests made with `Accept-Encoding: gzip`
              gzip: true,
              metadata: metadata,
              });
              filepath3url.getSignedUrl({
                  action: 'read',
                  expires: '03-09-2491'
              }).then(signedUrls => {
                firebase.database().ref('level2/').update({
                  banner10: signedUrls[0],
                });
              });
          console.log(`${filepath10} uploaded.`);
            }
            if(req.files.banner11){
              filepath11 = req.files.banner11.tempFilePath; 
              const filepath3url=bucket.file('bannsers/'.concat(filepath11));
        
        
              // Uploads a local file to the bucket
          await bucket.upload(filepath11, {
                  destination: 'banners/'.concat(filepath11),
              // Support for HTTP requests made with `Accept-Encoding: gzip`
              gzip: true,
              metadata: metadata,
              });
              filepath3url.getSignedUrl({
                  action: 'read',
                  expires: '03-09-2491'
              }).then(signedUrls => {
                firebase.database().ref('level2/').update({
                  banner11: signedUrls[0],
                });
              });
          console.log(`${filepath11} uploaded.`);
            }
            if(req.files.banner12){
              filepath12 = req.files.banner12.tempFilePath; 
              const filepath3url=bucket.file('bannsers/'.concat(filepath12));
        
        
              // Uploads a local file to the bucket
          await bucket.upload(filepath12, {
                  destination: 'banners/'.concat(filepath12),
              // Support for HTTP requests made with `Accept-Encoding: gzip`
              gzip: true,
              metadata: metadata,
              });
              filepath3url.getSignedUrl({
                  action: 'read',
                  expires: '03-09-2491'
              }).then(signedUrls => {
                firebase.database().ref('level2/').update({
                  banner12: signedUrls[0],
                });
              });
          console.log(`${filepath12} uploaded.`);
            }
            if(req.files.banner13){
              filepath13 = req.files.banner13.tempFilePath; 
              const filepath3url=bucket.file('bannsers/'.concat(filepath13));
        
        
              // Uploads a local file to the bucket
          await bucket.upload(filepath13, {
                  destination: 'banners/'.concat(filepath13),
              // Support for HTTP requests made with `Accept-Encoding: gzip`
              gzip: true,
              metadata: metadata,
              });
              filepath3url.getSignedUrl({
                  action: 'read',
                  expires: '03-09-2491'
              }).then(signedUrls => {
                firebase.database().ref('level2/').update({
                  banner13: signedUrls[0],
                });
              });
          console.log(`${filepath13} uploaded.`);
            }
            if(req.files.banner14){
              filepath14 = req.files.banner14.tempFilePath; 
              const filepath3url=bucket.file('bannsers/'.concat(filepath14));
        
        
              // Uploads a local file to the bucket
          await bucket.upload(filepath14, {
                  destination: 'banners/'.concat(filepath14),
              // Support for HTTP requests made with `Accept-Encoding: gzip`
              gzip: true,
              metadata: metadata,
              });
              filepath3url.getSignedUrl({
                  action: 'read',
                  expires: '03-09-2491'
              }).then(signedUrls => {
                firebase.database().ref('level2/').update({
                  banner14: signedUrls[0],
                });
              });
          console.log(`${filepath14} uploaded.`);
            }
            if(req.files.banner15){
              filepath15 = req.files.banner15.tempFilePath; 
              const filepath3url=bucket.file('bannsers/'.concat(filepath15));
        
        
              // Uploads a local file to the bucket
          await bucket.upload(filepath15, {
                  destination: 'banners/'.concat(filepath15),
              // Support for HTTP requests made with `Accept-Encoding: gzip`
              gzip: true,
              metadata: metadata,
              });
              filepath3url.getSignedUrl({
                  action: 'read',
                  expires: '03-09-2491'
              }).then(signedUrls => {
                firebase.database().ref('level2/').update({
                  banner15: signedUrls[0],
                });
              });
          console.log(`${filepath15} uploaded.`);
            }
            if(req.files.banner16){
              filepath16 = req.files.banner16.tempFilePath; 
              const filepath3url=bucket.file('bannsers/'.concat(filepath16));
        
        
              // Uploads a local file to the bucket
          await bucket.upload(filepath16, {
                  destination: 'banners/'.concat(filepath16),
              // Support for HTTP requests made with `Accept-Encoding: gzip`
              gzip: true,
              metadata: metadata,
              });
              filepath3url.getSignedUrl({
                  action: 'read',
                  expires: '03-09-2491'
              }).then(signedUrls => {
                firebase.database().ref('level2/').update({
                  banner16: signedUrls[0],
                });
              });
          console.log(`${filepath16} uploaded.`);
            }
          }
          res.redirect('/?success=1')
  });
  router.post('/level3', async (req,res)=>{
    var filepath1 = ""; 
    var filepath2 = ""; 
    var filepath3 = ""; 
    var filepath4 = ""; 
    var filepath5 = ""; 
    var filepath6 = ""; 
    var filepath7 = ""; 
    var filepath8 = ""; 
    var filepath9 = ""; 
    var filepath10 = ""; 
    var filepath11 = ""; 
    var filepath12 = ""; 
    var filepath13 = ""; 
    var filepath14 = ""; 
    var filepath15 = ""; 
    var filepath16 = ""; 
    var bucket = admin.storage().bucket();
    const metadata = {
        metadata: {
            // This line is very important. It's to create a download token.
            firebaseStorageDownloadTokens: uuid()
        },
        contentType: 'image/png',
        cacheControl: 'public, max-age=31536000',
        };
        if(req.files){   
          if(req.files.banner1){
            filepath1 = req.files.banner1.tempFilePath; 
             
            const filepath1url=bucket.file('banners/'.concat(filepath1));
            // Uploads a local file to the bucket
            await bucket.upload(filepath1, {
                destination: 'banners/'.concat(filepath1),
            // Support for HTTP requests made with `Accept-Encoding: gzip`
            gzip: true,
            metadata: metadata,
            });
            filepath1url.getSignedUrl({
                action: 'read',
                expires: '03-09-2491'
            }).then(signedUrls => {
              firebase.database().ref('level3/').update({
                banner1: signedUrls[0],
              });
            });
            console.log(`${filepath1} uploaded.`);
          }
            
            if(req.files.banner2)
            {
              filepath2 = req.files.banner2.tempFilePath; 
              const filepath2url=bucket.file('banners/'.concat(filepath2));
            
          
            // Uploads a local file to the bucket
          await bucket.upload(filepath2, {
                destination: 'banners/'.concat(filepath2),
              // Support for HTTP requests made with `Accept-Encoding: gzip`
              gzip: true,
              metadata: metadata,
            });
            filepath2url.getSignedUrl({
                action: 'read',
                expires: '03-09-2491'
              }).then(signedUrls => {
                firebase.database().ref('level3/').update({
                  banner2: signedUrls[0],
                });
              });
          console.log(`${filepath2} uploaded.`);
            }
            if(req.files.banner3){
              filepath3 = req.files.banner3.tempFilePath; 
              const filepath3url=bucket.file('bannsers/'.concat(filepath3));
        
        
              // Uploads a local file to the bucket
          await bucket.upload(filepath3, {
                  destination: 'banners/'.concat(filepath3),
              // Support for HTTP requests made with `Accept-Encoding: gzip`
              gzip: true,
              metadata: metadata,
              });
              filepath3url.getSignedUrl({
                  action: 'read',
                  expires: '03-09-2491'
              }).then(signedUrls => {
                firebase.database().ref('level3/').update({
                  banner3: signedUrls[0],
                });
              });
          console.log(`${filepath3} uploaded.`);
            }
            if(req.files.banner4){
              filepath4 = req.files.banner4.tempFilePath; 
              const filepath3url=bucket.file('bannsers/'.concat(filepath4));
        
        
              // Uploads a local file to the bucket
          await bucket.upload(filepath4, {
                  destination: 'banners/'.concat(filepath4),
              // Support for HTTP requests made with `Accept-Encoding: gzip`
              gzip: true,
              metadata: metadata,
              });
              filepath3url.getSignedUrl({
                  action: 'read',
                  expires: '03-09-2491'
              }).then(signedUrls => {
                firebase.database().ref('level3/').update({
                  banner4: signedUrls[0],
                });
              });
          console.log(`${filepath4} uploaded.`);
            }
            if(req.files.banner5){
              filepath5 = req.files.banner5.tempFilePath; 
              const filepath3url=bucket.file('bannsers/'.concat(filepath5));
        
        
              // Uploads a local file to the bucket
          await bucket.upload(filepath5, {
                  destination: 'banners/'.concat(filepath5),
              // Support for HTTP requests made with `Accept-Encoding: gzip`
              gzip: true,
              metadata: metadata,
              });
              filepath3url.getSignedUrl({
                  action: 'read',
                  expires: '03-09-2491'
              }).then(signedUrls => {
                firebase.database().ref('level3/').update({
                  banner5: signedUrls[0],
                });
              });
          console.log(`${filepath5} uploaded.`);
            }
            if(req.files.banner6){
              filepath6 = req.files.banner6.tempFilePath; 
              const filepath3url=bucket.file('bannsers/'.concat(filepath6));
        
        
              // Uploads a local file to the bucket
          await bucket.upload(filepath6, {
                  destination: 'banners/'.concat(filepath6),
              // Support for HTTP requests made with `Accept-Encoding: gzip`
              gzip: true,
              metadata: metadata,
              });
              filepath3url.getSignedUrl({
                  action: 'read',
                  expires: '03-09-2491'
              }).then(signedUrls => {
                firebase.database().ref('level3/').update({
                  banner6: signedUrls[0],
                });
              });
          console.log(`${filepath6} uploaded.`);
            }
            if(req.files.banner7){
              filepath7 = req.files.banner7.tempFilePath; 
              const filepath3url=bucket.file('bannsers/'.concat(filepath7));
        
        
              // Uploads a local file to the bucket
          await bucket.upload(filepath7, {
                  destination: 'banners/'.concat(filepath7),
              // Support for HTTP requests made with `Accept-Encoding: gzip`
              gzip: true,
              metadata: metadata,
              });
              filepath3url.getSignedUrl({
                  action: 'read',
                  expires: '03-09-2491'
              }).then(signedUrls => {
                firebase.database().ref('level3/').update({
                  banner7: signedUrls[0],
                });
              });
          console.log(`${filepath7} uploaded.`);
            }
            if(req.files.banner8){
              filepath8 = req.files.banner8.tempFilePath; 
              const filepath3url=bucket.file('bannsers/'.concat(filepath8));
        
        
              // Uploads a local file to the bucket
          await bucket.upload(filepath7, {
                  destination: 'banners/'.concat(filepath8),
              // Support for HTTP requests made with `Accept-Encoding: gzip`
              gzip: true,
              metadata: metadata,
              });
              filepath3url.getSignedUrl({
                  action: 'read',
                  expires: '03-09-2491'
              }).then(signedUrls => {
                firebase.database().ref('level3/').update({
                  banner8: signedUrls[0],
                });
              });
          console.log(`${filepath8} uploaded.`);
            }
            if(req.files.banner9){
              filepath9 = req.files.banner9.tempFilePath; 
              const filepath3url=bucket.file('bannsers/'.concat(filepath9));
        
        
              // Uploads a local file to the bucket
          await bucket.upload(filepath9, {
                  destination: 'banners/'.concat(filepath9),
              // Support for HTTP requests made with `Accept-Encoding: gzip`
              gzip: true,
              metadata: metadata,
              });
              filepath3url.getSignedUrl({
                  action: 'read',
                  expires: '03-09-2491'
              }).then(signedUrls => {
                firebase.database().ref('level3/').update({
                  banner9: signedUrls[0],
                });
              });
          console.log(`${filepath9} uploaded.`);
            }
            if(req.files.banner10){
              filepath10 = req.files.banner10.tempFilePath; 
              const filepath3url=bucket.file('bannsers/'.concat(filepath10));
        
        
              // Uploads a local file to the bucket
          await bucket.upload(filepath10, {
                  destination: 'banners/'.concat(filepath10),
              // Support for HTTP requests made with `Accept-Encoding: gzip`
              gzip: true,
              metadata: metadata,
              });
              filepath3url.getSignedUrl({
                  action: 'read',
                  expires: '03-09-2491'
              }).then(signedUrls => {
                firebase.database().ref('level3/').update({
                  banner10: signedUrls[0],
                });
              });
          console.log(`${filepath10} uploaded.`);
            }
            if(req.files.banner11){
              filepath11 = req.files.banner11.tempFilePath; 
              const filepath3url=bucket.file('bannsers/'.concat(filepath11));
        
        
              // Uploads a local file to the bucket
          await bucket.upload(filepath11, {
                  destination: 'banners/'.concat(filepath11),
              // Support for HTTP requests made with `Accept-Encoding: gzip`
              gzip: true,
              metadata: metadata,
              });
              filepath3url.getSignedUrl({
                  action: 'read',
                  expires: '03-09-2491'
              }).then(signedUrls => {
                firebase.database().ref('level3/').update({
                  banner11: signedUrls[0],
                });
              });
          console.log(`${filepath11} uploaded.`);
            }
            if(req.files.banner12){
              filepath12 = req.files.banner12.tempFilePath; 
              const filepath3url=bucket.file('bannsers/'.concat(filepath12));
        
        
              // Uploads a local file to the bucket
          await bucket.upload(filepath12, {
                  destination: 'banners/'.concat(filepath12),
              // Support for HTTP requests made with `Accept-Encoding: gzip`
              gzip: true,
              metadata: metadata,
              });
              filepath3url.getSignedUrl({
                  action: 'read',
                  expires: '03-09-2491'
              }).then(signedUrls => {
                firebase.database().ref('level3/').update({
                  banner12: signedUrls[0],
                });
              });
          console.log(`${filepath12} uploaded.`);
            }
            if(req.files.banner13){
              filepath13 = req.files.banner13.tempFilePath; 
              const filepath3url=bucket.file('bannsers/'.concat(filepath13));
        
        
              // Uploads a local file to the bucket
          await bucket.upload(filepath13, {
                  destination: 'banners/'.concat(filepath13),
              // Support for HTTP requests made with `Accept-Encoding: gzip`
              gzip: true,
              metadata: metadata,
              });
              filepath3url.getSignedUrl({
                  action: 'read',
                  expires: '03-09-2491'
              }).then(signedUrls => {
                firebase.database().ref('level3/').update({
                  banner13: signedUrls[0],
                });
              });
          console.log(`${filepath13} uploaded.`);
            }
            if(req.files.banner14){
              filepath14 = req.files.banner14.tempFilePath; 
              const filepath3url=bucket.file('bannsers/'.concat(filepath14));
        
        
              // Uploads a local file to the bucket
          await bucket.upload(filepath14, {
                  destination: 'banners/'.concat(filepath14),
              // Support for HTTP requests made with `Accept-Encoding: gzip`
              gzip: true,
              metadata: metadata,
              });
              filepath3url.getSignedUrl({
                  action: 'read',
                  expires: '03-09-2491'
              }).then(signedUrls => {
                firebase.database().ref('level3/').update({
                  banner14: signedUrls[0],
                });
              });
          console.log(`${filepath14} uploaded.`);
            }
            if(req.files.banner15){
              filepath15 = req.files.banner15.tempFilePath; 
              const filepath3url=bucket.file('bannsers/'.concat(filepath15));
        
        
              // Uploads a local file to the bucket
          await bucket.upload(filepath15, {
                  destination: 'banners/'.concat(filepath15),
              // Support for HTTP requests made with `Accept-Encoding: gzip`
              gzip: true,
              metadata: metadata,
              });
              filepath3url.getSignedUrl({
                  action: 'read',
                  expires: '03-09-2491'
              }).then(signedUrls => {
                firebase.database().ref('level3/').update({
                  banner15: signedUrls[0],
                });
              });
          console.log(`${filepath15} uploaded.`);
            }
            if(req.files.banner16){
              filepath16 = req.files.banner16.tempFilePath; 
              const filepath3url=bucket.file('bannsers/'.concat(filepath16));
        
        
              // Uploads a local file to the bucket
          await bucket.upload(filepath16, {
                  destination: 'banners/'.concat(filepath16),
              // Support for HTTP requests made with `Accept-Encoding: gzip`
              gzip: true,
              metadata: metadata,
              });
              filepath3url.getSignedUrl({
                  action: 'read',
                  expires: '03-09-2491'
              }).then(signedUrls => {
                firebase.database().ref('level3/').update({
                  banner16: signedUrls[0],
                });
              });
          console.log(`${filepath16} uploaded.`);
            }
          }
          res.redirect('/?success=1')
  });
  router.post('/level4', async (req,res)=>{
    var filepath1 = ""; 
    var filepath2 = ""; 
    var filepath3 = ""; 
    var filepath4 = ""; 
    var filepath5 = ""; 
    var filepath6 = ""; 
    var filepath7 = ""; 
    var filepath8 = ""; 
    var filepath9 = ""; 
    var filepath10 = ""; 
    var filepath11 = ""; 
    var filepath12 = ""; 
    var filepath13 = ""; 
    var filepath14 = ""; 
    var filepath15 = ""; 
    var filepath16 = ""; 
    var bucket = admin.storage().bucket();
    const metadata = {
        metadata: {
            // This line is very important. It's to create a download token.
            firebaseStorageDownloadTokens: uuid()
        },
        contentType: 'image/png',
        cacheControl: 'public, max-age=31536000',
        };
        if(req.files){   
          if(req.files.banner1){
            filepath1 = req.files.banner1.tempFilePath; 
             
            const filepath1url=bucket.file('banners/'.concat(filepath1));
            // Uploads a local file to the bucket
            await bucket.upload(filepath1, {
                destination: 'banners/'.concat(filepath1),
            // Support for HTTP requests made with `Accept-Encoding: gzip`
            gzip: true,
            metadata: metadata,
            });
            filepath1url.getSignedUrl({
                action: 'read',
                expires: '03-09-2491'
            }).then(signedUrls => {
              firebase.database().ref('level4/').update({
                banner1: signedUrls[0],
              });
            });
            console.log(`${filepath1} uploaded.`);
          }
            
            if(req.files.banner2)
            {
              filepath2 = req.files.banner2.tempFilePath; 
              const filepath2url=bucket.file('banners/'.concat(filepath2));
            
          
            // Uploads a local file to the bucket
          await bucket.upload(filepath2, {
                destination: 'banners/'.concat(filepath2),
              // Support for HTTP requests made with `Accept-Encoding: gzip`
              gzip: true,
              metadata: metadata,
            });
            filepath2url.getSignedUrl({
                action: 'read',
                expires: '03-09-2491'
              }).then(signedUrls => {
                firebase.database().ref('level4/').update({
                  banner2: signedUrls[0],
                });
              });
          console.log(`${filepath2} uploaded.`);
            }
            if(req.files.banner3){
              filepath3 = req.files.banner3.tempFilePath; 
              const filepath3url=bucket.file('bannsers/'.concat(filepath3));
        
        
              // Uploads a local file to the bucket
          await bucket.upload(filepath3, {
                  destination: 'banners/'.concat(filepath3),
              // Support for HTTP requests made with `Accept-Encoding: gzip`
              gzip: true,
              metadata: metadata,
              });
              filepath3url.getSignedUrl({
                  action: 'read',
                  expires: '03-09-2491'
              }).then(signedUrls => {
                firebase.database().ref('level4/').update({
                  banner3: signedUrls[0],
                });
              });
          console.log(`${filepath3} uploaded.`);
            }
            if(req.files.banner4){
              filepath4 = req.files.banner4.tempFilePath; 
              const filepath3url=bucket.file('bannsers/'.concat(filepath4));
        
        
              // Uploads a local file to the bucket
          await bucket.upload(filepath4, {
                  destination: 'banners/'.concat(filepath4),
              // Support for HTTP requests made with `Accept-Encoding: gzip`
              gzip: true,
              metadata: metadata,
              });
              filepath3url.getSignedUrl({
                  action: 'read',
                  expires: '03-09-2491'
              }).then(signedUrls => {
                firebase.database().ref('level4/').update({
                  banner4: signedUrls[0],
                });
              });
          console.log(`${filepath4} uploaded.`);
            }
            if(req.files.banner5){
              filepath5 = req.files.banner5.tempFilePath; 
              const filepath3url=bucket.file('bannsers/'.concat(filepath5));
        
        
              // Uploads a local file to the bucket
          await bucket.upload(filepath5, {
                  destination: 'banners/'.concat(filepath5),
              // Support for HTTP requests made with `Accept-Encoding: gzip`
              gzip: true,
              metadata: metadata,
              });
              filepath3url.getSignedUrl({
                  action: 'read',
                  expires: '03-09-2491'
              }).then(signedUrls => {
                firebase.database().ref('level4/').update({
                  banner5: signedUrls[0],
                });
              });
          console.log(`${filepath5} uploaded.`);
            }
            if(req.files.banner6){
              filepath6 = req.files.banner6.tempFilePath; 
              const filepath3url=bucket.file('bannsers/'.concat(filepath6));
        
        
              // Uploads a local file to the bucket
          await bucket.upload(filepath6, {
                  destination: 'banners/'.concat(filepath6),
              // Support for HTTP requests made with `Accept-Encoding: gzip`
              gzip: true,
              metadata: metadata,
              });
              filepath3url.getSignedUrl({
                  action: 'read',
                  expires: '03-09-2491'
              }).then(signedUrls => {
                firebase.database().ref('level4/').update({
                  banner6: signedUrls[0],
                });
              });
          console.log(`${filepath6} uploaded.`);
            }
            if(req.files.banner7){
              filepath7 = req.files.banner7.tempFilePath; 
              const filepath3url=bucket.file('bannsers/'.concat(filepath7));
        
        
              // Uploads a local file to the bucket
          await bucket.upload(filepath7, {
                  destination: 'banners/'.concat(filepath7),
              // Support for HTTP requests made with `Accept-Encoding: gzip`
              gzip: true,
              metadata: metadata,
              });
              filepath3url.getSignedUrl({
                  action: 'read',
                  expires: '03-09-2491'
              }).then(signedUrls => {
                firebase.database().ref('level4/').update({
                  banner7: signedUrls[0],
                });
              });
          console.log(`${filepath7} uploaded.`);
            }
            if(req.files.banner8){
              filepath8 = req.files.banner8.tempFilePath; 
              const filepath3url=bucket.file('bannsers/'.concat(filepath8));
        
        
              // Uploads a local file to the bucket
          await bucket.upload(filepath7, {
                  destination: 'banners/'.concat(filepath8),
              // Support for HTTP requests made with `Accept-Encoding: gzip`
              gzip: true,
              metadata: metadata,
              });
              filepath3url.getSignedUrl({
                  action: 'read',
                  expires: '03-09-2491'
              }).then(signedUrls => {
                firebase.database().ref('level4/').update({
                  banner8: signedUrls[0],
                });
              });
          console.log(`${filepath8} uploaded.`);
            }
            if(req.files.banner9){
              filepath9 = req.files.banner9.tempFilePath; 
              const filepath3url=bucket.file('bannsers/'.concat(filepath9));
        
        
              // Uploads a local file to the bucket
          await bucket.upload(filepath9, {
                  destination: 'banners/'.concat(filepath9),
              // Support for HTTP requests made with `Accept-Encoding: gzip`
              gzip: true,
              metadata: metadata,
              });
              filepath3url.getSignedUrl({
                  action: 'read',
                  expires: '03-09-2491'
              }).then(signedUrls => {
                firebase.database().ref('level4/').update({
                  banner9: signedUrls[0],
                });
              });
          console.log(`${filepath9} uploaded.`);
            }
            if(req.files.banner10){
              filepath10 = req.files.banner10.tempFilePath; 
              const filepath3url=bucket.file('bannsers/'.concat(filepath10));
        
        
              // Uploads a local file to the bucket
          await bucket.upload(filepath10, {
                  destination: 'banners/'.concat(filepath10),
              // Support for HTTP requests made with `Accept-Encoding: gzip`
              gzip: true,
              metadata: metadata,
              });
              filepath3url.getSignedUrl({
                  action: 'read',
                  expires: '03-09-2491'
              }).then(signedUrls => {
                firebase.database().ref('level4/').update({
                  banner10: signedUrls[0],
                });
              });
          console.log(`${filepath10} uploaded.`);
            }
            if(req.files.banner11){
              filepath11 = req.files.banner11.tempFilePath; 
              const filepath3url=bucket.file('bannsers/'.concat(filepath11));
        
        
              // Uploads a local file to the bucket
          await bucket.upload(filepath11, {
                  destination: 'banners/'.concat(filepath11),
              // Support for HTTP requests made with `Accept-Encoding: gzip`
              gzip: true,
              metadata: metadata,
              });
              filepath3url.getSignedUrl({
                  action: 'read',
                  expires: '03-09-2491'
              }).then(signedUrls => {
                firebase.database().ref('level4/').update({
                  banner11: signedUrls[0],
                });
              });
          console.log(`${filepath11} uploaded.`);
            }
            if(req.files.banner12){
              filepath12 = req.files.banner12.tempFilePath; 
              const filepath3url=bucket.file('bannsers/'.concat(filepath12));
        
        
              // Uploads a local file to the bucket
          await bucket.upload(filepath12, {
                  destination: 'banners/'.concat(filepath12),
              // Support for HTTP requests made with `Accept-Encoding: gzip`
              gzip: true,
              metadata: metadata,
              });
              filepath3url.getSignedUrl({
                  action: 'read',
                  expires: '03-09-2491'
              }).then(signedUrls => {
                firebase.database().ref('level4/').update({
                  banner12: signedUrls[0],
                });
              });
          console.log(`${filepath12} uploaded.`);
            }
            if(req.files.banner13){
              filepath13 = req.files.banner13.tempFilePath; 
              const filepath3url=bucket.file('bannsers/'.concat(filepath13));
        
        
              // Uploads a local file to the bucket
          await bucket.upload(filepath13, {
                  destination: 'banners/'.concat(filepath13),
              // Support for HTTP requests made with `Accept-Encoding: gzip`
              gzip: true,
              metadata: metadata,
              });
              filepath3url.getSignedUrl({
                  action: 'read',
                  expires: '03-09-2491'
              }).then(signedUrls => {
                firebase.database().ref('level4/').update({
                  banner13: signedUrls[0],
                });
              });
          console.log(`${filepath13} uploaded.`);
            }
            if(req.files.banner14){
              filepath14 = req.files.banner14.tempFilePath; 
              const filepath3url=bucket.file('bannsers/'.concat(filepath14));
        
        
              // Uploads a local file to the bucket
          await bucket.upload(filepath14, {
                  destination: 'banners/'.concat(filepath14),
              // Support for HTTP requests made with `Accept-Encoding: gzip`
              gzip: true,
              metadata: metadata,
              });
              filepath3url.getSignedUrl({
                  action: 'read',
                  expires: '03-09-2491'
              }).then(signedUrls => {
                firebase.database().ref('level4/').update({
                  banner14: signedUrls[0],
                });
              });
          console.log(`${filepath14} uploaded.`);
            }
            if(req.files.banner15){
              filepath15 = req.files.banner15.tempFilePath; 
              const filepath3url=bucket.file('bannsers/'.concat(filepath15));
        
        
              // Uploads a local file to the bucket
          await bucket.upload(filepath15, {
                  destination: 'banners/'.concat(filepath15),
              // Support for HTTP requests made with `Accept-Encoding: gzip`
              gzip: true,
              metadata: metadata,
              });
              filepath3url.getSignedUrl({
                  action: 'read',
                  expires: '03-09-2491'
              }).then(signedUrls => {
                firebase.database().ref('level4/').update({
                  banner15: signedUrls[0],
                });
              });
          console.log(`${filepath15} uploaded.`);
            }
            if(req.files.banner16){
              filepath16 = req.files.banner16.tempFilePath; 
              const filepath3url=bucket.file('bannsers/'.concat(filepath16));
        
        
              // Uploads a local file to the bucket
          await bucket.upload(filepath16, {
                  destination: 'banners/'.concat(filepath16),
              // Support for HTTP requests made with `Accept-Encoding: gzip`
              gzip: true,
              metadata: metadata,
              });
              filepath3url.getSignedUrl({
                  action: 'read',
                  expires: '03-09-2491'
              }).then(signedUrls => {
                firebase.database().ref('level4/').update({
                  banner16: signedUrls[0],
                });
              });
          console.log(`${filepath16} uploaded.`);
            }
          }
          res.redirect('/?success=1')
  });

module.exports = router;