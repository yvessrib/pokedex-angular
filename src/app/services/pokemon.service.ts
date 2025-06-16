// src/app/services/pokemon.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private selectedPokemonSubject = new BehaviorSubject<any>(null);
  selectedPokemon$ = this.selectedPokemonSubject.asObservable();

  constructor(private http: HttpClient) {}

  fetchPokemon(id: string): Observable<any> {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${id}`).pipe(
      map((data: any) => ({
        id: data.id,
        idFormatted: data.id.toString().padStart(3, '0'),
        name: data.name,
        image: data.sprites.other['official-artwork'].front_default || data.sprites.front_default,
        types: data.types.map((t: any) => t.type.name),
        stats: {
          hp: data.stats.find((s: any) => s.stat.name === 'hp')?.base_stat,
          attack: data.stats.find((s: any) => s.stat.name === 'attack')?.base_stat,
          defense: data.stats.find((s: any) => s.stat.name === 'defense')?.base_stat,
          speed: data.stats.find((s: any) => s.stat.name === 'speed')?.base_stat,
          specialAttack: data.stats.find((s: any) => s.stat.name === 'special-attack')?.base_stat,
          specialDefense: data.stats.find((s: any) => s.stat.name === 'special-defense')?.base_stat
        },
        abilities: data.abilities.map((a: any) => a.ability.name)
      })),
      tap(pokemon => this.selectedPokemonSubject.next(pokemon))
    );
  }

  getSelectedPokemon(): any {
    return this.selectedPokemonSubject.getValue();
  }
}
