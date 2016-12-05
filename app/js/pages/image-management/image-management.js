ImageManagement = function () {

    var dialogEdit, dialogAdd;

    var itemEditableHandler = function () {
        $('.images-grid').on('click', '.editable', function () {
            dialogEdit.modal('show');
        })
    }

    var itemAddNewHandler = function () {
        $('.images-grid').on('click', '.addnew', function () {
            dialogAdd.modal('show');
        })
    }    

    var initSelect2 = function (opts) {

        $('#select2-species').select2({
            placeholder: opts.placeHolderSpecies,
            allowClear: true
        })

        $('#select2-work-group').select2({
            placeholder: opts.placeHolderWorkGroup,
            allowClear: true
        })

    }

    var initDropzone = function () {

        Dropzone.autoDiscover = false;

        // var dropzone = new Dropzone("div#dz-upload-image", { url: "/file/post"});
        $('div#dz-upload-image').dropzone({
            url: 'url'
        });

        // $('div#dz-upload-mul-image').dropzone({
        //     url: 'url'
        // });        
    }

    return {

        init: function (opts) {

            initSelect2(opts);

            initDropzone();

            dialogEdit = $('#modal-edit-image');
            dialogAdd = $('#modal-addnew-image');

            itemEditableHandler();

            itemAddNewHandler();

        }

    }

}();