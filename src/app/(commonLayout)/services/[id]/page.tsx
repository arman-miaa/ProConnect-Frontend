import { getServiceById } from "@/services/service/service.service";
import { ServiceDetailsSection } from "@/components/servicesPage/ServiceDetailsSection";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ServiceDetailPage({ params }: Props) {
  const { id } = await params;
  const service = await getServiceById(id);

  if (!service) return <p>Service not found</p>;

  return <ServiceDetailsSection service={service} />; // শুধু data পাঠাবে
}
