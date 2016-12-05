ImageManagement = function () {

    var dialogEdit, dialogAdd, dialogMulAdd;

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

    var onShowDialogAdd = function() {
        dialogAdd.on('shown.bs.modal', function() {

            $('div#dz-upload-image').dropzone({
                url: 'url'
            });

        })
    }

    var onShowDialogMulAdd = function() {
        dialogMulAdd.on('shown.bs.modal', function() {

            $('div#dz-upload-mul-image').dropzone({
                url: 'url'
            });

        })
    }

    return {

        init: function (opts) {

            initSelect2(opts);

            dialogEdit = $('#modal-edit-image');
            dialogAdd = $('#modal-addnew-image');
            dialogMulAdd = $('#modal-addmul-image');

            itemEditableHandler();

            itemAddNewHandler();

        }

    }

}();