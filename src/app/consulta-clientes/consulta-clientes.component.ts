import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-consulta-clientes',
  templateUrl: './consulta-clientes.component.html',
  styleUrls: ['./consulta-clientes.component.css']
})
export class ConsultaClientesComponent implements OnInit {

  //atributo
  clientes = [ //array (lista)
    //campos que serão capturados
    {
      idCliente: '',
      nome: '',
      email: '',
      dataCadastro: ''
    }
  ];

  //atributo para armazenar o numero da
  //página que estaremos navegando na paginação
  pagina = 1;

  //armazenar o id do cliente para exclusão..
  idClienteExclusao = '';

  //criando um objeto para capturar o formulário
  formEdicao = new FormGroup({
    idCliente : new FormControl('', []), //campo oculto
    nome : new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(150)
    ]),
    email : new FormControl('', [
      Validators.required,
      Validators.email
    ])
  });

  //criando um objeto para exibir na página html
  //as mensagens de erro de validação dos campos
  get form() : any {
    return this.formEdicao.controls;
  }  

  //inicializar a classe HttpClient do Angular dentro do método construtor,
  //por meio de injeção de dependencia
  constructor(private httpClient: HttpClient) { }

  //método executado sempre que o componente é carregado
  ngOnInit(): void {

    //executando uma chamada para o serviço de consulta de clientes da API..
    this.httpClient.get('http://localhost:3217/api/Clientes')
      .subscribe(
        (success) => {
          this.clientes = success as any[];
        },
        (error) => {
          console.log(error);
        }
      );
  }

  //método para capturar o id do cliente que desejamos excluir..
  solicitarExclusao(idCliente : string) : void {
      this.idClienteExclusao = idCliente;
  }

  //função para confirmar a exclusão do cliente
  confirmarExclusao() : void {
    //fazendo uma requisição de exclusão na API..
    this.httpClient.delete('http://localhost:3217/api/Clientes/' + this.idClienteExclusao, 
      { responseType : 'text' })
      .subscribe( //capturar o retorno da API
        (success) => {
          alert(success); //exibindo a mensagem da API..
          this.ngOnInit(); //recarregar a consulta..
        },
        (error) => {
          console.log(error);
        }
      )
  }

  //função executada quando o usuario clicar no botão 'Editar'
  //do grid (tabela) de consulta de clientes
  solicitarEdicao(item : any) {
    //preencher os campos do formulario
    this.formEdicao.controls.idCliente.setValue(item.idCliente);
    this.formEdicao.controls.nome.setValue(item.nome);
    this.formEdicao.controls.email.setValue(item.email);
  }

  //função para capturar o evento SUBMIT
  //do formulário de edição de cliente
  onSubmit() : void {
    
    this.httpClient.put(
      'http://localhost:3217/api/Clientes/', 
      this.formEdicao.value,
      { responseType : 'text' })
      .subscribe(
        (success) => {
          alert(success); //mensagem de sucesso
          this.ngOnInit(); //recarregar a consulta
        },
        (error) => {
          console.log(error);
        }
      )
  }

  //função para que o componente de paginação
  //possa 'trocar' de página (avançar ou voltar)
  handlePageChange(event : number) : void {
    this.pagina = event;
  }
}
