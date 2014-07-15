<?php
/**
 * Created by PhpStorm.
 * User: Pierrot
 * Date: 16/12/13
 * Time: 15:25
 */

use Silex\Provider\TwigServiceProvider;
use Silex\Provider\DoctrineServiceProvider;
use Silex\Provider\SessionServiceProvider;
use Silex\Provider\FormServiceProvider;
use Silex\Provider\ValidatorServiceProvider;
use Silex\Provider\TranslationServiceProvider;
use Silex\Provider\SwiftmailerServiceProvider;



$app->register(new TwigServiceProvider(), array(
    'twig.options'        => array(
        'cache'            => isset($app['twig.options.cache']) ? $app['twig.options.cache'] : false,
        'strict_variables' => true
    ),
   // 'twig.form.templates' => array(__DIR__ .'/../vendor/silex-braincrafted-bootstrap/resources/views/form_div_layout.html.twig'),
    'twig.form.templates' => array('layouts/form_div_layout.html.twig'),
    'twig.path'           => array(__DIR__ . '/../resources/views'),
    'charset'=> 'utf8'
));

$app['twig'] = $app->share($app->extend('twig', function($twig) {
    $twig->addExtension(new \Braincrafted\Bundle\BootstrapBundle\Twig\BootstrapBadgeExtension());
    $twig->addExtension(new \Braincrafted\Bundle\BootstrapBundle\Twig\BootstrapIconExtension());
    $twig->addExtension(new \Braincrafted\Bundle\BootstrapBundle\Twig\BootstrapLabelExtension());
    $twig->addExtension(new \Braincrafted\Bundle\BootstrapBundle\Twig\BootstrapFormExtension());

    $days = array('Lun','Mar','Mer','Jeu','Ven','Sam','Dim');
    $twig->addFilter(new Twig_SimpleFilter('cqpx_opening', function ($string) use ($days) {
        $ret = '<span class="opening">';
        $lunch_opening = array();
        for($i=0,$c=strlen($string);$i<$c;$i++){
            if($string[$i]==1){
                $ret.= '<span>'.$days[$i].'</span>';
            }else{
                $ret.= '<span></span>';
            }
        }
        $ret.'</span>';
        return $ret;
    }));
    return $twig;
}));

$app->register(new Silex\Provider\SecurityServiceProvider());

$app->register(new SessionServiceProvider());
$app->register(new DoctrineServiceProvider());
$app->register(new SwiftmailerServiceProvider());
$app->register(new FormServiceProvider());
$app->register(new ValidatorServiceProvider());
$app->register(new Silex\Provider\UrlGeneratorServiceProvider());
$app->register(new TranslationServiceProvider(), array(
    'translator.messages' => array(),
    'locale'=>'fr'
));

