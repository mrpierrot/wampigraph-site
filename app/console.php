<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Pierrot
 * Date: 18/08/14
 * Time: 17:28
 * To change this template use File | Settings | File Templates.
 */

require_once __DIR__ . '/../vendor/autoload.php';


use Cilex\Provider\Console\Adapter\Silex\ConsoleServiceProvider;
use Silex\Application;
use CasusLudi\Commands;

$app = new Application();

require __DIR__ . '/../resources/config/dev.php';

$app->register(new \Silex\Provider\DoctrineServiceProvider());

$app->register(new ConsoleServiceProvider(), array(
    'console.name' => 'pirecadeau',
    'console.version' => '1.0.0',
));
$app['console']->add(new Commands\UserCommand($app));
$app['console']->run();