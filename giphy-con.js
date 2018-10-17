
// GIPHY controller
// API Dashboard - https://developers.giphy.com/dashboard/
// This will probably be used in multiple projects in the future. Current key is for kaiju-rps-multiplayer.
// If Axios is available use it, fall back to jQuery
class GiphyController {
    constructor(apiKey, rating, language) {
        this.apiKey = apiKey;
        this.rating = rating || "PG-13";
        this.language = language || "en";

        // internal function to call GIPHY API using Axios or jQuery
        this._executeGet = function (url, doneCallback, failCallback) {
            if (!apiKey || typeof apiKey !== "string") {
                console.log("A GIPHY API Key is required to use GiphyController.")
                return;
            }

            if (!doneCallback || typeof doneCallback !== "function") {
                console.log("A call back function is required for all calls.")
                return;
            }

            if (axios) {
                axios.get(url)
                    .then(doneCallback)
                    .catch(failCallback);
            } else if (jQuery) {
                jQuery.get(url)
                    .done(doneCallback)
                    .fail(failCallback);
            } else {
                console.log("Axios or jQuery required in order to make AJAX calls.")
            }
        };
    }
}

// Define the prototype functions 

// GET functions ==================================================

// Single ID
GiphyController.prototype.getById = function (id, doneCallback, failCallback) {
    var url = "https://api.giphy.com/v1/gifs/" + id + "?api_key=" + this.apiKey;
    this._executeGet(url, doneCallback, failCallback);
};

// Multiple IDs passed as an array
GiphyController.prototype.getByIds = function (idArray, doneCallback, failCallback) {
    if (!Array.isArray(idArray)) {
        console.log("An array of GIF IDs is required to retrieve by IDs.")
        return;
    }

    var url = "https://api.giphy.com/v1/gifs?api_key=" + this.apiKey + "&ids=" + idArray.join(",");
    this._executeGet(url, doneCallback, failCallback);
};

// Single rangom GIF with an optional tag
GiphyController.prototype.getRandom = function (tag, doneCallback, failCallback) {
    var url = "https://api.giphy.com/v1/gifs/random?api_key=" + this.apiKey + "&tag=" + tag + "&rating=" + this.rating;
    this._executeGet(url, doneCallback, failCallback);
};

// GIF search function. GIPHY API returns 25 items by default
GiphyController.prototype.search = function (query, doneCallback, failCallback) {
    if (!query || typeof query != "string") {
        console.log("A query string is required for GIF search.")
        return;
    }

    var url = "https://api.giphy.com/v1/gifs/search?api_key=" + this.apiKey + "&q=" + query + "&rating=" + this.rating + "&lang=" + this.language;
    this._executeGet(url, doneCallback, failCallback);
};

// GIF search function 
GiphyController.prototype.paginatedSearch = function (query, limit, offset, doneCallback, failCallback) {
    if (!query || typeof query != "string") {
        console.log("A query string is required for GIF search.")
        return;
    }

    var url = "https://api.giphy.com/v1/gifs/search?api_key=" + this.apiKey + "&q=" + query + "&limit=" + limit + "&offset=" + offset + "&rating=" + this.rating + "&lang=" + this.language;
    this._executeGet(url, doneCallback, failCallback);
};

// End GET functions ==================================================

// POST functions =================================================

// End POST functions =================================================

