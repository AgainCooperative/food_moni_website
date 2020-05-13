'use strict'

const firebaseConfig = {
   apiKey: "AIzaSyA1wDsGOJ0NlE0-rEADrpS5TUXNaz2EPAA",
   authDomain: "foodmonimobile.firebaseapp.com",
   databaseURL: "https://foodmonimobile.firebaseio.com",
   projectId: "foodmonimobile",
   storageBucket: "foodmonimobile.appspot.com",
   messagingSenderId: "794636982425",
   appId: "1:794636982425:web:efcfcf2348dc662b27c008",
   measurementId: "G-M9B19BRKZQ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const list = [];
firebase.auth().onAuthStateChanged(function (user) {
   if (user) {
      console.log(`Not signed In ${user}`);
      fetchBlog();
   } else {
      console.log(`Signed In ${user}`);
      fetchBlog();
   }
});

function getElementById(id) { return document.getElementById(id); }

function getVal(id) { return getElementById(id).value; }

function fetchBlog() {
   console.log('Fetching Posts');
   db.collection('Blog').onSnapshot((snapshot) => {
      getElementById('feedList').innerHTML = "";
      snapshot.forEach((doc) => {
         if (doc.exists) {
            getElementById('feedList').innerHTML += getFeed(doc.data(), doc.id);
         }
      });
   });
}


function parseImg(json){
   if(!json || !json.image)return ;
 return  new Promise((res,rej)=>{
      const reader = new FileReader();

      reader.onloadend = (e)=>{
         json.image = e.target.result;
         res(json);
      }
      const blob= new Blob([json.image]);
      reader.readAsDataURL(blob);
   });

}


function getFeed(json, id) {
     return `
    <div class="col-md-4 col-sm-6 col-xs-12">
    <div class="list-item">
    <div class="blog-thumbnail">
    <a href="blog-details.html" style="height: 400"><img src="${json.image}" alt="blog thumbnail"></a>
    </div>
    <h2 class="blog-title"><a href="blog-details.html">${json.title}</a></h2>
    <div class="blog-meta">
    <ul>
    <li><i class="fa fa-calendar"></i>${json.date}</li>
    <li><i class="fa fa-comment"></i>Comments</li>
    </ul>
    </div>
    <div class="blog-summery">
    <p class="text">${json.excpt}</p>
    </div>
    <a id="readMore" href="blog-details.html?Id:${id}" class="read-more">Read More</a>
    </div>
    </div>`;
}



