
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
const movieContainer = document.getElementById("movieContainer");

const BaseURL = "https://post-task-xhr-default-rtdb.firebaseio.com/";

const PostURL = "https://post-task-xhr-default-rtdb.firebaseio.com/movies.json";

const onHideShow = () => {
    backDrop.classList.toggle("active");
    movieModel.classList.toggle("active");
}

const ConvertArr = (obj) => {

    let res = [];

    for (const key in obj) {

        res.unshift({ ...obj[key], id: key });
    }
    return res;
}

const RatingClass = (rating) =>{

    if(rating > 9){

        return "badge-success";
    }
    else if(rating > 6 && rating <= 9){

        return "badge-warning";
    }
    else{

        return "badge-danger"
    }
}

const SnackBar = (icon, msg) => {

    Swal.fire({

        title: msg,
        icon: icon,
        timer: 1500
    })
}

const MakeAPICall = async (apiURL, method, body) => {

    spinner.classList.remove("d-none");

    body = body ? JSON.stringify(body) : null;

    let configObj = {

        method: method,
        body: body,
        headers: {

            "auth": "token form local storage",
            "content-type": "application/json"
        }
    }

    try {

        let res = await fetch(apiURL, configObj);

        return res.json();
    }
    catch (err) {

        SnackBar("error", err);
    }
    finally {

        spinner.classList.add("d-none");

    }

}

const Templating = (arr) => {

    let res = arr.map(m => {

        return `
          
            <div class="col-md-3 col-sm-6" id ="${m.id}">
                <div class="card movieCard text-white">
                    <div class="card-header p-0">
                        <div class="row">
                            <div class="col-10">
                                <h5>${m.title}</h5>
                            </div>
                            <div class="col-2">
                                <h6><span class="badge ${RatingClass(m.rating)}">${m.rating}</span></h6>
                            </div>
                        </div>
                    </div>
                    <div class="card-body p-0">
                        <figure>
                            <img src="${m.imgPath}"
                                alt="${m.title}">
                            <figcaption>
                                <h5>${m.title}</h5>
                                <p>${m.title}</p>
                            </figcaption>
                        </figure>
                    </div>
                    <div class="card-footer d-flex justify-content-between p-0">
                        <button class="btn btn-sm btn-success">Edit</button>
                        <button class="btn btn-sm btn-danger">Remove</button>
                    </div>
                </div>
            </div>
        
        `;
    }).join("");
 
    movieContainer.innerHTML = res;

}

const FetchMovies = async () => {

    let res = await MakeAPICall(PostURL, "GET", null);

    let data = ConvertArr(res);

    Templating(data);

    cl(data);
}

FetchMovies();

// const onSubmit = (eve) =>{

//     eve.preventDefault();

//     let movieObj = {

//         title : movieName.value,
//         content : movieDesc.value,
//         imgPath : movieImg.value,
//         rating : movieRating.value,
//     }


// }

// movieForm.addEventListener("submit", onSubmit);
nfxBtn.addEventListener("click", onHideShow);
closeBtns.forEach(b => b.addEventListener("click", onHideShow));
