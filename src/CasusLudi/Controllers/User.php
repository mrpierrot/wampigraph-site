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
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Encoder\MessageDigestPasswordEncoder;
use Symfony\Component\Validator\Constraints as Assert;

class User {

    const STATUS_VALIDATE = 1;
    const STATUS_BAN = 2;
    const STATUS_DELETE = 8;

    public function updateField(Request $request, Application $app){
        $data = $request->request->all();
        $authorized_fields = array(
            'lastname','firstname','email'
        );
        if(array_key_exists('id',$data)
        && array_key_exists('name',$data)
        && array_key_exists('value',$data)){
            $id = (int)$data['id'];
            $name= $data['name'];
            $value= filter_var($data['value'],FILTER_SANITIZE_SPECIAL_CHARS);
            if($value && in_array($name,$authorized_fields)){
                if ($app['security']->isGranted('ROLE_MODERATOR')) {
                    $app['db']->update('users',array($name=>$value),array('id'=>$id));
                    return $app->json(true,200);
                }
            }else{
                return $app->json(array("error"=>"Unauthorized action"),500);
            }

        }

        return $app->json(array("error"=>"invalid request"),500);
    }


    public function register(Request $request, Application $app){
        if ($app['security']->isGranted('ROLE_ADMIN')) {
            $data = $request->request->all();

            $constraint = new Assert\Collection(array(
                'firstname' => new Assert\Length(array('min' => 2)),
                'lastname' => new Assert\Length(array('min' => 1)),
                'email' => array(new Assert\NotBlank(),new Assert\Email()),
                'password' => array(new Assert\NotBlank(),new Assert\Length(array('min' => 8)))
            ));

            $errors = $app['validator']->validateValue($data, $constraint);
            if (count($errors) > 0) {
                $json_errors = array();
                foreach ($errors as $error) {
                    $name = substr($error->getPropertyPath(),1,strlen($error->getPropertyPath())-2);
                    $json_errors[$name] = $error->getMessage();
                }
                return $app->json(array("errors"=>$json_errors),200);
            }else{
                $token = (new TokenGenerator())->generateToken();
                $app['db']->insert('users',array(
                    'firstname' => @$data['firstname'],
                    'lastname' => @$data['lastname'],
                    'email' => @$data['email'],
                    'password' => @$data['password'],
                    'confirmationToken' => $token/*,
                    'timePasswordResetRequested' => ''*/
                ));
                $id = $app['db']->lastInsertId();
                $confirmationLink = $app['url_generator']->generate('user-register-validation', array('id' => $id,'token'=>$token));
                $message = \Swift_Message::newInstance()
                    ->setSubject('[Wampigraph] confirmation de votre email')
                    ->setFrom(array($app['swiftmailer.options']['username']=>'Wampigraph'))
                    ->setTo(array(@$data['email']))
                    ->setBody($app['twig']->render('email/user-register-validation.txt.twig', array(
                        'link'  => $confirmationLink,

                    )))
                    ->addPart($app['twig']->render('email/user-register-validation.html.twig', array(
                        'link'  => $confirmationLink,
                    )), 'text/html');

                if($app['mailer']->send($message)){
                    $app['db']->update('users',array('password'=>$encoded),array('id'=>$result['id']));
                };
            }

            return $app->json(array("message"=>"user:register:ok"),200);

        }
        return $app->json(array("error"=>"Unauthorized action"),500);
    }



    public function updateRoles(Request $request, Application $app){
        if ($app['security']->isGranted('ROLE_ADMIN')) {
            $data = $request->request->all();
            $userId = (int)$data['id'];
            $userRoles = @$data['roles'];
            $roles = array_keys($app['security.role_hierarchy']);
            $newRoles = array();
            if($userRoles) {
                foreach($userRoles as $role){
                    if(in_array($role,$roles)){
                        array_push($newRoles,$role);
                    }
                }
            }

            if(empty($newRoles)) array_push($newRoles,'ROLE_USER');
            $app['db']->update('users',array('roles'=>implode(',',$newRoles)),array('id'=>$userId));
            return $app->json($newRoles,200);

        }
        return $app->json(array("error"=>"Unauthorized action"),500);
    }

