const data = [
    {
        id: 0,
        image: "images/personimg1.jpg",
        text: ``,
        name: "Hannah",
        job: "All plants are ok at delivery time, thank you",
        stars: 5,
    },
    {
        id: 1,
        image: "images/personimg2.jpg",
        text: ``,
        name: "Stefan",
        job: "Received my saplings today...very good packing...tk u ",
        stars: 4,
    },
    {
        id: 2,
        image: "images/personimg3.jpg",
        text: ``,
        name: "Andrea",
        job: "Good seeds",
        stars: 3,
    },
    {
        id: 3,
        image: "images/personimg4.jpg",
        text: ``,
        name: "Simon Robben",
        job: "Nice Plants",
        stars: 5,
    },
    {
        id: 4,
        image: "images/personimg5.jpg",
        text: ``,
        name: "Peter",
        job: "Healthy plants received",
        stars: 5,
    },
];

const testimonials = document.querySelector('.testimonials');
const userImage = document.querySelector('.image');
const userText = document.querySelector('.text');
const userName = document.querySelector('.name');
const userJob = document.querySelector('.job');
const userStars = document.querySelector('.stars');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentReview = 0;

const addToHtml = (id) => {
    const star = `<i class="bi bi-star-fill"></i>`;

    userImage.src = data[id].image; // Fix here
    userText.innerHTML = data[id].text;
    userName.innerHTML = data[id].name;
    userJob.innerHTML = data[id].job;
    userStars.innerHTML = star.repeat(data[id].stars);
};

addToHtml(currentReview);

nextBtn.addEventListener('click', () => {
    if (currentReview < data.length - 1) {
        currentReview++;
        addToHtml(currentReview);
        changeOpacity();
    }
});

prevBtn.addEventListener('click', () => {
    if (currentReview > 0) {
        currentReview--;
        addToHtml(currentReview);
        changeOpacity();
    }
});

const changeOpacity = () => {
    if (currentReview == 4) {
        nextBtn.style.opacity = "0.5";
    } else if (currentReview == 0) {
        prevBtn.style.opacity = "0.5";
    } else {
        nextBtn.style.opacity = "1";
        prevBtn.style.opacity = "1";
    }
};

changeOpacity();
