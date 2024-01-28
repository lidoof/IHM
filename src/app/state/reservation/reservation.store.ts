import { Injectable } from '@angular/core';
import { createStore, select, withProps } from '@ngneat/elf';
import {
  getEntity,
  selectAllEntities,
  selectFirst,
  setEntities,
  withEntities,
} from '@ngneat/elf-entities';
import { localStorageStrategy, persistState } from '@ngneat/elf-persist-state';
import { Reservation } from './reservationModel';


// valeur root du store
interface initialState {
  loading: boolean;
}
// création du store
const reservationStore = createStore(
  { name: 'reservation' },
  // avec comme valauer initial root l'interface initialState
  withProps<initialState>({ loading: false }),
  // et une entité de type reservation
  withEntities<Reservation>(),
);
//persistence des données sur le store
export const persist = persistState(reservationStore, {
  key: 'reservation@Store',
  storage: localStorageStrategy,
});

@Injectable({ providedIn: 'root' })
export class ReservationRepo {
  //récuperation de la valeur root loading
  loading$ = reservationStore.pipe(select((state) => state.loading));
  //pour modifier la valeur root  loading
  updateLoadingreservation(loading: boolean) {
    reservationStore.update((state) => ({
      ...state,
      loading,
    }));
  }
  // restorer toute les valeurs du store
  resetRootValue() {
    reservationStore.reset();
  }
  // pour mettre une entité reservation dans le store, avec l'id reservation
  setEntities(entities: any) {
    reservationStore.update(setEntities([{ id: 'reservation', ...entities }]));
  }
  // pour récuperer toutes les entités
  getAllEntities$(): any {
    return reservationStore.pipe(selectAllEntities());
  }
  // récuperer la première entité
  getFirstEntity(): any {
    return reservationStore.pipe(selectFirst());
  }
  // récuperer le store , dans le cas ou on veut utiliser une fonction
  // non définis dans la classe
  getTheStore(): any {
    return reservationStore;
  }

  getValue(id: string): any {
    return reservationStore.query(getEntity(id));
  }
}
