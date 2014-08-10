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

class Painter {


    public function app(Request $request, Application $app){

        return $app['twig']->render('/core/painter.html.twig',array(


        ));
    }

    public  function  getDrawing($id, Request $request, Application $app){

        $sql = "SELECT id,original_id,title,description,raw FROM wampums WHERE id = ?";
        $result = $app['db']->fetchAssoc($sql,array($id));
        return $app->json($result,200);
    }

    public function saveDrawing(Request $request, Application $app){

        $data = $request->request->all();

        /*$constraint = new Assert\Collection(array(
            'title' => new Assert\Length(array('max' => 300)),
            'description' => new Assert\Length(array('max' => 300)),
            'id' => new Assert\Regex(array('pattern' => '/\d/')),
            'original_id' => new Assert\Regex(array('pattern' => '/\d/'))
        ));

        $errors = $app['validator']->validateValue($drawing, $constraint);*/

        $id = null;
        $edit_mode = array_key_exists('id',$data) && filter_var($data['id'],FILTER_VALIDATE_INT);
        $data['status'] = 1;
        if(!$data['original_id'])$data['original_id']=null;
        if($edit_mode){
            $id = $data['id'];
            $app['db']->update('wampums',$data,array('id'=>$id));
        }else{
            unset($data['id']);
            $app['db']->insert('wampums',$data);
            $id = $app['db']->lastInsertId();

        }

        return $app->json(array('id'=>$id),200);
    }


    public function loadLibrary($type,$index,Request $request, Application $app){
        if(!$index)$index=0;
        $sql = "SELECT id,title,description,raw FROM wampums WHERE status=1 and type=? LIMIT $index,10";
        $result = $app['db']->fetchAll($sql,array($type));
        return $app->json($result,200);
    }

    public function searchInLibrary($query,$type,$index,Request $request, Application $app){

        return null;
    }




} 