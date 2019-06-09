$(window).on('load', function(){
  function getContainer(containerClass, appendToElement) {
    var container = $('.'+containerClass)

    if (!container.length) {
      var container_html = '<div class="'+containerClass+'"></div>'
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

  var image_width = 100;
  var image_height = 100;
  
  var image_padding_left = 20;
  var image_padding_right = 20;

  var image_padding_top = 20;
  var image_padding_bottom = 20;

  var image_width_padded = image_width + image_padding_left + image_padding_right
  var image_height_padded = image_height + image_padding_top + image_padding_bottom

  var $someContainer = $('#some-container')
  var width = $someContainer.width()
  var height = $someContainer.height()

  var $backdroundImagesAmimationContainer = $('.backdround-images-amimation-container')

  var boxes_x = Math.floor( width / image_width_padded ) + 2
  var boxes_y = Math.floor(height / image_height_padded) + 2
  var boxes_count = boxes_x * boxes_y

  var $backdroundImagesContainer = getContainer('background-images-container', $backdroundImagesAmimationContainer);

  var left = Math.abs(Math.floor( (width - (boxes_x * image_width_padded) ) / 2 ))
  var new_width = width + (image_width_padded *2)


  $someContainer.css('height', height + 'px')
  $backdroundImagesContainer.css('top', '-' + (height + 60) + 'px')
  $backdroundImagesContainer.css('left', '-' + left + 'px')
  $backdroundImagesContainer.css('width', new_width + 'px')

  var $backdroundImages = getContainers('background-images', $backdroundImagesContainer, boxes_count)

  var active_boxes_count = parseInt((boxes_count * active_boxes_percentage) / 100)

  shuffleArray($backdroundImages)

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
