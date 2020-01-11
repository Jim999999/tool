<?php
namespace app\index\controller;

class Index
{
    public function index()
    {

       

       $array = [
            ["name"=>"xiaohua211111110","sex"=>"nv"],
            ["name"=>"xiaohua1","sex"=>"nan"],
            ["name"=>"xiaohua3","sex"=>"nv"],
            ["name"=>"xiaohua2","sex"=>"nan"],
	];

    header("Access-Control-Allow-Origin: *");
	return json_encode($array);
    }


    public function demo(){
        for($i=0;$i<=10;$i++){
            echo $i."<br>";
        }
         die;
        return 'hello '.time();
    }


    public function elastic(){
        $prefix = request()->get('prefix',''); //路由格式：?prefix=hello
        return $prefix.' world '.date('Y-m-d');
    }

}
