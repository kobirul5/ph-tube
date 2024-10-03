function getTimeString(time) {
    const hour = parseInt(time / 3600);
    const remainingSecond = time % 3600;
    const minute = parseInt(remainingSecond / 60);
    const second = remainingSecond % 60

    return (`${hour} hour ${minute} minute ${second} second`)

}






// fetch section 

const loadCategory = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => displayCategory(data.categories))
}
const videosCategory = (searchText = '') => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
        .then(res => res.json())
        .then(data => displayVideo(data.videos))
}

// btn color remove 
const removeBtnColor = () => {
    const buttons = document.getElementsByClassName('category-btn')
    for(const button of buttons){
        button.classList.remove("bg-red", "text-white")
    }
}
//  demoooooo
const demoObject = {
    "category_id": "1001",
    "video_id": "aaaa",
    "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
    "title": "Shape of You",
    "authors": [
        {
            "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
            "profile_name": "Olivia Mitchell",
            "verified": ""
        }
    ],
    "others": {
        "views": "100K",
        "posted_date": "16278"
    },
    "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
}

const loadVideo = (id) => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then(res => res.json())
        .then(data => {
            removeBtnColor()
            const activeBtn = document.getElementById(`btn-${id}`)
            activeBtn.classList.add("bg-red", "text-white")
            displayVideo(data.category)
        })
        .catch((error) => console.log(error))
}

const displayVideo = (videos) => {
    const videosContainer = document.getElementById('videos')
    videosContainer.innerHTML = ""

    if(videos.length === 0){
        videosContainer.classList.remove('grid')
        videosContainer.innerHTML = `
        <div class="main-h-[300px] flex flex-col justify-center items-center gap-5">
        <img src="./assets/icon.png" />
        <h2 class ="text-2xl font-bold text-center ">
        No content in this category
        </h2>
        </div>
        `
    }
    else{
        videosContainer.classList.add('grid')
    }

    videos.forEach(video => {

        const card = document.createElement('div');
        card.classList = "card card-compact"
        card.innerHTML = `
            <figure class = "h-[200px] relative">
            <img
            class = "h-full w-full object-cover"
            src="${video.thumbnail}"
            alt="video" />
            ${video.others.posted_date?.length === 0 ? '' : `<span class=" absolute bg-black p-2 text-white text-xs bottom-4 right-5"> ${getTimeString(video.others.posted_date)}
            </span>`
            }
            
        </figure>
        <div class="py-2 flex gap-2">
            <div>
            <img class = "w-10 h-10 rounded-full object-cover" src="${video.authors[0].profile_picture}"/>
            </div>
            <div>
            <h2 class="font-bold">${video.title} </h2>
            <div class =" flex gap-3">
            <p class= "text-gray-500">${video.authors[0].profile_name} </p>
            ${video.authors[0].verified === true ? `<img class =" w-5 object-cover" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png"/>` : ''
            }
            </div>
            <p class= "text-gray-500">${video.others.views} views</p>
            <div class = "pt-4"> 
                <button onclick="loadDetails('${video.video_id}')" class="btn btn-error">Details</button> 
            </div>
            </div>
        </div>
            `
        videosContainer.append(card)
    })
}

const loadDetails = async (videoId) => {
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
    const response = await fetch(url)
    const data = await response.json()
    displayDetails(data.video)
    
}

const displayDetails = (video) => {
    const detailContainer = document.getElementById('details-container')
    detailContainer.innerHTML = `
    <img class="w-full" src="${video.thumbnail}">
    <p class= "pt-5">${video.description}</p>
    `

    document.getElementById('openDetails').showModal()
}

// category
// : 
// "Music"
// category_id
// : 
// "1001"


const displayCategory = (categories) => {
    const categoriesContainer = document.getElementById('categories-container')
    categories.forEach(item => {
        const buttonContainer = document.createElement('div');
        buttonContainer.innerHTML = `
        <button id="btn-${item.category_id}" class="btn category-btn" onclick="loadVideo(${item.category_id})"> ${item.category}</button>
        `
        // button.classList = "btn"
        // button.innerText = item.category;
        categoriesContainer.append(buttonContainer);
    });
}

document.getElementById('search-input').addEventListener('keyup', (input) => {
    videosCategory(input.target.value)
})

loadCategory()

videosCategory()