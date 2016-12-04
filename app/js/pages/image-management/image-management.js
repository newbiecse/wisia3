ImageManagement = function () {

    var dialogEdit, dialogAdd;

    var itemEditableHanler = function () {
        $('.images-grid').on('click', '.editable', function () {
            dialogEdit.modal('show');
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

    return {

        init: function (opts) {

            initSelect2(opts);

            dialogEdit = $('#modal-edit-image');

            itemEditableHanler();



        }

    }

}();