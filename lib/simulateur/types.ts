export type SimProjectType = "maison" | "copropriete" | "entreprise" | "recharge-rapide";
export type SimPower = "7.4" | "11" | "22" | "ne-sait-pas";
export type SimDistance = "moins-5" | "5-15" | "15-30" | "plus-30";
export type SimElectricalSetup = "recent-aux-normes" | "ancien-a-verifier" | "je-ne-sais-pas";

export interface SimulatorState {
  projectType: SimProjectType | null;
  housingType: string | null;
  vehicle: string | null;
  desiredPower: SimPower | null;
  electricalSetup: SimElectricalSetup | null;
  distance: SimDistance | null;
  photosCount: number;
  contact: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    postalCode: string;
  };
}

export const initialSimulatorState: SimulatorState = {
  projectType: null,
  housingType: null,
  vehicle: null,
  desiredPower: null,
  electricalSetup: null,
  distance: null,
  photosCount: 0,
  contact: { firstName: "", lastName: "", email: "", phone: "", postalCode: "" },
};

export const housingTypesByProject: Record<SimProjectType, string[]> = {
  maison: ["Maison avec garage", "Maison avec parking extérieur", "Maison sans stationnement dédié"],
  copropriete: ["Je suis copropriétaire", "Je suis syndic", "Je suis membre du conseil syndical"],
  entreprise: ["Parking privatif entreprise", "Flotte de véhicules", "Site multi-bâtiments"],
  "recharge-rapide": ["Parking public", "Site commercial", "Aire de service"],
};
