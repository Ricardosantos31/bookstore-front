import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../livro-read-all/livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-create',
  templateUrl: './livro-create.component.html',
  styleUrls: ['./livro-create.component.css']
})
export class LivroCreateComponent implements OnInit {

  id_cat: String = ''

  livro: Livro = {
    id: '',
    titulo: '',
    nome_autor: '',
    texto: ''
  }

  titulo = new FormControl('', [Validators.minLength(3)])
  nome_autor = new FormControl('', [Validators.minLength(3)])
  texto = new FormControl('', [Validators.minLength(10)])

  constructor(
    private service: LivroService, 
    private route:ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get('id_cat')!
  }

  create():void{
    this.service.create(this.livro, this.id_cat).subscribe(resposta => {
      this.router.navigate([`categorias/${this.id_cat}/livros`])
      this.service.mensagem('Livro criado com sucesso !')
    }, err => {
      this.router.navigate([`categorias/${this.id_cat}/livros`])
      this.service.mensagem('Erro ao criar livro')
    })
  }

  cancela():void {
    this.router.navigate([`categorias/${this.id_cat}/livros`])
  }

  getMessageTitulo() {
  
    if(this.titulo.invalid) { 
      return "O campo Titulo deve conter entre 3 e 100 caracteres"
    }
    return false
  }
  
  getMessageNomeAutor(){
    if(this.nome_autor.invalid) { 
      return "O campo Nome do autor deve conter entre 3 e 100 caracteres";
    }
    return false
    }
  
  getMessageTexto(){
    if(this.texto.invalid) { 
      return "O campo Descrição deve conter entre 10 e 2000000 caracteres";
    }
    return false
  }

  hasInvalidField(){
    return this.getMessageTexto() || this.getMessageTitulo() || this.getMessageNomeAutor()
  }
}
