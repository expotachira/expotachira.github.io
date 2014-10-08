<?php
require 'vendor/autoload.php';


$app = new \Slim\Slim();
$app->database = new medoo();
$body = $app->request->getBody();

$app->get('/', function () {
    echo "Parawebs, C.A";
});

$app->get('/tipoempresa', function () use ($app){
	$datas =  $app->database->select("tipo_empresa", ["tipo_id","tipo_des"]);
	header("access-control-allow-origin: *");
	echo json_encode($datas);
});

$app->get('/listclie', function () use ($app){
	$datas =  $app->database->select("preventaweb", "*");
	header("access-control-allow-origin: *");
	echo json_encode($datas);
});

$app->get('/clipre/:id', function ($id) use ($app){
	$datas =  $app->database->select("preventaweb", "*" , [ "pre_id" => $id ]);
	header("access-control-allow-origin: *");
	echo json_encode($datas[0]);
});

$app->post('/savenew', function () use ($app) {

    $vars = $app->request->post();
    $status=true;
	$errorlog=array();
    if (empty($vars['empresa'])) {
    	$errorlog[]= "empresa";
    	$status=false;
    }
    if (empty($vars['contacto'])) {
    	$errorlog[]= "contacto";
    	$status=false;
    }
    if (empty($vars['telefono'])) {
    	$errorlog[]= "telefono";
    	$status=false;
    }
	if (!filter_var($vars['email'], FILTER_VALIDATE_EMAIL)) {
		$errorlog[]= "email";
		$status=false;
	}
	if (empty($vars['tipo'])) {
    	$errorlog[]= "tipo";
    	$status=false;
    }

    if ($status) {
    	    $app->database->insert('preventaweb', [
			'pre_emp' => $vars['empresa'],
			'pre_con' => $vars['contacto'],
			'pre_tel' => $vars['telefono'],
			'pre_ema' => $vars['email'],
			'pre_tip' => intval($vars['tipo']),
			'pre_ruta' => intval($vars['pre_ruta']),
			'pre_rutaid' => intval($vars['pre_rutaid'])
			]);
			$guardado = true;
    }else{
    		$guardado = false;
    }

    $respuesta = new stdClass();
    $respuesta->estatus = $guardado;
    $respuesta->error = $errorlog;

    header("access-control-allow-origin: *");
    echo json_encode($respuesta);

});


$app->post('/update/:tipo/:id', function ($tipo,$id) use ($app) {

	$vars = $app->request->post();
	$respuesta = new stdClass();

    if ($tipo=="clipre") {
    	if ($app->database->has( "preventaweb" , ["pre_id" => $id ] )) {
    		$updatepre=array();
		   	if (isset($vars['est'])) {
		   		$updatepre['pre_est'] =  $vars['est'];
		   	}
		   	if (isset($vars['interes'])) {
		   		$updatepre['pre_int'] =  $vars['interes'];
		   	}
		    $app->database->update('preventaweb', $updatepre , ["pre_id" => $id]);

		    $respuesta->estatus = true;

		}else{

			$respuesta->estatus = false;

		}
    }

    if ($tipo=="task") {
    	if ($app->database->has( "tarea_pre" , ["tar_id" => $id ] )) {

	    	$updatetar = [ "tar_est"=>$vars['tar_est'] , "tar_not"=>$vars['tar_not']];
	    	$app->database->update('tarea_pre', $updatetar , ["tar_id" => $id]);

	    	$respuesta->estatus = true;

    	}else{

    		$respuesta->estatus = false;

    	}
    }

    header("access-control-allow-origin: *");
	echo json_encode($respuesta);

});


$app->post('/newtask/:id', function ($id) use ($app) {

	$vars = $app->request->post();
	$respuesta = new stdClass();

	if ($app->database->has( "preventaweb" , ["pre_id" => $id ] )) {
		$app->database->insert('tarea_pre', [
			'pre_id' => $id,
			'tar_tip' => $vars['tar_tip'], // 1 Normal / 2 rapida / 3 Urgente
			'tar_des' => $vars['tar_des'],
			'#tar_fechcre' => 'NOW()',
			'#tar_fechrea'  => $vars['tar_fechrea']
			]);
			$respuesta->logsql = $app->database->last_query();
			$respuesta->estatus = true;
	}else{
			$respuesta->estatus = false;
	}
	header("access-control-allow-origin: *");
	echo json_encode($respuesta);

});

$app->post('/listtask/:tip', function ($tip) use ($app) {

	// Toda la lista de Tareas por Realizar
	$vars = $app->request->post();

	// En este lado construyo - El array del sql.
	switch ($tip) {
		case 'all':
			$sql = "";
			break;
		case 'all-est':
			$valores = explode(",", $vars['est']);
			$sql = ["tar_est" => $valores ];
			break;
		case 'unicper':
			$sql = ["pre_id" => $vars['id']];
			break;
		case 'unictask':
			$sql = ["tar_id" => $vars['id']];
			break;
	}

	$datas =  $app->database->select("tarea_pre", "*" , $sql);

	header("access-control-allow-origin: *");
	echo json_encode($datas);

	// Lista DE TAREAS DE UN ID. EN ESPECIFICO
});

$app->run();