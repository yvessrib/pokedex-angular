import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';
import { 
  IonContent,
  IonIcon,
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { arrowDownOutline } from 'ionicons/icons';

addIcons({
  'arrow-down-outline': arrowDownOutline
});

@Component({
  selector: 'tabs-evolution-about',
  templateUrl: './tabs-evolution.component.html',
  styleUrls: ['./tabs-evolution.component.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    IonContent,
    IonIcon
  ],
})

export class PokemonEvolutionComponent implements OnInit {

  pokemon: any;
  evolutionTree: any;
  evolutionStages: any[][] = [];

  constructor(private route: ActivatedRoute,  public pokemonService: PokemonService) {}
  
  ngOnInit(): void {
    const id = this.route.root.firstChild?.snapshot.paramMap.get('id')
    if (!id) return;

    this.pokemonService.selectedPokemon$.subscribe(p => {
      this.pokemon = p;
    });

    this.pokemonService.fetchEvolutionChain(id).subscribe(tree => {
      this.evolutionTree = tree;
      console.log('Evolution Tree:', this.evolutionTree);
    });
  }

  getEvolutionStages(root: any): any[][] {
    const stages: any[][] = [];

    const traverse = (node: any, depth: number) => {
      if (!stages[depth]) stages[depth] = [];
      stages[depth].push(node);
      node.evolves_to.forEach((child: any) => traverse(child, depth + 1));
    };

    traverse(root, 0);
    return stages;
  }

  getTypeColor(type: string): string {
    return this.pokemonService.getTypeColor(type);
  }
}