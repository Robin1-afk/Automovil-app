import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MarcaService } from 'src/app/core/MarcaService/marca.service';
import { VehiculosService } from 'src/app/core/VehiculoService/vehiculos.service';
import { Marca } from 'src/app/models/marca';
import { Vehiculo } from 'src/app/models/vehiculos';

import Swal from 'sweetalert2'


@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {
  listarVehiculo: Vehiculo[] = [];
  listarMarca: Marca[] = [];
  vehiculoForm : FormGroup;
  propetario! : string;

  constructor( private __marca : MarcaService, private fp:FormBuilder, private __vehiculo : VehiculosService ,
  private aRoute: ActivatedRoute ) {

    this.vehiculoForm = this.fp.group({
      placa : new FormControl('', [Validators.required]),
      id_marca : new FormControl('', [Validators.required]),
      tipo_v : new FormControl('', [Validators.required]),
      propetario : new FormControl('', [Validators.required]),
    })



    this.__marca.show(this.aRoute.snapshot.params['id']).subscribe(
      data => {
        console.log(data);
        this.listarMarca = data;
      }
    )
    
   } 

  ngOnInit(): void {
    this.getVehiculo();
    this.listarVehiculo = [];
  }

tipoVehiculo =[
  {
      id: 1, 
      name:"Motocicleta", 
  },

  {
    id: 2, 
    name:"Motocarro", 
  },
  
  {
    id: 2, 
    name:"Mototriciclo", 
  },

  {
    id: 2, 
    name:"Cuatrimoto", 
  },

  {
    id: 2, 
    name:"Automóvil", 
  },
];

Propetarios =[
  {
      id: 15311534, 
      name:"Roberto", 
  },

  {
    id: 1534534, 
    name:"Ricardo", 
  },
  
  {
    id: 1532234, 
    name:"Jose", 
  },

  {
    id: 153564, 
    name:"Robin", 
  },

  {
    id: 153434, 
    name:"Automóvil", 
  },
];


postVehiculo(){
  const VEHICULO: Vehiculo = {
   placa: this.vehiculoForm.value.placa,
   id_marca: this.vehiculoForm.value.id_marca,
   tipo_v: this.vehiculoForm.value.tipo_v,
   propetario: this.vehiculoForm.value.propetario.name,
   id_propetario: this.vehiculoForm.value.propetario.id,

  }
  this.__vehiculo.postSave(VEHICULO).subscribe(data=> {

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Registrado correctamente',
      showConfirmButton: false,
      timer: 1500
    })
    console.log(data);
    this.clearForm();
    this.getVehiculo();
    
  })

  console.log(VEHICULO);
}

getVehiculo(){
  
  this.__vehiculo.show(this.aRoute.snapshot.params['id']).subscribe(
    data => {
      console.log(data);
      this.listarVehiculo = data;
      if (data == 0) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Parece que no tienes registros con esta marca!',
        })
      }
    }
  )
}

  // getVehiculo(){
  //   this.__vehiculo.get().subscribe(
  //     data=>{
  //       console.log(data);
  //       this.listarVehiculo = data;
  //     }
  //   )
  // }

//   showVehiculo(){
//     this.__vehiculo.show(this.id).subscribe(data => {
//     this.listarVehiculo = data;
//      return console.log(data);
// })
  
  // }

  Search(){
    if(this.propetario != ""){
      this.listarVehiculo = this.listarVehiculo.filter(res=>{
      const x = res.propetario;
      const y = res.id_propetario;
      const z = res.placa;

      const resultado = `${x}, ${y}, ${z}`;
      
      return resultado.toLocaleLowerCase().match(this.propetario.toLocaleLowerCase());
      });
      }else if(this.propetario == ""){
       this.ngOnInit();}
       }

  clearForm(){
    this.vehiculoForm.reset()
  }

  delete(id: any){
    Swal.fire({
      title: 'Estas seguro?',
      text: "No podras revertirlo!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.__vehiculo.destroy(id).subscribe(data => {
this.getVehiculo();
      });
        Swal.fire(
          'Eliminado!',
          'El inmueble ha sido eliminado.',
          'success'
        );
      }
    })
  }

}
