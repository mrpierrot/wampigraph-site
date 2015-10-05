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

} 