import { Injectable } from '@angular/core';
import { listRoom} from './listRoom.model';
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
const listRoomStore = createStore(
  { name: 'listRoom' },
  // avec comme valauer initial root l'interface initialState
  withProps<initialState>({ loading: false }),
  // et une entité de type listRoom
  withEntities<listRoom>(),
);
//persistence des données sur le store
export const persist = persistState(listRoomStore, {
  key: 'listRoom@Store',
  storage: localStorageStrategy,
});

@Injectable({ providedIn: 'root' })
export class listRoomRepo {
  //récuperation de la valeur root loading
  loading$ = listRoomStore.pipe(select((state) => state.loading));
  //pour modifier la valeur root  loading
  updateLoadinglistRoom(loading: boolean) {
    listRoomStore.update((state) => ({
      ...state,
      loading,
    }));
  }
  // restorer toute les valeurs du store
  resetRootValue() {
    listRoomStore.reset();
  }
  // pour mettre une entité listRoom dans le store, avec l'id listRoom
  setEntities(entities: any) {
    listRoomStore.update(setEntities([{ id: 'listRoom', ...entities }]));
  }
  // pour récuperer toutes les entités
  getAllEntities$(): any {
    return listRoomStore.pipe(selectAllEntities());
  }
  // récuperer la première entité
  getFirstEntity(): any {
    return listRoomStore.pipe(selectFirst());
  }
  // récuperer le store , dans le cas ou on veut utiliser une fonction
  // non définis dans la classe
  getTheStore(): any {
    return listRoomStore;
  }

  getValue(id: string): any {
    return listRoomStore.query(getEntity(id));
  }
}
