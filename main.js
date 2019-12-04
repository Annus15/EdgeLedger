// // Initialize and add the map
// function initMap() {
//     // Your location
//     const loc = { lat: 42.361145, lng: -71.057083 };
//     // Centered map on location
//     const map = new google.maps.Map(document.querySelector('.map'), {
//       zoom: 14,
//       center: loc
//     });
//     // The marker, positioned at location
//     const marker = new google.maps.Marker({ position: loc, map: map });
//   }

// //   Smooth scrolling

//   $(document).ready(function(){
//     // Add smooth scrolling to all links
//     $("#navbar a, .btn").on('click', function(event) {
  
//       // Make sure this.hash has a value before overriding default behavior
//       if (this.hash !== "") {
//         // Prevent default anchor click behavior
//         event.preventDefault();
  
//         // Store hash
//         var hash = this.hash;
  
//         // Using jQuery's animate() method to add smooth page scroll
//         // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
//         $('html, body').animate({
//           scrollTop: $(hash).offset().top
//         }, 800, function(){
  
//           // Add hash (#) to URL when done scrolling (default click behavior)
//           window.location.hash = hash;
//         });
//       } // End if
//     });
//   });

// //   Transparent Sticky navbar

//   window.addEventListener('scroll', function() {
//       if(window.scrollY > 150){
//           document.querySelector('#navbar').style.opacity = 0.7;
//       }
//       else {
//         document.querySelector('#navbar').style.opacity = 1;
//       }
//   });

//   function enroll (){
    
// location.href = "C:\Program Files\Notepad++\notepad++.exe"; 

//   }
// Check for the various File API support.
// if (window.File && window.FileReader && window.FileList && window.Blob) {
//   console.log("Great success! All the File APIs are supported.");
// } else {
//   alert('The File APIs are not fully supported in this browser.');
// }

$('#file').on('change',function(event){
  selectedFile= event.target.files[0];
  $('#upload-button').show();
})
// Create a root reference

function uploadFile(){
  var filename = selectedFile.name;
  var storageRef = firebase.storage().ref('/fingerprintImages/' + filename);
  var uploadTask = storageRef.put(selectedFile);

  // Register three observers:
// 1. 'state_changed' observer, called any time the state changes
// 2. Error observer, called on failure
// 3. Completion observer, called on successful completion
uploadTask.on('state_changed', function(snapshot){
  // Observe state change events such as progress, pause, and resume
  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  console.log('Upload is ' + progress + '% done');
  switch (snapshot.state) {
    case firebase.storage.TaskState.PAUSED: // or 'paused'
      console.log('Upload is paused');
      break;
    case firebase.storage.TaskState.RUNNING: // or 'running'
      console.log('Upload is running');
      break;
  }
}, function(error) {
  // Handle unsuccessful uploads
}, function() {
  // Handle successful uploads on complete
  // For instance, get the download URL: https://firebasestorage.googleapis.com/...
  uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
    console.log('File available at', downloadURL);
  });
});

}
