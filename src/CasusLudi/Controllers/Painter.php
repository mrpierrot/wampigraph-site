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

class Painter {


    public function app(Request $request, Application $app){

        return $app['twig']->render('/core/painter.html.twig',array(


        ));
    }

    public function save(Request $request, Application $app){

        return $app->json(true,200);
    }

    public function loadPatternsLibrary(Request $request, Application $app){

        return null;
    }

    public function searchInPatternsLibrary(Request $request, Application $app){

        return null;
    }

    public function loadWampumsLibrary(Request $request, Application $app){

        return null;
    }

    public function searchInWampumsLibrary(Request $request, Application $app){

        return null;
    }




} 