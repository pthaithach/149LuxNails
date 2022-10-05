$(function() {
    $("#header").load('components/header.html');
    $("#footer").load('components/footer.html');
    $.getJSON('config.json', function(cgf) {
        $("*").contents().each(function() {
            if(this.nodeType == 3)
                this.nodeValue = this.nodeValue
                .replace("{phone}", cgf.info.phone)
                .replace("{address}", cgf.info.address)
                .replace("{store}", cgf.info.store)
                .replace("{email}", cgf.info.email)
                .replace("{time_1}", cgf.info.time_1)
                .replace("{time_2}", cgf.info.time_2)
        });
        var parts = window.location.pathname.replace('/','').split('.');
        var dir_image = parts.shift() || parts.shift();
        var parts = dir_image.split('#');
        var dir_image = parts.shift();
        if(dir_image == '' || dir_image == 'index'){dir_image = "";}
        $( "[pic_src]" ).each(function( index ) {
            let name_pic = cgf.info.slug+'-'+$(this).attr('pic_src');
            let path_image = cgf.path_image + '/' + name_pic+'.jpg';
            if(cgf.debug == 'on'){console.log(path_image)}
            if($(this).is('[pic_bg]')){$(this).css("background-image", "url('"+path_image+"')");
            }else{$(this).attr({'src':path_image,'alt':name_pic})}
        });
        let menu_active = dir_image;
        if( menu_active == ''){$("#main-menu a[href='index.html']").addClass('active');}else{$("#main-menu a[href='" + dir_image + ".html']").addClass('active');}
        $("[data-booking]").attr('href',cgf.url.booking)
        $("[data-facebook]").attr('href',cgf.url.facebook)
        $("[data-instagram]").attr('href',cgf.url.instagram)
        $("[data-google]").attr('href',cgf.url.google)
        $("[data-phone]").attr('href',"tel:"+cgf.info.phone)
        $("[data-maps]").attr('src',cgf.url.maps)
        $(":root").css({
            '--primary'         :cgf.color.primary,
            '--primary-light'   :cgf.color.primary_light,
            '--primary-hover'   :cgf.color.primary_hover,
            '--secondary'       :cgf.color.secondary,
            '--secondary-hover' :cgf.color.secondary_hover,
            '--text-primary' :cgf.color.text_primary,
            '--text-primary-hover' :cgf.color.text_primary_hover,
            '--text-secondary' :cgf.color.text_secondary,
            '--text-secondary-hover' :cgf.color.text_secondary_hover,
            '--text-title' :cgf.color.text_title,
            '--text-title-hover' :cgf.color.text_title_hover,
        });
     })
     .fail(function() {$('body').empty().append("Error 403: Can't Load Data Website");})
});