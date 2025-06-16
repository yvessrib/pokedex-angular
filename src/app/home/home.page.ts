import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
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
  IonChip, // necessário para os tipos
  IonInfiniteScroll,
  IonInfiniteScrollContent,
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
    IonChip,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
  ],
})
export class HomePage implements OnInit {
  pokemons: any[] = [];

  constructor(private router: Router, private http: HttpClient) {}

  goToPokemonDetail(pokemonId: number) {
    this.router.navigate(['/pokedex', pokemonId]);
  }

  ngOnInit() {
    this.loadPokemons();
  }

  limit = 18
  offset = 0;
  isLoading = false;
  isDone = false

  async loadPokemons() {
    if (this.isLoading || this.isDone) return;

    this.isLoading = true;

    this.http.get<any>(`https://pokeapi.co/api/v2/pokemon?offset=${this.offset}&limit=${this.limit}`)
    .subscribe({
      next: (response) => {
        const requests = response.results.map((pokemon: any) => this.http.get(pokemon.url));
        Promise.all(requests.map((req: { toPromise: () => any; }) => req.toPromise()))
          .then((details: any[]) => {
            const newPokemons = details.map((data: any) => ({
              id: data.id,
              idFormatted: data.id.toString().padStart(3, '0'),
              name: data.name,
              image: data.sprites.other['official-artwork'].front_default || data.sprites.front_default,
              types: data.types.map((t: any) => t.type.name)
            }));

            this.pokemons.push(...newPokemons);
            this.pokemons.sort((a, b) => a.id - b.id);

            this.offset += this.limit;
            if (!response.next) this.isDone = true;
            this.isLoading = false;
          });
      },
      error: (err) => {
        console.error(`Erro ao carregar pokémons:`, err);
        this.isLoading = false;
      }
    });
}
  loadMore(event: any) {
    this.loadPokemons();
    setTimeout(() => {
      event.target.complete();
    }, 500);
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
