import { Injectable } from '@angular/core';
import {Wallet} from './wallet.model';
import { createStore, select, withProps } from '@ngneat/elf';
import {
  getEntity,
  selectAllEntities,
  selectFirst,
  setEntities,
  updateEntities,
  withEntities,
} from '@ngneat/elf-entities';
import { localStorageStrategy, persistState } from '@ngneat/elf-persist-state';


// valeur root du store
interface initialState {
  loading: boolean;
}
// création du store
const walletStore = createStore(
  { name: 'wallet' },
  // avec comme valauer initial root l'interface initialState
  withProps<initialState>({ loading: false }),
  // et une entité de type wallet
  withEntities<Wallet>(),
);
//persistence des données sur le store
export const persist = persistState(walletStore, {
  key: 'wallet@Store',
  storage: localStorageStrategy,
});

@Injectable({ providedIn: 'root' })
export class WalletRepo {
  //récuperation de la valeur root loading
  loading$ = walletStore.pipe(select((state) => state.loading));
  //pour modifier la valeur root  loading
  updateLoadingwallet(loading: boolean) {
    walletStore.update((state) => ({
      ...state,
      loading,
    }));
  }
  // restorer toute les valeurs du store
  resetRootValue() {
    walletStore.reset();
  }

  updateValue(value:number){
    walletStore.update(
      updateEntities('wallet', (entity) => ({ ...entity, balance: value }))
    );
  }
  // pour mettre une entité wallet dans le store, avec l'id wallet
  setEntities(entities: any) {
    walletStore.update(setEntities([{ id: 'wallet', ...entities }]));
  }
  // pour récuperer toutes les entités
  getAllEntities$(): any {
    return walletStore.pipe(selectAllEntities());
  }
  // récuperer la première entité
  getFirstEntity(): any {
    return walletStore.pipe(selectFirst());
  }
  // récuperer le store , dans le cas ou on veut utiliser une fonction
  // non définis dans la classe
  getTheStore(): any {
    return walletStore;
  }

  getValue(id: string): any {
    return walletStore.query(getEntity(id));
  }
}
