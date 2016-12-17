Gallery = function () {

    var gridView;
    var pswpElement;
    var ps;
    var items = [];

    var buildItems = function () {

        gridView.find('.item .item-image > img').each(function (index){
            var $this = $(this);
            $this.data('ps-index', index);
            var item = {
                src: $this.data('ps-image'),
                w: $this.data('ps-width'),
                h: $this.data('ps-height')
            }

            items.push(item);
        });
    }

    var onThumbnailClick = function () {
        gridView.on('click', '.item .item-image > img', function () {
            var $this = $(this);
            var index = $this.data('ps-index');

            initGallery();

            ps.goTo(index);
        })
    }

    var initGallery = function () {
        var options = {      
            history: false,
            focus: false,

            showAnimationDuration: 0,
            hideAnimationDuration: 0
        };

        ps = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
        ps.init();
    }

    return {
        init: function() {
            gridView = $('.images-grid');
            pswpElement = document.querySelectorAll('.pswp')[0];

            buildItems();

            onThumbnailClick();
        }
    }

}();