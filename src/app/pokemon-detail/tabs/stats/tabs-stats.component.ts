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
  
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.pokemonService.selectedPokemon$.subscribe(p => {
      this.pokemon = p;
    });
  }
  
}