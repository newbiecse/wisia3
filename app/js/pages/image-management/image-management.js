ImageManagement = function () {

    return {

        init: function (opts) {

            $('#select2-species').select2({
                placeholder: opts.placeHolderSpecies,
                allowClear: true
            })

            $('#select2-work-group').select2({
                placeholder: opts.placeHolderWorkGroup,
                allowClear: true
            })

        }

    }

}();