import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../../core/services/usuario.service';
import { RolService } from './../../../../core/services/rol.service';
import { Rol } from '../../../../models/rol';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-nuevousuario',
  templateUrl: './nuevousuario.component.html',
  styleUrls: ['./nuevousuario.component.css']
})
export class NuevousuarioComponent implements OnInit {

  form: FormGroup | any;
  roles: Rol[] | any;
  file: File | any;
  defaultImgProfile = 'assets/img/images.png'
  imgURL: any;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService,
    private rolService: RolService,
    private toastr: ToastrService
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.getRoles();
    this.imgURL = this.defaultImgProfile;
  }

  private buildForm() {
    this.form = this.formBuilder.group(
      {
        PrimerNombre: [null, [Validators.required]],
        SegundoNombre: [null, []],
        ApellidoPaterno: [null, Validators.required],
        ApellidoMaterno: [null,],
        Correo: [null, [Validators.required, Validators.email]],
        RolId: [null, [Validators.required]],
        Usuario: [null, Validators.required],
        Password: [null, [Validators.required, Validators.minLength(6)]],
      }
    );
  }

  get PrimerNombre() {
    return this.form.get('PrimerNombre');
  }

  get SegundoNombre() {
    return this.form.get('SegundoNombre');
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
      const formData = new FormData();


      this.usuarioService.altaUsuario(nuevoUsuario)
        .subscribe(user => {
          if (this.file != null) {
            formData.append('ImageUpload', this.file);
            formData.append('LoginUserId', user.toString());

            this.usuarioService.UpsertFoto(formData)
              .subscribe(res => {
              },
                error => {
                  console.log(error);
                });
          } else {

          }
          this.toastr.success('Usuario creado con exito!', 'Exito');
          this.router.navigate(['usuarios/lista-usuarios']);
        });
    }
  }

  onChangeFile(event: any) {
    this.file = <File>event.target.files[0];
    const imagen = this.file;

    if (imagen.length === 0)
      return;

    var mimeType = imagen.type;
    if (mimeType.match(/image\/*/) == null) {
      alert('Only images are supported.');
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(imagen);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }


  }

  getRoles() {
    this.rolService.getRoles()
      .subscribe(roles => {
        this.roles = roles;
      });
  }

}
