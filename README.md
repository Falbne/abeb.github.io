# Deploying to GitHub Pages

This project can be deployed to GitHub Pages using the `gh-pages` package. Follow these steps:

## Prerequisites
- You must have a GitHub account.
- Your repository should be named `abeb.github.io` (which matches your GitHub Pages username repo for user/organization site).
- You should have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.

## 1. Install gh-pages

```
npm install gh-pages --save-dev
```

## 2. Configure package.json

- Ensure your `package.json` includes the following fields:

```json
"homepage": "https://abeb.github.io/",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```

These are already set up for you.

## 3. Build and Deploy

To deploy your site, run:

```
npm run deploy
```

This will:
- Build your React app for production (output to the `build` folder)
- Publish the contents of the `build` folder to the `gh-pages` branch of your repository

## 4. Access Your Site

After deployment, your site will be available at:

```
https://abeb.github.io/
```

## 5. Troubleshooting
- Make sure your repository is public.
- If you see a blank page, check that your `homepage` field in `package.json` is correct.
- For custom domains, see the [GitHub Pages documentation](https://docs.github.com/en/pages/getting-started-with-github-pages).

---

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
