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

        $controllers->match('','CasusLudi\\Controllers\\Core::home','GET')->bind('home');
        $controllers->match('/mes-motifs','CasusLudi\\Controllers\\Core::myPatterns','GET')->bind('my-patterns');
        $controllers->match('/mes-wampums','CasusLudi\\Controllers\\Core::myWampums','GET')->bind('my-wampums');

        $controllers->match('/login','CasusLudi\\Controllers\\Auth::login','GET')->bind('login');
        $controllers->match('/login-check','CasusLudi\\Controllers\\Auth::loginCheck','GET')->bind('login-check');
        $controllers->match('/logout','CasusLudi\\Controllers\\Auth::logout','GET')->bind('logout');


        $controllers->match('/editeur/','CasusLudi\\Controllers\\Painter::app','GET')->bind('painter');
        $controllers->match('/painter/api/save','CasusLudi\\Controllers\\Painter::saveDrawing','POST')->bind('painter-save-drawing');
        $controllers->match('/painter/api/get/{id}','CasusLudi\\Controllers\\Painter::getDrawing','GET')->assert('id', '\d+')->bind('painter-get-drawing');
        $controllers->match('/painter/api/lib/{type}/{index}','CasusLudi\\Controllers\\Painter::loadLibrary','GET')
            ->value('index', 0)
            ->assert('type', 'wampum|pattern')
            ->assert('index', '\d+')
            ->bind('painter-get-drawings');
        $controllers->match('/thumbnail/{id}','CasusLudi\\Controllers\\Image::getThumbnail','GET')->assert('id', '\d+')->bind('thumbnail');


        return $controllers;

    }
} 