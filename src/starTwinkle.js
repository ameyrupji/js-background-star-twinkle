var starTwinkle = (function () {
    "use strict"
  
    var Model = {
      activeBoxesPercentage: 30,
      starWidth: 100,
      starHeight: 100,
      starPaddingTop: 20,
      starPaddingRight: 20,
      starPaddingBottom: 20,
      starPaddingLeft: 20,
      starImageCount: 5
    },
    View = {
      twinkleContainer: $('#some-container'),
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
      getContainers: function getContainers(containerClass, appendToElement, number) {
        var containers = []
        var i;

        var count = 0
        for (i = 0; i < number; i++) { 
          var container = $('#'+containerClass+'-'+ i)
            
          if (!container.length) {
            var container_html = '<div class="'+containerClass+ " star-image-count-"+ count+ '" id="'+ containerClass +'-'+ i +'"></div>'
            container = $(container_html).appendTo(appendToElement);
          }
          count ++;
          if(count >= Model.starImageCount) {
              count =0
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
        console.log('In makeItTwinkle()')
        var imageWidthPadded= Model.starWidth + Model.starPaddingLeft + Model.starPaddingRight
        var imageHeightPadded= Model.starHeight + Model.starPaddingTop + Model.starPaddingBottom
  
        var width = View.twinkleContainer.width()
        var height = View.twinkleContainer.height()
  
        var boxes_x = Math.floor( width / imageWidthPadded ) + 2
        var boxes_y = Math.floor(height / imageHeightPadded) + 2
        var boxes_count = boxes_x * boxes_y
        
        var activeBoxesCount = parseInt((boxes_count * Model.activeBoxesPercentage) / 100)
  
        var backgroundImagesContainer = Controller.getContainer('background-images-container', View.backgroundImagesAnimationContainer);
  
        var left = Math.abs(Math.floor( (width - (boxes_x * imageWidthPadded) ) / 2 ))
        var new_width = width + (imageWidthPadded *2)
  
        View.twinkleContainer.css('height', height + 'px')
        backgroundImagesContainer.css('top', '-' + (height + 60) + 'px')
        backgroundImagesContainer.css('left', '-' + left + 'px')
        backgroundImagesContainer.css('width', new_width + 'px')
  
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
      init: function init(config) {
        console.log('In init('+config+')')
        Controller.makeItTwinkle()
      }
    }
  
    return {
      init: Controller.init,
    }
  })(jQuery);