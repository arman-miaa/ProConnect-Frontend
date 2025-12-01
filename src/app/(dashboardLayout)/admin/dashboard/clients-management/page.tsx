



import { TableSkeleton } from "@/components/shared/TableSkeleton";



import { Suspense } from "react";

const AdminClientsManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {



  return (
    <div className="space-y-6">
   
    
      <Suspense fallback={<TableSkeleton columns={10} rows={10} />}>
   
   
      </Suspense>
    </div>
  );
};

export default AdminClientsManagementPage;
