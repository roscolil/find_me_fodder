# Find my fodder

```
### GitHub pages
https://roscolil.github.io/find_me_fodder/

### GitHub repo
https://github.com/roscolil/find_me_fodder

```

This is a search app designed to locate restaurants (Zomato API) based on the users geographic location and the cuisine they specify.

The results can be sorted by distance, rating or cost and are displayed 10 at a time.

When the search button is clicked it sends the app obtains current position and requests data from the api endpoint. These results are then rendered to the page. A progress message is displayed and the number of results and the 'More' button are hidden when the noOfResults = 0.



## Technology used:
* Webpack-react-starter boilerplate
* Milligram css library (with flex box)
* Axios HTTP client
* Zomato developer API
* Chrome geolocation API

## Things to improve
* Splash screen while loading results
* Option to sort ascending/descending
* Append additional search results or use infinite scrolling
* Refactor code for separate/reusable components

## Lessons learned
* Building react components
* The process of how react sets state and re-renders page elements
* Ways to, or libraries that, make app responsive for mobile
* How many breeds of cows there are
