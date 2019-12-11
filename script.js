'use strict';

const apiKey = 'n9d6S7cXKUtjAyuZ8rMfq9EFz1JIeseH8YwnOgvw'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks';

function displayResults(responseJson) {
  $('#results-list').empty();
  for (let i = 0; i < responseJson.data.length; i++){
    $('#results-list').append(
      `<li>
        <h3>${responseJson.data[i].fullName}</h3>
        <p> Description ${responseJson.data[i].description} </p>
        <p><a href='${responseJson.data[i].url}'> ${responseJson.data[i].url} </a></p>
      </li>`
    )};
  $('#results').removeClass('hidden');
}

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}


function npsList(query, maxResults=10) {
  const params = {
    api_key: apiKey,
    stateCode: query,
    limit: maxResults,
  };

  const queryString = formatQueryParams(params);
  const url = searchURL + '?' + queryString;

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm (){
  $('form').submit(event => {
    event.preventDefault();
    const searchArea = $('#js-search-area').val();
    const maxResults = $('#js-max-results').val();
    npsList(searchArea, maxResults);
  });
}

$(watchForm);