import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';
import { IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'tabs-stats-about',
  templateUrl: './tabs-stats.component.html',
  styleUrls: ['./tabs-stats.component.scss'],
  standalone: true,
  imports: [CommonModule, IonContent],
})

export class PokemonsStatsComponent implements OnInit {

  pokemon: any;

  constructor(private route: ActivatedRoute,  private pokemonService: PokemonService) {}

  labelMap: { [key: string]: string } = {
    hp: 'Health',
    attack: 'Attack',
    defense: 'Defense',
    specialAttack: 'Special Attack',
    specialDefense: 'Special Defense',
    speed: 'Speed'
  };

  getLabel(key: string): string {
    return this.labelMap[key] || key;
  }
  
  ngOnInit(): void {
    const id = this.route.root.firstChild?.snapshot.paramMap.get('id')

    this.pokemonService.selectedPokemon$.subscribe(p => {
      this.pokemon = p;
      console.log("Stats object:", this.pokemon.stats);
      console.log("stats page pokemon", this.pokemon);
      console.log("Stats keys:", Object.keys(this.pokemon.stats));

    });
  }
}