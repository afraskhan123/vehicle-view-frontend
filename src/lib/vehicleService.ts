
import { Vehicle, CreateVehicleData, UpdateVehicleData } from '@/types/vehicle';

// Mock data storage - replace with real API calls
const STORAGE_KEY = 'vehicles';

const getStoredVehicles = (): Vehicle[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

const saveVehicles = (vehicles: Vehicle[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(vehicles));
};

const generateId = () => Math.random().toString(36).substr(2, 9);

export const vehicleService = {
  getAll: async (): Promise<Vehicle[]> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    return getStoredVehicles();
  },

  getById: async (id: string): Promise<Vehicle | null> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const vehicles = getStoredVehicles();
    return vehicles.find(v => v.id === id) || null;
  },

  create: async (data: CreateVehicleData): Promise<Vehicle> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    const vehicles = getStoredVehicles();
    const newVehicle: Vehicle = {
      ...data,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    vehicles.push(newVehicle);
    saveVehicles(vehicles);
    return newVehicle;
  },

  update: async (data: UpdateVehicleData): Promise<Vehicle> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    const vehicles = getStoredVehicles();
    const index = vehicles.findIndex(v => v.id === data.id);
    if (index === -1) throw new Error('Vehicle not found');
    
    const updatedVehicle = {
      ...vehicles[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    vehicles[index] = updatedVehicle;
    saveVehicles(vehicles);
    return updatedVehicle;
  },

  delete: async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const vehicles = getStoredVehicles();
    const filtered = vehicles.filter(v => v.id !== id);
    saveVehicles(filtered);
  }
};
