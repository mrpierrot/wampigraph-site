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

        $sql = "SELECT id,original_id,title,description,user_id,raw FROM wampums WHERE id = ?";
        $result = $app['db']->fetchAssoc($sql,array($id));
        $app['session']->set('current_drawing',$result);
        return $app->json($result,200);
    }

    public function saveDrawing(Request $request, Application $app){



        /*$constraint = new Assert\Collection(array(
            'title' => new Assert\Length(array('max' => 300)),
            'description' => new Assert\Length(array('max' => 300)),
            'id' => new Assert\Regex(array('pattern' => '/\d/')),
            'original_id' => new Assert\Regex(array('pattern' => '/\d/'))
        ));

        $errors = $app['validator']->validateValue($drawing, $constraint);*/


        $id = null;
        // recuperation du jeton de securité
        $token = $app['security']->getToken();
        // s'il existe, l'utilisateur est valide
        if (null !== $token) {
            // on recupere les infos utilisateurs
            $user = $token->getUser();
            $user_id = $user->getId();

            // on recupere les données à sauver
            $data = $request->request->all();

            // on recupere le dessin original s'il en existe un
            $drawing = $app['session']->get('current_drawing');

            // on verifie le mode d'enregistrement du dessin
            $edit_mode = array_key_exists('id',$data) && filter_var($data['id'],FILTER_VALIDATE_INT) && $drawing;

            // on place le status du dessin comme valide ( @todo changer ça plus tard )
            $data['status'] = 1;

            // Si on est en mode edition et que l'utilisateur courant est le proprietaire du dessin original
            if($edit_mode && $user_id === $drawing['user_id']){
                // alors on sauvegarde directement
                $id = $data['id'];
                $app['db']->update('wampums',$data,array('id'=>$id));
            }else{
                // sinon on crée un nouveau dessin
                // en supprimant l'id de dessin original
                unset($data['id']);
                unset($data['original_id']);
                // en ajoutant l'id du createur
                $data['user_id'] =  $user_id;
                // si c'est une copie, on recupere l'id du dessin original
                if($drawing)$data['original_id']=$drawing['id'];
                // on sauve en base
                $app['db']->insert('wampums',$data);
                // on recueper l'id du dessin
                $id = $app['db']->lastInsertId();
            }


        }
        return $app->json(array('id'=>$id),200);
    }


    public function loadLibrary($type,$index,Request $request, Application $app){
        if(!$index)$index=0;
        $sql = "SELECT id,title,description,raw FROM wampums WHERE status=1 and type=? LIMIT $index,20";
        $result = $app['db']->fetchAll($sql,array($type));
        return $app->json($result,200);
    }

    public function searchInLibrary($query,$type,$index,Request $request, Application $app){

        return null;
    }




} 