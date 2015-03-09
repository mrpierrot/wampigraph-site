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

class Api  implements ControllerProviderInterface{

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


        // default user api
        $controllers->match('/auth/config','CasusLudi\\Controllers\\Auth::getConfig','GET');

        $controllers->match('/user/reset-password/{id}','CasusLudi\\Controllers\\User::resetPassword','GET')->bind('user-reset-password')->assert('id', '\d+');
        $controllers->match('/user/change-my-password','CasusLudi\\Controllers\\User::changeMyPassword','POST')->bind('user-change-my-password');
        $controllers->match('/user/me','CasusLudi\\Controllers\\User::loadByMe','get');
        $controllers->match('/user/{id}','CasusLudi\\Controllers\\User::loadById','get')->assert('id', '\d+');
        $controllers->match('/user/list/{index}','CasusLudi\\Controllers\\User::loadList','GET|POST')->value('index', 0)->assert('index', '\d+');
        $controllers->match('/user/register','CasusLudi\\Controllers\\User::register','POST');
        $controllers->match('/drawing/{id}','CasusLudi\\Controllers\\Drawing::loadById','get')->assert('id', '\d+');
        $controllers->match('/drawing/update-field','CasusLudi\\Controllers\\Drawing::updateField','POST');
        $controllers->match('/drawing/suggest/{id}','CasusLudi\\Controllers\\Drawing::suggest','GET')->assert('id', '\d+');
        $controllers->match('/drawing/restore/{id}','CasusLudi\\Controllers\\Drawing::restore','GET')->assert('id', '\d+');
        $controllers->match('/drawing/delete/{id}','CasusLudi\\Controllers\\Drawing::delete','GET')->assert('id', '\d+');
        $controllers->match('/drawing/user/list/{type}/{index}','CasusLudi\\Controllers\\Drawing::loadUserList','GET')
            ->value('index', 0)
            ->assert('type', 'wampum|pattern')
            ->assert('index', '\d+');

        $controllers->match('/drawing/user/{userId}/list/{type}/{index}','CasusLudi\\Controllers\\Drawing::loadListByUserId','GET')
            ->value('index', 0)
            ->assert('type', 'wampum|pattern')
            ->assert('index', '\d+')
            ->assert('userId', '\d+');


        return $controllers;

    }
} 