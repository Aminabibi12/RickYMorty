//Header
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
sidebarContainer.style.minWidth = '250px';
sidebarContainer.style.overflow = 'auto';

const Sidebar = document.createElement('div');
const ul = document.createElement('ul');

const episodeDetailsContainer = document.createElement('div');
episodeDetailsContainer.id = 'episode-details';
episodeDetailsContainer.style.flexGrow = '1';
episodeDetailsContainer.style.paddingLeft = '20px';

const Button = document.createElement('button');
Button.textContent = 'Load Episodes';
Button.style.backgroundColor = '#000000';
Button.style.color = '#FFFFFF';
Button.style.height = '50px';
Button.style.width = '120px';
Button.style.marginLeft = '50px';
Button.style.marginBottom = '10px';

let episodes = [];
let currentIndex = 0;
let episode = [];
let air_date =[];

Button.addEventListener('click', loadEpisodes);

function loadEpisodes(){
    const nextIndex = currentIndex +10;
    
    if (nextIndex > episodes.length){
        Button.disabled = true;
        return;
    }
    const episodeSet = episodes.slice(currentIndex,nextIndex);
    ul.innerHTML = '';

    episodeSet.forEach((episode, index) => {
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.href = '#';
        link.textContent = `Episode ${currentIndex + index +1}`;
        link.addEventListener('click', () => displayEpisodeDetails(episode));
        li.appendChild(link);
        ul.appendChild(li);
    });
    currentIndex = nextIndex;

    if (currentIndex >= episodes.length){
        Button.disabled = true;
    }

    //Apply styles to episodes link.
    const linkElements = ul.getElementsByTagName('a');
    for (let i = 0; i < linkElements.length; i++){
        linkElements[i].style.color = '#000000';
        linkElements[i].style.paddingTop = '30px';
        linkElements[i].style.display = 'inline-block';
    }
}
//Fetch the episodes from API.
async function fetchData1(){
    try{
        let response = await fetch('https://rickandmortyapi.com/api/episode');
        let data = await response.json();
        episodes = data.results.map(episode => ({
            name: episode.name,
            episode : episode.episode,
            air_date : episode.air_date,
            characters: episode.characters,
        }));
       loadEpisodes();     
    } catch(error) {
        console.error('Error loading episodes:', error);
    }
}
fetchData1();

//Fetch additional data from other API.
async function fetchData2(url) {
    try {
    let response = await fetch(url);
    let data = await response.json();
    return data;
    } catch (error) {
        console.error('Error fetching additional data:', error);
    }
}


async function displayEpisodeDetails(episode) {
    episodeDetailsContainer.innerHTML = '';

    //create elements for episode name and description.
    const episodeName = document.createElement('h2');
    episodeName.textContent = episode.name;

    //create element for id.
    const episodeCode = document.createElement('p');
    episodeCode.textContent = episode.episode;

    //create element for air_date;
    const airDate = document.createElement('p');
    airDate.textContent = episode.air_date;

    //append the elements to episode details container
    episodeDetailsContainer.appendChild(episodeName);
    episodeDetailsContainer.appendChild(airDate);
    episodeDetailsContainer.appendChild(episodeCode);
 

    //Fetch  character data from API.
    for (let i = 0; i < episode.characters.length; i++){
        const characterUrl = episode.characters[i];
        const characterData = await fetchData2(characterUrl);
        if (characterData){
            const characterName = characterData.name;
            const characterImage = characterData.image;

            //create and append the image container 
            const imageWrapper = document.createElement('div');
            imageWrapper.style.width = '30%';
            imageWrapper.style.display = 'inline-block';
            imageWrapper.style.marginRight = '10px';
        


            //create and append the image.
            const episodeImage = document.createElement('img');
            episodeImage.src = characterImage;
            episodeImage.style.width = '30%';
            episodeImage.style.height = 'auto';
            episodeImage.style.marginBottom = '5px';
            episodeImage.addEventListener('click', () => displayCharacterInfo(characterData))
            
            imageWrapper.appendChild(episodeImage);
            episodeDetailsContainer.appendChild(imageWrapper);


            //create and append the character name.
            const imgText = document.createElement('p');
            imgText.textContent =  characterName;

            imageWrapper.appendChild(episodeImage);
            imageWrapper.appendChild(imgText);
            episodeDetailsContainer.appendChild(imageWrapper);
        }
        }
    }
    function displayCharacterInfo(character) {
        episodeDetailsContainer.innerHTML = '';
      
        // Create elements for character information
        
        const charImg = document.createElement('img');
        charImg.src = character.image;
        charImg.style.height = '25%';

        const nameElem = document.createElement('h2');
        nameElem.textContent = `Name: ${character.name}`;

        const statusElem = document.createElement('p');
        statusElem.textContent = `Status: ${character.status}`;
      
        const speciesElem = document.createElement('p');
        speciesElem.textContent = `Species: ${character.species}`;
      
        const genderElem = document.createElement('p');
        genderElem.textContent = `Gender: ${character.gender}`;
      
        const originElem = document.createElement('p');
        originElem.textContent = `Origin: ${character.origin.name}`;
      
        // Append the elements to the episode details container
        episodeDetailsContainer.appendChild(charImg);
        episodeDetailsContainer.appendChild(nameElem);
        episodeDetailsContainer.appendChild(statusElem);
        episodeDetailsContainer.appendChild(speciesElem);
        episodeDetailsContainer.appendChild(genderElem);
        episodeDetailsContainer.appendChild(originElem);

        
      }
      
    
document.body.appendChild(header);  
container.appendChild(sidebarContainer);
container.appendChild(episodeDetailsContainer);
sidebarContainer.appendChild(Sidebar);
Sidebar.appendChild(ul);
Sidebar.appendChild(Button);
Sidebar.style.fontSize = '1.5rem';
sidebarContainer.style.backgroundColor = '#D3D3D3';
episodeDetailsContainer.style.display = 'block';


document.getElementById('root').appendChild(container);
