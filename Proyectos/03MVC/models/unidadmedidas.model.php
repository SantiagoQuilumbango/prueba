<?php
// Modelo de UnidadDeMedida
require_once('../config/config.php');

class UnidadDeMedida
{
    public function todos() // select * from productos
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM `productos`";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function uno($idUnidad) // select * from productos where id = $idUnidad
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM `productos` WHERE `producto_id ` = $idUnidad";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function insertar($nombre, $descripcion, $precio, $stock) // insert into productos (...) values (...)
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "INSERT INTO `productos`( `nombre`, `descripcion`, `precio`, `stock`) 
                       VALUES ( '$nombre', '$descripcion', '$precio', '$stock')";
            if (mysqli_query($con, $cadena)) {
                return $con->insert_id; // Retorna el ID insertado
            } else {
                return $con->error;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }

    public function actualizar($idUnidad,  $nombre, $descripcion, $precio, $stock) // update productos set ... where id = $idUnidad
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "UPDATE `productos` SET 
                      
                       `nombre`='$nombre',
                       `descripcion`='$descripcion',
                       `precio`='$precio',
                       `stock`='$stock'
                       
                       WHERE `producto_id ` = $idUnidad";
            if (mysqli_query($con, $cadena)) {
                return $idUnidad; // Retorna el ID actualizado
            } else {
                return $con->error;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }

    public function eliminar($idUnidad) // delete from productos where id = $idUnidad
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "DELETE FROM `productos` WHERE `producto_id `= $idUnidad";
            if (mysqli_query($con, $cadena)) {
                return 1; // Éxito
            } else {
                return $con->error;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }
}
