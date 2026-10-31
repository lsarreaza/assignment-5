# TV Show Search Gallery

This project is a React single-page TV show gallery built with Vite. It uses the TVmaze API to search for shows, displays cast information, and shows a detail page for each result.

## Run the project

From the assignment folder, run:

```bash
cd try-react-routes
npm install
npm run dev
Open the local URL shown by Vite
Press Ctrl+C to stop the development server.
```

## React concepts

| Requirement | Where it appears |
| --- | --- |
| 1. Components and props | `App.jsx`, `Gallery.jsx`, `SearchForm.jsx`, `ShowList.jsx`, `ShowCard.jsx`, `CastList.jsx`, and `ShowDetail.jsx` |
| 2. Lists and keys | `ShowList.jsx`, `ShowCard.jsx`, and `CastList.jsx` |
| 3. Conditional rendering | `Gallery.jsx`, `ShowCard.jsx`, and `ShowDetail.jsx` |
| 4. Controlled form | `SearchForm.jsx` |
| 5. State with `useState` | `Gallery.jsx`, `ShowCard.jsx`, and `ShowDetail.jsx` |
| 6. Effects and fetch | `Gallery.jsx`, `ShowCard.jsx`, and `ShowDetail.jsx` |
| 7. Lifted state | `Gallery.jsx` shares search state with `SearchForm.jsx` and `ShowList.jsx` |
| 8. Routing and URL parameters | `App.jsx`, `main.jsx`, `ShowCard.jsx`, and `ShowDetail.jsx` |


## API

The app uses these public TVmaze endpoints:

- Search: `https://api.tvmaze.com/search/shows?q=QUERY`
- Show details: `https://api.tvmaze.com/shows/SHOW_ID`
- Cast: `https://api.tvmaze.com/shows/SHOW_ID/cast`

## Reflection

The easier part of this assignment was updating the page after a search. In the vanilla JavaScript version, I had to find elements, create new elements, remove old results, and change text manually. React updates the page when state changes, so the search results are replaced when `Gallery` receives a new search term. React components also made it easier to reuse the show card and cast list. The more difficult part was learning where state should live and how components communicate through props. `Gallery` stores the query, submitted search term, results, and request status because it is the common parent of `SearchForm` and `ShowList`. `SearchForm` receives the query, its setter, and the search callback. `ShowList` receives the results. Each `ShowCard` stores its own cast data because each card makes a separate request. `ShowDetail` stores the selected show and full cast because it loads them from the URL parameter. This structure keeps each component focused on one job.