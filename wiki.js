
var searchBox = document.querySelector(".search-box")
var searchButton = document.querySelector(".search-button")
var resultsShown = false;

searchButton.addEventListener("click", function(){
    if(resultsShown === true){
        var elem = document.querySelectorAll("a")
        for (var i = 0; i < 8; i++) {
        elem[i].parentNode.removeChild(elem[i])
        }
    }
var searchReq = new XMLHttpRequest();
searchReq.open('GET', 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + searchBox.value + '&limit=8&format=json', true);
document.querySelector(".title").setAttribute("style","margin:20px;")
document.querySelector(".logo").setAttribute("style", "width:100px;")
document.querySelector(".logo-name").setAttribute("style", "width:100px;")

searchReq.onload = function() {
  if (searchReq.status >= 200 && searchReq.status < 400) {
    // Success!
    var searchData = JSON.parse(searchReq.responseText);
    if (searchData[1] <= 0){
        resultsShown = false;
    } else{
    for (var i = 0; i < searchData[1].length; i++) {
        var result = document.createElement("a")
        result.href = searchData[3][i]
        result.innerHTML = "<div>" + "<h1>" + searchData[1][i] + "</h1>" + " " + searchData[2][i] + "</div>"
        document.querySelector(".search-results").appendChild(result)
            resultsShown = true;
        }
    }

  } else {
    // We reached our target server, but it returned an error

  }
};

searchReq.onerror = function() {
  // There was a connection error of some sort
};

searchReq.send();
})


// Enable hitting of enter instead of clicking "Search"
    searchBox.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        searchButton.click();
    }
});





