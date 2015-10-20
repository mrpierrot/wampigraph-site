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

class AdminApi  implements ControllerProviderInterface{

    public  function  connect(Application $app){

        $controllers = $app['controllers_factory'];

        $controllers->before(function () use ($app){
            $token = $app['security']->getToken();
            if (null !== $token) {
                $user = $token->getUser();
                $app['user'] = $user;
                $app['twig']->addGlobal('user',$user);
            }
        });



        // Admin api

        $controllers->match('/drawing/validate/{id}','CasusLudi\\Controllers\\Drawing::validate','GET')->assert('id', '\d+');
        $controllers->match('/drawing/update-status/{id}/{status}','CasusLudi\\Controllers\\Drawing::updateStatus','GET')->assert('id', '\d+')->assert('status', '\d+');
        $controllers->match('/drawing/list/{type}/status/{status}/{index}','CasusLudi\\Controllers\\Drawing::loadListByStatus','GET')->assert('type', 'wampum|pattern')->assert('index', '\d+')->assert('status', '\d+');
        $controllers->match('/drawing/list/status/{status}/{index}','CasusLudi\\Controllers\\Drawing::loadListByStatus','GET')->assert('type', 'wampum|pattern')->assert('index', '\d+')->assert('status', '\d+')->value('type',null);
        $controllers->match('/drawing/list/{type}/all/{index}','CasusLudi\\Controllers\\Drawing::loadValidList','GET')->assert('type', 'wampum|pattern')->assert('index', '\d+')->value('type',null);
        $controllers->match('/user/update-field','CasusLudi\\Controllers\\User::updateField','POST');
        $controllers->match('/user/update-roles','CasusLudi\\Controllers\\User::updateRoles','POST');
        $controllers->match('/user/restore/{id}','CasusLudi\\Controllers\\User::restore','GET')->assert('id', '\d+');
        $controllers->match('/user/delete/{id}','CasusLudi\\Controllers\\User::delete','GET')->assert('id', '\d+');
        $controllers->match('/roles','CasusLudi\\Controllers\\User::getRoles','POST');


        return $controllers;

    }
} 