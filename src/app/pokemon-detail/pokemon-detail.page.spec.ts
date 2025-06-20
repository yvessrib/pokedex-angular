import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonDetailPage } from './pokemon-detail.page';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { PokemonService } from '../services/pokemon.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PokemonDetailPage', () => {
  let component: PokemonDetailPage;
  let fixture: ComponentFixture<PokemonDetailPage>;
  let mockPokemonService: jasmine.SpyObj<PokemonService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const pokemonServiceSpy = jasmine.createSpyObj('PokemonService', ['fetchPokemon', 'getTypeColor']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, PokemonDetailPage],
      providers: [
        { provide: PokemonService, useValue: pokemonServiceSpy },
        { provide: Router, useValue: routerMock },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '25' // simula o id do Pokémon vindo da rota
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonDetailPage);
    component = fixture.componentInstance;
    mockPokemonService = TestBed.inject(PokemonService) as jasmine.SpyObj<PokemonService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve buscar o pokémon ao iniciar', () => {
    const mockPokemon = {
      id: 25,
      name: 'pikachu',
      idFormatted: '025',
      image: 'url',
      types: ['electric']
    };

    mockPokemonService.fetchPokemon.and.returnValue(of(mockPokemon));

    component.ngOnInit();

    expect(mockPokemonService.fetchPokemon).toHaveBeenCalledWith('25');
    expect(component.pokemon).toEqual(mockPokemon);
  });

  it('deve retornar a cor correta do tipo', () => {
    mockPokemonService.getTypeColor.and.returnValue('#F8D030');
    const color = component.getTypeColor('electric');
    expect(color).toBe('#F8D030');
    expect(mockPokemonService.getTypeColor).toHaveBeenCalledWith('electric');
  });

  it('deve redirecionar para /pokedex quando goToPokedex for chamado', () => {
    component.goToPokedex();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/pokedex']);
  });
});
