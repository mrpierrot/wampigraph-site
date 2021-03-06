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

        $controllers->match('/login','CasusLudi\\Controllers\\Auth::login','GET')->bind('login');
        $controllers->match('/login-check','CasusLudi\\Controllers\\Auth::loginCheck','GET')->bind('login-check');
        $controllers->match('/logout','CasusLudi\\Controllers\\Auth::logout','GET')->bind('logout');
        $controllers->match('/register','CasusLudi\\Controllers\\Auth::register','GET')->bind('register');
        $controllers->match('/register-ok','CasusLudi\\Controllers\\Auth::registerOK','GET')->bind('register-ok');
        $controllers->match('/register-validation/{id}/{token}','CasusLudi\\Controllers\\Auth::registerValidation','GET')->bind('register-validation');
        $controllers->match('/reset-password','CasusLudi\\Controllers\\Auth::resetPassword','GET')->bind('reset-password');
        $controllers->match('/reset-password-ok','CasusLudi\\Controllers\\Auth::resetPasswordOK','GET')->bind('reset-password-ok');
        $controllers->match('/reset-password-validation/{id}/{token}','CasusLudi\\Controllers\\Auth::resetPasswordValidation','GET')->bind('reset-password-validation');
        $controllers->match('/app/','CasusLudi\\Controllers\\Core::home','GET')->bind('home');


        $controllers->match('/','CasusLudi\\Controllers\\Painter::app','GET')->bind('painter');

        $controllers->match('/thumbnail/{id}/{size}','CasusLudi\\Controllers\\Image::getThumbnail','GET')
            ->assert('id', '\d+')
            ->assert('size', '\d+x\d+')
            ->value('size','2x3')->bind('thumbnail');


        return $controllers;

    }
} 