    public function getRoles(Request $request, Application $app){
        return$app->json(array_keys($app['security.role_hierarchy']),200);
    }

    public function loadList($index,Request $request, Application $app){
        if(!$index)$index=0;
        $data = $request->request->all();
        $query = array_key_exists('query',$data)?'%'.strtoupper(filter_var($data['query'],FILTER_SANITIZE_FULL_SPECIAL_CHARS)).'%':null;

        $queryFilter = $query?" WHERE ( UPPER(firstname) LIKE :query OR UPPER(lastname) LIKE :query OR UPPER(email) LIKE :query )":"";
        if ($app['security']->isGranted('ROLE_MODERATOR')) {
            $sql = "SELECT u.id,u.firstname,u.lastname,u.email,u.roles,u.status FROM users AS u $queryFilter  ORDER BY u.lastname DESC LIMIT $index,20";
        }else{
            $sql = "SELECT u.id,u.firstname,u.lastname,u.roles,u.status FROM users AS u $queryFilter ORDER BY u.lastname  DESC LIMIT $index,20 AND status=1";
        }
        $result = $app['db']->fetchAll($sql,array('query'=>$query));
        foreach($result as &$r){
            $r['roles'] = explode(',',$r['roles']);
        }

        return $app->json($result,200);
    }



    public function loadById($id,Request $request, Application $app){
        if ($app['security']->isGranted('ROLE_MODERATOR')) {
            $sql = "SELECT u.id,u.firstname,u.lastname,u.email,u.roles,u.status FROM users AS u WHERE u.id=?";
        }else{
            $sql = "SELECT u.id,u.firstname,u.lastname,u.roles,u.status FROM users AS u WHERE u.id=? AND status=1";
        }
        $result = $app['db']->fetchAssoc($sql,array((int)$id));
        return $app->json($result,200);
    }

    public function loadByMe(Request $request, Application $app){
        $id = $app['user']->getId();
        $sql = "SELECT u.id,u.firstname,u.lastname,u.email,u.roles,u.status FROM users AS u WHERE u.id=?";

        $result = $app['db']->fetchAssoc($sql,array((int)$id));
        return $app->json($result,200);
    }


    public function delete($id,Request $request, Application $app){
        $app['db']->update('users',array('status'=>self::STATUS_DELETE),array('id'=>$id));
        return $app->json(true,200);
    }

    public function restore($id,Request $request, Application $app){
        $app['db']->update('users',array('status'=>self::STATUS_VALIDATE),array('id'=>$id));
        return $app->json(true,200);
    }

    public function resetPassword($id,Request $request, Application $app){
        if (!$app['security']->isGranted('ROLE_ADMIN')
            && $id!=$app['user']->getId()) {
            return $app->json(false,200);
        }
        $sql = "SELECT id,email FROM users WHERE id = ?";
        $result = $app['db']->fetchAssoc($sql,array($id));

        if($result){
            $password = PassPhraseFR::generate(4);

            $encoder = new MessageDigestPasswordEncoder();
            $encoded = $encoder->encodePassword($password,'');

            $message = \Swift_Message::newInstance()
                ->setSubject('[Wampigraph] compte activé')
                ->setFrom(array($app['swiftmailer.options']['username']=>'Wampigraph'))
                ->setTo(array($result['email']))
                ->setBody($app['twig']->render('email/user-activation.txt.twig', array(
                    'password'         => $password,
                    'email' => $result['email'],
                )))
                ->addPart($app['twig']->render('email/user-activation.html.twig', array(
                    'password' => $password,
                    'email' => $result['email'],
                )), 'text/html');

            if($app['mailer']->send($message)){
                $app['db']->update('users',array('password'=>$encoded),array('id'=>$result['id']));
            };
        }else{
            return $app->json(false,200);
        }

        return $app->json(true,200);
    }


} 