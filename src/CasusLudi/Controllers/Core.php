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

class Core {

    public function home(Request $request, Application $app){




        return $app['twig']->render('/core/admin.html.twig',array(


        ));
    }


    public function myPatterns(Request $request, Application $app){

        return $app['twig']->render('/core/my-patterns.html.twig',array(


        ));
    }

    public function myWampums(Request $request, Application $app){

        $index=0;
        $sql = "SELECT w.id,w.title,w.description,w.status,u.firstname,u.lastname FROM wampums AS w INNER JOIN users AS u ON u.id = w.user_id WHERE w.user_id=?  AND w.type=? LIMIT $index,20";
        $result = $app['db']->fetchAll($sql,array($app['user']->getId(),'wampum'));

        /*return $app['twig']->render('/core/my-wampums.html.twig',array(
            'wampums'=>$result
        ));*/
        return $app->json($result);
    }


} 