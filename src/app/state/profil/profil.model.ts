export interface Profil{
  id: string;
  nom: string;
  prenom: string;
  email: string;
  motDePasse: string;
  walletId: string;
  reservationId: string | null;
}