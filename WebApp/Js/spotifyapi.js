function generatePlaylist(){

  const getUrlParameter = (sParam) => {
    let sPageURL = window.location.search.substring(1),////substring will take everything after the https link and split the #/&
      sURLVariables = sPageURL != undefined && sPageURL.length > 0 ? sPageURL.split('#') : [],
      sParameterName,
      i;
    let split_str = window.location.href.length > 0 ? window.location.href.split('#') : [];
    sURLVariables = split_str != undefined && split_str.length > 1 && split_str[1].length > 0 ? split_str[1].split('&') : [];
    for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');
      if (sParameterName[0] === sParam) {
        return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
      }
    }
  };

  const accessToken = getUrlParameter('access_token');
  let client_id = '208c84a3640c4461b8b99208d57abcee';
  let redirect_uri = 'https://studyat.netlify.app/views/roomv2';
  const redirect = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&redirect_uri=${redirect_uri}`; // redirect to the page with the access token
  // Don't authorize if we have an access token already
  if (accessToken == null || accessToken == "" || accessToken == undefined) {
    window.location.replace(redirect);
  }


  // -------- Start of Spotify ajax call
  if (sessionStorage.getItem('musicChoice') == 'lofi') {
    $.ajax({
      url: `https://api.spotify.com/v1/playlists/0vvXsWCC9xrXsKd4FyS8kM`,
      type: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accessToken
      },
      success: function (data) {
        // Load our songs from Spotify into our page
        console.log(data)
        let src_str = `https://open.spotify.com/embed/playlist/0vvXsWCC9xrXsKd4FyS8kM`;
        let iframe = `<div class='song'><iframe id="spotifysong" src=${src_str} frameborder="1" allowtransparency="true" allow="encrypted-media" style="height:200px;"></iframe></div>`;
        let parent_div = $('#song_0');
        parent_div.html(iframe);
      },
      error: function(data){
        console.log(data);
      }
    });
  }
  else if (sessionStorage.getItem('musicChoice') == 'jazz'){
    $.ajax({
      url: `https://api.spotify.com/v1/playlists/37i9dQZF1DWV7EzJMK2FUI`,
      type: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accessToken
      },
      success: function (data) {
        // Load our songs from Spotify into our page
        console.log(data)
        let src_str = `https://open.spotify.com/embed/playlist/37i9dQZF1DWV7EzJMK2FUI`;
        let iframe = `<div class='song'><iframe id="spotifysong" src=${src_str} frameborder="1" allowtransparency="true" allow="encrypted-media" style="height:200px;"></iframe></div>`;
        let parent_div = $('#song_0');
        parent_div.html(iframe);
      }
    });
  }
  else {
    $.ajax({
      url: `https://api.spotify.com/v1/playlists/4aGu2z2nqXPRERvVztuC9F`,
      type: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accessToken
      },
      success: function (data) {
        // Load our songs from Spotify into our page
        console.log(data)
        let src_str = `https://open.spotify.com/embed/playlist/4aGu2z2nqXPRERvVztuC9F`;
        let iframe = `<div class='song'><iframe id="spotifysong" src=${src_str} frameborder="1" allowtransparency="true" allow="encrypted-media" style="height:200px;"></iframe></div>`;
        let parent_div = $('#song_0');
        parent_div.html(iframe);
      }
    });
  }

}; // End of search button