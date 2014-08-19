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

class Core  implements ControllerProviderInterface{

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

        // routes de gestion du login
        $controllers->match('/login','CasusLudi\\Controllers\\Auth::login','GET')->bind('login');
        $controllers->match('/login-check','CasusLudi\\Controllers\\Auth::loginCheck','GET')->bind('login-check');
        $controllers->match('/logout','CasusLudi\\Controllers\\Auth::logout','GET')->bind('logout');

        $controllers->match('/app/','CasusLudi\\Controllers\\Core::home','GET')->bind('home');

        // default user api
        $controllers->match('/api/auth/config','CasusLudi\\Controllers\\Auth::getConfig','GET');
        $controllers->match('/api/user/{id}','CasusLudi\\Controllers\\User::loadById','get')->assert('id', '\d+');
        $controllers->match('/api/user/list/{index}','CasusLudi\\Controllers\\User::loadList','get')->value('index', 0)->assert('index', '\d+');
        $controllers->match('/api/drawing/{id}','CasusLudi\\Controllers\\Drawing::loadById','get')->assert('id', '\d+');
        $controllers->match('/api/drawing/update-field','CasusLudi\\Controllers\\Drawing::updateField','POST');
        $controllers->match('/api/drawing/suggest/{id}','CasusLudi\\Controllers\\Drawing::suggest','GET')->assert('id', '\d+');
        $controllers->match('/api/drawing/restore/{id}','CasusLudi\\Controllers\\Drawing::restore','GET')->assert('id', '\d+');
        $controllers->match('/api/drawing/delete/{id}','CasusLudi\\Controllers\\Drawing::delete','GET')->assert('id', '\d+');
        $controllers->match('/api/drawing/user/list/{type}/{index}','CasusLudi\\Controllers\\Drawing::loadUserList','GET')
            ->value('index', 0)
            ->assert('type', 'wampum|pattern')
            ->assert('index', '\d+');

        $controllers->match('/api/drawing/user/{userId}/list/{type}/{index}','CasusLudi\\Controllers\\Drawing::loadListByUserId','GET')
            ->value('index', 0)
            ->assert('type', 'wampum|pattern')
            ->assert('index', '\d+')
            ->assert('userId', '\d+');

        // Admin api

        $controllers->match('/admin/api/drawing/validate/{id}','CasusLudi\\Controllers\\Drawing::validate','GET')->assert('id', '\d+');
        $controllers->match('/admin/api/drawing/update-status/{id}/{status}','CasusLudi\\Controllers\\Drawing::updateStatus','GET')->assert('id', '\d+')->assert('status', '\d+');
        $controllers->match('/admin/api/drawing/list/{type}/status/{status}/{index}','CasusLudi\\Controllers\\Drawing::loadListByStatus','GET')->assert('type', 'wampum|pattern')->assert('index', '\d+')->assert('status', '\d+');
        $controllers->match('/admin/api/drawing/list/status/{status}/{index}','CasusLudi\\Controllers\\Drawing::loadListByStatus','GET')->assert('type', 'wampum|pattern')->assert('index', '\d+')->assert('status', '\d+')->value('type',null);
        $controllers->match('/admin/api/user/update-field','CasusLudi\\Controllers\\User::updateField','POST');
        $controllers->match('/admin/api/user/update-roles','CasusLudi\\Controllers\\User::updateRoles','POST');
        $controllers->match('/admin/api/user/restore/{id}','CasusLudi\\Controllers\\User::restore','GET')->assert('id', '\d+');
        $controllers->match('/admin/api/user/delete/{id}','CasusLudi\\Controllers\\User::delete','GET')->assert('id', '\d+');
        $controllers->match('/admin/api/roles','CasusLudi\\Controllers\\User::getRoles','POST');

        // Editeur API
        $controllers->match('/','CasusLudi\\Controllers\\Painter::app','GET')->bind('painter');
        $controllers->match('/painter/api/save','CasusLudi\\Controllers\\Painter::saveDrawing','POST')->bind('painter-save-drawing');
        $controllers->match('/painter/api/get/{id}','CasusLudi\\Controllers\\Painter::getDrawing','GET')->assert('id', '\d+')->bind('painter-get-drawing');
        $controllers->match('/painter/api/lib/{type}/{index}','CasusLudi\\Controllers\\Painter::loadLibrary','GET')
            ->value('index', 0)
            ->assert('type', 'wampum|pattern')
            ->assert('index', '\d+')
            ->bind('painter-get-drawings');
        $controllers->match('/thumbnail/{id}/{size}','CasusLudi\\Controllers\\Image::getThumbnail','GET')
            ->assert('id', '\d+')
            ->assert('size', '\d+x\d+')
            ->value('size','2x3')->bind('thumbnail');


        return $controllers;

    }
} 