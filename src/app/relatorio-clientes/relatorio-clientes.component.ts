import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-relatorio-clientes',
  templateUrl: './relatorio-clientes.component.html',
  styleUrls: ['./relatorio-clientes.component.css']
})
export class RelatorioClientesComponent implements OnInit {

  //inicializando a classe HttpClient (injeção de dependencia)
  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  formRelatorio = new FormGroup({
    dataMin: new FormControl('', [
      Validators.required
    ]),
    dataMax: new FormControl('', [
      Validators.required
    ])
  });

  get form(): any {
    return this.formRelatorio.controls;
  }

  //função executada pelo SUBMIT do formulário
  onSubmit(): void {

    //capturando as datas selecionadas no formulário
    var dataMin = this.formRelatorio.value.dataMin;
    var dataMax = this.formRelatorio.value.dataMax;

    //executando a chamada para a API..
    this.httpClient
      .get('http://localhost:3217/api/Clientes/Relatorio/' 
          + dataMin + "/" + dataMax,
        { responseType: 'arraybuffer' })
      .subscribe( //capturar o retorno da API
        (success) => { //retorno de sucesso
          
          var arquivo = new Blob([success], { type : 'application/pdf'});
          var nomeArquivo = "relatorio_clientes.pdf";

          //DOWNLOAD..
          var url = window.URL.createObjectURL(arquivo);
          var downloadFile = document.createElement('a');
          downloadFile.href = url;
          downloadFile.download = nomeArquivo;

          document.body.appendChild(downloadFile);
          downloadFile.click();
          document.body.removeChild(downloadFile);
        },
        (error) => { //retorno de erro
          console.log(error);
        }
      )
  }
}
