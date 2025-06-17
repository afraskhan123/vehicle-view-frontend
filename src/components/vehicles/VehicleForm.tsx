
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreateVehicleData, Vehicle } from '@/types/vehicle';
import { useVehicles } from '@/hooks/useVehicles';
import { useEffect } from 'react';

const vehicleSchema = z.object({
  vccNo: z.string().min(1, 'VCC Number is required'),
  vccStatus: z.string().min(1, 'VCC Status is required'),
  vccGenerationDate: z.string().min(1, 'VCC Generation Date is required'),
  chassisNo: z.string().min(1, 'Chassis Number is required'),
  engineNumber: z.string().min(1, 'Engine Number is required'),
  yearOfBuilt: z.string().min(1, 'Year of Built is required'),
  vehicleDrive: z.string().min(1, 'Vehicle Drive is required'),
  countryOfOrigin: z.string().min(1, 'Country of Origin is required'),
  engineCapacity: z.string().optional().default(''),
  carriageCapacity: z.string().optional().default(''),
  passengerCapacity: z.string().optional().default(''),
  vehicleModel: z.string().min(1, 'Vehicle Model is required'),
  vehicleBrandName: z.string().min(1, 'Vehicle Brand Name is required'),
  vehicleType: z.string().min(1, 'Vehicle Type is required'),
  vehicleColor: z.string().min(1, 'Vehicle Color is required'),
  specificationStandardName: z.string().min(1, 'Specification Standard Name is required'),
  declarationNumber: z.string().min(1, 'Declaration Number is required'),
  declarationDate: z.string().min(1, 'Declaration Date is required'),
  ownerCode: z.string().min(1, 'Owner Code is required'),
  ownerName: z.string().min(1, 'Owner Name is required'),
  printRemarks: z.string().optional().default(''),
});

interface VehicleFormProps {
  vehicle?: Vehicle;
  onSuccess?: () => void;
}

export const VehicleForm = ({ vehicle, onSuccess }: VehicleFormProps) => {
  const { createVehicle, updateVehicle, isCreating, isUpdating } = useVehicles();
  const isEditing = !!vehicle;

  const form = useForm<CreateVehicleData>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      vccNo: '',
      vccStatus: '',
      vccGenerationDate: '',
      chassisNo: '',
      engineNumber: '',
      yearOfBuilt: '',
      vehicleDrive: '',
      countryOfOrigin: '',
      engineCapacity: '',
      carriageCapacity: '',
      passengerCapacity: '',
      vehicleModel: '',
      vehicleBrandName: '',
      vehicleType: '',
      vehicleColor: '',
      specificationStandardName: '',
      declarationNumber: '',
      declarationDate: '',
      ownerCode: '',
      ownerName: '',
      printRemarks: '',
    },
  });

  useEffect(() => {
    if (vehicle) {
      const { id, createdAt, updatedAt, ...vehicleData } = vehicle;
      form.reset(vehicleData);
    }
  }, [vehicle, form]);

  const onSubmit = (data: CreateVehicleData) => {
    if (isEditing && vehicle) {
      updateVehicle({ ...data, id: vehicle.id });
    } else {
      createVehicle(data);
    }
    if (!isEditing) {
      form.reset();
    }
    onSuccess?.();
  };

  const isLoading = isCreating || isUpdating;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? 'Edit Vehicle' : 'Add New Vehicle'}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="vccNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>VCC Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter VCC Number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="vccStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>VCC Status</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter VCC Status" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="vccGenerationDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>VCC Generation Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="chassisNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chassis Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Chassis Number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="engineNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Engine Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Engine Number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="yearOfBuilt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year of Built</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Year of Built" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="vehicleDrive"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vehicle Drive</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Left Hand Drive" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="countryOfOrigin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country of Origin</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Country of Origin" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="engineCapacity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Engine Capacity</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Engine Capacity" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="carriageCapacity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Carriage Capacity</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Carriage Capacity" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="passengerCapacity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Passenger Capacity</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Passenger Capacity" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="vehicleModel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vehicle Model</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Vehicle Model" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="vehicleBrandName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vehicle Brand Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Vehicle Brand Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="vehicleType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vehicle Type</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Vehicle Type" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="vehicleColor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vehicle Color</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Vehicle Color" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="specificationStandardName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Specification Standard Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Specification Standard" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="declarationNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Declaration Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Declaration Number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="declarationDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Declaration Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ownerCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Owner Code</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Owner Code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ownerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Owner Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Owner Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="printRemarks"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Print Remarks</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Print Remarks" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (isEditing ? 'Updating...' : 'Creating...') : (isEditing ? 'Update Vehicle' : 'Create Vehicle')}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
