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
    'password' => '',
    'charset'  => 'iso-8859-1'
);

$app['security.firewalls'] = array(
    'admin' => array(
        'pattern' => '^/admin',
        'form' => array('login_path' => '/login', 'check_path' => '/admin/login-check'),
        'logout' => array('logout_path' => '/admin/logout'),
        'users' => array(
            // raw password is foo
            'admin' => array('ROLE_ADMIN', '5FZ2Z8QIkA7UTZ4BYkoC+GsReLf569mSKDsfods6LYQ8t+a8EW9oaircfMpmaLbPBh4FOBiiFyLfuZmTSUwzZg=='),
        ),
    ),
);

$app['debug'] = true;
