# Find my fodder

```
https://github.com/roscolil/find_me_fodder

```

This is a search app designed to locate restaurants (Zomato API) based on the users geographic location and the cuisine they specify.

The results can be sorted by distance, rating or cost and are displayed 10 at a time.

When the search button is clicked it sends the app obtains current position and requests data from the api endpoint. These results are then rendered to the page. A progress message is displayed and the number of results and the 'More' button are hidden when the noOfResults = 0.



## Technology used:
* Webpack-react-starter boilerplate
* Milligram css library
* Axios HTTP client
* Zomato developer API
* Chrome geolocation API

## Things to improve
* Splash screen while loading results
* Refactor code for separate/reusable components
