<?php
/**
 * Created by PhpStorm.
 * User: Pierrot
 * Date: 15/01/14
 * Time: 12:17
 */

namespace CasusLudi\Controllers;

use CasusLudi\Auth\PassPhraseFR;
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
        $status = 'no-account';
        if (count($errors) == 0) {

            $sql = "SELECT id,activated FROM users WHERE email = ?";
            $result = $app['db']->fetchAssoc($sql,array($email));

            if(!$result['activated']){
                $password = PassPhraseFR::generate(4);//substr(str_shuffle('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#!?$%') , 0 , 10 );

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
                    $status = 'sent';
                    $app['db']->update('users',array('password'=>$encoded,'activated'=>1),array('id'=>$result['id']));
                };
            }else{
                $status = 'already-activated';
            }

        }

        //return $password;

        return $app->redirect($app->path('user-activation-status',array('status'=>$status)));
    }

    public function userActivationStatus($status,Request $request, Application $app){

        return $app['twig']->render('core/user-activate-sent.html.twig',array(
            'status'  =>  $status
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