
const cl = console.log;

const nfxBtn = document.getElementById("nfxBtn");
const movieModel = document.getElementById("movieModel");
const backDrop = document.getElementById("backDrop");
const closeBtns = document.querySelectorAll(".closeBtns");
const movieForm = document.getElementById("movieForm");
const movieName = document.getElementById("movieName");
const movieImg = document.getElementById("movieImg");
const movieDesc = document.getElementById("movieDesc");
const movieRating = document.getElementById("movieRating");
const submitBtn = document.getElementById("submitBtn");
const updateBtn = document.getElementById("updateBtn");
const spinner = document.getElementById("spinner");

const onHideShow = () =>{
    backDrop.classList.toggle("active");
    movieModel.classList.toggle("active");
}



// const onSubmit = (eve) =>{

//     eve.preventDefault();

//     let movieObj = {

//         title : movieName.value,
//         content : movieDesc.value,
//         imgPath : movieImg.value,
//         rating : movieRating.value,
//     }

    
// }

movieForm.addEventListener("submit",onSubmit);
nfxBtn.addEventListener("click",onHideShow);
closeBtns.forEach(b => b.addEventListener("click",onHideShow));
