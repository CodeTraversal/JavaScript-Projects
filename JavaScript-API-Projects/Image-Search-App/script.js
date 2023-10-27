const accessKey = "ywy6rhvWIDmsqtl9h68Dlvi9z_lggl_ZageXZ5qHm9Y"; //ywy6rhvWIDmsqtl9h68Dlvi9z_lggl_ZageXZ5qHm9Y
const searchForm = document.querySelector("form");
const searchInput = document.querySelector(".search-input");
const imagesContainer = document.querySelector(".images-container");
const loadMoreBtn = document.querySelector(".loadMoreBtn");
let page = 1;

//Function to fetch Images using Unsplash API
const fetchImages = async (query, pageNo) =>{
    try{
            if (pageNo===1) {
                imagesContainer.innerHTML = '';
            }
        
        
        const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=28&page=${pageNo}&client_id=${accessKey}`;

        const response = await fetch(url);
        const data = await response.json();

        if(data.results.length > 0){
            data.results.forEach(photo =>{
                //Creating Image Div
                const imageElement = document.createElement('div');
                imageElement.classList.add("imageDiv");
                imageElement.innerHTML = `<img src ="${photo.urls.regular}"/>`;
        
                //Creating Overlay Effect
                const overlayElement = document.createElement('div');
                overlayElement.classList.add("overlay");
        
                //Creating Overlay Text
                const overlaytext = document.createElement('h3');
                overlaytext.innerText =`${photo.alt_description}`;
                
                //Adding elements
                overlayElement.appendChild(overlaytext);
                imageElement.appendChild(overlayElement);
                imagesContainer.appendChild(imageElement);
        
            });
        
            if(data.total_pages === pageNo){
                loadMoreBtn.style.display = "none";
            }
            else{
                loadMoreBtn.style.display = "block";
            }
        }
        else{
                imagesContainer.innerHTML = `<h2>No Image Found</h2>`;
                if(loadMoreBtn.style.display === "block"){
                    loadMoreBtn.style.display = "none";
                }
        }
    } 
    catch (error) {
        imagesContainer.innerHTML = `<h2>Failed to fetch images. Please try later.</h2>`;
    }   
}



//Adding Eventlistner to Search Form
searchForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const inputText = searchInput.value.trim();
    if(inputText!=""){
        page = 1;
        fetchImages(inputText, page);
    }
    else{
        imagesContainer.innerHTML = `<h2>Please enter a query to Search</h2>`;
        if(loadMoreBtn.style.display === "block"){
            loadMoreBtn.style.display = "none";
        }
    }
});

//Adding Eventlistner to load more button to load more images
loadMoreBtn.addEventListener('click', () =>{
    fetchImages(searchInput.value.trim(), ++page);
});