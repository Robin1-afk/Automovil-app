import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MarcaService } from 'src/app/core/MarcaService/marca.service';
import { Marca } from '../../models/marca';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  listarMarca: Marca[] = [];
  marcaForm : FormGroup;

  constructor(private fp:FormBuilder, private __marca : MarcaService, private aRoute: ActivatedRoute) { 

    this.marcaForm = this.fp.group({
      nombre : new FormControl('', [Validators.required]),
      link_img : new FormControl('', [Validators.required])
    });
    
  }
 


  ngOnInit(): void {
    this.getMarca();
    const params = this.aRoute.snapshot.params;
  console.log(params)
  }

 postMarca(){

  const MARCA: Marca = {

    nombre : this.marcaForm.value.nombre,
    link_img : this.marcaForm.value.link_img
    
  }
  this.__marca.postSave(MARCA).subscribe(data=> {  
    
    
    Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Registrado correctamente',
    showConfirmButton: false,
    timer: 1500
  })
  console.log(data);   this.clearForm();
  this.getMarca();
  })





 }

 getMarca(){
   this.__marca.get().subscribe(
     data=>{
       console.log(data); 
       this.listarMarca = data;
     }
   )
 }

 clearForm(){
  this.marcaForm.reset()
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
      this.__marca.destroy(id).subscribe(data => {
      this.getMarca();});
      Swal.fire(
        'Eliminado!',
        'El inmueble ha sido eliminado.',
        'success'
      );
    }
  })
}



}
