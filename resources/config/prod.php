<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Pierrot
 * Date: 20/09/13
 * Time: 10:43
 * To change this template use File | Settings | File Templates.
 */

$app['db.options'] = array(
    'driver'   => 'pdo_mysql',
    'unix_socket'     => '/srv/run/mysqld/mysqld.sock',
    'dbname'   => 'wampigraph',
    'user'     => 'root',
    'password' => '',
    'charset'  => 'utf8'
);

$app['swiftmailer.options'] = array(
<<<<<<< HEAD
    'host' => 'smtp.gmail.com',
    'port'=> '465',
    'username' => 'cqpx.garbage@gmail.com',
    'password' => 'cqpxpouet',
=======
    'host' => '',
    'port'=> '465',
    'username' => '',
    'password' => '',
>>>>>>> ff15c6b0becae8eb6af7ad85f5d81f67b1c3bbe3
    'encryption' => 'ssl',
    'auth_mode' => null

);

$app['security.role_hierarchy'] = array(
    'ROLE_ADMIN' => array('ROLE_EXTERNAL','ROLE_USER','ROLE_MODERATOR'),
    'ROLE_MODERATOR' => array('ROLE_USER'),
    'ROLE_USER' => array('ROLE_EXTERNAL'),
    'ROLE_EXTERNAL' => array()
);

/*
$app['images'] = array(
    'path_root' => __DIR__.'/../data/images',
    'url_root' => '/image',
    'formats' => array('original','80x80','110x110','300x300'),
    'default' => __DIR__.'/../data/images/notfound.jpg'
);

$app['proposal.sender.mail'] = 'cqpx.garbage@gmail.com';
$app['proposal.dest.mail'] = 'pierre.chabiland@gmail.com';

*/