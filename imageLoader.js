(function () {
    var app = angular.module("CoDirectives");
    app.directive('imageLoader', function () {
        return {
            restrict: 'AE',
            scope: {
                imageSrc: '@',
                defualtImage: '@',
                loader: '@'
            },
            link: function (scope, element, attrs) {
                element[0].src = scope.defualtImage;
                scope.$watch("imageSrc", function (value) {
                    if (value && typeof (value) == 'string' && value != null) {
                        element[0].src = scope.loader;
                        element.parent().addClass("image-loader");
                        element.addClass("loader-image");

                        //if (value.indexOf("?url=") !== -1) {
                        //    if (value.indexOf("?v=") !== -1)
                        //        value = value.replace("?v=", "&v=");
                        //    var w = element.parent().width();
                        //    value += "&width=" + Math.ceil(w);
                        //}

                        checkImage(value, function (src) {
                            element[0].src = src;
                            element.parent().removeClass("image-loader");
                            element.removeClass("loader-image");
                        }, function () {
                            element[0].src = scope.defualtImage;
                            element.removeClass("loader-image");
                            element.parent().removeClass("image-loader");
                        });

                    }
                    else {
                        element[0].src = scope.defualtImage;
                    }
                }, true);
            }
        };
    });
    function checkImage(src, success, error) {

        var dynamicImg = new Image();
        dynamicImg.onload = function () {
            success(src);
            dynamicImg = undefined;
            return;
        };
        dynamicImg.onerror = function (err) {
            error();
            //console.clear();
            err.preventDefault();
            dynamicImg = undefined;
            return;
        };
        dynamicImg.src = src;

    }
}());



