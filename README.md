# Nameless Drupal 8 theme
[![devDependency Status](https://david-dm.org/wunderkraut/nameless/dev-status.svg)](https://david-dm.org/wunderkraut/nameless#info=devDependencies)

Starting point for drupal theme development and to allow a clean output of content.

## Technical goals

* HTML 5
* basic html elements should be styled normalized and simple but pretty
* all Drupal elements should be styled or explicitly left out -> normalize
* basic Drupal theme scaffolding, preprocessing and resets should be done
* Cross-browser and device support (IE8+, Firefox, Chrome, Safari, Opera, iOS, Android. IE7 is partly supported)

## Usage

1. Add to %drupalroot%/sites/all/themes
2. **Rename theme and hooks to a project specific name**
3. Update README to contain project specific information
4. Run `bower install` to download the required libraries
5. Run `npm install` to install the required npm plugins for automation
6. Delete the .gitignore file or remove the line ignoring the libraries folder
7. Run `gulp` to generate the first version of your css files

## Quick install via command line
Replace the **[placeholder]** with your new theme name.

    # Go into your theme directory
    cd /your/drupal/folder/sites/all/themes/
    
    # Prepare the theme template
    git clone git@github.com:wunderkraut/nameless.git
	cp -r nameless [placeholder]
	cd [placeholder]
	rm -rdf .git*

	# Rename files
	find . -depth -name '*nameless*' -execdir bash -c 'mv -i "$1" "${1//nameless/[placeholder]}"' bash {} \;

	# Replace the theme name recursive
	find . -depth -type f \( -name '*.info' -o -name 'bower.json' -o -name '*.php' -o -name '*.js' \) -exec sed -i '' s%nameless%[placeholder]% {} +

	# Install libraries
	bower install


## Automation with Gulp

@see: [Gulp documentation](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md)

### pre-requisites:
* you need to have [nodejs and npm](http://nodejs.org/) installed.  
* you need to have gulp installed as global package `npm install -g gulp`
* you need to run `npm install`

### usage in a local dev environment

* to lint your JavaScript files once, you run `gulp jshint`
* to minify images and SVGs, place files in `./images_originals` folder and run `gulp images`

* to constantly monitor your theme directory and execute all necessary tasks while developing, you run `gulp watch`

* to lint your SCSS files once, you run `gulp scsslint`

### usage in a CI/production environment

run `gulp dist` to

* lint JS files  
* compile compressed CSS from SASS  


### roadmap
* move to postCSS from SASS
* performance monitoring with phantomas
* implement gulp dis task for CI


