import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonTab, IonTabBar, IonTabButton, IonTabs } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-tabs',
  templateUrl: './pokemon-tabs.component.html',
  styleUrls: ['./pokemon-tabs.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonTab,
    IonTabBar,
    IonTabButton,
    IonTabs,
  ]
})

export class PokemonTabsComponent implements OnInit {

  pokemon: any;

  constructor(private route: ActivatedRoute,  private pokemonService: PokemonService) {}

  activeTab: string = 'stats';

  selectTab(tab: string) {
    this.activeTab = tab;
  }

  get typeColor(): string {
    if (!this.pokemon?.types?.length) return '#fff';
    const primaryType = this.pokemon.types[0];
    return this.pokemonService.getTypeColor(primaryType);
  }
  
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.pokemonService.selectedPokemon$.subscribe(p => {
      this.pokemon = p;
    });
  }
}
