import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonEvolutionComponent } from './tabs-evolution.component';
import { PokemonService } from 'src/app/services/pokemon.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('PokemonEvolutionComponent', () => {
  let component: PokemonEvolutionComponent;
  let fixture: ComponentFixture<PokemonEvolutionComponent>;

  const mockPokemon = {
    id: 25,
    name: 'pikachu',
    types: ['electric']
  };

  const mockEvolutionTree = {
    id: 172,
    name: 'pichu',
    image: 'pichu.png',
    types: ['electric'],
    evolves_to: [{
      id: 25,
      name: 'pikachu',
      image: 'pikachu.png',
      types: ['electric'],
      evolves_to: [
        {
          id: 26,
          name: 'raichu',
          image: 'raichu.png',
          types: ['electric'],
          evolves_to: []
        }
      ]
    }]
  };

  const mockPokemonService = {
    selectedPokemon$: of(mockPokemon),
    fetchEvolutionChain: () => of(mockEvolutionTree),
    getTypeColor: (type: string) => type === 'electric' ? '#F8D030' : '#fff'
  };

  const mockActivatedRoute = {
    root: {
      firstChild: {
        snapshot: {
          paramMap: {
            get: () => '25'
          }
        }
      }
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonEvolutionComponent],
      providers: [
        { provide: PokemonService, useValue: mockPokemonService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonEvolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve carregar o pokémon e a árvore de evolução no ngOnInit', () => {
    expect(component.pokemon).toEqual(mockPokemon);
    expect(component.evolutionTree).toEqual(mockEvolutionTree);
  });

  it('deve retornar as cores corretas para os tipos', () => {
    expect(component.getTypeColor('electric')).toBe('#F8D030');
  });

  it('deve gerar os estágios da evolução corretamente', () => {
    const stages = component.getEvolutionStages(mockEvolutionTree);
    expect(stages.length).toBe(3);
    expect(stages[0][0].name).toBe('pichu');
    expect(stages[1][0].name).toBe('pikachu');
    expect(stages[2][0].name).toBe('raichu');
  });
});
