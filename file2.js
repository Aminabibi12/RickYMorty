const header = document.getElementById('root');
const title = document.createElement('h1');
title.textContent = "Rick and Morty API";
header.appendChild(title);

const container = document.createElement('div');
container.style.display = 'flex';

const sidebarContainer = document.createElement('div');
sidebarContainer.id = 'sidebar-container';
sidebarContainer.style.height = '600px';
sidebarContainer.style.width = '250px';
sidebarContainer.style.overflow = 'auto';

const Sidebar = document.createElement('div');
const ul = document.createElement('ul');

const episodeDetailsContainer = document.createElement('div');
episodeDetailsContainer.id = 'episode-details';
episodeDetailsContainer.style.flexGrow = '1'; // Expand to fill available space
episodeDetailsContainer.style.paddingLeft = '20px'; // Add some padding

const Button = document.createElement('button');
Button.textContent = 'Load Episodes';
Button.style.backgroundColor = '#000000';
Button.style.color = '#FFFFFF';
Button.style.height = '50px';
Button.style.width = '120px';
Button.style.marginLeft = '50px';
Button.style.marginBottom = '10px';

let episodes = []; // Array to store all episodes
let currentIndex = 0; // Index of the current episode set to load

Button.addEventListener('click', loadEpisodes);

function loadEpisodes() {
  const nextIndex = currentIndex + 10;

  if (nextIndex > episodes.length) {
    Button.disabled = true; // Disable the button if no more episodes are available
    return;
  }

  const episodeSet = episodes.slice(currentIndex, nextIndex);

  ul.innerHTML = ''; // Clear existing episode list

  episodeSet.forEach((episode, index) => {
    const li = document.createElement('li');
    const link = document.createElement('a');
    link.href = '#';
    link.textContent = `Episode ${currentIndex + index + 1}`;
    link.addEventListener('click', () => displayEpisodeDetails(episode)); // Add click event listener
    li.appendChild(link);
    ul.appendChild(li);
  });

  currentIndex = nextIndex; // Update the current index

  if (currentIndex >= episodes.length) {
    Button.disabled = true; // Disable the button if no more episodes are available
  }

  // Apply styles to episode links
  const linkElements = ul.getElementsByTagName('a');
  for (let i = 0; i < linkElements.length; i++) {
    linkElements[i].style.color = '#000000';
    linkElements[i].style.paddingTop = '30px';
    linkElements[i].style.display = 'inline-block';
  }
}

// Fetch the episodes from the API and populate the episodes array
async function fetchData1() {
  try {
    let response = await fetch('https://rickandmortyapi.com/api/episode');
    let data = await response.json();
    episodes = data.results.map(episode => ({
      name: episode.name,
      description: '' // Empty description field to be filled later
    }));
    loadEpisodes(); // Load the initial episodes
  } catch (error) {
    console.error('Error loading episodes:', error);
  }
}

fetchData1();

// Fetch additional data from another API and update the description field
async function fetchData2() {
  try {
    let response = await fetch('https://rickandmortyapi.com/api/character');
    let data = await response.json();
    episodes.forEach((episode, index) => {
      episode.description = data.results[index].description;
    });
  } catch (error) {
    console.error('Error fetching additional data:', error);
  }
}

fetchData2();

function displayEpisodeDetails(episode) {
  // Clear existing episode details
  episodeDetailsContainer.innerHTML = '';

  // Create elements for episode name and description
  const episodeName = document.createElement('h2');
  episodeName.textContent = episode.name;

  const episodeDescription = document.createElement('p');
  episodeDescription.textContent = episode.description;

  // Append the elements to the episode details container
  episodeDetailsContainer.appendChild(episodeName);
  episodeDetailsContainer.appendChild(episodeDescription);

  // Create and append the image container
  const imageContainer = document.createElement('div');
  imageContainer.style.display = 'flex';
  imageContainer.style.flexWrap = 'wrap';
  imageContainer.style.gap = '20px';

  // Create and append the images with text
  for (let i = 0; i < 6; i++) {
    const imageWrapper = document.createElement('div');
    imageWrapper.style.position = 'relative';
    imageWrapper.style.width = '30%'; // Adjust image width to fit two images in one row
    imageWrapper.style.marginTop = '20px';
    imageWrapper.style.marginLeft = '20px';

    const episodeImage = document.createElement('img');
    episodeImage.src = "/imagex/download.jpeg";
    episodeImage.style.width = '70%';
    episodeImage.style.height = 'auto'; // Set height to 'auto' to maintain aspect ratio

    const imgText = document.createElement('p');
    imgText.textContent = 'Description';

    imageWrapper.appendChild(episodeImage);
    imageWrapper.appendChild(imgText);
    imageContainer.appendChild(imageWrapper);
  }

  episodeDetailsContainer.appendChild(imageContainer);
}

container.appendChild(sidebarContainer);
container.appendChild(episodeDetailsContainer);
sidebarContainer.appendChild(Sidebar);
Sidebar.appendChild(ul);
Sidebar.appendChild(Button);
Sidebar.style.fontSize = '1.5rem';
sidebarContainer.style.backgroundColor = '#D3D3D3';

document.getElementById('root').appendChild(container);
