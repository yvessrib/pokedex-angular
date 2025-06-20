import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonChip, IonButton, IonIcon, IonButtons } from '@ionic/angular/standalone';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PokemonService } from '../services/pokemon.service';
import { addIcons } from 'ionicons';
import { arrowBackOutline } from 'ionicons/icons';

addIcons({
  'arrow-back-outline': arrowBackOutline
});

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.page.html',
  styleUrls: ['./pokemon-detail.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    CommonModule, 
    FormsModule, 
    RouterOutlet,
    IonChip,
    IonButton,
    IonIcon,
    IonButtons
  ]
})
export class PokemonDetailPage implements OnInit {

  pokemon: any;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, public pokemonService: PokemonService) { }

  goToPokedex() {
    this.router.navigate(['/pokedex']);
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.pokemonService.fetchPokemon(id).subscribe(p => {
      this.pokemon = p;
      console.log(this.pokemon);
    });
  }

  getTypeColor(type: string) {
    return this.pokemonService.getTypeColor(type);
  }

  // getTypeColor(type: string): string {
  //   const colors: { [key: string]: string } = {
  //     fire: '#F08030',
  //     water: '#6890F0',
  //     grass: '#78C850',
  //     electric: '#F8D030',
  //     psychic: '#F85888',
  //     ice: '#98D8D8',
  //     dragon: '#7038F8',
  //     dark: '#705848',
  //     fairy: '#EE99AC',
  //     normal: '#A8A878',
  //     fighting: '#C03028',
  //     flying: '#A890F0',
  //     poison: '#A040A0',
  //     ground: '#E0C068',
  //     rock: '#B8A038',
  //     bug: '#A8B820',
  //     ghost: '#705898',
  //     steel: '#B8B8D0'
  //   };
  //   return colors[type] || '#fff';
  // }

}
