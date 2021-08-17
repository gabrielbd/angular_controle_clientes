import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  //atributo
  grafico: Chart;

  constructor(private httpClient: HttpClient) { 
    this.grafico = new Chart({});
  }

  //função executada quando o componente é carregado
  ngOnInit(): void {
    //consultar os dados dos clientes na API
    this.httpClient.get('http://localhost:3217/api/Clientes/SomatorioDatas')
      .subscribe(
        (success) => {
 
          var dados = success as any[];   // DASHBOARD COMPLETO

          var array : any[] = [];
          var names : any[] = [];

          for (var i = 0; i < dados.length; i++) {
            array.push([
              dados[i].dataCadastro, dados[i].quantidade
            ]);
            names.push([
              dados[i].dataCadastro
            ])
          }

          this.grafico = new Chart({  
            chart: {
              type: 'line',
            },
            title: {
              text: 'Histórico de Cadastro de Clientes por data'
            },
            subtitle: {
              text: 'Resumo de cadastros realizados'
            },
            xAxis: {
              categories: names
            },
            yAxis: {
              min: 0,
              title: {
                text: 'Quantidade de clientes cadastrados'
              }
            },
            legend: {
              enabled: false
            },
            tooltip: {
              headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
              pointFormat: '<tr><td style="padding:0">Clientes cadastrados: <b>{point.y:.1f}</b></td></tr>',
              footerFormat: '</table>',
              shared: true,
              useHTML: true
            },
            credits: {
              enabled: false
            },
            series: [{
              data: array,
              type: undefined as any
            }]
          });

        },
        (error) => {
          console.log(error);
        }
      )
  }

}
