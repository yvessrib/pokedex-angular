import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonTabsComponent } from './pokemon-tabs.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { PokemonService } from 'src/app/services/pokemon.service';

describe('PokemonTabsComponent', () => {
  let component: PokemonTabsComponent;
  let fixture: ComponentFixture<PokemonTabsComponent>;

  const mockPokemon = {
    name: 'pikachu',
    types: ['electric']
  };

  const mockPokemonService = {
    selectedPokemon$: of(mockPokemon),
    getTypeColor: (type: string) => '#F8D030' // cor do tipo electric
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonTabsComponent],
      providers: [
        { provide: PokemonService, useValue: mockPokemonService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '25'
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve definir a aba ativa como "evolution" ao chamar selectTab("evolution")', () => {
    component.selectTab('evolution');
    expect(component.activeTab).toBe('evolution');
  });

  it('deve retornar a cor correta com base no tipo do pokémon', () => {
    expect(component.typeColor).toBe('#F8D030');
  });

  it('deve atualizar o pokemon no ngOnInit', () => {
    expect(component.pokemon).toEqual(mockPokemon);
  });
});
