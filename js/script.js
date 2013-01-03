$(function(){
    var dropbox = $('#dropbox'),
        message = $('.message', dropbox)
	
    dropbox.filedrop({
        paramname:'pic',
        maxfilesize: 2,
        url: 'upload.php',
        dragOver:function(){
            $('#dropbox').addClass('over');
        },
        uploadFinished:function(i,file,response){
            $.data(file).addClass('done');
        },
        error: function(err, file) {
            switch(err) {
                case 'BrowserNotSupported':
                    showMessage('Seu browser não suporta o upload via HTML5!');
                    break;
                case 'TooManyFiles':
                    alert('Muitos arquivos! Por favor, selecione no máximo 5 imagens! (configurável)');
                    break;
                case 'FileTooLarge':
                    alert(file.name+' é muito grande! Por favor, selecione arquivos de até 2mb (configurável).');
                    break;
                default:
                    break;
            }
        },

        beforeEach: function(file){
            if(!file.type.match(/^image\//)){
                alert('Apenas imagens são permitidas');
                return false;
            }
        },

        uploadStarted:function(i, file, len){
            createImage(file);
        },

        progressUpdated: function(i, file, progress) {
            $.data(file).find('.progress').width(progress);
        }

    });

    var template = '<div class="preview">'+
                        '<span class="imageHolder">'+
                            '<img />'+
                            '<span class="uploaded"></span>'+
                        '</span>'+
                        '<div class="progressHolder">'+
                            '<div class="progress"></div>'+
                        '</div>'+
                    '</div>'; 


    function createImage(file){
        var preview = $(template), 
            image = $('img', preview);

        var reader = new FileReader();

        image.width = 100;
        image.height = 100;

        reader.onload = function(e){
            image.attr('src',e.target.result);
        };

        reader.readAsDataURL(file);

        message.hide();
        preview.appendTo(dropbox);

        $.data(file,preview);
    }

    function showMessage(msg){
        message.html(msg);
    }
});