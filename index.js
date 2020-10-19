 //configuration object for firebase 
 var firebaseConfig = {
    apiKey: "AIzaSyCywuknDCjGEJDlO5kVf1a438F0y3jjvF0",
    authDomain: "shopping-68545.firebaseapp.com",
    databaseURL: "https://shopping-68545.firebaseio.com",
    projectId: "shopping-68545",
    storageBucket: "shopping-68545.appspot.com",
    messagingSenderId: "796482491050",
    appId: "1:796482491050:web:577c1c86287534742af6d3",
    measurementId: "G-Y7CT2ZQM0D"
};

//---------------------------------------------------- Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics()

//----------------------------------------------------DOM pasrsing i.e getting all object from the html 
const inpFile = document.getElementById("inpFile")
const btnUplode = document.getElementById("btnUplode")
const productName = $("#productName")
const productPrice = $("#productPrice")
const productDiscription = $("#productDiscription")
const catagoryMenOrWomen = $("#catagoryMenOrWomen")
const brandName = $("#brandName")
const typeofProduct = $("#TypeofProduct")


// ----------------------------------------------------code for image prievew in the div
inpFile.addEventListener("change",function(){
for (const file of inpFile.files){
if(file){
    const reader = new FileReader();
    reader.addEventListener("load",function(){
        var imgtagi  = document.createElement("img")
        imgtagi.setAttribute("src",this.result)
        showUplodedPhoto.append(imgtagi)
    })
     
    reader.readAsDataURL(file)
}

}
})




//--------------------------------------------------Uplode Button for image uplode and submit all information to database
btnUplode.addEventListener("click", function() {

    //------------------------------------------------loping for upldoing multiple files in database
    for (const file of inpFile.files) {

        var x = 0
        //---------------------------------------------array for all the images 
        var productImages = new Array();
        const name = productName.val() + new Date().getTime() + file.name
        const ref = firebase.storage().ref()
        const metadata = {
            contentType: file.type
        }
        const task = ref.child(name).put(file, metadata)
        task.then(snapshot => snapshot.ref.getDownloadURL()).then(url => {
            productImages.push(url)
            x = x + 1
            if (x == inpFile.files.length) {
                
                // -----------------------------------------call for uploding data into mock api
                var settings = {
                    "url": "https://5f844e4d6b97440016f4f452.mockapi.io/ShopingWebSit",
                    "method": "POST",
                    "timeout": 0,
                    "headers": {
                        "Content-Type": "application/json"
                    },
                    "data": JSON.stringify({
                        "ProductName": productName.val(),
                        "ProductPrice": productPrice.val(),
                        "ProductDiscription": productDiscription.val(),
                        "ProductImages": productImages,
                        "ProductCatagoryMenOrWomen": catagoryMenOrWomen.val(),
                        "ProductBrandName": brandName.val(),
                        "ProductUplodedDate": new Date(),
                        "ProductType": typeofProduct.val()
                    }),
                };
                $.ajax(settings).done(function(response) {
                    console.log(response);
                    alert("uplode sucessful")
                    const Blankvalue = ""
                    productName.val(Blankvalue)
                    productPrice.val(Blankvalue)
                    productDiscription.val(Blankvalue)
                    brandName.val(Blankvalue)
                             
                });
            }
        })

    }
})