/*
 * Core Fields js functions  
 * 
 
 */
jQuery(function ($) {

    /**
     * Field Color
     */
    if ($('.mpl-color:not(.child-field)').length) {
        $('.mpl-color:not(.child-field)').wpColorPicker();
    }

    if (document.getElementsByClassName('mpl-image_picker').length) {
        $('.mpl-image_picker').qfImagePicker();
    }

    if ($('.mpl-icon_picker:not(.child-field)').length) {
        $('.mpl-icon_picker:not(.child-field) select').fontIconPicker();
    }

    if (document.getElementsByClassName('mpl-link').length) {
        $('.mpl-link').qfLink();
    }

    if (window.hasOwnProperty('pagenow') && pagenow != 'widgets' && document.getElementsByClassName('mpl-map').length) {
        $('.mpl-map').qfMap();
    }

    if (window.hasOwnProperty('pagenow') && pagenow != 'widgets' && document.getElementsByClassName('mpl-repeater').length) {
        $('.mpl-repeater').qfRepeater();
    }

    if ($('.mpl-select-multiple').length) {

        $('.mpl-select-multiple:not(.child-field)').selectize({
            plugins: ['remove_button', 'drag_drop']
        });

        $(document).on('change', '.mpl-select-multiple', function () {
            $(this).closest('div').find('.pf_value').val($(this).val()).trigger('change');
        });
    }

    if ($('.mpl-checkboxes').length) {
        $(document).on(
                'change', '.mpl-checkboxes input[type="checkbox"]',
                function () {

                    var checkbox_values = $(this).closest('ul').find('input[type="checkbox"]:checked').map(
                            function () {
                                return this.value;
                            }
                    ).get().join(',');

                    $(this).closest('ul').prev('input.pf_value').val(checkbox_values).trigger('change');
                }
        );
    }

    if (document.getElementsByClassName('mpl-datetime').length) {
        $('.mpl-datetime input').each(function () {
            var data = $(this).data();
            $(this).datetimepicker(data);
        });
    }


    $(document).on('widget-updated', function (e, $widgetRoot) {

        if (window.hasOwnProperty('google')) {
            var $map = $widgetRoot.find('.mpl-map');
            if ($map.length) {
                $map.qfMap().addClass('map_loaded');
            }
        }

        var $color = $widgetRoot.find('.mpl-color');
        if ($color.length) {
            $color.wpColorPicker();
        }


        var $icon_picker = $widgetRoot.find('.mpl-icon_picker select');
        if ($icon_picker.length) {
            $icon_picker.fontIconPicker();
        }

        var $date_time = $widgetRoot.find('.mpl-datetime input');
        if ($date_time.length) {
            $date_time.each(function () {
                var data = $(this).data();
                $(this).datetimepicker(data);
            });
        }

    });


    $(document).on('click', '#widgets-right .widget-title', function (e) {

        var $this = $(this);


        setTimeout(function () {
            var $widget = $this.closest('.open');

            if ($widget.length) {
                //Map
                var $map = $widget.find('.mpl-map');
                if ($map.length && !$map.hasClass('map_loaded')) {
                    $map.qfMap();
                }

                //Repeater
                var $repeater = $widget.find('.mpl-repeater');
                if ($repeater.length && !$repeater.hasClass('repeater_loaded')) {
                    $repeater.addClass('repeater_loaded').qfRepeater();
                }
            }

        }, 300);



        e.preventDefault();
    });

    $(document).on('mpl-repeater-item-opened', function (e, $widget) {
        var $map = $widget.find('.mpl-map');
        if ($map.length) {
            $map.qfMap();
        }
    });


    $(document).on('click', '.mpl_group .group_nav a', function (e) {

        var $this = $(this);
        var id = $this.attr('href');

        $this.closest('ul').find('.active').removeClass('active');
        $this.addClass('active');

        $('.mpl_group .group_item.active').removeClass('active');

        var $panel = $('.mpl_group ' + id);
        $panel.addClass('active');

        if ($('.mpl_group ' + id + ' .map_loaded').length) {
            if (!$panel.find('.mpl-map').hasClass('map_refresh')) {
                $panel.find('.mpl-map').qfMap().addClass('map_refresh');
            }
        }

        $(document).trigger('mpl_group_active', [$panel]);

        e.preventDefault();
    });
	
	
	$('.mpl_form_row').each(function(){
		
		var current_wrap  = $(this);
		var dependency    = current_wrap.data('dependency');	
		
		if( typeof dependency !== 'undefined' && dependency != ''){
			  var depend_field = $('#'+dependency.element);
			  var pf_value     = depend_field.val();
			  var depend_val   = dependency.value;
			  var depend_value = depend_val.split(",");
			
			 // if( pf_value == depend_value  ){
				 if( $.inArray(pf_value,depend_value) >= 0 ){
				       current_wrap.show();
				  }else{
					   current_wrap.hide();
					  
					  }
				
				depend_field.change(function(){
						//if( depend_value == $(this).val() ){
							if( $.inArray( $(this).val() ,depend_value ) >= 0 ){
													
							    current_wrap.show();
								
								}else{
									current_wrap.hide();
									}
				if( depend_field.attr("type") === 'checkbox' ){	
				  if(depend_field.attr("checked")){current_wrap.show();}else{current_wrap.hide();}
				}
    
              });
				
				if( depend_field.attr("type") == 'checkbox' ){	
                 if(depend_field.attr("checked")){ current_wrap.show();}else{current_wrap.hide();}
				 }
    
									  
			}
												   
     });
	
});