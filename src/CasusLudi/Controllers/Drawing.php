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

class Drawing {

    const STATUS_DRAFT = 1;
    const STATUS_SUGGEST = 2;
    const STATUS_VALIDATE = 3;
    const STATUS_DELETE = 8;

    public function updateField(Request $request, Application $app){
        $data = $request->request->all();
        $authorized_fields = array(
            'title','description'
        );
        if(array_key_exists('id',$data)
        && array_key_exists('name',$data)
        && array_key_exists('value',$data)){
            $id = (int)$data['id'];
            $name= $data['name'];
            $value= filter_var($data['value'],FILTER_SANITIZE_SPECIAL_CHARS);
            if($value && in_array($name,$authorized_fields)){
                if ($app['security']->isGranted('ROLE_ADMIN')) {
                    $app['db']->update('wampums',array($name=>$value),array('id'=>$id));
                    return $app->json(true,200);
                }else{
                    $sql = "SELECT user_id FROM wampums WHERE id = ?";
                    $result = $app['db']->fetchAssoc($sql,array($id));
                    if($result){
                        if($result['user_id']==$app['user']->getId()){
                            $app['db']->update('wampums',array($name=>$value,'status'=>self::STATUS_DRAFT),array('id'=>$id));
                            return $app->json(true,200);
                        }else{
                            return $app->json(array("error"=>"Unauthorized action"),500);
                        }
                    }else{
                        return $app->json(array("error"=>"Unknown drawing"),500);
                    }
                }
            }else{
                return $app->json(array("error"=>"Unauthorized action"),500);
            }

        }

        return $app->json(array("error"=>"invalid request"),500);
    }

    public function updateStatus($id,$status,Request $request, Application $app){
        $app['db']->update('wampums',array('status'=>$status),array('id'=>$id));

        return $app->json(true,200);
    }

    public function delete($id,Request $request, Application $app){
        $app['db']->update('wampums',array('status'=>self::STATUS_DELETE),array('id'=>$id));
        return $app->json(true,200);
    }

    public function validate($id,Request $request, Application $app){
        $app['db']->update('wampums',array('status'=>self::STATUS_VALIDATE),array('id'=>$id));
        return $app->json(true,200);
    }

    public function suggest($id,Request $request, Application $app){
        $sql = "SELECT user_id FROM wampums WHERE id = ?";
        $result = $app['db']->fetchAssoc($sql,array((int)$id));
        if($result){
            if($result['user_id']==$app['user']->getId()){
                $app['db']->update('wampums',array('status'=>self::STATUS_SUGGEST),array('id'=>$id));
                return $app->json(true,200);
            }else{
                return $app->json(array("error"=>"Unauthorized action"),500);
            }
        }else{
            return $app->json(array("error"=>"Unknown drawing"),500);
        }

        return $app->json(array("error"=>"invalid request"),500);
    }



} 