const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCFR2oaNj02WnXkOgLH0iqOA&part=snippet%2Cid&order=date&maxResults=8';

const content = document.getElementById('content'); 
const containerContent = document.getElementById('containerContent'); 

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '2709866486msh60ee322e288ad0dp16a358jsnba7b417f2cb3',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

async function fetchData(urlApi) {
  const response = await fetch(urlApi, options);
  const data = await response.json();
  return data;
}

(async () => {
  try {
    const videos = await fetchData(API);
    let view = `
    ${videos.items.map(video => `
    <div class="group relative">
      <div
        class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden lg:aspect-none">
        <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
      </div>
      <div class="mt-4 flex justify-between">
        <h3 class="text-sm text-white">
          <span aria-hidden="true" class="absolute inset-0"></span>
          ${video.snippet.title}
        </h3>
      </div>
    </div>
    `).slice(0,8).join('')}
    `;
    content.innerHTML = view;
  }
  catch(error){
    // with += a html tag is added without replacing the existing ones.
    containerContent.innerHTML += '<p class="text-yellow-400 text-center text-xl">No videos found</p>'
    console.log(error);
  }
})();