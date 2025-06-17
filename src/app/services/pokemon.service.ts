// src/app/services/pokemon.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, forkJoin } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private selectedPokemonSubject = new BehaviorSubject<any>(null);
  selectedPokemon$ = this.selectedPokemonSubject.asObservable();

  constructor(private http: HttpClient) {}

  fetchPokemon(id: string): Observable<any> {
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${id}`;

    return forkJoin([
      this.http.get<any>(pokemonUrl),
      this.http.get<any>(speciesUrl)
    ]).pipe(
      map(([pokemonData, speciesData]) => {
        const descriptionEntry = speciesData.flavor_text_entries.find(
          (entry: any) => entry.language.name === 'en'
        );

        return {
          id: pokemonData.id,
          idFormatted: pokemonData.id.toString().padStart(3, '0'),
          name: pokemonData.name,
          image: pokemonData.sprites.other['official-artwork'].front_default || pokemonData.sprites.front_default,
          types: pokemonData.types.map((t: any) => t.type.name),
          height: pokemonData.height / 10, // convertendo de decímetros para metros
          weight: pokemonData.weight / 10, // convertendo de hectogramas para kg
          stats: {
            Health: pokemonData.stats.find((s: any) => s.stat.name === 'hp')?.base_stat,
            Attack: pokemonData.stats.find((s: any) => s.stat.name === 'attack')?.base_stat,
            Defense: pokemonData.stats.find((s: any) => s.stat.name === 'defense')?.base_stat,
            Speed: pokemonData.stats.find((s: any) => s.stat.name === 'speed')?.base_stat,
            Special_Attack: pokemonData.stats.find((s: any) => s.stat.name === 'special-attack')?.base_stat,
            Special_Defense: pokemonData.stats.find((s: any) => s.stat.name === 'special-defense')?.base_stat
          },
          abilities: pokemonData.abilities.map((a: any) => a.ability.name),
          description: descriptionEntry ? descriptionEntry.flavor_text.replace(/\f/g, ' ').replace(/\n/g, ' ') : 'No description available.'
        };
      }),
      tap(pokemon => this.selectedPokemonSubject.next(pokemon))
    );
  }

  getSelectedPokemon(): any {
    return this.selectedPokemonSubject.getValue();
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
