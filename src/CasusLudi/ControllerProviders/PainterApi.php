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

class PainterApi  implements ControllerProviderInterface{

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



        // Editeur API

        $controllers->match('/save','CasusLudi\\Controllers\\Painter::saveDrawing','POST')->bind('painter-save-drawing');
        $controllers->match('/new','CasusLudi\\Controllers\\Painter::newDrawing','POST')->bind('painter-new-drawing');
        $controllers->match('/get/{id}','CasusLudi\\Controllers\\Painter::getDrawing','GET')->assert('id', '\d+')->bind('painter-get-drawing');
        $controllers->match('/lib/{type}/{index}','CasusLudi\\Controllers\\Painter::loadLibrary','GET|POST')
            ->value('index', 0)
            ->assert('type', 'wampum|pattern')
            ->assert('index', '\d+')
            ->bind('painter-get-drawings');


        return $controllers;

    }
} 