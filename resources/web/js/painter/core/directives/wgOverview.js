/**
 * Created by Pierrot on 09/09/14.
 */
define(function () {
    return function(wgMediator){
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/assets/js/painter/core/views/directives/wg-overview.html',
            $scope:{},
            link:function($scope,$element,$attrs){

                var canvas = $('canvas',$element).get(0);
                var pearlWidth = 2;
                var pearlHeight= 3;

                var context = canvas.getContext('2d');


                wgMediator.$on('drawingEngine:dataChanged',function(event,data){
                    console.log(event,data);
                    var raw = data.raw;
                    var cols = data.cols;
                    var rows = data.rows;
                    canvas.width = context.width =  pearlWidth*cols;
                    canvas.height = context.height = pearlHeight*rows;
                    $element.width(canvas.width);
                    $element.height(canvas.height);



                    for(var i= 0,c=raw.length;i<c;i++){
                        var x = i%cols;
                        var y = ~~(i/cols);
                        context.fillStyle = raw[i]=="1"?"#1B019B":"#FFFFFF";
                        context.fillRect(x*pearlWidth,y*pearlHeight,pearlWidth,pearlHeight);

                    }
                });


            }
        }
    };
});