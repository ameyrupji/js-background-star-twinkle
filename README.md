# js-background-star-twinkle

JavaScript example to create a background with starlike random twinkling groups

## Prerequisite Software

- jQuerry >= 3.4.1

## How to Run 

### HTML Changes

No HTML changes are required in your project

### CSS Changes

Include the `src/starTwinkle.css` file in HTML file.

### JavaScript 

Include the `src/starTwinkle.js` in your HTML page.

To initialize the Star Twinkle effect in include the following JavaScript 

```
$(document).ready(function() {
  starTwinkle.init({
    cssContainer: "#some-container",
    cssContainerData: ".data-container",
    activeBoxesPercentage: 20,
    starWidth: 100,
    starHeight: 100,
    starMarginTop: 40,
    starMarginRight: 40,
    starMarginBottom: 40,
    starMarginLeft: 40,
    starImageCount: 6,
    imageUrl: "./12345.png",
    imageDarkUrl: "./12345-grayscale.png"
  })
});
```
An example of this can be found in the `src/app.js` file.

## Demo Links

Latest   - https://ameyrupji.github.io/js-background-star-twinkle/src/

v1.0.0   - https://ameyrupji.github.io/js-background-star-twinkle/src/v1-0-0/

JSFiddle - http://jsfiddle.net/fh4Lds51/

## Sample Output

![sample-light-mode](/images/sample-light-mode.png)

![sample-dark-mode](/images/sample-dark-mode.png)
