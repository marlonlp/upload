<?php
$diretorio = "./uploads/";
$arq_perm = array('jpg','jpeg','png','gif');

if(strtolower($_SERVER['REQUEST_METHOD']) != 'post'){
    exit_status('Erro! Método HTTP errado!');
}

if(array_key_exists('pic',$_FILES) && $_FILES['pic']['error'] == 0 ){
	
    $imagem = $_FILES['pic'];
    
    if(!in_array(get_extension($imagem['name']),$arq_perm)){
        exit_status('Apenas arquivos dos tipos '.implode(',',$arq_perm).' são permitidos!');
    }

    if(move_uploaded_file($imagem['tmp_name'], $diretorio.$imagem['name'])){
        exit_status('Upload concluído com sucesso!');
    }     
}

exit_status('Aconteceu algum problema com o upload!');

function exit_status($str){
	echo json_encode(array('status'=>$str));
	exit;
}

function get_extension($file_name){
	$ext = explode('.', $file_name);
	$ext = array_pop($ext);
	return strtolower($ext);
}
?>