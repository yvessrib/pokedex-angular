import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePage } from './home.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePage, HttpClientTestingModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve filtrar corretamente os pokémons pelo nome', () => {
    component.pokemons = [
      { id: 1, name: 'bulbasaur' },
      { id: 4, name: 'charmander' },
      { id: 7, name: 'squirtle' }
    ];

    component.filterPokemons('char');
    expect(component.filteredPokemons.length).toBe(1);
    expect(component.filteredPokemons[0].name).toBe('charmander');
  });

  it('deve adicionar e remover um pokémon dos favoritos', () => {
    const pokemon = { id: 25, name: 'pikachu' };

    const fakeEvent = new Event('click');
    component.toggleFavorite(pokemon, fakeEvent);
    expect(component.isFavorite(25)).toBeTrue();

    component.toggleFavorite(pokemon, fakeEvent);
    expect(component.isFavorite(25)).toBeFalse();
  });

  it('deve retornar apenas pokémons favoritos', () => {
    component.pokemons = [
      { id: 1, name: 'bulbasaur' },
      { id: 4, name: 'charmander' }
    ];
    component.favorites = new Set([4]);

    const result = component.getFavoritePokemons();
    expect(result.length).toBe(1);
    expect(result[0].id).toBe(4);
  });

  it('trackByPokemonId deve retornar o id do pokémon', () => {
    const pokemon = { id: 123 };
    expect(component.trackByPokemonId(0, pokemon)).toBe(123);
  });
});
