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
use Symfony\Component\HttpFoundation\Response;

class Image {


    public function getThumbnail($id, Request $request, Application $app){

        $sql = "SELECT raw FROM wampums WHERE id = ?";
        $result = $app['db']->fetchAssoc($sql,array($id));
        if($result['raw']){
            $data = json_decode($result['raw']);
            $xRate = 2;
            $yRate = 2;
            $cols = $data->cols;
            $rows = $data->rows;
            $raw = $data->raw;

            $gd = imagecreatetruecolor($xRate*$cols, $yRate*$rows);
            $colorA = imagecolorallocate($gd,101,119,255);
            $colorB = imagecolorallocate($gd,255,255,255);

            for($i=0,$c=strlen($raw);$i<$c;$i++){
                $x = ($i%$cols)*$xRate;
                $y = ((int)($i/$cols))*$yRate;
                imagefilledrectangle($gd, $x,$y,$x+$xRate,$y+$yRate, $raw[$i]=="1"?$colorA:$colorB);

            }

            header('Content-Type: image/jpeg');
            imagejpeg($gd);
            imagedestroy($gd);
            return new Response(null,200,array('Content-Type'=> 'image/jpeg'));
        }
        return new Response(null,404);

    }






} 