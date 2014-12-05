<?php

require_once __DIR__.'/../vendor/autoload.php';

class App extends \Silex\Application{
    use Silex\Application\UrlGeneratorTrait;
}

$app = new App();

require __DIR__.'/../resources/config/dev.php';

require __DIR__.'/../src/app.php';

$app->run();
