import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.page.html',
  styleUrls: ['./pokemon-detail.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, HttpClientModule]
})
export class PokemonDetailPage implements OnInit {

  pokemon: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.http.get(`https://pokeapi.co/api/v2/pokemon/${id}`).subscribe((data: any) => {
      this.pokemon = {
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
      };
      console.log(this.pokemon);
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
