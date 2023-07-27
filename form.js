/* TRISITE CSS 4.0    */
/* (C) 2023 TRISITE   */
/* Form jQuery add-on */

$(function() {
    // Any file upload form
    if (window.FileReader) {
        fileFormSetting($('input[type=file]'));
    }

    $('input[type=file]').on('change',function() {
        if (window.FileReader) {
            fileFormSetting($(this));
        }
    });

    $('body').on('click', '.delete-file', function(){
        $(this).siblings('input').val('');
        fileFormSetting($(this).siblings('input'));
    });

    function fileFormSetting(obj){
        if ( !obj.parent('div').hasClass('upload-area') ){
            obj.wrap('<div class="upload-area upload-area-file">');
        }

        const self   = obj.parent();
        const files  = obj.prop('files');
        let color  = 'var(--color-gray)';
        let imgFileSet = [];
        let imgResult = [];
        let ios = false;
        let maxSelectedt = -1;
        const ua = window.navigator.userAgent.toLowerCase();

        if ( ua.indexOf('iphone') != -1 || ua.indexOf('ipad') != -1 || ua.indexOf('macintosh') != -1 ){
            ios = true;
        }

        if ( !isNaN(obj.attr('max')) ){
            maxSelectedt = obj.attr('max');
        }

        self.find('.file-set').remove();
        self.find('.delete-file').remove();

        if ( obj.val() ){
            self.append('<button class="delete-file" type="button"><span class="material-symbols-rounded">cancel</span></button>');
        }

        if ( files != undefined ){
            for ( let i = 0; i < files.length; i++ ){
                if ( files[i].name ){
                    var ext = files[i].name.split('.').pop();
                }

                if ( (obj.attr('accept').length >= 3 && obj.attr('accept').indexOf('.' + ext) == -1) || (maxSelectedt != -1 && files.length > maxSelectedt) ){
                    obj.val('');
                    self.addClass('shake');
                    self.find('.delete-file').remove();
                    setTimeout(function(){
                        self.removeClass('shake');
                    }, 200);
                }else{
                    if ( self.find('.file-set').length < files.length ){
                        self.append('<div class="file-set">');
                    }

                    let fileSet = self.find('.file-set').eq(i);

                    if ( obj.prop('files').length > 1 && fileSet.find('.file-name').length == 0 ){
                        fileSet.append('<div class="file-name">');
                        self.addClass('multiple');
                    }else{
                        fileSet.find('.file-name').remove();
                        self.removeClass('multiple');
                    }
                    if ( fileSet.find('.file-icon').length == 0 ){
                        fileSet.append('<div class="file-icon">');
                    }

                    if ( ext.match(/(png|jpg|jpeg|gif|webp)$/i) ) {
                        let reader = new FileReader();
                        reader.readAsDataURL(files[i]);

                        imgFileSet.push(fileSet.find('.file-icon'));

                        reader.onload = (function (e) {
                            imgResult.push(e.target.result);
                        });
                    }else{
                        switch (ext) {
                            case 'pdf':
                                color = 'var(--color-red)';
                                break;
                            case 'doc':
                            case 'docx':
                                color = 'var(--color-blue)';
                                break;
                            case 'xls':
                            case 'xlsx':
                                color = 'var(--color-green)';
                                break;
                            case 'ppt':
                            case 'pptx':
                                color = 'var(--color-orange)';
                                break;
                            default:
                        }

                        fileSet.find('.file-icon').text(ext.toUpperCase()).css({'background':color});
                    }

                    fileSet.find('.file-name').text(files[i].name);
                }
            }

            if ( imgFileSet.length >= 1 ){
                if ( imgFileSet.length >= 2 || !ios ){
                    setTimeout(function(){
                        for ( let i = 0; i < imgFileSet.length; i++ ){
                            if ( imgResult[i] ){
                                imgFileSet[i].append('<img src="' + imgResult[i] + '">');
                            }else{
                                imgFileSet[i].text(ext.toUpperCase()).css({'background':'var(--color-gray)'});
                            }
                        }
                    },100 * imgFileSet.length);
                }else if ( ios ){
                    imgFileSet[0].remove();
                }
            }
        }
    }


	// Password
    passwordFormSetting($('input[type=password]'));

    function passwordFormSetting(obj){
        obj.wrap('<div class="password">');
        obj.parent('.password').append('<button type="button"><span class="material-symbols-rounded">visibility</span><span class="material-symbols-rounded">visibility_off</span></button>');
    }

    $('.password button').on('click', function() {
        let input = $(this).siblings('input');

        if ( input.attr('type') == 'text' ) {
            input.attr('type','password');
        }else{
            input.attr('type','text');
        }
        $(this).toggleClass('visible');
    });


    // Search
    searchFormSetting($('input[type=search]'));

    function searchFormSetting(obj){
        obj.wrap('<div class="search">');
        obj.parent('.search').append('<button type="submit"><span class="material-symbols-rounded">search</span></button>');
    }


    // Number
    numberFormSetting($('input[type=number]'));

    function numberFormSetting(obj){
        obj.wrap('<div class="number">');
        obj.parent('.number').prepend('<button type="button"><span class="material-symbols-rounded">do_not_disturb_on</span></button>');
        obj.parent('.number').append('<button type="button"><span class="material-symbols-rounded">add_circle</span></button>');
    }

    function numberUpDown(obj, updown){
        let val = obj.val();
        let step = 1;

        if ( !isNaN(obj.attr('step')) ){
            step = obj.attr('step');
        }

        if ( updown == 'up' ){
            obj.val(Number(val) + Number(step)).stop();
        }else if ( updown == 'down' ){
            obj.val(Number(val) - Number(step)).stop();
        }

        if ( !isNaN(obj.attr('min')) && Number(obj.val()) < Number(obj.attr('min')) ){
            obj.val(obj.attr('min'));
        }
        if ( !isNaN(obj.attr('max')) && Number(obj.val()) > Number(obj.attr('max')) ){
            obj.val(obj.attr('max'));
        }
    }

    $('.number button:first-of-type').on('click', function(){
        numberUpDown($(this).siblings('input'), 'down');
    });
    $('.number button:last-of-type').on('click', function(){
        numberUpDown($(this).siblings('input'), 'up');
    });


    // Radio
    $('input[type=radio]').each(function(){
        if ( !$(this).parent('label').hasClass('radio') ){
            $(this).parent('label').addClass('radio');
        }
        if ( $(this).siblings('span').length == 0 ){
            $(this).after('<span>');
        }
    });


	// Checkbox
    $('input[type=checkbox]').each(function(){
        if ( !$(this).parent('label').hasClass('checkbox') ){
            $(this).parent('label').addClass('checkbox');
        }
        if ( $(this).siblings('span').length == 0 ){
            $(this).parent('label').append('<span>');
        }
    });

    $('label.checkbox').on('click', function(e){
        if ( e.shiftKey ) {
            if (window.getSelection) {
                window.getSelection().removeAllRanges();
            }

            const formName = $(this).find('input').attr('name');
            const targets = $('input[type=checkbox][name="'+formName+'"]').parent('label');
            const index = $(this).index();
            let stopPrev = -1;
            let stopNext = -1;
            let c = '';

            if ( $(this).find('input').prop('checked') ){
                $(this).find('input').prop('checked', false);
                c = 'off';
            }else{
                $(this).find('input').prop('checked', true);
                c = 'on';
            }

            // to prev
            for ( let i = index-1; i >= 0; i-- ){
                if ( c == 'off' && targets.eq(i).find('input').prop('checked') == false ){
                    stopPrev = i;
                    break;
                }else if ( c == 'on' && targets.eq(i).find('input').prop('checked') == true ){
                    stopPrev = i;
                    break;
                }
            }

            // to next
            for ( let i = index+1; i < targets.length; i++ ){
                if ( c == 'off' && targets.eq(i).find('input').prop('checked') == false ){
                    stopNext = i;
                    break;
                }else if ( c == 'on' && targets.eq(i).find('input').prop('checked') == true ){
                    stopNext = i;
                    break;
                }
            }

            for ( let i = 0; i < targets.length; i++ ){
                if ( i != index ){
                    if ( stopPrev != -1 && i >= stopPrev && i < index ){
                        if ( c == 'on' ){
                            targets.eq(i).find('input').prop('checked', true);
                        }else{
                            targets.eq(i).find('input').prop('checked', false);
                        }
                    }
                    if ( stopNext != -1 && i <= stopNext && i > index ){
                        if ( c == 'on' ){
                            targets.eq(i).find('input').prop('checked', true);
                        }else{
                            targets.eq(i).find('input').prop('checked', false);
                        }
                    }
                }
            }

            return false;
        }
    });
});
