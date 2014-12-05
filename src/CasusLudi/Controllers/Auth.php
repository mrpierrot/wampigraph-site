<?php
/**
 * Created by PhpStorm.
 * User: Pierrot
 * Date: 15/01/14
 * Time: 12:17
 */

namespace CasusLudi\Controllers;

use Silex\Application;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Encoder\MessageDigestPasswordEncoder;

class Auth {


    public function login(Request $request, Application $app){

        return $app['twig']->render('core/login.html.twig', array(
            'error'         => $app['security.last_error']($request),
            'last_username' => $app['session']->get('_security.last_username'),
        ));
    }

    public function loginCheck(Request $request, Application $app){

        return $app->redirect($app->path('home'));
    }

    public function userActivationCheck(Request $request, Application $app){
        $data = $request->request->all();
        $email = $data['email'];
        $errors = $app['validator']->validateValue($email, new Assert\Email());

        if (count($errors) > 0) {

        } else {
            $sql = "SELECT activated FROM users WHERE email = ?";
            $result = $app['db']->fetchAssoc($sql,array($email));
            if(!$result['activated']){
                $password = substr(str_shuffle('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#!?$%') , 0 , 10 );

                $encoder = new MessageDigestPasswordEncoder();
                $encoded = $encoder->encodePassword($password,'');



                $message = \Swift_Message::newInstance()
                    ->setSubject('[Wampigraph] compte activé')
                    ->setFrom(array($app['swiftmailer.options']['username']=>'Wampigraph'))
                    ->setTo(array($email))
                    ->setBody($app['twig']->render('email/user-activation.txt.twig', array(
                        'password'         => $password,
                        'email' => $email,
                    )))
                    ->addPart($app['twig']->render('email/user-activation.html.twig', array(
                        'password' => $password,
                        'email' => $email,
                    )), 'text/html');

                if($app['mailer']->send($message)){
                    $app['db']->update('users',array('password'=>$password,'activated'=>1));
                };
            }

        }

        return 'lol';

        //return $app->redirect($app->path('user-activation-status'));
    }

    public function userActivationStatus(Request $request, Application $app){

        return $app['twig']->render('core/user-activate-sent.html.twig',array(
            'status'  =>  'sent'
        ));
    }

    public function logout(Request $request, Application $app){

        return $app->redirect($app->path('login'));
    }

    public function getConfig(Request $request, Application $app){

        return $app->json(array(
            'role_hierarchy'=>$app['security.role_hierarchy'],
            'user_roles'=>$app['user']->getRoles(),
            'user_id'=>$app['user']->getId()
        ));
    }


} 