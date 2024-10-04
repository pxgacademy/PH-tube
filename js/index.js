"use strict";

const buttonColor = (id) => {
  const buttons = document.getElementsByClassName("filterBtn");
  for (let b of buttons) {
    b.classList.remove("bg-error");
  }
  const btn = document.getElementById(`btn${id}`);
  btn.classList.add("bg-error");

  categoryVideos(id);
};

// search handle

document.getElementById("searchInput").addEventListener("keyup", (e) => {
  document.getElementById("videos").innerHTML = "";
  loadVideos(e.target.value);
});

const categoryVideos = async (id) => {
  const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
  const response = await fetch(url);
  const data = await response.json();

  document.getElementById("videos").innerHTML = "";
  showVideos(data.category);
};

const loadButtons = async () => {
  const url = "https://openapi.programming-hero.com/api/phero-tube/categories";
  const response = await fetch(url);
  const data = await response.json();
  const buttonsObj = data.categories;
  showButtons(buttonsObj);
  //   console.log(data.categories);
};

const showButtons = (buttonsObj) => {
  const filterButtons = document.getElementById("filterButtons");
  buttonsObj.forEach((btn) => {
    const div = document.createElement("div");
    // div.classList = ;
    div.innerHTML = `
    <button id="btn${btn.category_id}" class="btn w-40 py-1 filterBtn"
    onclick="buttonColor(${btn.category_id})">
    ${btn.category}
    </button>
    `;
    filterButtons.appendChild(div);
  });

  const filterBtn = document.getElementsByClassName("filterBtn");
};

const demoObj = {
  category_id: "1001",
  video_id: "aaaa",
  thumbnail: "https://i.ibb.co/L1b6xSq/shape.jpg",
  title: "Shape of You",
  authors: [
    {
      profile_picture: "https://i.ibb.co/D9wWRM6/olivia.jpg",
      profile_name: "Olivia Mitchell",
      verified: "",
    },
  ],
  others: {
    views: "100K",
    posted_date: "16278",
  },
  description:
    "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey.",
};

const loadVideos = async (search) => {
  const url = `https://openapi.programming-hero.com/api/phero-tube/videos?title=${
    search ? search : ""
  }`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data.videos);

  showVideos(data.videos);
};

// create date
const createDate = (seconds) => {
  if (seconds <= 0) return "";
  const years = Math.floor(seconds / (365 * 24 * 60 * 60));
  if (years > 0) return `${years} years ago`;
  seconds %= 365 * 24 * 60 * 60;

  const days = Math.floor(seconds / (24 * 60 * 60));
  if (days > 0) return `${days} days ago`;
  seconds %= 24 * 60 * 60;

  const hours = Math.floor(seconds / (60 * 60));
  seconds %= 60 * 60;

  const minutes = Math.floor(seconds / 60);
  seconds %= 60;

  if (hours > 0) {
    return `${hours} hours ${minutes} minutes ${seconds} seconds ago`;
  }
  return `${minutes} minutes ${seconds} seconds ago`;
};

const showVideos = (videosObj) => {
  const videoCards = document.getElementById("videos");

  if (videosObj.length === 0) {
    videoCards.classList.remove("grid");
    document.getElementById("videos").innerHTML = `
    <div class="w-full h-[400px] flex flex-col gap-5 items-center justify-center">
    <img src="./Icon.png" />
    <h2 class='text-3xl font-bold'>Oops! There is no content here</h2>
    </div>
    `;
  } else {
    videoCards.classList.add("grid");
  }

  videosObj.forEach((video) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <div>
      <div class="bg-zinc-400 h-52 rounded-lg overflow-hidden relative">
        <img class="w-full h-full object-cover" src=${video.thumbnail} alt="">
        ${
          video.others.posted_date &&
          `<div class="bg-zinc-800 absolute bottom-3 right-3 text-white p-1 rounded text-sm">
        <p>${createDate(video.others.posted_date)}</p>
        </div>`
        }
        
      </div>
      <div class="flex gap-3 mt-4">
        <div class="h-12 w-12 overflow-hidden rounded-full">
        <img class="h-full w-full object-cover" src=${
          video.authors[0].profile_picture
        } alt="">
        </div>
        <div class="space-y-2">
          <h3 class="text-xl font-bold">
          ${video.title}
          </h3>
          <div class="flex items-center gap-3">
            <p>${video.authors[0].profile_name}</p>
            ${
              video.authors[0].verified
                ? `<i class="fa-solid fa-certificate text-sky-500"></i>`
                : ""
            }
          </div>
          <button class="btn w-full py-2">Description</button>
        </div>
      </div>
    </div>
  `;
    videoCards.appendChild(div);
  });
};

loadButtons();
loadVideos();
