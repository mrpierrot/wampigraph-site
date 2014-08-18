<?php
/**
 * Created by PhpStorm.
 * User: Pierrot
 * Date: 15/01/14
 * Time: 12:17
 */

namespace CasusLudi\Controllers;

use Silex\Application;
use Symfony\Component\HttpFoundation\Request;

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
        if ($app['security']->isGranted('ROLE_MODERATOR')) {
            $sql = "SELECT u.id,u.firstname,u.lastname,u.email,u.roles,u.status FROM users AS u  ORDER BY u.lastname DESC LIMIT $index,20";
        }else{
            $sql = "SELECT u.id,u.firstname,u.lastname FROM users AS u ORDER BY u.lastname DESC LIMIT $index,20 AND status=1";
        }
        $result = $app['db']->fetchAll($sql,array());
        foreach($result as &$r){
            $r['roles'] = explode(',',$r['roles']);
        }

        return $app->json($result,200);
    }

    public function search($query,$index,$id,Request $request, Application $app){

    }

    public function loadById($id,Request $request, Application $app){
        if ($app['security']->isGranted('ROLE_MODERATOR')) {
            $sql = "SELECT u.id,u.firstname,u.lastname,u.email,u.roles FROM users AS u WHERE u.id=?";
        }else{
            $sql = "SELECT u.id,u.firstname,u.lastname FROM users AS u WHERE u.id=? AND status=1";
        }
        $result = $app['db']->fetchAssoc($sql,array((int)$id));
        return $app->json($result,200);
    }

    public function updatePassword(Request $request, Application $app){

    }

    public function resetPassword(Request $request, Application $app){

    }

    public function delete($id,Request $request, Application $app){
        $app['db']->update('users',array('status'=>self::STATUS_DELETE),array('id'=>$id));
        return $app->json(true,200);
    }

    public function restore($id,Request $request, Application $app){
        $app['db']->update('users',array('status'=>self::STATUS_VALIDATE),array('id'=>$id));
        return $app->json(true,200);
    }


} 