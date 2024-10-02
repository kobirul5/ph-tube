// fetch section 

const loadCategory = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => displayCategory(data.categories))
}
const videosCategory = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
        .then(res => res.json())
        .then(data => displayVideo(data.videos))
}


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


const displayVideo = (videos) => {
    const videosContainer = document.getElementById('videos')
    videos.forEach(video => {
        console.log(video)
        const card = document.createElement('div');
        card.classList = "card card-compact"
        card.innerHTML = `
            <figure class = "h-[200px] relative">
            <img
            class = "h-full w-full object-cover"
            src="${video.thumbnail}"
            alt="video" />
            <span class=" absolute bottom-4 right-5">${video.others.posted_date}</span>
        </figure>
        <div class="py-2 flex gap-2">
            <div>
            <img class = "w-10 h-10 rounded-full object-cover" src="${video.authors[0].profile_picture}"/>
            </div>
            <div>
            <h2 class="font-bold">${video.title} </h2>
            <div class =" flex gap-3">
            <p class= "text-gray-500">${video.authors[0].profile_name} </p>
            ${
                video.authors[0].verified === true ? `<img class =" w-5 object-cover" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png"/>` : ''
            }
            </div>
            <p class= "text-gray-500">${video.others.views} views</p>
            </div>
        </div>
            `
    videosContainer.append(card)
    })
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
        const button = document.createElement('button')
        button.classList = "btn"
        button.innerText = item.category;
        categoriesContainer.append(button);
    });
}
loadCategory()

videosCategory()