import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cadastro-clientes',
  templateUrl: './cadastro-clientes.component.html',
  styleUrls: ['./cadastro-clientes.component.css']
})
export class CadastroClientesComponent implements OnInit {

  //variável da classe (atributo)
  mensagem = ""; //valor inicial -> vazio

  //construtor da classe
  //A classe HttpClient do Angular funciona desde que seja inicializada
  //por meio de injeção de dependencia, feito atraves do método construtor
  constructor(private httpClient: HttpClient) { }

  //método executado quando o componente abre
  ngOnInit(): void {
  }

  //criando um objeto para capturar o formulário
  formCadastro = new FormGroup({
    //capturando o campo nome do formulário
    nome : new FormControl('', [
      //validação de campo obrigatório
      Validators.required,
      //validação de minimo de caracteres
      Validators.minLength(6),
      //validação de máximo de caracteres
      Validators.maxLength(150)
    ]),
    //capturando o campo email do formulário
    email : new FormControl('', [
      //validação de campo obrigatório
      Validators.required,
      //validação de campo que deve conter um email
      Validators.email
    ])
  });

  //criando um objeto para exibir na página html
  //as mensagens de erro de validação dos campos
  get form() : any {
    return this.formCadastro.controls;
  }

  //criando uma função para receber o SUBMIT
  //do formulário enviado pela página HTML
  onSubmit() : void {
    
    //fazendo a chamada para a API
    this.httpClient.post(
      'http://localhost:3217/api/Clientes', 
      this.formCadastro.value, 
      { responseType : 'text' } 
      )
      .subscribe( //capturar o retorno da API (PROMISSE)
        (success) => { //retorno de sucesso da API
          //exibir mensagem de sucesso na página
          this.mensagem = success;
          //limpar os campos do formulário
          this.formCadastro.reset();
        },
        (error) => { //retorno de erro da API
          console.log(error);
          this.mensagem = "Não foi possível realizar o cadastro do cliente.";
        }
      )
  }

}
