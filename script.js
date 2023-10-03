// script.js
const userDetails = document.querySelector('.details');
const imgContainer = document.querySelector('.img-container');
const getUserButton = document.getElementById('get-user-btn');

let usernames = [];
let shuffledUsernames = [];
let imgUrls = [];

// Function to read and parse the usernames from username.txt
async function readUsernamesFromFile() {
  try {
    const response = await fetch('username.txt');
    const text = await response.text();
    usernames = text.split('\n').filter((username) => username.trim() !== '');
    shuffledUsernames = [...usernames]; // Create a shuffled copy
    shuffleArray(shuffledUsernames); // Shuffle the copy
  } catch (error) {
    console.error('Error reading usernames from file:', error);
  }
}

// Function to read and parse the image URLs from img.txt
async function readImageUrlsFromFile() {
  try {
    const response = await fetch('img.txt');
    const text = await response.text();
    imgUrls = text.split('\n').filter((url) => url.trim() !== '');
    shuffleArray(imgUrls); // Shuffle the image URLs
  } catch (error) {
    console.error('Error reading image URLs from file:', error);
  }
}

// Function to shuffle an array (Fisher-Yates shuffle)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

getUserButton.addEventListener('click', async () => {
  if (usernames.length === 0) {
    await readUsernamesFromFile(); // Load usernames from file if not already loaded
  }

  if (shuffledUsernames.length === 0) {
    userDetails.innerHTML = `<h2>Out of decks</h2>`;
    return;
  }

  if (imgUrls.length === 0) {
    await readImageUrlsFromFile(); // Load image URLs from file if not already loaded
  }

  if (imgUrls.length === 0) {
    imgContainer.innerHTML = '<p>No images found</p>';
    return;
  }

  // Pop a username from the shuffled array (ensures uniqueness)
  const randomUsername = shuffledUsernames.pop();
  userDetails.innerHTML = `<h2>${randomUsername}</h2>`;

  // Pop a random image URL from the shuffled array
  const randomImageUrl = imgUrls.pop();

  // Display the random image in the .img-container
  imgContainer.innerHTML = `<img src="${randomImageUrl}" alt="Random Image" />`;
});
