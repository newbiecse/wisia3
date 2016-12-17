Gallery = function () {

    var gridView;
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

            ps.init();

            ps.goTo(index);
        })
    }

    return {
        init: function() {
            gridView = $('.images-grid');

            buildItems();

            var options = {      
                history: false,
                focus: false,

                showAnimationDuration: 0,
                hideAnimationDuration: 0
            };

            var pswpElement = document.querySelectorAll('.pswp')[0];
            ps = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);

            onThumbnailClick();
        }
    }

}();