/**
 * Created by Pierrot on 13/08/14.
 */
angular.module('angular-roles',[]).
    factory('roles',function(){
        var _role_hierarchy = {
            'ROLE_ADMIN':['ROLE_USER'],
            'ROLE_USER':null
        }
        var _user_roles = ['ROLE_USER'];
        return{
            setUserRoles: function(userRoles){
                _user_roles = userRoles;
            },
            setRoleHierarchy:function(hierarchy){
                _role_hierarchy = hierarchy;
            },
            isGranted: function(role){
                // si le role existe
                if(_role_hierarchy[role]){
                    // pour chaque role de l'utilisateur
                    for(var i= 0,c=_user_roles.length;i<c;i++){
                        // on verifie s'il correspond au role demandé
                        var currentRole = _user_roles[i];
                        // si oui, on donne l'acces
                        if(currentRole === role){
                            return true;
                        }else{
                            // sinon, on verifie que le role courant possede des roles enfants
                            var subRoles = _role_hierarchy[currentRole];
                            // si oui, alors on verifie que chaque role enfant corresponde au role demandé
                            if(subRoles){
                                for(var j= 0,d=subRoles.length;j<d;j++){
                                    var currentSubRole = subRoles[j];
                                    // si c'est le cas alors on authorise l'acces
                                    if(currentSubRole==role){
                                        return true;
                                    }
                                }
                            }
                        }
                    }
                }

                // pour tout autre cas, alors on refuse l'acces
                return false;
            }
        }
    }).
    directive('isGranted',function(roles){
        return {
            restrict: 'A',
            link:function($scope,$element,$attrs){
                $attrs.$observe('isGranted',function(value){
                        if(!roles.isGranted(value)){
                            $element.addClass("not-granted");
                        }else{
                            $element.removeClass("not-granted");
                        }

                })

            }
        }
    }).
    directive('notGrantedDefault',function(roles){
        return {
            restrict: 'A',
            link:function($scope,$element,$attrs){
                $attrs.$observe('notGrantedDefault',function(value){
                    if(roles.isGranted(value)){
                        $element.addClass("not-granted");
                    }else{
                        $element.removeClass("not-granted");
                    }

                })

            }
        }
    });