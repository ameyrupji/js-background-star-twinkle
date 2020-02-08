var starTwinkle = (function () {
    "use strict"
  
    var Model = {
      cssContainer: "",
      cssContainerData: "",
      activeBoxesPercentage: 25,
      starWidth: 100,
      starHeight: 100,
      starMarginTop: 20,
      starMarginRight: 20,
      starMarginBottom: 20,
      starMarginLeft: 20,
      starImageCount: 5,
      imageUrl: "",
      imageDarkUrl: ""
    },
    View = {
      backgroundImagesAnimationContainer: $('.background-images-animation-container')
    },
    Controller = {
      getContainer: function getContainer(containerClass, appendToElement) {
        var container = $('.'+containerClass)
    
        if (!container.length) {
          var container_html = '<div class="'+containerClass+'"></div>'
          container = $(container_html).appendTo(appendToElement);
        }
    
        return container
      },
      getRandomArbitrary: function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
      },
      getRandomInt: function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
      },
      getContainers: function getContainers(containerClass, appendToElement, number) {
        var containers = []
        var i;

        for (i = 0; i < number; i++) { 
          var container = $('#'+containerClass+'-'+ i)
          
          var randomImageCount = Controller.getRandomInt(0,5)
          if (!container.length) {
            var container_html = '<div class="'+containerClass+ " star-image-count-"+ randomImageCount+ '" id="'+ containerClass +'-'+ i +'"></div>'
            container = $(container_html).appendTo(appendToElement);
          }
          containers.push(container)
        }
        return containers
      },
      shuffleArray:function shuffleArray(array) {
        /**
       * Randomize array element order in-place.
       * Using Durstenfeld shuffle algorithm.
       */
        for (var i = array.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var temp = array[i];
          array[i] = array[j];
          array[j] = temp;
        }
      },
      makeItTwinkle: function makeItTwinkle() {
        backgroundImagesContainer = 'background-images-animated-container'

        console.log('In makeItTwinkle()')

        $(Model.cssContainer).prepend('<div class="'+backgroundImagesContainer+'"></div>')

        var imageWidthPadded= Model.starWidth + Model.starMarginLeft + Model.starMarginRight
        var imageHeightPadded= Model.starHeight + Model.starMarginTop + Model.starMarginBottom
  
        var width = $(Model.cssContainer).width()
        var height = $(Model.cssContainer).outerHeight()
  
        var boxes_x = Math.ceil(width / imageWidthPadded ) 
        var boxes_y = Math.ceil(height / imageHeightPadded)
        var boxes_count = boxes_x * boxes_y
        
        var activeBoxesCount = parseInt((boxes_count * Model.activeBoxesPercentage) / 100)
  
        var backgroundImagesContainer = Controller.getContainer(backgroundImagesContainer, View.backgroundImagesAnimationContainer);
  
        var backgroundImages = Controller.getContainers('background-images', backgroundImagesContainer, boxes_count)
  
        Controller.shuffleArray(backgroundImages)
  
        for(var j  = 0; j < parseInt(100 / Model.activeBoxesPercentage) + 1 ; j++) {
          
          if((j + 1) * activeBoxesCount > boxes_count) {
            var $activeArraySlice = backgroundImages.slice(j * i, boxes_count)
          } else {
            var $activeArraySlice = backgroundImages.slice(j * i, (j + 1) * activeBoxesCount)
          }
  
          for (var i = 0; i< $activeArraySlice.length; i++) {
            $activeArraySlice[i].addClass('animate-flicker')
            $activeArraySlice[i].css('-webkit-animation-delay', 3 * j + 's')
            $activeArraySlice[i].css('-moz-animation-delay', 3 * j + 's')
          }
        }
      },
      darkModeCss: function darkModeCss(cssString) {
        return '@media (prefers-color-scheme: dark) {' + cssString + '}'
      },
      createBackgroundImagesCss: function createBackgroundImagesCss(starWidth, starHeight, imageUrl, starMarginTop, starMarginRight, starMarginBottom, starMarginLeft) {
        return '.background-images { width: '+ starWidth +'px; height: '+ starHeight +'px; background-image: url("'+ imageUrl +'"); margin: '+ starMarginTop +'px '+ starMarginRight +'px '+ starMarginBottom +'px '+ starMarginLeft +'px; }'
      },
      createCssClasses: function createCssClasses() {
        var backgroundImagesContainer = 'background-images-animated-container'
        var heightCssContainer = parseInt($(Model.cssContainer).height())
        var outerHeightCssContainer = parseInt($(Model.cssContainer).outerHeight())
        var topBackgroundImageContainer = parseInt($(Model.cssContainer).css("margin-top")) + parseInt($(Model.cssContainer).css("padding-top"))

        var styleHtml = '<style type="text/css"> '
        
        var backgroundImagesContainerCss=  '.' + backgroundImagesContainer +' {height: '+ outerHeightCssContainer +'px; top:-'+ (topBackgroundImageContainer+50 )+'px; width: 110%;}'
        styleHtml += backgroundImagesContainerCss

        var backgroundDataContainerCss=  Model.cssContainerData +' {position: relative; top: -'+ outerHeightCssContainer +'px;}'
        styleHtml += backgroundDataContainerCss

        var containerCss=  Model.cssContainer +' {height: '+ heightCssContainer +'px;}'
        styleHtml += containerCss

        
        styleHtml += Controller.createBackgroundImagesCss(Model.starWidth, Model.starHeight, Model.imageUrl, Model.starMarginTop, Model.starMarginRight, Model.starMarginBottom, Model.starMarginLeft)
        styleHtml += Controller.darkModeCss(Controller.createBackgroundImagesCss(Model.starWidth, Model.starHeight, Model.imageDarkUrl, Model.starMarginTop, Model.starMarginRight, Model.starMarginBottom, Model.starMarginLeft))
        for(var i=0; i< Model.starImageCount; i++) {
          var styleCss = '.star-image-count-'+ i +'{ background-position: -' + Model.starWidth * i + 'px 0px; } '
          styleHtml += styleCss
        }

        styleHtml += '</style>'
        $(styleHtml).appendTo("head");
      },
      init: function init(config) {
        Model = config
        console.log('In init('+ JSON.stringify(config) +')')
        Controller.createCssClasses()
        Controller.makeItTwinkle()
      }
    }
  
    return {
      init: Controller.init,
    }
  })(jQuery);