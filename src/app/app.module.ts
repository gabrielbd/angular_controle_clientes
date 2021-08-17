import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//importação de cada componente criado no projeto..
import { AppComponent } from './app.component';
import { CadastroClientesComponent } from './cadastro-clientes/cadastro-clientes.component';
import { ConsultaClientesComponent } from './consulta-clientes/consulta-clientes.component';
import { RelatorioClientesComponent } from './relatorio-clientes/relatorio-clientes.component';

//importando a biblioteca do highcharts
import { ChartModule } from 'angular-highcharts';

//importando a classe de configuração do módulo para paginação de dados
import { NgxPaginationModule } from 'ngx-pagination';

//importando a classe do módulo de integração do angular para APIs
import { HttpClientModule } from '@angular/common/http';

//importando as classes da biblioteca de desenvolvimento de formulários
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//importando as classes da biblioteca de mapeamento de rotas (URLs)
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

//configurando uma rota (endereço) para acessar cada componente
const routes: Routes = [
  { path : '', component : DashboardComponent }, //raiz do projeto
  { path : 'cadastro-clientes', component : CadastroClientesComponent },
  { path : 'consulta-clientes', component : ConsultaClientesComponent },
  { path : 'relatorio-clientes', component : RelatorioClientesComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    CadastroClientesComponent,
    ConsultaClientesComponent,
    RelatorioClientesComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    //registrando os mapeamentos realizados
    RouterModule.forRoot(routes),
    //ativando os recursos de formularios
    FormsModule,
    ReactiveFormsModule,
    //ativando o módulo de integração para API
    HttpClientModule,
    //ativando o módulo de paginação de dados
    NgxPaginationModule,
    //ativando o módulo do highcharts
    ChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
