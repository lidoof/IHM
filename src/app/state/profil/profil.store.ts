import { Injectable } from '@angular/core';
import {Profil} from './profil.model';
import { createStore, select, withProps } from '@ngneat/elf';
import {
  getEntity,
  selectAllEntities,
  selectFirst,
  setEntities,
  withEntities,
} from '@ngneat/elf-entities';
import { localStorageStrategy, persistState } from '@ngneat/elf-persist-state';


// valeur root du store
interface initialState {
  loading: boolean;
}
// création du store
const ProfilStore = createStore(
  { name: 'Profil' },
  // avec comme valauer initial root l'interface initialState
  withProps<initialState>({ loading: false }),
  // et une entité de type Profil
  withEntities<Profil>(),
);
//persistence des données sur le store
export const persist = persistState(ProfilStore, {
  key: 'Profil@Store',
  storage: localStorageStrategy,
});

@Injectable({ providedIn: 'root' })
export class ProfilRepo {
  //récuperation de la valeur root loading
  loading$ = ProfilStore.pipe(select((state) => state.loading));
  //pour modifier la valeur root  loading
  updateLoadingProfil(loading: boolean) {
    ProfilStore.update((state) => ({
      ...state,
      loading,
    }));
  }
  // restorer toute les valeurs du store
  resetRootValue() {
    ProfilStore.reset();
  }
  // pour mettre une entité Profil dans le store, avec l'id Profil
  setEntities(entities: any) {
    ProfilStore.update(setEntities([{ id: 'Profil', ...entities }]));
  }
  // pour récuperer toutes les entités
  getAllEntities$(): any {
    return ProfilStore.pipe(selectAllEntities());
  }
  // récuperer la première entité
  getFirstEntity(): any {
    return ProfilStore.pipe(selectFirst());
  }
  // récuperer le store , dans le cas ou on veut utiliser une fonction
  // non définis dans la classe
  getTheStore(): any {
    return ProfilStore;
  }

  getValue(id: string): any {
    return ProfilStore.query(getEntity(id));
  }
}
