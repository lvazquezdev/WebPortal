import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import decode from 'jwt-decode';
import { UsuarioService } from '../../../../core/services/usuario.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {

  //usuario: any;
  form: FormGroup | any;
  id: string | any;
  file: File | any;
  defaultImgProfile = 'assets/img/images.png'
  imgURL: any;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private toastr: ToastrService
  ) {
    this.buildForm();
    const token = localStorage.getItem('token') as string;
    if (token) {
      const { userId }: any = decode(token);
      this.id = userId;
    }
  }

  ngOnInit(): void {
    this.getUsuario();
  }

  private buildForm() {
    this.form = this.formBuilder.group(
      {
        PrimerNombre: [null, [Validators.required]],
        SegundoNombre: [null, []],
        ApellidoPaterno: [null, Validators.required],
        ApellidoMaterno: [null, []],
        Correo: [null, [Validators.required, Validators.email]]
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

  getUsuario() {
    this.usuarioService.getUsuario(this.id)
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

          //alert("Perfil actualizado con exito!");
          this.toastr.success('Perfil actualizado con exito!', 'Exito!');
          //this.router.navigate(['/home']);
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
