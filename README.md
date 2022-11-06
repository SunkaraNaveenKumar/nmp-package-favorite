# NPM packages manager
[Live Link](https://srivatsav-fav-npm-packages.netlify.app/)

## Features of the Tool
- One can search for the required npm package.
- One can add the Particular package to Favorites 
- On can delete the Packages that are in the Favorites

## Api 
- https://api.npms.io/v2/search?q=nodejs

## Description 
- Debouncing effect is performed on the search operation soo that it can reduce the maximum number of api calls.
- Performance Optimization is performed on the tool using useCallback and useMemo Hook which makes the tool work more faster.
- No state management library is used in making this website
- Tailwind CSS is used for styling the components

## Run Locally

Clone the project

```bash
  git clone https://github.com/Srivatsav-K/fav-npm-packages.git
```

Go to the project directory

```bash
  cd fav-npm-packages
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```
