


import ManagementPageHeader from "@/components/shared/ManagementPageHeader";


const SellersManagementPage = async ({
 
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {


  return (
    <div className="space-y-6">
      <ManagementPageHeader
        title="Appointments Management"
        description="View and manage all appointments"
      />

    

   
 
    </div>
  );
};

export default SellersManagementPage;
