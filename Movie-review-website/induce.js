// API key and URLs
const API_KEY = 'api_key=8943a8343f531783df72b524ecbb98a0';     
const BASE_URL='https://api.themoviedb.org/3';
const API_URL=BASE_URL+'/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMG_URL='https://image.tmdb.org/t/p/w500';
const searchURL=BASE_URL+'/search/movie?'+API_KEY;


const Reviews=document.getElementById('Reviews');
const form=document.getElementById('input');
const search=document.getElementById('search');


 getMovies(API_URL);

 // Function to fetch movie reviews using the API
function getMovies(url){
    fetch(url).then(response => response.json()).then(data =>{
         console.log(data.results);
         displayMovieReviews(data.results);
        })
}

//function to display the fetched movie(s).
function displayMovieReviews(data) {
    Reviews.innerHTML='';
    data.forEach(movie =>{
        const {title,poster_path,vote_average,overview,release_date}=movie;
        
        var text = overview;
        para = "";
        var line = text.split(". ");
        for (i = 0; i < 1; i++) {
          para += line[i] + ".";
        }

        const m1=document.createElement('div');
        m1.classList.add('movie');
        m1.innerHTML=`
        <img width="140px" src="${IMG_URL+poster_path}" alt="${title} movie poster" />

        <div class="About">
            <span class="${getcolor(vote_average)}"><b>${vote_average}</b></span>
            <h4>${title}</h4>
            <h6><i>${release_date}</i><h6><hr/>    
        </div>
        
        <div class="overview">
            <h5><b>Overview:</b></h5>
            <p>${para} ...</p>
        </div>
        `
        Reviews.appendChild(m1);
    })
    
}

//To get the color of movie rating
function getcolor(vote){
    if(vote>=8.5)
        return 'green';
    else if(vote>=7.5)
        return 'yellow';
    else if(vote>=6)
        return 'orange';
    else 
        return 'red';
}

//search functionality
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const Searchname=search.value;
    
    if(Searchname){
        getMovies(searchURL+'&query='+Searchname);
    }
    else{
        getMovies(API_URL);
    }
})

