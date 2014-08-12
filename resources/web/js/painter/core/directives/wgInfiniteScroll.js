/* ng-infinite-scroll - v1.0.0 - 2013-02-23 */
/* fork de https://github.com/sroze/ngInfiniteScroll/ */

define(function () {
    return function($rootScope, $window, $timeout) {
        return {
            link: function(scope, elem, attrs) {
                var checkWhenEnabled, handler, scrollDistance, scrollEnabled;
                $window = elem;
                elem = $(':first-child',elem);
                console.log("elem",elem);
                scrollDistance = 1;
                if (attrs.wgInfiniteScrollDistance != null) {
                    scope.$watch(attrs.wgInfiniteScrollDistance, function(value) {
                        return scrollDistance = parseInt(value, 10);
                    });
                }
                scrollEnabled = true;
                checkWhenEnabled = false;
                if (attrs.wgInfiniteScrollDisabled != null) {
                    scope.$watch(attrs.wgInfiniteScrollDisabled, function(value) {
                        scrollEnabled = !value;
                        if (scrollEnabled && checkWhenEnabled) {
                            checkWhenEnabled = false;
                            return handler();
                        }
                    });
                }
                handler = function() {
                    var elementBottom, remaining, shouldScroll, windowBottom;
                    windowBottom = $window.height() + $window.scrollTop();
                    elementBottom = elem.offset().top + elem.height();
                    remaining = elementBottom - windowBottom;
                    shouldScroll = remaining <= $window.height() * scrollDistance;
                    if (shouldScroll && scrollEnabled) {
                        if ($rootScope.$$phase) {
                            return scope.$eval(attrs.wgInfiniteScroll);
                        } else {
                            return scope.$apply(attrs.wgInfiniteScroll);
                        }
                    } else if (shouldScroll) {
                        return checkWhenEnabled = true;
                    }
                };
                $window.on('scroll', handler);
                scope.$on('$destroy', function() {
                    return $window.off('scroll', handler);
                });
                return $timeout((function() {
                    if (attrs.wgInfiniteScrollImmediateCheck) {
                        if (scope.$eval(attrs.wgInfiniteScrollImmediateCheck)) {
                            return handler();
                        }
                    } else {
                        return handler();
                    }
                }), 0);
            }
        };
    }
});

