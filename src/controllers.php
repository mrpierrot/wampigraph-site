<?php
/**
 * Created by PhpStorm.
 * User: Pierrot
 * Date: 16/12/13
 * Time: 15:26
 */

use Symfony\Component\HttpFoundation\Request;

$home = $app['controllers_factory'];

$app->mount('/',new CasusLudi\ControllerProviders\Core());

//$app->mount('/admin',new CasusLudi\ControllerProviders\Admin());
