import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-relatorio-clientes',
  templateUrl: './relatorio-clientes.component.html',
  styleUrls: ['./relatorio-clientes.component.css']
})
export class RelatorioClientesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  formRelatorio = new FormGroup({
    dataMin: new FormControl('', [
      Validators.required
    ]),
    dataMax: new FormControl('', [
      Validators.required
    ])
  });

  get form(): any {
    return this.formRelatorio.controls;
  }

  onSubmit(): void {
    console.log(this.formRelatorio.value);
  }
}
