<?php
// TODO: Clase de Producto
require_once('../config/config.php');

class Producto
{
    public function todos() // select * from productos
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT p.idProductos, 
       p.Codigo_Barras, 
       p.Nombre_Producto, 
       p.Graba_IVA, 
       u.nombre as clientes, 
       i.nombre as IVA_nombre, 
       k.Cantidad, 
       k.Fecha_Transaccion, 
       k.Valor_Compra, 
       k.Valor_Venta, 
       k.Tipo_Transaccion
FROM `Productos` p
INNER JOIN `clientes` u ON p.idProductos = u.cliente_id
INNER JOIN `IVA` i ON p.Graba_IVA = i.idIVA
INNER JOIN `Kardex` k ON p.idProductos = k.Productos_idProductos
where k.`Estado` = 1
";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function uno($idProductos) // select * from productos where id = $idProductos
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT p.*, u.nombre as clientes, i.nombre as IVA_nombre 
                   FROM `Productos` p 
                   INNER JOIN clientes u ON p.idProductos = u.cliente_id 
                   INNER JOIN IVA i ON p.Graba_IVA = i.idIVA 
                   WHERE p.idProductos = $idProductos";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function insertar($Codigo_Barras, $Nombre_Producto, $Graba_IVA, $clientes_cliente_id, $IVA_idIVA, $Cantidad, $Valor_Compra, $Valor_Venta, $Proveedores_idProveedores)
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();

            // Insertar el producto
            $cadenaProducto = "INSERT INTO `Productos`(`Codigo_Barras`, `Nombre_Producto`, `Graba_IVA`) 
                               VALUES ('$Codigo_Barras', '$Nombre_Producto', '$Graba_IVA')";

            if (mysqli_query($con, $cadenaProducto)) {
                $productoId = $con->insert_id; // Obtener el ID del producto recién creado

                // Insertar el Kardex asociado al producto
                $cadenaKardex = "INSERT INTO `Kardex`(`Estado`, `Fecha_Transaccion`, `Cantidad`, `Valor_Compra`, `Valor_Venta`, `clientes_cliente_id`, `clientes_cliente_id1`, `clientes_cliente_id2`, `IVA`, `IVA_idIVA`, `Proveedores_idProveedores`, `Productos_idProductos`, `Tipo_Transaccion`)
                                 VALUES (1, NOW(), '$Cantidad', '$Valor_Compra', '$Valor_Venta', '$clientes_cliente_id', '$clientes_cliente_id', '$clientes_cliente_id', '$IVA_idIVA', '$IVA_idIVA', '$Proveedores_idProveedores', '$productoId', 1)";

                if (mysqli_query($con, $cadenaKardex)) {
                    return $productoId; // Éxito, devolver el ID del producto
                } else {
                    return $con->error; // Error en el Kardex
                }
            } else {
                return $con->error; // Error en el producto
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }

    public function actualizar($idProductos, $Codigo_Barras, $Nombre_Producto, $Graba_IVA) // update productos set ... where id = $idProductos
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "UPDATE `Productos` SET 
                       `Codigo_Barras`='$Codigo_Barras',
                       `Nombre_Producto`='$Nombre_Producto',
                       `Graba_IVA`='$Graba_IVA'
                       WHERE `idProductos` = $idProductos";
            if (mysqli_query($con, $cadena)) {
                return $idProductos; // Éxito, devolver el ID actualizado
            } else {
                return $con->error;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }

    public function eliminar($idProductos) // delete from productos where id = $idProductos
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "UPDATE `kardex` SET `Estado`=0 WHERE `Productos_idProductos`=$idProductos";
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
