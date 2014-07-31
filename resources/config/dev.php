<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Pierrot
 * Date: 20/09/13
 * Time: 10:42
 * To change this template use File | Settings | File Templates.
 */

require __DIR__.'/prod.php';

$app['db.options'] = array(
    'driver'   => 'pdo_mysql',
    'host'     => '127.0.0.1',
    'dbname'   => 'wampigraph',
    'user'     => 'root',
    'password' => ''
);



$app['debug'] = true;
