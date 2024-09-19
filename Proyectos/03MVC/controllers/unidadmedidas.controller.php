<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER["REQUEST_METHOD"];
if ($method == "OPTIONS") {
    die();
}

// Controlador de Unidad de Medida Tienda Cel@g

require_once('../models/unidadmedidas.model.php');
error_reporting(0);
$unidad = new UnidadDeMedida;

switch ($_GET["op"]) {
    case 'todos': // Procedimiento para cargar todas las unidades de medida
        $datos = array();
        $datos = $unidad->todos();
        while ($row = mysqli_fetch_assoc($datos)) {
            $todas[] = $row;
        }
        echo json_encode($todas);
        break;

    case 'uno': // Procedimiento para obtener una unidad de medida por ID
        if (!isset($_POST["idUnidad"])) {
            echo json_encode(["error" => "Unidad de Medida ID not specified."]);
            exit();
        }
        $idUnidad = intval($_POST["idUnidad"]);
        $datos = array();
        $datos = $unidad->uno($idUnidad);
        $res = mysqli_fetch_assoc($datos);
        echo json_encode($res);
        break;

    case 'insertar': // Procedimiento para insertar una nueva unidad de medida
        //if (!isset($_POST["Descripcion"]) || !isset($_POST["Tipo"])) {
        if (!isset($_POST["nombre"]) || !isset($_POST["descripcion"]) || !isset($_POST["precio"]) || !isset($_POST["stock"])) {
            echo json_encode(["error" => "Missing required parameters."]);
            exit();
        }

        //$Nombre = $_POST["Nombre"];
        //$Descripcion = $_POST["Descripcion"];
        $nombre = $_POST["nombre"];
        $descripcion = $_POST["descripcion"];
        $precio = $_POST["precio"];
        $stock = $_POST["stock"];
  

        $datos = array();
        //$datos = $unidad->insertar($Descripcion, $Tipo);
        $datos = $unidad->insertar($nombre, $descripcion, $precio, $stock);
        echo json_encode($datos);
        break;

    case 'actualizar': // Procedimiento para actualizar una unidad de medida existente
        if (!isset($_POST["idUnidad"]) || !isset($_POST["nombre"]) || !isset($_POST["descripcion"]) || !isset($_POST["precio"]) || !isset($_POST["stock"])) {
            echo json_encode(["error" => "Missing required parameters."]);
            exit();
        }

        $idUnidad = intval($_POST["idUnidad"]);
        //$Nombre = $_POST["Nombre"];
        $nombre = $_POST["nombre"];
        $descripcion = $_POST["descripcion"];
        $precio = $_POST["precio"];
        $stock = $_POST["stock"];
       

        $datos = array();
        $datos = $unidad->actualizar($idUnidad,  $nombre, $descripcion, $precio, $stock);
        echo json_encode($datos);
        break;

    case 'eliminar': // Procedimiento para eliminar una unidad de medida
        if (!isset($_POST["idUnidad"])) {
            echo json_encode(["error" => "Unidad de Medida ID not specified."]);
            exit();
        }
        $idUnidad = intval($_POST["idUnidad"]);
        $datos = array();
        $datos = $unidad->eliminar($idUnidad);
        echo json_encode($datos);
        break;

    default:
        echo json_encode(["error" => "Invalid operation."]);
        break;
}
