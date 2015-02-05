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
use SimpleUser\TokenGenerator;
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

    public function register(Request $request, Application $app){

        // some default data for when the form is displayed the first time
        $data = array(
        );

        $errors = array();

        $form = $app['form.factory']->createBuilder('form', $data)
            ->add('firstname','text',array(
                'label'=>'Prénom',
                 'constraints' => array(new Assert\NotBlank(),new Assert\Length(array('min' => 2)))
            ))
            ->add('lastname','text',array(
                'label'=>'Nom',
                'constraints' => array(new Assert\NotBlank(),new Assert\Length(array('min' => 2)))
            ))
            ->add('email','text',array(
                'label'=>'Email',
                'constraints' => array(new Assert\NotBlank(),new Assert\Email())
            ))
            ->add('password','password',array(
                'label'=>'Mot de passe',
                'constraints' => array(new Assert\NotBlank(),new Assert\Length(array('min' => 8)))
            ))
            ->getForm();

        $form->handleRequest($request);

        if ($form->isValid()) {
            $data = $form->getData();

            $sql = "SELECT id  FROM users WHERE email = ?";
            $result = $app['db']->fetchAssoc($sql,array($data['email']));

            if($result==null) {

                $token = (new TokenGenerator())->generateToken();
                $app['db']->insert('users', array(
                    'firstname' => @$data['firstname'],
                    'lastname' => @$data['lastname'],
                    'email' => @$data['email'],
                    'password' => @$data['password'],
                    'confirmationToken' => $token,
                    'timePasswordResetRequested' => time()
                ));
                $id = $app['db']->lastInsertId();
                $confirmationLink = $app->url('register-validation', array('id' => $id, 'token' => $token));
                $message = \Swift_Message::newInstance()
                    ->setSubject('[Wampigraph] confirmation de votre email')
                    ->setFrom(array($app['swiftmailer.options']['username'] => 'Wampigraph'))
                    ->setTo(array(@$data['email']))
                    ->setBody($app['twig']->render('email/user-register-validation.txt.twig', array(
                        'link' => $confirmationLink,

                    )))
                    ->addPart($app['twig']->render('email/user-register-validation.html.twig', array(
                        'link' => $confirmationLink,
                    )), 'text/html');

                if ($app['mailer']->send($message)) {
                   return $app->redirect('register-ok');
                };
            }else{
                array_push($errors,'Votre adresse email est déjà enregistrée. Si vous ne vous rappelez plus de votre mot de passe.<br>Nous vous invitons à en changer <a href="'.$app->path('reset-password').'">ici</a>');
            }

        }

        // display the form
        return $app['twig']->render('core/register.html.twig', array(
            'form' => $form->createView(),
            'errors' => $errors
            )
        );
    }

    public function registerOK(Request $request, Application $app){
        return $app['twig']->render('core/message.html.twig',array('message'=>'Vous êtes bien enregistré. Un mail vient de vous êtes envoyé pour activer votre compte.'));
    }

    public function registerValidation($id,$token,Request $request, Application $app){
        $sql = "SELECT id FROM users WHERE id = ? AND confirmationToken=?";
        $result = $app['db']->fetchAssoc($sql,array($id,$token));
        if($result){
            $app['db']->update('users',array('activated'=>1,'confirmationToken'=>''),array('id'=>$result['id']));
            $message = 'Votre compte est activé. Vous pouvez vous connecter <a href="'.$app->path('login').'">ici</a>';
        }else{
            $message = 'Soit votre compte est déjà validée, soit celui-ci n\'éxiste pas';
        }
        return $app['twig']->render('core/message.html.twig',array('message'=>$message));
    }

    public function resetPassword(Request $request, Application $app){
        $data = array(
        );

        $errors = array();

        $form = $app['form.factory']->createBuilder('form', $data)
            ->add('email','text',array(
                'label'=>'Email',
                'constraints' => array(new Assert\NotBlank(),new Assert\Email())
            ))

            ->getForm();

        $form->handleRequest($request);

        if ($form->isValid()) {
            $data = $form->getData();

            $sql = "SELECT id  FROM users WHERE email = ?";
            $result = $app['db']->fetchAssoc($sql,array($data['email']));

            if($result!=null) {

                $token = (new TokenGenerator())->generateToken();
                $app['db']->update('users', array(
                    'confirmationToken' => $token,
                    'timePasswordResetRequested' => time()
                ),array('id'=>$result['id']));
                $id = $app['db']->lastInsertId();
                $confirmationLink = $app->url('reset-password-validation', array('id' => $result['id'], 'token' => $token));
                $message = \Swift_Message::newInstance()
                    ->setSubject('[Wampigraph] Changez votre mot de passe.')
                    ->setFrom(array($app['swiftmailer.options']['username'] => 'Wampigraph'))
                    ->setTo(array(@$data['email']))
                    ->setBody($app['twig']->render('email/reset-password-validation.txt.twig', array(
                        'link' => $confirmationLink,

                    )))
                    ->addPart($app['twig']->render('email/reset-password-validation.html.twig', array(
                        'link' => $confirmationLink,
                    )), 'text/html');

                if ($app['mailer']->send($message)) {
                    return $app->redirect('reset-password-ok');
                };
            }else{
                array_push($errors,'Le gnome chargé de collecter les adresses ne connait pas celle-là! Nous nous en voyons désolé. ');
            }

        }

        // display the form
        return $app['twig']->render('core/reset-password.html.twig', array(
                'form' => $form->createView(),
                'errors' => $errors
            )
        );
    }

    public function resetPasswordOK(Request $request, Application $app){
        return $app['twig']->render('core/message.html.twig',array('message'=>'Un mail vient de vous êtes envoyé pour changer votre mot de passe.'));
    }


    public function resetPasswordValidation($id,$token,Request $request, Application $app){
        $sql = "SELECT id,email,timePasswordResetRequested FROM users WHERE id = ? AND confirmationToken=?";
        $result = $app['db']->fetchAssoc($sql,array($id,$token));
        $message = '';
        if($result){
            $deltatime = time()-$result['timePasswordResetRequested'];
            if($deltatime <= 3600*24) {
                $password = PassPhraseFR::generate(4);

                $encoder = new MessageDigestPasswordEncoder();
                $encoded = $encoder->encodePassword($password, '');

                $msg = \Swift_Message::newInstance()
                    ->setSubject('[Wampigraph] compte activé')
                    ->setFrom(array($app['swiftmailer.options']['username'] => 'Wampigraph'))
                    ->setTo(array($result['email']))
                    ->setBody($app['twig']->render('email/user-activation.txt.twig', array(
                        'password' => $password,
                        'email' => $result['email'],
                    )))
                    ->addPart($app['twig']->render('email/user-activation.html.twig', array(
                        'password' => $password,
                        'email' => $result['email'],
                    )), 'text/html');

                if ($app['mailer']->send($msg)) {
                    $app['db']->update('users', array('password' => $encoded,'confirmationToken'=>''), array('id' => $result['id']));
                };
                $message = 'Un nouveau mot de passe vient de vous êtes envoyer par mail.';
            }else{
                $message = 'Le gnome chargé du calcul du temps estime que vous avez trop attendu pour changer votre mot de passe. Il va falloir recommencer';
            }
        }else{
            $message = 'Le gnome chargé de la reconnaissance des gens ne vous reconnait pas. Nous en sommes désolé.';
        }
        return $app['twig']->render('core/message.html.twig',array('message'=>$message));
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