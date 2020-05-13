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

console.log(sessionStorage.getItem('docId'));

document.addEventListener("DOMContentLoaded", () => {
    var queryString = decodeURIComponent(window.location.search);
    queryString = queryString.substring(1);
    var queries = queryString.split("&");
    for (var i = 0; i < queries.length; i++) {
        db.collection('Blog').doc(queries[i].split(":")[1]).get().then((docSnapshot) => {
            if (docSnapshot.exists) {
                console.log('Document Exists');
                const data = docSnapshot.data();

                var linkTitle = document.createElement('meta');
                linkTitle.setAttribute('property', 'og:title');
                linkTitle.content = data.title;
                document.getElementsByTagName('head')[0].appendChild(linkTitle);
                console.log(linkTitle)

                var linkDesc = document.createElement('meta');
                linkDesc.setAttribute('property', 'og:description');
                linkDesc.content = data.title;
                document.getElementsByTagName('head')[0].appendChild(linkDesc);
                console.log(linkDesc)

                var linkImage = document.createElement('meta');
                linkImage.setAttribute('property', 'og:image');
                linkImage.content = data.image;
                document.getElementsByTagName('head')[0].appendChild(linkImage);
                console.log(linkImage)

                var linkUrl = document.createElement('meta');
                linkUrl.setAttribute('property', 'og:url');
                linkUrl.content = document.location;
                document.getElementsByTagName('head')[0].appendChild(linkUrl);
                console.log(linkUrl)


                document.title = data.title;
               

                getElementById('detailsContainer').innerHTML = `<div class="blog-info">
                <div class="blog-thumbnail" style="width: 100%">
                    <img id="detailsImage" src="${data.image}" alt="blog thumbnail">
                </div>
                <h2 class="blog-title" id="detailsTitle">${data.title}
                </h2>
                <div class="blog-meta">
                    <ul>
                        <li id="detailsDate"><i class="fa fa-calendar"></i>${data.date}</li>
                        <li><i class="fa fa-comment"></i>Comments</li>
                    </ul>
                </div>
                <div class="blog-summery">
                    <p id="detailsDesc">${data.desc}</p>
                </div>
            </div>`;
            }
        }).catch((error) => console.log(error));
    }
});



document.addEventListener("load", () => {
    var queryString = decodeURIComponent(window.location.search);
    queryString = queryString.substring(1);
    var queries = queryString.split("&");
    for (var i = 0; i < queries.length; i++) {
        db.collection('Blog').doc(queries[i].split(":")[1]).get().then((docSnapshot) => {
            if (docSnapshot.exists) {
                console.log('Document Exists');
                const data = docSnapshot.data();

                var linkTitle = document.createElement('meta');
                linkTitle.setAttribute('property', 'og:title');
                linkTitle.content = data.title;
                document.getElementsByTagName('head')[0].appendChild(linkTitle);

                var linkDesc = document.createElement('meta');
                linkDesc.setAttribute('property', 'og:description');
                linkDesc.content = data.title;
                document.getElementsByTagName('head')[0].appendChild(linkDesc);

                var linkImage = document.createElement('meta');
                linkImage.setAttribute('property', 'og:image');
                linkImage.content = data.image;
                document.getElementsByTagName('head')[0].appendChild(linkImage);

                var linkUrl = document.createElement('meta');
                linkUrl.setAttribute('property', 'og:url');
                linkUrl.content = "";
                document.getElementsByTagName('head')[0].appendChild(linkUrl);


                document.title = data.title;
               

                getElementById('detailsContainer').innerHTML = `<div class="blog-info">
                <div class="blog-thumbnail" style="width: 100%">
                    <img id="detailsImage" src="${data.image}" alt="blog thumbnail">
                </div>
                <h2 class="blog-title" id="detailsTitle">${data.title}
                </h2>
                <div class="blog-meta">
                    <ul>
                        <li id="detailsDate"><i class="fa fa-calendar"></i>${data.date}</li>
                        <li><i class="fa fa-comment"></i>Comments</li>
                    </ul>
                </div>
                <div class="blog-summery">
                    <p id="detailsDesc">${data.desc}</p>
                </div>
            </div>`;
            }
        }).catch((error) => console.log(error));
    }
});

function getElementById(id) {
    return document.getElementById(id);
}