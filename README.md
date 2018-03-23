# vue\-cockpit\-agency
A sample one page website with cockpit as headless cms and a frontend based on vue.js and bootstrap.

## Introduction

[Cockpit CMS](https://getcockpit.com) is a headless CMS built in PHP. This is a simple single page frontend using Cockpit CMS to display generic content. It runs on [Vue.js](https://vuejs.org/) and uses the [Bootstrap Framework](http://getbootstrap.com/).

## Approach

This project is a sample implementation of the [vue-cockpit](https://github.com/dropclick/vue-cockpit) library which allows you to build a custom single page frontend for your Cockpit CMS backend without any Vue.js knowledge.

The demo frontend is a dynamic version of the static [Resume theme](https://startbootstrap.com/template-overviews/resume/) by [Start Bootstrap](https://startbootstrap.com/). The theme is published under the MIT licence just like this project.

All content can be managed through Cockpit CMS. It is very easy to add new content and display it on the page. See **Usage** for more details.
a

## Download and Installation

To begin using this project, choose one of the following options to get started:
* Install via npm: `npm install vue\-cockpit\-agency`
* Clone the repo: `git clone https://github.com/dropclick/vue\-cockpit\-agency.git`
* [Fork, Clone, or Download on GitHub](https://github.com/dropclick/vue\-cockpit\-agency)

## Usage

### Basic Usage

After downloading, simply edit the HTML and CSS files included with the template in your favorite text editor to make changes. These are the only files you need to worry about, you can ignore everything else! To preview the changes you make to the code, you can open the `index.html` file in your web browser.

### Advanced Usage

After installation, run `npm install` and then run `gulp dev` which will open up a preview of the template in your default browser, watch for changes to core template files, and live reload the browser when changes are saved. You can view the `gulpfile.js` to see which tasks are included with the dev environment.

#### Gulp Tasks

- `gulp` the default task that builds everything
- `gulp dev` browserSync opens the project in your default browser and live reloads when changes are made
- `gulp sass` compiles SCSS files into CSS
- `gulp minify-css` minifies the compiled CSS file
- `gulp minify-js` minifies the themes JS file
- `gulp copy` copies dependencies from node_modules to the vendor directory
- `gulp build` compiles all runtime files to the dist folder


## Copyright and License

Copyright 2018 Sven Petersen. Code released under the MIT licence.

