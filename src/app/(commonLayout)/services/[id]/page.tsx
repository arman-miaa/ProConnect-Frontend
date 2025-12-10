// app/(commonLayout)/services/[id]/page.tsx
import { getServiceById } from "@/services/service/service.service";
import { ServiceDetailsSection } from "@/components/servicesPage/ServiceDetailsSection";
import { getUserInfo } from "@/services/auth/getUserInfo";


interface Props {
  params: Promise<{ id: string }>;
}
export const dynamic = "force-dynamic";
export default async function ServiceDetailPage({ params }: Props) {
  const { id } = await params;
  const service = await getServiceById(id);
    const user = await getUserInfo();
  

  if (!service) return <p>Service not found</p>;

  // console.log("user info data ", user);

  return (
    <ServiceDetailsSection
      service={service}
      user={{
        isLoggedIn: user._id,
        role: user?.role,
      }}
    />
  );
}
