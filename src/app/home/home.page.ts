import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonRow,
  IonChip // necessário para os tipos
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCol,
    IonGrid,
    IonRow,
    IonChip
  ],
})
export class HomePage implements OnInit {
  pokemons: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadPokemons();
  }

  async loadPokemons() {
    for (let i = 1; i <= 151; i++) {
      this.http.get(`https://pokeapi.co/api/v2/pokemon/${i}`).subscribe({
        next: (data: any) => {
          console.log('Pokémon carregado:', data);
          const pokemon = {
            id: data.id,
            name: data.name,
            image: data.sprites.front_default,
            types: data.types.map((t: any) => t.type.name)
          };
          this.pokemons.push(pokemon);
          this.pokemons.sort((a, b) => a.id - b.id);
        },
        error: (err) => {
          console.error(`Erro ao carregar o Pokémon ${i}:`, err);
        }
      });
    }
  }

  getTypeColor(type: string): string {
    const colors: { [key: string]: string } = {
      fire: '#F08030',
      water: '#6890F0',
      grass: '#78C850',
      electric: '#F8D030',
      psychic: '#F85888',
      ice: '#98D8D8',
      dragon: '#7038F8',
      dark: '#705848',
      fairy: '#EE99AC',
      normal: '#A8A878',
      fighting: '#C03028',
      flying: '#A890F0',
      poison: '#A040A0',
      ground: '#E0C068',
      rock: '#B8A038',
      bug: '#A8B820',
      ghost: '#705898',
      steel: '#B8B8D0'
    };
    return colors[type] || '#fff';
  }
}
