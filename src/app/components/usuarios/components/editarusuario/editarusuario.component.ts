import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Rol } from '../../../../models/rol';
import { UsuarioService } from '../../../../core/services/usuario.service';
import { RolService } from '../../../../core/services/rol.service';

@Component({
  selector: 'app-editarusuario',
  templateUrl: './editarusuario.component.html',
  styleUrls: ['./editarusuario.component.css']
})
export class EditarusuarioComponent implements OnInit {

  form: FormGroup | any;
  roles: Rol[] | any;
  id: string | any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService,
    private rolService: RolService,
    private activatedRoute: ActivatedRoute
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe((params: Params) => {
        this.id = params.id;
        this.getUsuario(this.id)
      });

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

  update(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const usuario = this.form.value
      this.usuarioService.editarUsuario(this.id, usuario)
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

  getUsuario(id: string) {
    this.usuarioService.getUsuario(id)
      .subscribe(user => {
        this.form.patchValue(user);
      });
  }

}