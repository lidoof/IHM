import { Injectable } from '@angular/core';
import { Session } from './auth.model';
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
const sessionStore = createStore(
  { name: 'session' },
  // avec comme valauer initial root l'interface initialState
  withProps<initialState>({ loading: false }),
  // et une entité de type session
  withEntities<Session>(),
);
//persistence des données sur le store
export const persist = persistState(sessionStore, {
  key: 'auth@Store',
  storage: localStorageStrategy,
});

@Injectable({ providedIn: 'root' })
export class SessionRepository {
  //récuperation de la valeur root loading
  loading$ = sessionStore.pipe(select((state) => state.loading));
  //pour modifier la valeur root  loading
  updateLoadingSession(loading: boolean) {
    sessionStore.update((state) => ({
      ...state,
      loading,
    }));
  }
  // restorer toute les valeurs du store
  resetRootValue() {
    sessionStore.reset();
  }
  // pour mettre une entité session dans le store, avec l'id session
  setEntities(entities: any) {
    sessionStore.update(setEntities([{ id: 'session', ...entities }]));
  }
  // pour récuperer toutes les entités
  getAllEntities$(): any {
    return sessionStore.pipe(selectAllEntities());
  }
  // récuperer la première entité
  getFirstEntity(): any {
    return sessionStore.pipe(selectFirst());
  }
  // récuperer le store , dans le cas ou on veut utiliser une fonction
  // non définis dans la classe
  getTheStore(): any {
    return sessionStore;
  }

  getValue(id: string): any {
    return sessionStore.query(getEntity(id));
  }
}
