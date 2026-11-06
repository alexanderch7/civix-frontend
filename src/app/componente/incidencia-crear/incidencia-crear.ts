import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IncidenciaService } from '../../services/incidencia-service';
import { ActivatedRoute, Router } from '@angular/router';
import { IncidenciaRegistro } from '../../model/incidencia-registro';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatButton } from '@angular/material/button';

@Component({
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatButton,
  ],
  selector: 'app-incidencia-crear',
  styleUrl: './incidencia-crear.css',
  templateUrl: './incidencia-crear.html',
})
export class IncidenciaCrear {
  incidenciaForm: FormGroup;
  fb: FormBuilder = inject(FormBuilder);
  incidenciaService = inject(IncidenciaService);
  router = inject(Router);
  edicion: boolean = false;
  route: ActivatedRoute = inject(ActivatedRoute);
  id: number = 0;
  constructor() {
    this.incidenciaForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      direccionReferencia: ['', Validators.required],
      latitud: [0, Validators.required],
      longitud: [0, Validators.required],
      prioridad: ['', Validators.required],
      idCategoria:[null,Validators.required]
    });
  }
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      console.log('ID recibido:', this.id);
      this.edicion = params['id'] != null;
      this.cargaForm();
    });
  }
  cargaForm() {
    if (this.edicion) {
      this.incidenciaService.buscarporId(this.id).subscribe({
        next: (data) => {
          this.incidenciaForm.setValue(data);
        },
      });
    }
  }
  onSubmit() {
    if (this.incidenciaForm.valid) {
      let incidencia = new IncidenciaRegistro();
      incidencia = this.incidenciaForm.value;
      if (!this.edicion) {
        console.log('Datos leidos del formulario', incidencia);
        this.incidenciaService.registrar(incidencia).subscribe({
          next: (data) => {
            this.router.navigate(['mis-incidencias']);
            console.log('Lista Actualizada');
          },
        });
      }
    }
  }
}
