import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Rol } from '../../../../models/rol';
import { UsuarioService } from '../../../../core/services/usuario.service';
import { RolService } from '../../../../core/services/rol.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editarusuario',
  templateUrl: './editarusuario.component.html',
  styleUrls: ['./editarusuario.component.css']
})
export class EditarusuarioComponent implements OnInit {

  form: FormGroup | any;
  roles: Rol[] | any;
  id: string | any;
  file: File | any;
  defaultImgProfile = 'assets/img/images.png'
  imgURL: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService,
    private rolService: RolService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private toastr: ToastrService
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
        PrimerNombre: [null, [Validators.required]],
        SegundoNombre: [null, []],
        ApellidoPaterno: [null, Validators.required],
        ApellidoMaterno: [null, []],
        Correo: [null, [Validators.required, Validators.email]],
        RolId: [null, [Validators.required]],
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

  getRoles() {
    this.rolService.getRoles()
      .subscribe(roles => {
        this.roles = roles;
      });
  }

  getUsuario(id: string) {
    this.usuarioService.getUsuario(id)
      .subscribe((user: any) => {
        this.form.patchValue(user);

        if (user.imagen.Foto != null) {
          let objectURL = `data:${user.imagen.DataType};base64,${user.imagen.Foto}`;
          this.imgURL = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        } else {
          this.imgURL = this.defaultImgProfile;
        }

      });
  }

  update(event: Event) {
    event.preventDefault();
    if (this.form.valid) {

      const usuario = this.form.value
      const formData = new FormData();

      this.usuarioService.editarUsuario(this.id, usuario)
        .subscribe(user => {

          if (this.file != null) {
            formData.append('ImageUpload', this.file);
            formData.append('LoginUserId', this.id);

            this.usuarioService.UpsertFoto(formData)
              .subscribe(res => {
                console.log(res);
              },
                error => {
                  console.log(error);
                });
          }

          this.toastr.success('Usuario actualizado con exito!', 'Exito!');
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







}