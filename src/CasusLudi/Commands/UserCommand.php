<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Pierrot
 * Date: 26/09/13
 * Time: 17:34
 * To change this template use File | Settings | File Templates.
 */

namespace CasusLudi\Commands;

use CasusLudi\models\User;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;


class UserCommand extends Command
{

    private $_app;

    public function __construct($pApp){
        $this->_app = $pApp;
        parent::__construct();
    }

    protected function configure()
    {
        $this
            ->setName('user')
            ->setDescription('user commands manager')
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        switch($input->getFirstArgument()){
            case 'add': return $this->_add($input,$output);

        }


    }

    private  function _add(InputInterface $input, OutputInterface $output){
        $app = $this->_app;
        $user = new User();
        $encoder = $app['security.encoder_factory']->getEncoder($user);

        $password = $encoder->encodePassword($data['password'], $user->getSalt());
    }
}