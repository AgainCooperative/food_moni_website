const firebaseConfig = {
  apiKey: "AIzaSyA1wDsGOJ0NlE0-rEADrpS5TUXNaz2EPAA",
  authDomain: "foodmonimobile.firebaseapp.com",
  databaseURL: "https://foodmonimobile.firebaseio.com",
  projectId: "foodmonimobile",
  storageBucket: "foodmonimobile.appspot.com",
  messagingSenderId: "794636982425",
  appId: "1:794636982425:web:efcfcf2348dc662b27c008",
  measurementId: "G-M9B19BRKZQ",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const blob = {
  name: "",
  file: null,
  url: "",
};

tinymce.init({
      selector: '#desc',
      plugins: 'a11ychecker advcode casechange formatpainter linkchecker autolink lists checklist media mediaembed pageembed permanentpen powerpaste table advtable tinycomments tinymcespellchecker',
      toolbar: 'a11ycheck addcomment showcomments casechange checklist code formatpainter pageembed permanentpen table',
      toolbar_mode: 'dock',
      tinycomments_mode: 'embedded',
      tinycomments_author: 'Author name',
    });

const cloud = firebase.storage().ref().child("public/");

const getDoc = (id) => document.getElementById(id);

const getVal = (id) => getDoc(id).value;

const print = (arg) => console.log(arg);

/** IMAGE HANDLER */
getDoc("image").addEventListener("change", (e) => {
  // get file data from $event
  const file = e.target.files[0];

  // init file reader
  const reader = new FileReader();

  // on image file loaded
  reader.onloadend = (e) => {
    // show preview
    getDoc("img_preview").src = e.target.result;

    // set blob name
    blob.name = file.name;

    print(e.target.result);

    // set blob for upload
    blob.file = e.target.result;
  };

  // initaite reader to load image file
  reader.readAsDataURL(file);
});

/** POST EVENT */
getDoc("post").addEventListener("click", async (e) => {
  print("uploading");
  print(blob);
  var btn = document.getElementById("post");
  btn.disabled = true;
  btn.innerText = "Creating Post.....";

  // upload image file
  const upload = cloud.child(blob.name).putString(blob.file,"data_url");
  
  // on upload complete
  const onUploadComplete = async (snapshot) => {
    // set blob download url
    blob.url = await upload.snapshot.ref.getDownloadURL();
    print(blob.url);
    // save post
   await  savePost(blob.url);
  
   alert("Post Uploaded successfully");
   btn.innerText = "Post"
   btn.disabled = false;
  };

  // monitor for upload complete $event
  upload.on(
    "state_changed",
    () => {},
    () => {},
    onUploadComplete
  );
});

async function savePost(url) {
  var desc = tinymce.get('desc').getContent();
  try {
    const title = getVal("title");
    const body = desc;
    const date = new Date().toLocaleDateString();
    const timestamp = Date.now();
    const excpt = getVal("excpt");

    // validate image file
    if (!url) return alert("Image is required");

    // validate title
    if (!title) return alert("Title is required");

    // validate body
    if (!body) return alert("Body is reqired");

    // post data
    const post = {
      title: title,
      desc: body,
      excpt: excpt,
      date: date,
      image: url,
      timestamp: timestamp,
    };

    // save post
    await db.collection("Blog").doc().set(post);

   // return success response
    return true;
  } catch (error) {
    print(error);
    return false;
  }
}

// function makePost() {
//   // var thisRef = storageRef.child("public/" + file.name);
//   // var btn = document.getElementById("send");
//   // console.log(file.name);
//   // var uploadTask = thisRef.put(file).then((snapshot) => {
//   //    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
//   //       console.log('File available at', downloadURL);
//   //       btn.disabled = true;
//   //       btn.innerText = "Creating Post.....";
//   //       const dataMap =
//   //       {
//   //          title: getVal('title'),
//   //          desc: getVal('desc'),
//   //          date: getVal('date'),
//   //          image: downloadURL,
//   //       };
//   //       firebase.firestore().collection('Blog').doc().set(dataMap).then(() => {
//   //          window.alert('Successful');
//   //          btn.value = "POST";
//   //          btn.disabled = false;
//   //          btn.innerText = "POST";
//   //       }).catch((err) => {
//   //          console.log(err);
//   //       });
//   //    });
//   // }).catch((error) => {
//   //    console.log(error);
//   // });
// }
