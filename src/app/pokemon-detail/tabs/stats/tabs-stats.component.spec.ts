import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonsStatsComponent } from './tabs-stats.component';
import { PokemonService } from 'src/app/services/pokemon.service';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('PokemonsStatsComponent', () => {
  let component: PokemonsStatsComponent;
  let fixture: ComponentFixture<PokemonsStatsComponent>;

  const mockPokemon = {
    description: 'When several of these POKéMON gather, their electricity could build and cause lightning storms.',
    height: 0.4,
    weight: 6.0,
    abilities: ['Static', 'Lightning-rod'],
    stats: {
      Health: 35,
      Attack: 55,
      Defense: 40,
      Special_Attack: 50,
      Special_Defense: 50,
      Speed: 90
    }
  };

  const mockPokemonService = {
    selectedPokemon$: of(mockPokemon)
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonsStatsComponent],
      providers: [
        { provide: PokemonService, useValue: mockPokemonService },
        {
          provide: ActivatedRoute,
          useValue: {
            root: {
              firstChild: {
                snapshot: {
                  paramMap: {
                    get: () => '25'
                  }
                }
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonsStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve definir os dados do pokémon após o ngOnInit', () => {
    expect(component.pokemon).toEqual(mockPokemon);
  });

  it('deve retornar os labels corretos para os stats', () => {
    expect(component.getLabel('hp')).toBe('Health');
    expect(component.getLabel('attack')).toBe('Attack');
    expect(component.getLabel('speed')).toBe('Speed');
    expect(component.getLabel('unknownStat')).toBe('unknownStat');
  });

  it('deve exibir altura e peso corretamente convertidos', () => {
    const heightFt = (mockPokemon.height * 3.28084).toFixed(2); // metros para pés
    const weightLbs = (mockPokemon.weight * 2.20462).toFixed(2); // kg para lbs

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain(`${heightFt} ft`);
    expect(compiled.textContent).toContain(`${mockPokemon.height} m`);
    expect(compiled.textContent).toContain(`${weightLbs} lbs`);
    expect(compiled.textContent).toContain(`${mockPokemon.weight} kg`);
  });

  it('deve renderizar as habilidades do pokémon', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    for (const ability of mockPokemon.abilities) {
      expect(compiled.textContent).toContain(ability);
    }
  });

  it('deve renderizar as estatísticas base', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    for (const stat in mockPokemon.stats) {
      expect(compiled.textContent).toContain(component.getLabel(stat));
      expect(compiled.textContent).toContain(String(mockPokemon.stats[stat as keyof typeof mockPokemon.stats]));
    }
  });
});
