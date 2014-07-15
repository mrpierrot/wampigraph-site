<?php
/**
 * Created by PhpStorm.
 * User: Pierrot
 * Date: 14/01/14
 * Time: 15:47
 */

namespace CasusLudi\ControllerProviders;


use Silex\Application;
use Silex\ControllerProviderInterface;
use Symfony\Component\HttpFoundation\Request;

class Admin  implements ControllerProviderInterface{

    public  function  connect(Application $app){

        $controllers = $app['controllers_factory'];
       /* $controllers->match('/login-check',function() use ($app){

            return $app->redirect($app->path('admin'));
        })->bind('admin_login_check');

        $controllers->match('/logout',function() use ($app){

            return $app->redirect($app->path('home'));
        })->bind('admin_logout');

        $controllers->match('/',function(Request $request) use ($app){
            return $app['twig']->render('/admin/home.html.twig',array(

            ));
        })->bind('admin');

        $controllers->match('/restaurant/create','CQPX\\Controllers\\Admin\\Restaurant::edit','GET|POST')
            ->value('id',null)
            ->bind('admin_restaurant_create');
        $controllers->match('/restaurant/edit/{id}','CQPX\\Controllers\\Admin\\Restaurant::edit','GET|POST')
            ->assert('id', '\d+')
            ->bind('admin_restaurant_edit');
        $controllers->match('/restaurant/list','CQPX\\Controllers\\Admin\\Restaurant::listing','GET')
            ->bind('admin_restaurant_list');
*/
        return $controllers;

    }
} 