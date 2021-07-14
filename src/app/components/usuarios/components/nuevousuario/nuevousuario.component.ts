import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../../core/services/usuario.service';
import { RolService } from './../../../../core/services/rol.service';
import { Rol } from '../../../../models/rol';


@Component({
  selector: 'app-nuevousuario',
  templateUrl: './nuevousuario.component.html',
  styleUrls: ['./nuevousuario.component.css']
})
export class NuevousuarioComponent implements OnInit {

  form: FormGroup | any;
  roles: Rol[] | any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService,
    private rolService: RolService
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.getRoles();
  }

  private buildForm() {
    this.form = this.formBuilder.group(
      {
        Nombre: [null, [Validators.required]],
        ApellidoPaterno: [null, Validators.required],
        ApellidoMaterno: [null, Validators.required],
        Correo: [null, [Validators.required, Validators.email]],
        RolId: [null, [Validators.required]],
        Usuario: [null, Validators.required],
        Password: [null, [Validators.required, Validators.minLength(6)]],
      }
    );
  }

  get Nombre() {
    return this.form.get('Nombre');
  }
  get APaterno() {
    return this.form.get('ApellidoPaterno');
  }
  get AMaterno() {
    return this.form.get('ApellidoMaterno');
  }
  get Correo() {
    return this.form.get('Correo');
  }
  get Rol() {
    return this.form.get('RolId');
  }
  get Usuario() {
    return this.form.get('Usuario');
  }
  get Password() {
    return this.form.get('Password');
  }

  save(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const nuevoUsuario = this.form.value
      this.usuarioService.altaUsuario(nuevoUsuario)
        .subscribe(user => {
          this.router.navigate(['usuarios/lista-usuarios']);
        });
    }
  }

  getRoles() {
    this.rolService.getRoles()
      .subscribe(roles => {
        this.roles = roles;
      });
  }

}
