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

class Front {

    public function app(Request $request, Application $app){

        return $app['twig']->render('/app.html.twig',array(


        ));
    }


} 