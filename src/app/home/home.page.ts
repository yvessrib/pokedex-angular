import { Component, OnInit, OnDestroy } from '@angular/core';
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
  IonCardTitle,
  IonCol,
  IonGrid,
  IonRow,
  IonChip,
  IonIcon,
  IonMenuButton,
  IonMenu,
  IonList,
  IonItem,
  IonLabel,
  IonSearchbar,
  IonButtons,
  IonSpinner
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { star, starOutline } from 'ionicons/icons';
import { FormsModule } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

addIcons({
  'star': star,
  'star-outline': starOutline
});

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
    IonCardTitle,
    IonCol,
    IonGrid,
    IonRow,
    IonChip,
    IonIcon,
    IonMenuButton,
    IonMenu,
    IonList,
    IonItem,
    IonLabel,
    IonSearchbar,
    FormsModule,
    IonButtons,
    IonSpinner
  ],
})
export class HomePage implements OnInit, OnDestroy {
  pokemons: any[] = [];
  favorites = new Set<number>();

  searchTerm = '';
  filteredPokemons: any[] = [];

  private searchSubject = new Subject<string>();
  private searchSubscription!: Subscription;

  isLoading = false;
  isDone = false;

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      this.favorites = new Set(JSON.parse(storedFavorites));
    }

    this.searchSubscription = this.searchSubject
      .pipe(debounceTime(300))
      .subscribe(searchText => {
        this.filterPokemons(searchText);
      });

    this.loadAllPokemons();
  }

  ngOnDestroy(): void {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  applyFilters() {
    this.searchSubject.next(this.searchTerm);
  }

  filterPokemons(searchText: string) {
    const lowerTerm = searchText.toLowerCase();
    this.filteredPokemons = this.pokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(lowerTerm)
    );
  }

  goToPokemonDetail(pokemonId: number) {
    this.router.navigate(['/pokedex', pokemonId, 'stats']);
  }

  toggleFavorite(pokemon: any, event: Event) {
    event.stopPropagation();
    if (this.favorites.has(pokemon.id)) {
      this.favorites.delete(pokemon.id);
    } else {
      this.favorites.add(pokemon.id);
    }
    localStorage.setItem('favorites', JSON.stringify(Array.from(this.favorites)));
  }

  isFavorite(pokemonId: number): boolean {
    return this.favorites.has(pokemonId);
  }

  getFavoritePokemons() {
    return this.pokemons.filter(p => this.favorites.has(p.id));
  }

  trackByPokemonId(index: number, pokemon: any) {
    return pokemon.id;
  }

  async loadAllPokemons() {
    this.isLoading = true;
    this.http.get<any>('https://pokeapi.co/api/v2/pokemon?offset=0&limit=1025')
      .subscribe({
        next: (response) => {
          const requests = response.results.map((pokemon: any) => this.http.get(pokemon.url));
          Promise.all(requests.map((req: any) => req.toPromise()))
            .then((details: any[]) => {
              this.pokemons = details.map((data: any) => ({
                id: data.id,
                idFormatted: data.id.toString().padStart(3, '0'),
                name: data.name,
                image: data.sprites.other['official-artwork'].front_default || data.sprites.front_default,
                types: data.types.map((t: any) => t.type.name)
              }));
              this.pokemons.sort((a, b) => a.id - b.id);
              this.isLoading = false;
              this.isDone = true;
              this.filterPokemons(this.searchTerm);
            });
        },
        error: (err) => {
          console.error(`Erro ao carregar todos os pokémons:`, err);
          this.isLoading = false;
        }
      });
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
