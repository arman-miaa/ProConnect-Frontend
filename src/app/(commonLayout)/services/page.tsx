
import { ServicesSection } from "@/components/modules/servicesPage/ServicesSection"
import { getAllServices } from "@/services/service/service.service";

export const dynamic = "force-dynamic";
const ServicesPage = async () => {
  const services = await getAllServices()
 
  return (
      <div>
          <ServicesSection services={services} />
    </div>
  )
}

export default ServicesPage