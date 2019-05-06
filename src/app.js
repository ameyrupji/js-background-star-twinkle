$(window).on('load', function(){
  function getContainer(containerClass, appendToElement) {
    var container = $('.'+containerClass)

    if (!container.length) {
      var container_html = '<div class="'+containerClass+'"></div>'
      /* console.log(container_html) */
      container = $(container_html).appendTo(appendToElement);
    }

    return container
  }

  function getContainers(containerClass, appendToElement, number) {
    var containers = []
    var i;
    for (i = 0; i < number; i++) { 
      var container = $('#'+containerClass+'-'+ i)

      if (!container.length) {
        var container_html = '<div class="'+containerClass+'" id="'+ containerClass +'-'+ i +'"></div>'
        /* console.log(container_html) */
        container = $(container_html).appendTo(appendToElement);
      }
      containers.push(container)
    }
    return containers
  }

  function shuffleArray(array) {
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
  }

  var active_boxes_percentage = 30;

  var img_width = 100;
  var img_height = 100;

  var $someContainer = $('#some-container')
  var width = $someContainer.width()
  var height = $someContainer.height()

  var $backdroundImagesAmimationContainer = $('.backdround-images-amimation-container')

  var boxes_x = parseInt( width / img_width )
  var boxes_y = parseInt(height / img_height)
  var boxes_count = boxes_x * boxes_y

  var $backdroundImagesContainer = getContainer('background-images-container', $backdroundImagesAmimationContainer);

  $someContainer.css('height', height + 'px')
  $backdroundImagesContainer.css('top', '-' + height + 'px')

  var $backdroundImages = getContainers('background-images', $backdroundImagesContainer, boxes_count)
  /* console.log($backdroundImages) */

  var active_boxes_count = parseInt((boxes_count * active_boxes_percentage) / 100)

  shuffleArray($backdroundImages)
  /* console.log($backdroundImages) */
  /* var $activeArraySlice = $backdroundImages.slice(0, active_boxes_count)
  console.log($activeArraySlice.length) */

  for(var j  = 0; j < parseInt(100 / active_boxes_percentage) + 1 ; j++) {
    
    if((j + 1) * active_boxes_count > boxes_count) {
      var $activeArraySlice = $backdroundImages.slice(j * i, boxes_count)
    } else {
      var $activeArraySlice = $backdroundImages.slice(j * i, (j + 1) * active_boxes_count)
    }

    for (var i = 0; i< $activeArraySlice.length; i++) {
      $activeArraySlice[i].addClass('animate-flicker')
      $activeArraySlice[i].css('-webkit-animation-delay', 3 * j + 's')
      $activeArraySlice[i].css('-moz-animation-delay', 3 * j + 's')
    }
    
  }
});
