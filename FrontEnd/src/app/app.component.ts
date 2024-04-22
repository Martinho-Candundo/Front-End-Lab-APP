import { Component, OnInit } from '@angular/core';
import { MyServiceService } from './service/my-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
  title = 'FrontEnd';

  dadosApi:any;
  meuFormulario: FormGroup;
  id: any;
  numero:any
  isBotaoDesabilitado: boolean = false;

  constructor(private myService: MyServiceService
             ,private formBuilder: FormBuilder)
             {
              this.meuFormulario = this.formBuilder.group({
                nome: ['', Validators.required],
                funcionais: [null, [Validators.required]],
                nao_funcionais: [null, [Validators.required]]
              });
             }

  getService():void{
    this.myService.buscaDados().subscribe(data =>{
         console.log(data, 'Teste');
         this.dadosApi = data;
    })
  }

  setItem(item:any){
    this.id = item.id
    const { id, ...itemSemId } = item;
    this.meuFormulario.setValue(itemSemId);
  }
  clear(){
    this.meuFormulario.get('funcionais')?.reset();
    this.meuFormulario.get('nao_funcionais')?.reset();
  }
  deleteItem(id:number){
    this.myService.apagarDados(id).subscribe(res =>{
      console.log('Apagar', res);
      this.getService()
    }, error => {
      console.error('Erro ao fazer o post', error);
    }
    )
  }
  onSubmit():void{
    this.fecharModal();
    if(this.id){
      this.myService.atulizarDados(this.meuFormulario.value,this.id).subscribe(res =>{
        console.log('teste', res);
        this.getService()
      }, error => {
        console.error('Erro ao fazer o post', error);
      }
      )

      this.id = null;
      this.meuFormulario.reset();
    }
    else{

      this.myService.submeterDados(this.meuFormulario.value).subscribe(res =>{
        console.log('teste', res);


      }, error => {
        console.error('Erro ao fazer o post', error);
      }
      )
    }
   this.meuFormulario.get('funcionais')?.reset();
   this.meuFormulario.get('nao_funcionais')?.reset();
  }

  // Método para habilitar o botão
  habilitarBotao() {
    this.isBotaoDesabilitado = false;
  }

  ngOnInit(): void {
    this.getService();
  }
  validarNumero(event: KeyboardEvent) {
    const charCode = event.which ? event.which : event.keyCode;
    // Impedir a inserção do caractere "-" (hífen)
    if (charCode === 45) {
      event.preventDefault();
      return;
    }
    // Verificar se é um número
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
    }
  }
  fecharModal() {
    $('#exampleModal').modal('hide')
  }


}
