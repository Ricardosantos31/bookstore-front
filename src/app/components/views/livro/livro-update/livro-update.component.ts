import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../livro-read-all/livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-update',
  templateUrl: './livro-update.component.html',
  styleUrls: ['./livro-update.component.css']
})
export class LivroUpdateComponent implements OnInit {

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
    this.livro.id = this.route.snapshot.paramMap.get('id')!
    this.findById()
  }

  findById():void{
    this.service.findById(this.livro.id!).subscribe(resposta => {
      this.livro = resposta
    })
  }

  update():void{
    this.service.update(this.livro).subscribe(resposta => {
      this.router.navigate([`categorias/${this.id_cat}/livros`])
      this.service.mensagem('Livro atualizado com sucesso !')
    }, err => {
      this.router.navigate([`categorias/${this.id_cat}/livros`])
      this.service.mensagem('Falha ao atualizar livro')
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
