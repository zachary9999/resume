//图片预加载
//
(function() {
    function Preload(imgs, options) {
        this.imgs = (typeof imgs === 'string') ? [imgs] : imgs;
        this.opts = $.extend({}, Preload.DEFAULTS, options);
        if ('ordered' === this.opts.order) {
            this._ordered();
        } else {
            this._unoredered();
        }
    }
    Preload.DEFAULTS = {
        each: null, //每一张图片加载完毕以后执行回调
        all: null, //所有图片加载完毕以后执行回调
        order: 'unordered'
    }
    /**
     * [_unoredered 无序加载]
     * @return {[type]} [description]
     */
    Preload.prototype._unoredered = function() {
        var imgs = this.imgs,
            opts = this.opts,
            count = 0,
            len = imgs.length;
        $.each(imgs, function(i, src) {
            if (typeof src != 'string') {
                return;
            }
            var imgObj = new Image();
            $(imgObj).on('load error', function() {
                opts.each && opts.each(count);
                if (count >= len - 1) {
                    opts.all && opts.all();
                }
                count++;
            })
            imgObj.src = src;
        })
    };
    /**
     * [_ordered 有序预加载]
     * @return {[type]} [description]
     */
    Preload.prototype._ordered = function() {
        var opts = this.opts,
            imgs = this.imgs,
            len = imgs.length,
            count = 0;

        load();
        //有序预加载
        function load() {
            var imgObj = new Image();
            $(imgObj).on('load error', function() {
                opts.each && opts.each(count);
                if (count >= len) {
                    opts.all && opts.all();
                } else {
                    load();
                }
                count++;
            });
            imgObj.src = imgs[count];
        }
    }

    $.extend({
        preload: function(imgs, opts) {
            new Preload(imgs, opts);
        }
    })
})(jQuery)