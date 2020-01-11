<?php
namespace app\index\controller;
use app\index\model\Elasticsearch;
use Elasticsearch\ClientBuilder;
//  https://www.php.cn/linux-384847.html
//  https://cloud.tencent.com/developer/article/1422171
//  https://blog.csdn.net/qq_28289405/article/details/88566245
//  https://www.cnblogs.com/mzhaox/p/11210025.html
//  https://blog.csdn.net/sunsgne_ac/article/details/79862933

class Test{

    public function index(){
        // $json = '{
        //     "query": { "match_all": {} },
        //     "sort": { "balance": { "order": "desc" } }
        //   }';
        //   echo '<pre>';
        //   var_dump(json_decode($json,true));

        //   $array=[
        //       'query'=>['match_al'=>[]],
        //       'sort'=>['balance'=>["order"=>"desc"]],
        //     ];
        // var_dump($array);
        //   die;


        $obj = new Elasticsearch();
        $result = $obj->getOne();
        dump($result);die;
    }

    public function addOne(){
        $escObj = new Elasticsearch();
        $res = $escObj->addOne();
        var_export($res);
    }

    function get_conn(){
        $host   = 'localhost';
        $dbname = 'test';
        $user   = 'root';
        $passwd = '123456';

        $conn = new \PDO("mysql:dbname=$dbname;host=$host",$user,$passwd);
        return $conn;
    }


    function create(){
        $host=['http://localhost:9200'];
        $client = \Elasticsearch\ClientBuilder::create()->setHosts($host)->build();
        $sql    = "SELECT * FROM emp";
        $conn   = $this->get_conn();
        $stmt   = $conn->query($sql);
        $rtn    = $stmt->fetchAll();


        //delete index which already created
        $params = array();
        $params['index'] = 'emp_index';
        $client->indices()->delete($params);

        //create index on log_date,src_ip,dest_ip
        $rtnCount = count($rtn);
        for($i=0;$i<$rtnCount;$i++){
            $params = array();
            $params['body'] = array(
                'id'       => $rtn[$i]['id'],
                'fdName'   => $rtn[$i]['fdName'],
                'fdAge'    => $rtn[$i]['fdAge'],
                'fdStatus' => $rtn[$i]['fdStatus']
            );
            $params['index'] = 'emp_index';
            $params['type']  = 'emp_type';

            //Document will be indexed to log_index/log_type/autogenerate_id
            $client->index($params);
        }
        echo 'create index done!';
    }


    function search(){
        //Elastic search php client
        $host=['http://localhost:9200'];
        $client = \Elasticsearch\ClientBuilder::create()->setHosts($host)->build();
        $params = array();
        $params['index'] = 'xiaochuan';
        $params['type'] = 'emp_type';
        $params['body']['query']['match']['fdStatus'] = '1';
        $params['body']['sort'] = array('fdAge'=>array('order'=>'desc'));
        $params['size'] = 3;
        $params['from'] = 1;
        $rtn = $client->search($params);
        var_dump($rtn);
    }

}
?>